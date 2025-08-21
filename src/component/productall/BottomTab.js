// src/components/BottomTabBar.jsx
import {
  CalendarOutlined,
  DiffOutlined,
  MedicineBoxOutlined,
  ProductOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
const tabItems = [
  {
    label: 'Trang chủ',
    icon: <MedicineBoxOutlined />,
    path: '/y-te',
  },
  {
    label: 'Đặt lịch',
    icon: <CalendarOutlined />,
    path: '/y-te/dat-lich-xet-nghiem',
  },
  { label: 'Kết quả', icon: <DiffOutlined />, path: '/y-te/tai-khoan' },
  { label: 'Sản phẩm', icon: <ProductOutlined />, path: '/san-pham/trang-chu' },
  { label: 'Tài khoản', icon: <UserOutlined />, path: '/san-pham/tai-khoan' },
];

const BottomTabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /** Hàm xác định tab active chính xác  */
  const isActiveTab = (path) => {
    return location.pathname === path;
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
              if (
                (item.path === '/san-pham/tai-khoan' ||
                  item.path === '/y-te/tai-khoan') &&
                !user
              ) {
                navigate('/login');
              } else {
                if (item.path === '/y-te/tai-khoan') {
                  navigate(item.path, { state: { key: 'tickets' } });
                } else {
                  navigate(item.path);
                }
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
