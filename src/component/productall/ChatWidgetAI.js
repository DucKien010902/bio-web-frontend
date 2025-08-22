import { Button, Tooltip } from 'antd';
import { useState } from 'react';
import { MdContactSupport, MdPhone } from 'react-icons/md'; // thêm icon gọi điện
import ChatDrawer from './ChatDrawerAI';

const ChatWidgetAI = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {/* Nút gọi điện */}
      <Tooltip title="Gọi hỗ trợ" placement="left">
        <Button
          type="primary"
          shape="circle"
          icon={<MdPhone style={{ fontSize: 30 }} />}
          size="large"
          style={{
            position: 'fixed',
            bottom: 150,
            right: 12,
            zIndex: 1000,
            backgroundColor: '#fff9efff',
            color: '#ff7b00ff',
            borderColor: '#ff0101ff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            width: 50,
            height: 50,
          }}
          onClick={() => {
            window.location.href = 'tel:19001000'; // bạn có thể thay số
          }}
        />
      </Tooltip>

      {/* Nút chat AI */}
      <Tooltip title="Chat AI" placement="left">
        <Button
          type="primary"
          shape="circle"
          icon={<MdContactSupport style={{ fontSize: 30 }} />}
          size="large"
          style={{
            position: 'fixed',
            bottom: 90,
            right: 12,
            zIndex: 1000,
            backgroundColor: '#e0f9ffff',
            color: '#1da1f2',
            borderColor: '#1da1f2',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            width: 50,
            height: 50,
          }}
          onClick={() => setChatOpen(true)}
        />
      </Tooltip>

      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
};

export default ChatWidgetAI;
