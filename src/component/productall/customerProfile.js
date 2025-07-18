import React, { useState } from 'react';
import { Layout, Menu, Avatar, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ProfileContent from './customerProfileInfo';
import OrdersContent from './customerProfileOrder';
import AllProductHeader from './AllProductHeader';
import AllProductFooter from './AllProductFooter';
import { FaClipboardList } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { GrNotification } from 'react-icons/gr';
import { SlEnvolopeLetter } from 'react-icons/sl';
import { MdHome } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import VoucherListUser from './customerProfileVoucher';
import ProfilePage from './userprofile';
import { useMediaQuery } from 'react-responsive';

const { Content, Sider } = Layout;

const ShopeeProfile = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const [selectedKey, setSelectedKey] = useState('1');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <ProfileContent />;
      case '2':
        return <OrdersContent />;
      case '3':
        return <div>Chức năng đang được phát triển...</div>;
      case '4':
        return <VoucherListUser />;
      case '5':
        return <ProfilePage />;
      case '6': {
        navigate('/');
      }
      default:
        return <div>Chức năng đang được phát triển...</div>;
    }
  };
  const DesktopLayout = () => {
    return (
      <>
        <AllProductHeader />
        <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
          <Sider
            width={250}
            style={{
              background: '#fff',
              borderRight: '1px solid #eee',
              padding: '24px 16px',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Avatar
                size={64}
                icon={<UserOutlined />}
                src={user.avatarImage}
              />
              <div style={{ marginTop: 8, fontWeight: 'bold' }}>
                {user.fullName}
              </div>
            </div>
            <Menu
              mode="vertical"
              selectedKeys={[selectedKey]}
              onClick={({ key }) => setSelectedKey(key)}
            >
              <Menu.Item key="1">
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CgProfile style={{ color: 'orange', fontSize: 16 }} /> Hồ Sơ
                </span>
              </Menu.Item>
              <Menu.Item key="5">
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FaRegUser style={{ color: '#2fe0d5', fontSize: 16 }} /> Hồ Sơ
                  Chi Tiết
                </span>
              </Menu.Item>
              <Menu.Item key="2">
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FaClipboardList style={{ color: '#2b88d9', fontSize: 16 }} />{' '}
                  Đơn mua
                </span>
              </Menu.Item>
              <Menu.Item key="3">
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <GrNotification style={{ color: '#eb4242', fontSize: 16 }} />{' '}
                  Thông báo
                </span>
              </Menu.Item>
              <Menu.Item key="4">
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <SlEnvolopeLetter
                    style={{ color: '#c712c1', fontSize: 16 }}
                  />{' '}
                  Kho voucher
                </span>
              </Menu.Item>
            </Menu>

            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{ marginTop: 24 }}
            >
              Đăng Xuất
            </Button>
          </Sider>

          <Layout>
            <Content style={{ padding: '16px 16px' }}>
              {renderContent()}
            </Content>
          </Layout>
        </Layout>
        <AllProductFooter />
      </>
    );
  };
  const MobileLayout = () => {
    return (
      <>
        <AllProductHeader />
        <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
          {/* Thanh tab KHÔNG cố định, nằm đầu nội dung */}
          <div
            style={{
              height: 40,
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              backgroundColor: '#fff',
              marginBottom: 12, // tạo khoảng cách nếu cần
            }}
          >
            <div
              onClick={() => setSelectedKey('1')}
              style={{
                textAlign: 'center',
                color: selectedKey === '1' ? 'orange' : '#aaa',
              }}
            >
              {/* <CgProfile size={20} /> */}
              <div style={{ fontSize: 12 }}>Hồ sơ</div>
            </div>
            <div
              onClick={() => setSelectedKey('2')}
              style={{
                textAlign: 'center',
                color: selectedKey === '2' ? '#2b88d9' : '#aaa',
              }}
            >
              {/* <FaClipboardList size={20} /> */}
              <div style={{ fontSize: 12 }}>Đơn mua</div>
            </div>
            <div
              onClick={() => setSelectedKey('3')}
              style={{
                textAlign: 'center',
                color: selectedKey === '3' ? '#eb4242' : '#aaa',
              }}
            >
              {/* <GrNotification size={20} /> */}
              <div style={{ fontSize: 12 }}>Tiện ích</div>
            </div>
            <div
              onClick={() => setSelectedKey('4')}
              style={{
                textAlign: 'center',
                color: selectedKey === '4' ? '#c712c1' : '#aaa',
              }}
            >
              {/* <SlEnvolopeLetter size={20} /> */}
              <div style={{ fontSize: 12 }}>Voucher</div>
            </div>
          </div>

          {/* Nội dung trang */}
          <Content style={{ paddingBottom: 60 }}>{renderContent()}</Content>
        </Layout>
        <AllProductFooter />
      </>
    );
  };

  return (
    <div>
      {isDesktop && <DesktopLayout />}
      {isMobile && <MobileLayout />}
    </div>
  );
};

export default ShopeeProfile;
