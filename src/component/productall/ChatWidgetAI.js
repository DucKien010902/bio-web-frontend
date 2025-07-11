import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import { MdContactSupport } from 'react-icons/md';
import ChatDrawer from './ChatDrawerAI';

const ChatWidgetAI = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Button
        type="default"
        icon={<MdContactSupport style={{ fontSize: 20 }} />}
        size="large"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          backgroundColor: '#ffe0f0', // nền hồng nhạt
          color: '#d63384', // màu chữ hồng đậm
          borderColor: '#f8c2d3',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontWeight: 'bold',
        }}
        onClick={() => setChatOpen(true)}
      >
        Chat AI
      </Button>

      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
};

export default ChatWidgetAI;
