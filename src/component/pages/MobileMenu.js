import React, { useEffect } from 'react';
import { Layout, List, Avatar, Badge, Button, Divider, Row, Col } from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
  BellOutlined,
  HomeOutlined,
  AppstoreOutlined,
  PlusSquareOutlined,
  ReadOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  FacebookFilled,
  YoutubeFilled,
  MailOutlined,
  PhoneOutlined,
  LogoutOutlined,
  TikTokFilled,
  CaretRightOutlined,
} from '@ant-design/icons';
import { SiZalo } from 'react-icons/si';
import { useDispatch } from 'react-redux';
import { closeMenuBio } from '../../redux/slices/openMenuSlice';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const MobileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    return () => {
      dispatch(closeMenuBio(false));
    };
  }, []);

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {user ? (
        <div
          style={{
            background: 'linear-gradient(to right, #00b5ff, #00e0ff)',
            borderRadius: 8,
            padding: '10px 16px',
            color: 'white',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 320,
            height: 50,
            margin: '16px auto',
            fontSize: 16,
          }}
        >
          <UserOutlined
            style={{ marginRight: 8, fontSize: 20, color: 'white' }}
          />
          {user.fullName}
        </div>
      ) : (
        <div style={{ padding: '16px 16px 0', textAlign: 'center' }}>
          <Row gutter={16} justify="center">
            <Col span={12}>
              <Button
                type="primary"
                block
                style={{ borderRadius: 8, height: 40 }}
                onClick={() => navigate('/register')}
              >
                Đăng ký
              </Button>
            </Col>
            <Col span={12}>
              <Button
                type="default"
                block
                style={{ borderRadius: 8, height: 40 }}
                onClick={() => {
                  localStorage.removeItem('user');
                  navigate('/login');
                }}
              >
                Đăng nhập
              </Button>
            </Col>
          </Row>
        </div>
      )}

      <Content style={{ padding: '12px 0' }}>
        <List
          itemLayout="horizontal"
          dataSource={[
            ...(user
              ? [
                  {
                    icon: <UserOutlined />,
                    title: 'Hồ sơ bệnh nhân',
                    // link: '/tai-khoan',
                  },
                  {
                    icon: <FileTextOutlined />,
                    title: 'Phiếu xét nghiệm',
                    link: '/y-te/tai-khoan?key=tickets',
                  },
                  {
                    icon: (
                      <Badge count={15} offset={[8, -5]}>
                        <BellOutlined />
                      </Badge>
                    ),
                    title: 'Thông báo',
                    // link: '/thong-bao',
                  },
                ]
              : []),
            {
              icon: <HomeOutlined />,
              title: 'Cơ sở y tế',
              link: '/y-te/danh-sach-phong-kham',
              action: true,
            },
            {
              icon: <AppstoreOutlined />,
              title: 'Dịch vụ y tế',
              link: '/y-te/danh-sach-dich-vu',
              action: true,
            },
            // {
            //   icon: <TeamOutlined />,
            //   title: 'Khám sức khỏe doanh nghiệp',
            //   // link: '/y-te/doanh-nghiep',
            //   action: true,
            // },
            {
              icon: <ReadOutlined />,
              title: 'Tin tức',
              // link: '/y-te/tin-tuc',
              action: true,
            },
            {
              icon: <QuestionCircleOutlined />,
              title: 'Hướng dẫn',
              // link: '/y-te/huong-dan',
            },
            {
              icon: <PlusSquareOutlined />,
              title: 'Liên hệ hợp tác',
              // link: '/y-te/lien-he',
            },
          ]}
          renderItem={(item) => (
            <List.Item
              onClick={() => item.link && navigate(item.link)}
              style={{
                padding: '12px 20px',
                cursor: item.link ? 'pointer' : 'default',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar
                    style={{ backgroundColor: '#e6f7ff', color: '#1890ff' }}
                  >
                    {item.icon}
                  </Avatar>
                  <span style={{ fontWeight: 500, fontSize: 15 }}>
                    {item.title}
                  </span>
                </div>
                {item.action && (
                  <CaretRightOutlined style={{ fontSize: 16, color: '#999' }} />
                )}
              </div>
            </List.Item>
          )}
        />

        <Divider />

        <List
          itemLayout="horizontal"
          dataSource={[
            {
              icon: (
                <img
                  src="https://chat.zalo.me/favicon.ico"
                  alt="zalo"
                  width={20}
                />
              ),
              title: 'Hỗ trợ Zalo',
            },
            {
              icon: <FacebookFilled style={{ color: '#1877f2' }} />,
              title: 'Hỗ trợ Facebook',
            },
            {
              icon: <PhoneOutlined style={{ color: '#ff4d4f' }} />,
              title: 'Hỗ trợ đặt khám: 1900-2115',
            },
            {
              icon: <MailOutlined style={{ color: '#d93025' }} />,
              title: 'Email: cskh@gentech.vn',
            },
          ]}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                cursor: item.action ? 'pointer' : 'default',
              }}
              onClick={() => {
                if (item.link) navigate(item.link);
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar style={{ backgroundColor: '#e6f7ff' }}>
                    {item.icon}
                  </Avatar>
                }
                title={
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 15,
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    {item.title}
                  </span>
                }
              />
              {item.action && <span>{'>'}</span>}
            </List.Item>
          )}
        />

        <div
          style={{
            background: '#fff',
            margin: 12,
            padding: 12,
            borderRadius: 8,
            textAlign: 'center',
          }}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh-5fWVITFdnwFqqjLfK0KZ0l2vUsqDV1HQQ&s"
            alt="app"
            style={{ width: '50px', marginBottom: 8 }}
          />
          <div style={{ fontWeight: 600, color: '#1890ff' }}>
            Tải ứng dụng Genapp tại đây <span style={{ fontSize: 18 }}>⬇</span>
          </div>
          <div style={{ fontSize: 13, marginTop: 4 }}>
            Ứng dụng đặt khám nhanh tại hơn 300 bệnh viện hàng đầu Việt Nam
          </div>
        </div>

        <div
          style={{
            padding: '0 12px',
            textAlign: 'center',
            marginBottom: 30,
            marginTop: 30,
          }}
        >
          <div
            style={{
              marginBottom: 12,
              display: 'flex',
              justifyContent: 'center',
              gap: 20,
            }}
          >
            <span>
              <FacebookFilled style={{ fontSize: 18, color: 'blue' }} />
            </span>
            <span>
              <YoutubeFilled style={{ fontSize: 18, color: 'red' }} />
            </span>
            <span>
              <TikTokFilled style={{ fontSize: 18, color: 'black' }} />
            </span>
            <span>
              <SiZalo style={{ fontSize: 18, color: 'blue' }} />
            </span>
          </div>

          {user && (
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              block
              style={{ borderRadius: 8, width: '95%', height: 40 }}
              onClick={() => {
                localStorage.removeItem('user');
                navigate('/login');
              }}
            >
              Đăng xuất
            </Button>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default MobileMenu;
