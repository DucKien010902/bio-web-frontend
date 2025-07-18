import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { BiClinic } from 'react-icons/bi';
import { GrDocumentTest } from 'react-icons/gr';
import { IoIosPeople } from 'react-icons/io';
import { MdStorefront } from 'react-icons/md';
import { GiShop } from 'react-icons/gi';
import AdminClinics from './admin-clinic';
import AdminTestPackages from './admin-service';
import { useNavigate } from 'react-router-dom';
import CoordinatorsList from './coordinators';
import ShopManagementPage from './admin-allshop';
import CategoryManager from './admin-category';
import AdminApproveSuggestions from './admin-approve';
const { Header, Sider, Content } = Layout;

const Dashboard = () => <h2>Trang chính</h2>;
const Users = () => <h2>Quản lý người dùng</h2>;
const Settings = () => <h2>Cài đặt</h2>;

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
      <Sider collapsible>
        <div style={{ color: 'white', padding: 16, fontSize: 18 }}>
          Quản trị viên
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
          <Menu.Item key="clinics" icon={<BiClinic />}>
            Phòng khám
          </Menu.Item>
          <Menu.Item key="services" icon={<GrDocumentTest />}>
            Dịch vụ
          </Menu.Item>
          <Menu.Item key="coordinator" icon={<IoIosPeople />}>
            Điều phối viên
          </Menu.Item>
          {/* <Menu.Item key="biostore" icon={<MdStorefront />}>
            Kho thuyết bị
          </Menu.Item> */}
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

export default AdminLayout;
