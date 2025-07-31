// src/components/ChatDrawerAI.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Drawer, Input, Button, Avatar, Modal, List, Typography } from 'antd';
import { RobotOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './ChatDrawerAI.css';

const SESSION_KEY = 'chat_ai_messages';

const ChatDrawerAI = ({ open, onClose }) => {
  const [newMsg, setNewMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const scrollRef = useRef(null);

  const suggestedQuestions = [
    'Làm sao để đặt lịch xét nghiệm?',
    'Cơ sở xét nghiệm nào gần tôi nhất?',
    'Tổng quan về công ty của bạn?',
    'Các gói xét nghiệm NIPT?',
    'Các gói xét nghiệm ADN?',
    'Bạn có thể cung cấp những dịch vụ nào?',
    'Chi phí xét nghiệm tổng quát là bao nhiêu?',
    'Tôi có thể lấy mẫu tại nhà không?',
    'Có thể thanh toán bằng bảo hiểm y tế không?',
    'Xét nghiệm cần bao lâu để có kết quả?',
    'Trẻ em có thể làm xét nghiệm máu được không?',
    'Tôi có thể đặt lịch cho người thân không?',
    'Xét nghiệm có ảnh hưởng gì đến sức khỏe không?',
    'Làm sao để nhận kết quả xét nghiệm online?',
    'Có cần nhịn tiểu khi làm xét nghiệm nước tiểu không?',
    'Phòng xét nghiệm hoạt động vào cuối tuần không?',
    'Xét nghiệm định kỳ có phát hiện bệnh tiềm ẩn không?',
    'Tôi có thể chọn bác sĩ khi đặt lịch không?',
    'Lấy mẫu máu có đau không?',
    'Sau khi xét nghiệm có cần nghỉ ngơi không?',
  ];

  // Fetch từ API
  const askQuestion1 = async (question) => {
    try {
      const response = await fetch(
        'https://rationally-pleased-antelope.ngrok-free.app/webhook/ai-train-GPT',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: question,
            sessionId: '111',
          }),
        }
      );
      const data = await response.json();
      return data.output;
    } catch (error) {
      console.error('Lỗi:', error);
      return 'Đã có lỗi xảy ra.';
    }
  };

  // Gửi tin nhắn
  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    const userMessage = {
      id: Date.now(),
      fromUser: true,
      content: newMsg.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setNewMsg('');
    setLoading(true);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(updatedMessages));

    const reply = await askQuestion1(userMessage.content);

    const aiMessage = {
      id: Date.now() + 1,
      fromUser: false,
      content: reply,
      timestamp: new Date().toISOString(),
    };

    const finalMessages = [...updatedMessages, aiMessage];
    setMessages(finalMessages);
    setLoading(false);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(finalMessages));
  };

  // Load dữ liệu khi mở Drawer
  useEffect(() => {
    if (open) {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        const greeting = {
          id: Date.now(),
          fromUser: false,
          content:
            '👋 Xin chào, tôi là trợ lý AI của GenNovaX. Tôi có thể giúp bạn đặt lịch, tư vấn xét nghiệm và giải đáp các câu hỏi sức khỏe. Bạn cần hỗ trợ gì hôm nay?',
          timestamp: new Date().toISOString(),
        };
        setMessages([greeting]);
        sessionStorage.setItem(SESSION_KEY, JSON.stringify([greeting]));
      }
    }
  }, [open]);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Regex link render
  const renderLine = (line, index) => {
    const markdownLinkRegex =
      /\[([^\]]+)\]\((https:\/\/genapp\.vn\/y-te\/dat-lich-xet-nghiem)\)/g;

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = markdownLinkRegex.exec(line)) !== null) {
      const [fullMatch, text, url] = match;
      const start = match.index;

      if (start > lastIndex) {
        parts.push(
          <span key={`${index}-text-${start}`}>
            {line.slice(lastIndex, start)}
          </span>
        );
      }

      parts.push(
        <a
          key={`${index}-link-${start}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#1677ff',
            textDecoration: 'underline',
            wordBreak: 'break-word',
          }}
        >
          {text}
        </a>
      );

      lastIndex = start + fullMatch.length;
    }

    if (lastIndex < line.length) {
      parts.push(<span key={`${index}-rest`}>{line.slice(lastIndex)}</span>);
    }

    return parts.length ? <>{parts}</> : <span key={index}>{line}</span>;
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      width={700}
      destroyOnClose={false}
      title="Trò chuyện với AI"
      bodyStyle={{ display: 'flex', flexDirection: 'column', padding: 0 }}
    >
      {/* Modal gợi ý */}
      <Modal
        title="🧠 Chọn câu hỏi gợi ý"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <div style={{ maxHeight: 400, overflowY: 'auto', paddingRight: 8 }}>
          <List
            dataSource={suggestedQuestions}
            renderItem={(item) => (
              <div
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 0',
                  gap: 8,
                }}
                onClick={() => {
                  setNewMsg(item);
                  setModalOpen(false);
                }}
              >
                <QuestionCircleOutlined style={{ color: '#1677ff' }} />
                <Typography.Text>{item}</Typography.Text>
              </div>
            )}
          />
        </div>
      </Modal>

      {/* Vùng tin nhắn */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          padding: 16,
          overflowY: 'auto',
          background: '#fafafa',
        }}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              display: 'flex',
              justifyContent: m.fromUser ? 'flex-end' : 'flex-start',
              marginBottom: 8,
              alignItems: 'flex-start',
            }}
          >
            {!m.fromUser && (
              <Avatar src="https://png.pngtree.com/png-vector/20230225/ourmid/pngtree-smart-chatbot-cartoon-clipart-png-image_6620453.png" />
            )}
            <div
              style={{
                background: m.fromUser ? '#1677ff' : '#f0f0f0',
                color: m.fromUser ? '#fff' : '#000',
                padding: '8px 12px',
                borderRadius: 16,
                maxWidth: '70%',
                whiteSpace: 'pre-wrap',
                marginLeft: 5,
              }}
            >
              {m.content.split('\n').map((line, index) => (
                <div key={index}>{renderLine(line, index)}</div>
              ))}
            </div>
          </div>
        ))}
        {loading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginBottom: 8,
            }}
          >
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      {/* Nhập và gửi */}
      <div
        style={{
          padding: 16,
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div>
          <Button
            icon={<QuestionCircleOutlined />}
            style={{
              backgroundColor: '#1677ff',
              color: 'white',
              padding: '0 12px',
              height: 32,
              fontSize: 14,
              borderRadius: 6,
              border: 'none',
            }}
            onMouseEnter={() => setModalOpen(true)}
            // onMouseLeave={() => setModalOpen(false)}
          >
            Câu hỏi gợi ý
          </Button>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 4 }}
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Nhập tin nhắn…"
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button type="primary" onClick={sendMessage} disabled={loading}>
            Gửi
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default ChatDrawerAI;
