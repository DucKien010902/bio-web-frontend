// src/components/ChatPanelMobile.jsx
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

const { Text } = Typography;

const ChatPanelMobile = ({ open, onClose, shopInfo }) => {
  /* ─────────── Refs ─────────── */
  const scrollRef = useRef(null);
  const socketRef = useRef(null);
  const hasLoadedRef = useRef(false);

  /* ─────────── State ─────────── */
  const [newMsg, setNewMsg] = useState('');
  const [chats, setChats] = useState([]);
  const [currentShopId, setCurrentShopId] = useState(null);
  const [viewingChat, setViewingChat] = useState(false);

  /* ─────────── Helpers ─────────── */
  const sender = useMemo(() => JSON.parse(localStorage.getItem('user')), []);

  const sortedChats = useMemo(() => {
    const lastTs = (c) =>
      c.messages.length
        ? dayjs(c.messages[c.messages.length - 1].timestamp).valueOf()
        : 0;
    return [...chats].sort((a, b) => lastTs(b) - lastTs(a));
  }, [chats]);

  const current = useMemo(
    () => chats.find((c) => c.shopId === currentShopId),
    [chats, currentShopId]
  );

  const ensureChatExists = useCallback(
    (list) => {
      if (!shopInfo) return list;
      return list.some((c) => c.shopId === shopInfo.shopID)
        ? list
        : [
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

  /* ─────────── Socket & API ─────────── */
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
        const next = [...prev];

        if (idx !== -1) {
          const room = next[idx];
          next[idx] = {
            ...room,
            messages: [...room.messages, formatted],
            unreadCount:
              shopId === currentShopId
                ? room.unreadCount
                : room.unreadCount + 1,
          };
        } else {
          next.unshift({
            shopId,
            shopName: msg.sender.shopName,
            avatarUrl: msg.sender.avatarUrl || 'https://i.pravatar.cc/60',
            messages: [formatted],
            unreadCount: 1,
          });
        }
        return next;
      });
    },
    [currentShopId, sender?.phoneNumber]
  );

  const fetchAllMessages = useCallback(async () => {
    if (!sender?.phoneNumber) return;
    try {
      const { data } = await axiosClient.get(
        `/chat/getAllMessageByUser?customerID=${sender.phoneNumber}`
      );
      const mapped = (data ?? []).map((chat) => ({
        shopId: chat.members.shop.shopID,
        shopName: chat.members.shop.shopName,
        avatarUrl: chat.members.shop.avatarUrl || 'https://i.pravatar.cc/60',
        messages: chat.messages,
        unreadCount: 0,
      }));
      setChats(ensureChatExists(mapped));
    } catch (e) {
      console.error('Không thể lấy chat', e);
      setChats(ensureChatExists([]));
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

  /* ─────────── Effects ─────────── */
  useEffect(() => {
    if (open && shopInfo?.shopID) {
      setViewingChat(true);
    }
  }, [open, shopInfo?.shopID]);

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
      fetchAllMessages();
      hasLoadedRef.current = true;
    }
  }, [open, fetchAllMessages]);

  useEffect(() => {
    if (shopInfo?.shopID && open) {
      setChats((prev) => ensureChatExists(prev));
      if (!currentShopId) setCurrentShopId(shopInfo.shopID);
    }
  }, [shopInfo?.shopID, open, ensureChatExists, currentShopId]);

  /* auto-scroll */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      setTimeout(() => {
        el.scrollTo({
          top: el.scrollHeight,
          behavior: 'smooth',
        });
      }, 100);
    }
  }, [viewingChat, current?.messages?.length]);

  /* first room */
  useEffect(() => {
    if (!currentShopId && chats.length) setCurrentShopId(chats[0].shopId);
  }, [chats, currentShopId]);

  /* ─────────── Render ─────────── */
  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#fff',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Danh sách chat */}
      {!viewingChat && !shopInfo?.shopID && (
        <>
          {/* Header */}
          <div
            style={{
              height: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #f0f0f0',
              padding: '0 16px',
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Chat
            <Button type="text" onClick={onClose}>
              Đóng
            </Button>
          </div>

          {/* List */}
          <List
            dataSource={sortedChats}
            style={{ flex: 1, overflowY: 'auto' }}
            renderItem={(item) => (
              <List.Item
                style={{ paddingLeft: 16 }}
                onClick={() => {
                  setCurrentShopId(item.shopId);
                  setViewingChat(true);
                }}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatarUrl} />}
                  title={
                    <span style={{ fontWeight: item.unreadCount ? 700 : 400 }}>
                      {item.shopName}
                      {!!item.unreadCount && (
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
        </>
      )}

      {/* Màn hình chat */}
      {viewingChat && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            background: '#fff',
          }}
        >
          {/* Header chat */}
          <div
            style={{
              height: 56,
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #f0f0f0',
              padding: '0 16px',
              justifyContent: 'space-between',
            }}
          >
            {!shopInfo?.shopID && (
              <Button type="text" onClick={() => setViewingChat(false)}>
                ←
              </Button>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar src={current?.avatarUrl} />
              <Text strong>{current?.shopName}</Text>
            </div>
            <Button type="text" onClick={onClose}>
              Đóng
            </Button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div
                ref={scrollRef}
                style={{
                  height: '100%',
                  overflowY: 'auto',
                  padding: 16,
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {current?.messages
                  .sort(
                    (a, b) =>
                      dayjs(a.timestamp).valueOf() -
                      dayjs(b.timestamp).valueOf()
                  )
                  .map((m) => (
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
                          color: m.fromShop ? '#000' : '#fff',
                          padding: '8px 12px',
                          borderRadius: 16,
                          maxWidth: '80%',
                          fontSize: 13,
                          wordBreak: 'break-word',
                        }}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Input */}
          <div
            style={{
              padding: 12,
              borderTop: '1px solid #f0f0f0',
              display: 'flex',
              gap: 8,
            }}
          >
            <Input.TextArea
              autoSize={{ minRows: 1, maxRows: 4 }}
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Nhập tin nhắn…"
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  if (!newMsg.trim()) return;
                  sendNewMessage(newMsg.trim());
                  setNewMsg('');
                }
              }}
            />
            <Button
              type="primary"
              onClick={() => {
                if (!newMsg.trim()) return;
                sendNewMessage(newMsg.trim());
                setNewMsg('');
              }}
            >
              Gửi
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPanelMobile;
