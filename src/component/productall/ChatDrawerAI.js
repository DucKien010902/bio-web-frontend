// src/components/ChatDrawerAI.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Drawer, Input, Button } from 'antd';
import './ChatDrawerAI.css'; // 👈 Thêm file CSS riêng nếu có

const ChatDrawerAI = ({ open, onClose }) => {
  const [newMsg, setNewMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const askQuestion1 = async (question) => {
    try {
      const response = await fetch(
        // 'https://rationally-pleased-antelope.ngrok-free.app/webhook/ai-train-GPT',
        'https://rationally-pleased-antelope.ngrok-free.app/webhook/ai-blog',
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

  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    const userMessage = {
      id: Date.now(),
      fromUser: true,
      content: newMsg.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMsg('');
    setLoading(true);

    const reply = await askQuestion1(userMessage.content);

    const aiMessage = {
      id: Date.now() + 1,
      fromUser: false,
      content: reply,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const renderLine = (line, index) => {
    // Regex cho markdown link dạng: [text](url)
    const markdownLinkRegex =
      /\[([^\]]+)\]\((https:\/\/genapp\.vn\/mainbio\/dat-lich-xet-nghiem)\)/g;

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = markdownLinkRegex.exec(line)) !== null) {
      const [fullMatch, text, url] = match;
      const start = match.index;

      // Thêm đoạn trước link
      if (start > lastIndex) {
        parts.push(
          <span key={`${index}-text-${start}`}>
            {line.slice(lastIndex, start)}
          </span>
        );
      }

      // Thêm thẻ <a>
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
    if (parts.length === 0) {
      return <span key={index}>{line}</span>;
    }

    return <>{parts}</>;
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      width={700}
      destroyOnClose
      title="Chat với AI"
      bodyStyle={{ display: 'flex', flexDirection: 'column', padding: 0 }}
    >
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
            }}
          >
            <div
              style={{
                background: m.fromUser ? '#1677ff' : '#f0f0f0',
                color: m.fromUser ? '#fff' : '#000',
                padding: '8px 12px',
                borderRadius: 16,
                maxWidth: '70%',
                whiteSpace: 'pre-wrap',
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

      <div
        style={{
          padding: 16,
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
              sendMessage();
            }
          }}
        />
        <Button type="primary" onClick={sendMessage} disabled={loading}>
          Gửi
        </Button>
      </div>
    </Drawer>
  );
};

export default ChatDrawerAI;
