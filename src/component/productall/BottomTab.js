// src/components/BottomTabBar.jsx
import React from 'react';
import { useLocation, useNavigate, matchPath } from 'react-router-dom';
import {
  HomeOutlined,
  MedicineBoxOutlined,
  AppleOutlined,
  UserOutlined,
} from '@ant-design/icons';
const tabItems = [
  { label: 'Trang chủ', icon: <HomeOutlined />, path: '/' },
  {
    label: 'Xét nghiệm',
    icon: <MedicineBoxOutlined />,
    path: '/mainbio',
  },
  { label: 'Tin tức', icon: <AppleOutlined />, path: '/notification' },
  { label: 'Tài khoản', icon: <UserOutlined />, path: '/product/profile' },
];

const BottomTabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /** Hàm xác định tab active chính xác  */
  const isActiveTab = (path) => {
    // Trang chủ: phải khớp tuyệt đối
    if (path === '/') return location.pathname === '/';

    // Các tab khác: so khớp tiền tố
    return matchPath({ path, end: false }, location.pathname) !== null;
  };

  return (
    <div
      className="bottom-tab"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        borderTop: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 56,
        zIndex: 1000,
      }}
    >
      {tabItems.map((item) => {
        const active = isActiveTab(item.path);
        return (
          <div
            key={item.path}
            onClick={() => {
              const user = JSON.parse(localStorage.getItem('user'));
              if (item.path === '/product/profile' && !user) {
                navigate('/login');
              } else {
                navigate(item.path);
              }
            }}
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 12,
              color: active ? '#ee4d2d' : '#888',
              userSelect: 'none',
              cursor: 'pointer',
              padding: '6px 0',
            }}
          >
            <div style={{ fontSize: 20 }}>{item.icon}</div>
            {item.label}
          </div>
        );
      })}
    </div>
  );
};

export default BottomTabBar;
