import React, { useState } from 'react';
import { Drawer, Button, Tooltip } from 'antd';
import { MessageOutlined, FacebookOutlined } from '@ant-design/icons';
import { SiZalo } from 'react-icons/si';
import { FaFacebookMessenger } from 'react-icons/fa';
import ChatPanel from './ChatDrawer';
import { useLocation, useNavigate } from 'react-router-dom';

const ChatWidget = () => {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  return (
    <>
      {isHomepage && (
        <>
          <div
            onClick={() => {
              window.open('https://zalo.me/0353570822', '_blank');
            }}
            style={{
              position: 'fixed',
              bottom: 120,
              right: 12,
              zIndex: 1000,
              // width: 48,
              // height: 48,
              borderRadius: '50%',
              backgroundColor: '#0084ff',
              boxShadow: '0 0 10px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 48 48"
            >
              <path
                fill="#2962ff"
                d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10	c4.722,0,8.883-2.348,11.417-5.931V36H15z"
              ></path>
              <path
                fill="#eee"
                d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19	c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742	c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083	C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"
              ></path>
              <path
                fill="#2962ff"
                d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75	S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"
              ></path>
              <path
                fill="#2962ff"
                d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z"
              ></path>
              <path
                fill="#2962ff"
                d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75	S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5	c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"
              ></path>
              <path
                fill="#2962ff"
                d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5	c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"
              ></path>
            </svg>
          </div>
          <div
            onClick={() => {
              window.open('https://m.me/632473236609351', '_blank');
            }}
            style={{
              position: 'fixed',
              bottom: 72,
              right: 12,
              zIndex: 1000,
              // width: 48,
              // height: 48,
              borderRadius: '50%',
              backgroundColor: '#0084ff',
              boxShadow: '0 0 10px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 48 48"
            >
              <path
                fill="#448AFF"
                d="M24,4C13.5,4,5,12.1,5,22c0,5.2,2.3,9.8,6,13.1V44l7.8-4.7c1.6,0.4,3.4,0.7,5.2,0.7c10.5,0,19-8.1,19-18C43,12.1,34.5,4,24,4z"
              ></path>
              <path
                fill="#FFF"
                d="M12 28L22 17 27 22 36 17 26 28 21 23z"
              ></path>
            </svg>
          </div>
        </>
      )}
      {/* </Tooltip> */}

      {/* Nút chat nội bộ */}
      <Tooltip title="Chat nội bộ" placement="left">
        <Button
          type="primary"
          shape="circle"
          icon={<MessageOutlined />}
          size="large"
          style={{
            position: 'fixed',
            bottom: 24,
            right: 12,
            zIndex: 1000,
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          }}
          onClick={() => {
            if (!user) {
              navigate('/login');
            } else {
              setChatOpen(true);
            }
          }}
        />
      </Tooltip>

      {/* Drawer chat nội bộ */}
      <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
};

export default ChatWidget;
