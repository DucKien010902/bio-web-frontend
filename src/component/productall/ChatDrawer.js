// src/components/ChatPanel.jsx
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import { List, Avatar, Input, Button, Typography } from 'antd';
import dayjs from 'dayjs';
import { io } from 'socket.io-client';
import axiosClient from '../../api/apiConfig';
import EmojiPicker from 'emoji-picker-react';
import {
  PictureOutlined,
  PaperClipOutlined,
  SmileOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Upload } from 'antd';
import { useMediaQuery } from 'react-responsive';

const { Text } = Typography;

const ChatPanel = ({ open, onClose, shopInfo }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isMobile = useMediaQuery({ maxWidth: 797 });
  const scrollRef = useRef(null);
  const socketRef = useRef(null);
  const hasLoadedRef = useRef(false);
  const panelRef = useRef(null); // Để detect click outside
  const [isHoveringPanel, setIsHoveringPanel] = useState(false);

  const [newMsg, setNewMsg] = useState('');
  const [chats, setChats] = useState([]);
  const [currentShopId, setCurrentShopId] = useState(null);

  const sender = useMemo(() => JSON.parse(localStorage.getItem('user')), []);
  const [showEmoji, setShowEmoji] = useState(false);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset'); // thay bằng preset thực tế
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await res.json();
    if (data.secure_url) {
      sendNewMessage('', data.secure_url); // hoặc messageType: 'image'
    }
  };

  const uploadFile = async (file) => {
    console.log('Tạm thời chưa upload file:', file.name);
    // Bạn có thể xử lý sau hoặc dùng Cloudinary upload file khác ảnh
  };

  const sortedChats = useMemo(() => {
    const getLastTs = (chat) =>
      chat.messages.length
        ? dayjs(chat.messages[chat.messages.length - 1].timestamp).valueOf()
        : 0;
    return [...chats].sort((a, b) => getLastTs(b) - getLastTs(a));
  }, [chats]);

  const current = useMemo(
    () => chats.find((c) => c.shopId === currentShopId),
    [chats, currentShopId]
  );

  const ensureChatExists = useCallback(
    (list) => {
      if (!shopInfo) return list;
      const found = list.find((c) => c.shopId === shopInfo.shopID);
      if (found) return list;

      return [
        {
          shopId: shopInfo.shopID,
          shopName: shopInfo.shopName,
          avatarUrl: shopInfo.avatarUrl || 'https://i.pravatar.cc/60',
          messages: [],
          unreadCount: 0,
        },
        ...list,
      ];
    },
    [shopInfo]
  );

  const addIncomingMessage = useCallback(
    (msg) => {
      if (msg.receiver.receiverID !== sender?.phoneNumber) return;

      const shopId = msg.sender.senderID;
      const formatted = {
        id: Date.now(),
        fromShop: true,
        content: msg.content,
        timestamp: new Date().toISOString(),
      };

      setChats((prev) => {
        const idx = prev.findIndex((c) => c.shopId === shopId);
        const updated = [...prev];

        if (idx !== -1) {
          const room = updated[idx];
          updated[idx] = {
            ...room,
            messages: [...room.messages, formatted],
            unreadCount:
              shopId === currentShopId
                ? room.unreadCount
                : room.unreadCount + 1,
          };
        } else {
          updated.unshift({
            shopId,
            shopName: msg.sender.shopName,
            avatarUrl: msg.sender.avatarUrl || 'https://i.pravatar.cc/60',
            messages: [formatted],
            unreadCount: 1,
          });
        }

        return updated;
      });
    },
    [currentShopId, sender?.phoneNumber]
  );

  const getAllMessage = useCallback(async () => {
    if (!sender?.phoneNumber) return;
    try {
      const res = await axiosClient.get(
        `/chat/getAllMessageByUser?customerID=${sender.phoneNumber}`
      );
      const messageData = (res.data ?? []).map((chat) => ({
        shopId: chat.members.shop.shopID,
        shopName: chat.members.shop.shopName,
        avatarUrl: chat.members.shop.avatarUrl || 'https://i.pravatar.cc/60',
        messages: chat.messages,
        unreadCount: 0,
      }));

      setChats((prev) => ensureChatExists(messageData));
    } catch (error) {
      console.error('Không thể lấy đoạn chat', error);
      setChats((prev) => ensureChatExists([]));
    }
  }, [sender?.phoneNumber, ensureChatExists]);

  const sendNewMessage = async (content) => {
    const payload = {
      id: Date.now(),
      fromShop: false,
      content,
      timestamp: new Date().toISOString(),
    };

    setChats((prev) =>
      prev.map((c) =>
        c.shopId === currentShopId
          ? { ...c, messages: [...c.messages, payload] }
          : c
      )
    );

    const messageData = {
      sender: {
        senderID: sender.phoneNumber,
        userName: sender.fullName,
        avatarUrl: sender.avatarImage,
      },
      receiver: {
        receiverID: currentShopId,
        shopName: current?.shopName,
        avatarUrl: current?.avatarUrl,
      },
      content,
      fromShop: false,
    };

    socketRef.current?.emit('sendmessage', messageData);

    try {
      await axiosClient.post('/chat/sendmessage', messageData);
    } catch (err) {
      console.error('Lỗi gửi tin nhắn', err);
    }
  };

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_API_URL);
    socketRef.current.on('backmessage', addIncomingMessage);

    return () => {
      socketRef.current.off('backmessage', addIncomingMessage);
      socketRef.current.disconnect();
    };
  }, [addIncomingMessage]);

  useEffect(() => {
    if (open && !hasLoadedRef.current) {
      getAllMessage();
      hasLoadedRef.current = true;
    }
  }, [getAllMessage, open]);

  useEffect(() => {
    if (shopInfo?.shopID && open) {
      setChats((prev) => ensureChatExists(prev));
      if (!currentShopId) {
        setCurrentShopId(shopInfo.shopID); // chỉ set nếu chưa có shop nào
      }
    }
  }, [shopInfo?.shopID, open, ensureChatExists, currentShopId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [current?.messages?.length]);

  // Đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !isHoveringPanel &&
        panelRef.current &&
        !panelRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose, isHoveringPanel]);

  useEffect(() => {
    if (!currentShopId && chats.length > 0) {
      setCurrentShopId(chats[0].shopId);
    }
  }, [chats, currentShopId]);
  // ✅ Đặt ở đầu component
  const emojiRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShowEmoji(false);
      }
    };

    if (showEmoji) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmoji]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      onMouseEnter={() => setIsHoveringPanel(true)}
      onMouseLeave={() => setIsHoveringPanel(false)}
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        width: '40%',
        height: '80%',
        background: '#fff',
        boxShadow: '-2px 0 8px rgba(0,0,0,0.15)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'row',
        borderLeft: '1px solid #f0f0f0',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 200,
          borderRight: '1px solid #f0f0f0',
          overflowY: 'auto',
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={sortedChats}
          renderItem={(item) => (
            <List.Item
              style={{
                cursor: 'pointer',
                background:
                  item.shopId === currentShopId ? '#fafafa' : undefined,
                paddingLeft: 16,
              }}
              onClick={() => {
                setCurrentShopId(item.shopId);
                console.log(item.shopId);
              }}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatarUrl} />}
                title={
                  <span style={{ fontWeight: item.unreadCount ? 700 : 400 }}>
                    {item.shopName}
                    {item.unreadCount > 0 && (
                      <span
                        style={{
                          marginLeft: 6,
                          background: '#f53d2d',
                          borderRadius: 8,
                          padding: '0 6px',
                          color: '#fff',
                          fontSize: 12,
                        }}
                      >
                        {item.unreadCount}
                      </span>
                    )}
                  </span>
                }
                description={
                  item.messages[item.messages.length - 1]?.content ?? '—'
                }
              />
            </List.Item>
          )}
        />
      </div>

      {/* Chat content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div
          style={{
            height: 56,
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: '0 16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar src={current?.avatarUrl} />
            <Text strong style={{ fontSize: 16 }}>
              {current?.shopName}
            </Text>
          </div>
          <Button onClick={onClose}>Đóng</Button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          style={{ flex: 1, padding: 16, overflowY: 'auto' }}
        >
          {current?.messages.map((m) => (
            <div
              key={m.id}
              style={{
                display: 'flex',
                justifyContent: m.fromShop ? 'flex-start' : 'flex-end',
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  background: m.fromShop ? '#f0f0f0' : '#f53d2d',
                  color: m.fromShop ? 'black' : 'white',
                  padding: '8px 12px',
                  borderRadius: 16,
                  maxWidth: '70%',
                  fontSize: 13,
                }}
              >
                {m.content}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            position: 'relative',
            padding: 16,
            borderTop: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'flex-end',
            gap: 8,
          }}
        >
          {/* Vùng nhập + icon bên phải */}
          <div
            style={{
              position: 'relative',
              flex: 1,
              display: 'flex',
              border: '1px solid #d9d9d9',
              borderRadius: 20,
              padding: '4px 8px',
              background: '#fff',
            }}
          >
            {/* Ô nhập */}
            <textarea
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Nhập tin nhắn…"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (!newMsg.trim()) return;
                  sendNewMessage(newMsg.trim());
                  setNewMsg('');
                }
              }}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                resize: 'none',
                minHeight: 40,
                fontSize: 14,
                lineHeight: '1.5',
              }}
            />

            {/* Cột icon bên phải trong input */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 0,
                paddingLeft: 4,
              }}
            >
              {/* Icon ảnh */}
              <Upload
                showUploadList={false}
                accept="image/*"
                beforeUpload={(file) => {
                  uploadImageToCloudinary(file);
                  return false;
                }}
              >
                <Button
                  icon={<PaperClipOutlined />}
                  type="text"
                  style={{ padding: 0 }}
                />
              </Upload>

              {/* Icon emoji */}
              <Button
                icon={<SmileOutlined />}
                type="text"
                onClick={() => setShowEmoji(!showEmoji)}
                style={{ padding: 0 }}
              />
            </div>
          </div>

          {/* Nút gửi */}
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={() => {
              if (!newMsg.trim()) return;
              sendNewMessage(newMsg.trim());
              setNewMsg('');
            }}
          />

          {/* Emoji picker */}
          {showEmoji && (
            <div
              style={{
                position: 'absolute',
                bottom: 80,
                right: 70,
                zIndex: 9999,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              <EmojiPicker
                onEmojiClick={(emojiData) => {
                  setNewMsg((prev) => prev + emojiData.emoji);
                  setShowEmoji(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
