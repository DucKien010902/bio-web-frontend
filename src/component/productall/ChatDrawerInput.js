// ChatInput.jsx
import React from 'react';
import { Input, Button } from 'antd';

const ChatInput = React.memo(({ value, onChange, onSend }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        padding: 16,
        borderTop: '1px solid #f0f0f0',
      }}
    >
      <Input.TextArea
        autoSize={{ minRows: 1, maxRows: 4 }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Nhập tin nhắn…"
        onPressEnter={(e) => {
          if (!e.shiftKey) {
            e.preventDefault();
            if (!value.trim()) return;
            onSend();
          }
        }}
      />
      <Button
        type="primary"
        onClick={() => {
          if (!value.trim()) return;
          onSend();
        }}
      >
        Gửi
      </Button>
    </div>
  );
});

export default ChatInput;
