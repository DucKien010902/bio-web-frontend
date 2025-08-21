import {
  FileTextOutlined,
  NotificationOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Empty, Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation, useNavigate } from 'react-router-dom';
import PatientRecordForm from './history';
import MedicalTickets from './medicalTicket';
import Notifications from './notification';
const { Sider, Content } = Layout;

const UserDashboard = () => {
  const isMobile = useMediaQuery({ maxWidth: 797 });
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const user = JSON.parse(localStorage.getItem('user'));
  const [selectedKey, setSelectedKey] = useState('');
  const location = useLocation();
  const firstKey = location.state?.key;
  const searchParams = new URLSearchParams(location.search);
  const key = searchParams.get('key');
  const navigate = useNavigate();
  const renderContent = () => {
    switch (selectedKey) {
      case 'history':
        return <PatientRecordForm />;
      case 'tickets':
        return <MedicalTickets />;
      case 'notifications':
        return <Notifications />;
      default:
        return <Empty />;
    }
  };
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, []);
  useEffect(() => {
    if (firstKey) {
      setSelectedKey(firstKey);
    }
  }, [firstKey]);
  useEffect(() => {
    if (key) {
      setSelectedKey(key);
    }
  }, [key]);
  if (!user) {
    return null;
  }
  const DesktopLayout = () => {
    return (
      <Layout
        style={{
          minHeight: '100vh',
          padding: 50,
          paddingLeft: 100,
          paddingTop: 30,
        }}
      >
        <Sider
          breakpoint="lg"
          width={'20%'}
          collapsedWidth="0"
          style={{
            background: '#f5f5f5',
            borderRight: '1px solid #f0f0f0',
            paddingTop: 32,
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={(e) => setSelectedKey(e.key)}
            style={{ backgroundColor: '#f5f5f5' }}
          >
            <Menu.Item
              key="history"
              icon={<ProfileOutlined style={{ fontSize: 20 }} />}
              style={{
                fontSize: 16,
                fontWeight: 600,
                height: 60,
                borderLeft:
                  selectedKey === 'history'
                    ? '4px solid #1890ff'
                    : '4px solid transparent',
                backgroundColor:
                  selectedKey === 'history' ? '#e6f7ff' : 'transparent',
              }}
            >
              Hồ sơ bệnh nhân
            </Menu.Item>
            <Menu.Item
              key="tickets"
              icon={<FileTextOutlined style={{ fontSize: 20 }} />}
              style={{
                fontSize: 16,
                fontWeight: 600,
                height: 60,
                borderLeft:
                  selectedKey === 'tickets'
                    ? '4px solid #1890ff'
                    : '4px solid transparent',
                backgroundColor:
                  selectedKey === 'tickets' ? '#e6f7ff' : 'transparent',
              }}
            >
              Phiếu xét nghiệm
            </Menu.Item>
            <Menu.Item
              key="notifications"
              icon={<NotificationOutlined style={{ fontSize: 20 }} />}
              style={{
                fontSize: 16,
                fontWeight: 600,
                height: 60,
                borderLeft:
                  selectedKey === 'notifications'
                    ? '4px solid #1890ff'
                    : '4px solid transparent',
                backgroundColor:
                  selectedKey === 'notifications' ? '#e6f7ff' : 'transparent',
              }}
            >
              Thông báo
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Content
            style={{
              margin: '24px',
              padding: 24,
              background: '#f5f5f5',
              paddingTop: 0,
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    );
  };
  const MobileLayout = () => {
    return (
      <Layout style={{ minHeight: '100vh', background: '#ffffff' }}>
        <Content style={{ padding: '16px' }}>{renderContent()}</Content>
      </Layout>
    );
  };

  return (
    <div>
      {isDesktop && <DesktopLayout />}
      {isMobile && <MobileLayout />}
    </div>
  );
};

export default UserDashboard;
