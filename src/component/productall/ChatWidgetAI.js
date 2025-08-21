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
            backgroundColor: '#e0f7fa',
            color: '#00796b',
            borderColor: '#4dd0e1',
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
            backgroundColor: '#ffe0f0',
            color: '#d63384',
            borderColor: '#f45c8cff',
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
