import { DashboardOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Divider, Layout, Menu } from 'antd';
import { useState } from 'react';
import { BiClinic } from 'react-icons/bi';
import { GiShop } from 'react-icons/gi';
import { GrDocumentTest } from 'react-icons/gr';
import { IoIosPeople } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import ShopManagementPage from './admin-allshop';
import AdminApproveSuggestions from './admin-approve';
import CategoryManager from './admin-category';
import AdminClinics from './admin-clinic';
import AdminTestPackages from './admin-service';
import CoordinatorsList from './coordinators';

const { Header, Sider, Content } = Layout;

const Dashboard = () => <h2>Trang chính</h2>;

const AdminLayout = () => {
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (selectedKey) {
      case 'dashboard':
        return <Dashboard />;
      case 'clinics':
        return <AdminClinics />;
      case 'services':
        return <AdminTestPackages />;
      case 'shops':
        return <ShopManagementPage />;
      case 'categories':
        return <CategoryManager />;
      case 'coordinator':
        return <CoordinatorsList />;
      case 'approve':
        return <AdminApproveSuggestions />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar cố định */}
      <Sider
        collapsible
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Logo + Admin */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: 16,
            color: 'white',
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          <img
            src="/logo192.png"
            alt="logo"
            style={{ width: 32, height: 32 }}
          />
          Admin
        </div>

        <Divider
          style={{ margin: '8px 0', backgroundColor: 'rgba(255,255,255,0.2)' }}
        />

        {/* Menu chiếm phần giữa */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
          style={{ flex: 1 }}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="clinics" icon={<BiClinic />}>
            Phòng khám
          </Menu.Item>
          <Menu.Item key="services" icon={<GrDocumentTest />}>
            Dịch vụ
          </Menu.Item>
          <Menu.Item key="coordinator" icon={<IoIosPeople />}>
            Điều phối viên
          </Menu.Item>
          <Menu.Item key="shops" icon={<GiShop />}>
            Tất cả Shop
          </Menu.Item>
          <Menu.Item key="categories" icon={<GiShop />}>
            Quản lý danh mục hệ thống
          </Menu.Item>
          <Menu.Item key="approve" icon={<GiShop />}>
            Phê duyệt
          </Menu.Item>
        </Menu>

        <Divider
          style={{ margin: '8px 0', backgroundColor: 'rgba(255,255,255,0.2)' }}
        />

        {/* Nút đăng xuất luôn ở đáy */}
        <div style={{ padding: 10 }}>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            block
            onClick={() => {
              localStorage.removeItem('user');
              navigate('/login');
            }}
          >
            Đăng xuất
          </Button>
        </div>
      </Sider>

      {/* Nội dung có margin-left bằng width sidebar */}
      <Layout style={{ marginLeft: 200 }}>
        <Header
          style={{
            background: '#fff',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              margin: 0,
              color: '#1890ff',
              fontFamily: 'cursive',
              fontSize: 40,
              textAlign: 'center',
            }}
          >
            GennovaX
          </h1>
        </Header>

        <Content
          style={{
            margin: '16px',
            padding: 24,
            background: '#fff',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
