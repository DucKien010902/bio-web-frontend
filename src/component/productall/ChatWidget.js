import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import ChatDrawer from './ChatDrawer';
import ChatPanel from './ChatDrawer';

const ChatWidget = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Button
        type="primary"
        shape="circle"
        icon={<MessageOutlined />}
        size="large"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        }}
        onClick={() => setChatOpen(true)}
      />

      <ChatPanel
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        // shopInfo={shopInfo}
      />
    </>
  );
};

export default ChatWidget;
