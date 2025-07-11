// src/components/ShopChatPanel.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { List, Avatar, Input, Button, Typography } from 'antd';
import dayjs from 'dayjs';
import axiosClient from '../../api/apiConfig';
import { io, Socket } from 'socket.io-client';

const { Text } = Typography;

const ShopChatPanel = ({ height = '100%' }) => {
  // Thêm trên đầu
  const shopInfo = JSON.parse(localStorage.getItem('shopInfo'));
  const [newMsg, setNewMsg] = useState('');
  const [convs, setConvs] = useState([]); // toàn bộ hội thoại (mỗi customer)
  const [currentCusId, setCurrentCusId] = useState(null); // phoneNumber của KH đang xem
  const scrollRef = useRef(null);
  const socketRef = useRef(null);

  // Khởi tạo socket & listener
  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_API_URL);

    const handleBackMessage = (msg) => addIncomingMessage(msg);
    socketRef.current.on('backmessage', handleBackMessage);

    return () => {
      socketRef.current.off('backmessage', handleBackMessage);
      socketRef.current.disconnect();
    };
  }, []);

  const addIncomingMessage = useCallback(
    (msg) => {
      const customerId = msg.sender.senderID;
      const formatted = {
        id: Date.now(),
        fromShop: false,
        content: msg.content,
        timestamp: new Date().toISOString(),
      };

      setConvs((prev) => {
        const idx = prev.findIndex((c) => c.customerId === customerId);
        const updated = [...prev];

        if (idx !== -1) {
          const room = updated[idx];
          updated[idx] = {
            ...room,
            messages: [...room.messages, formatted],
            unreadCount:
              customerId === currentCusId
                ? room.unreadCount
                : room.unreadCount + 1,
          };
        } else {
          updated.unshift({
            customerId,
            customerName: msg.sender.userName || customerId,
            avatarUrl: msg.sender.avatarUrl || 'https://i.pravatar.cc/60',
            messages: [formatted],
            unreadCount: 1,
          });
        }
        return updated;
      });
    },
    [currentCusId]
  );

  /* ------------------------------------------------------------------ */
  /*  STATE                                                             */
  /* ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------ */
  /*  HELPER                                                            */
  /* ------------------------------------------------------------------ */
  /** Lấy time của tin nhắn cuối */
  const getLastTs = (c) =>
    c.messages.length
      ? dayjs(c.messages[c.messages.length - 1].timestamp).valueOf()
      : 0;

  /** Nếu KH chưa từng chat thì tạo phòng trống */
  const ensureConvExists = useCallback(
    (list, cusPhone, cusName = 'Khách mới', cusAvatar = '') => {
      if (!cusPhone) return list;
      const found = list.find((c) => c.customerId === cusPhone);
      if (found) return list;

      return [
        {
          customerId: cusPhone,
          customerName: cusName,
          avatarUrl: cusAvatar || 'https://i.pravatar.cc/60',
          messages: [],
          unreadCount: 0,
        },
        ...list,
      ];
    },
    []
  );

  const sortedConvs = [...convs].sort((a, b) => getLastTs(b) - getLastTs(a));
  const current = convs.find((c) => c.customerId === currentCusId);

  /* ------------------------------------------------------------------ */
  /*  API                                                               */
  /* ------------------------------------------------------------------ */
  /** Lấy tất cả hội thoại của shop */
  const fetchConvs = async () => {
    console.log(shopInfo.shopID);
    if (!shopInfo?.shopID) return;
    try {
      const res = await axiosClient.get(
        `/chat/getAllMessageByShop?shopID=${shopInfo.shopID}`
      );
      console.log(res.data);
      const data = (res.data ?? []).map((conv) => ({
        customerId: conv.members.customer?.userID,
        customerName:
          conv.members.customer?.userName || conv.members.customer.phoneNumber,
        avatarUrl:
          conv.members.customer.avatarUrl || 'https://i.pravatar.cc/60',
        messages: conv.messages,
        unreadCount: 0,
      }));
      setConvs(data);
      // auto chọn hội thoại đầu tiên
      if (data.length && !currentCusId) setCurrentCusId(data[0].customerId);
    } catch (err) {
      console.error('Fetch conversations failed', err);
    }
  };

  /** Gửi tin nhắn mới */
  const sendMessage = async (content) => {
    console.log(content);
    console.log(currentCusId, shopInfo);
    if (!currentCusId || !shopInfo) return;

    const payload = {
      id: Date.now(),
      fromShop: true,
      content,
      timestamp: new Date().toISOString(),
    };

    // update UI optimistically
    setConvs((prev) =>
      prev.map((c) =>
        c.customerId === currentCusId
          ? { ...c, messages: [...c.messages, payload] }
          : c
      )
    );
    socketRef.current.emit('sendmessage', {
      // ✅ ĐÚNG – dùng instance đã kết nối
      sender: {
        senderID: shopInfo.shopID,
        shopName: shopInfo.shopName,
        avatarUrl: shopInfo.avatarUrl,
      },
      receiver: {
        receiverID: currentCusId,
      },
      content,
      fromShop: true,
    });
    try {
      await axiosClient.post('/chat/sendmessage', {
        sender: {
          senderID: shopInfo.shopID,
          shopName: shopInfo.shopName,
          avatarUrl: shopInfo.avatarUrl,
        },
        receiver: {
          receiverID: currentCusId,
        },
        content,
        fromShop: true,
      });
    } catch (err) {
      console.error('Send message error', err);
      // rollback UI nếu cần
    }
  };

  /* ------------------------------------------------------------------ */
  /*  EFFECTS                                                           */
  /* ------------------------------------------------------------------ */
  // load lần đầu & khi shopInfo thay đổi
  useEffect(() => {
    fetchConvs();
  }, []);

  // auto-scroll khi có tin mới
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [current?.messages]);

  /* ------------------------------------------------------------------ */
  /*  RENDER                                                            */
  /* ------------------------------------------------------------------ */
  return (
    <div style={{ display: 'flex', height }}>
      {/* === SIDEBAR KHÁCH HÀNG === */}
      <div
        style={{
          width: 260,
          borderRight: '1px solid #f0f0f0',
          overflowY: 'auto',
        }}
      >
        <List
          header={<b>Khách hàng</b>}
          itemLayout="horizontal"
          dataSource={sortedConvs}
          renderItem={(item) => (
            <List.Item
              style={{
                cursor: 'pointer',
                background:
                  item.customerId === currentCusId ? '#fafafa' : undefined,
                paddingLeft: 16,
              }}
              onClick={() => setCurrentCusId(item.customerId)}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatarUrl} />}
                title={
                  <span style={{ fontWeight: item.unreadCount ? 700 : 400 }}>
                    {item.customerName}
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

      {/* === KHUNG CHAT === */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* HEADER – thông tin KH */}
        <div
          style={{
            height: 60,
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '0 20px',
          }}
        >
          <Avatar src={current?.avatarUrl} />
          <Text strong style={{ fontSize: 16 }}>
            {current?.customerName}
          </Text>
        </div>

        {/* NỘI DUNG TIN NHẮN */}
        <div
          ref={scrollRef}
          style={{ flex: 1, padding: 20, overflowY: 'auto' }}
        >
          {current?.messages.map((m) => (
            <div
              key={m.id}
              style={{
                display: 'flex',
                justifyContent: m.fromShop ? 'flex-end' : 'flex-start',
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  background: m.fromShop ? '#1677ff' : '#f0f0f0',
                  color: m.fromShop ? '#fff' : '#000',
                  padding: '8px 12px',
                  borderRadius: 16,
                  maxWidth: '70%',
                }}
              >
                {m.content}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            gap: 8,
            borderTop: '1px solid #f0f0f0',
            padding: 16,
          }}
        >
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 4 }}
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Trả lời khách hàng…"
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault(); // Ngăn xuống dòng
                if (!newMsg.trim()) return;
                sendMessage(newMsg.trim());
                setNewMsg('');
              }
            }}
          />
          <Button
            type="primary"
            onClick={() => {
              if (!newMsg.trim()) return;
              sendMessage(newMsg.trim());
              setNewMsg('');
            }}
          >
            Gửi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopChatPanel;
