import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  LogoutOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ShopDetail from './shopInfo';
import ProductList from './shopProducts';
import axiosClient from '../../api/apiConfig';
import VoucherTable from './shopVoucher';
import ShopMessages from './shopMessages';

const { Header, Sider, Content } = Layout;

const Dashboard = () => <h2>Trang chính</h2>;

const ShopLayout = () => {
  const [shopInfo, setShopInfo] = useState({});
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const phoneNumber = JSON.parse(localStorage.getItem('user'))?.phoneNumber;
  const navigate = useNavigate();

  const fetchShopInfo = async () => {
    try {
      const res = await axiosClient.get(
        `/shop/fetchShopInfoByPhoneNumber?phoneNumber=${phoneNumber}`
      );
      setShopInfo(res.data);
      localStorage.setItem('shopInfo', JSON.stringify(res.data));
    } catch (error) {
      console.error('Không lấy được thông tin shop:', error);
    }
  };

  const updateOnlineStatus = async (status) => {
    try {
      await axiosClient.post('/shop/updateOnlineStatus', {
        phoneNumber,
        isOnline: status,
        lastActive: status ? null : new Date(),
      });
    } catch (err) {
      console.error('Cập nhật trạng thái online thất bại:', err);
    }
  };

  useEffect(() => {
    fetchShopInfo();
    updateOnlineStatus(true);

    const handleUnload = () => {
      const url = `${process.env.REACT_APP_API_URL}/shop/updateOnlineStatus`;
      const data = JSON.stringify({
        phoneNumber,
        isOnline: false,
        lastActive: new Date(),
      });

      const blob = new Blob([data], { type: 'application/json' });
      navigator.sendBeacon(url, blob);
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      updateOnlineStatus(false);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  const renderContent = () => {
    switch (selectedKey) {
      case 'dashboard':
        return <Dashboard />;
      case 'infos':
        return <ShopDetail />;
      case 'products':
        return <ProductList />;
      case 'vouchers':
        return <VoucherTable />;
      case 'messages':
        return <ShopMessages />;
      default:
        return <Dashboard />;
    }
  };

  const handleLogout = async () => {
    await updateOnlineStatus(false);
    localStorage.removeItem('user');
    localStorage.removeItem('shopInfo');
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div
          style={{
            color: 'white',
            padding: 16,
            fontSize: 18,
            fontFamily: 'cursive',
          }}
        >
          Shop
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
          <Menu.Item key="infos" icon={<CalendarOutlined />}>
            Thông tin Shop
          </Menu.Item>
          <Menu.Item key="products" icon={<CalendarOutlined />}>
            Danh sách sản phẩm
          </Menu.Item>
          <Menu.Item key="propose" icon={<CalendarOutlined />}>
            Đề xuất
          </Menu.Item>
          <Menu.Item key="vouchers" icon={<CalendarOutlined />}>
            Kho voucher
          </Menu.Item>
          <Menu.Item key="messages" icon={<CalendarOutlined />}>
            Hội thoại
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{ background: '#fff', padding: 0, position: 'relative' }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              position: 'relative',
            }}
          >
            <h1
              style={{
                margin: 0,
                color: '#1890ff',
                fontFamily: 'cursive',
                fontSize: 40,
                lineHeight: '64px',
              }}
            >
              {shopInfo.shopName}
            </h1>

            <LogoutOutlined
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#ff4d4f',
                position: 'absolute',
                right: 30,
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
              onClick={handleLogout}
            />
          </div>
        </Header>

        <Content style={{ margin: '16px', padding: 24, background: '#fff' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ShopLayout;
