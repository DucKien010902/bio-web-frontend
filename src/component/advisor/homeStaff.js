import {
  CalendarOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeBookingPage from './bookingCalendar';
const { Header, Sider, Content } = Layout;

const Dashboard = () => <h2>Trang chính</h2>;
const Users = () => <h2>Quản lý người dùng</h2>;
const Settings = () => <h2>Cài đặt</h2>;

const StaffLayout = () => {
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const navigate = useNavigate();
  const renderContent = () => {
    switch (selectedKey) {
      case 'dashboard':
        return <Dashboard />;
      case 'bookings':
        return <EmployeeBookingPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div style={{ color: 'white', padding: 16, fontSize: 18 }}>
          Tư vấn viên
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="bookings" icon={<CalendarOutlined />}>
            Lịch đặt xét nghiệm
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <h1
            style={{
              margin: '0 16px',
              color: '#1890ff',
              fontFamily: 'cursive',
              fontSize: 40,
              textAlign: 'center',
            }}
          >
            GennovaX
            {
              <LogoutOutlined
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: '#ff4d4f',
                  position: 'fixed',
                  right: 50,
                  top: 20,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  localStorage.removeItem('user');
                  navigate('/login');
                }}
              />
            }
          </h1>
        </Header>
        <Content style={{ margin: '16px', padding: 24, background: '#fff' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default StaffLayout;
