import React, { useEffect } from 'react';
import { Card, Button, Row, Col, Typography, Layout } from 'antd';
import { PhoneOutlined, LoginOutlined } from '@ant-design/icons';
import GenAppLogo from '../../assets/images/GenApp logo.png';
import './firstPage.css';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const plans = [
  {
    title: 'Xét nghiệm chuẩn y khoa',
    price: '$0 /month',
    description: [
      'Tối đa 20 mẫu xét nghiệm/lô',
      'Lưu trữ kết quả 18 tháng',
      'Dung lượng lưu trữ 100GB dữ liệu y khoa',
      '1.000 lượt xử lý mẫu tự động/tháng',
      'Dịch bệnh án và tài liệu y tế không giới hạn',
      'Tìm kiếm hồ sơ trên toàn hệ thống y tế',
      'Hỗ trợ 10 chuyên khoa riêng biệt',
    ],

    action: 'Đăng ký ngay',
    moveto: '/y-te',
  },
  {
    title: 'Xem kết quả xét nghiệm',
    price: 'Miễn phí',
    description: [
      'Xem kết quả xét nghiệm nhanh chóng, chính xác',
      'Lưu trữ kết quả xét nghiệm không giới hạn',
      'Hỗ trợ nhiều loại xét nghiệm: máu, nước tiểu, sinh hóa, v.v.',
      'Thông báo khi có kết quả mới',
      'Tải về bản PDF kết quả',
      'Bảo mật dữ liệu theo chuẩn HIPAA',
      'Hỗ trợ liên hệ bác sĩ nếu cần tư vấn thêm',
    ],
    action: 'Xem ngay',
    popular: true,
    popularText: 'Xem ngay',
    moveto: '/login',
    redirectAfterLogin: '/y-te/tai-khoan',
  },
  {
    title: 'KIOT Y tế',
    price: 'Lets Talk',
    description: [
      'Máy đo huyết áp tự động',
      'Máy đo đường huyết cá nhân',
      'Nhiệt kế hồng ngoại không tiếp xúc',
      'Ống nghe y tế chuyên dụng',
      'Bộ sơ cứu tiêu chuẩn',
      'Máy xông mũi họng cho trẻ em',
      'Dụng cụ đo SpO2 tại nhà',
      '...',
    ],
    action: 'Tìm hiểu ngay',
    popular: true,
    popularText: 'Nhiều deal hot',
    moveto: '/san-pham/trang-chu',
  },
];

const FirstPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('user');
  }, []);
  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">
          <img
            src="https://genapp.com.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.83c67ad2.png&w=384&q=75"
            alt="GenApp Logo"
            className="logo-img"
          />
        </div>
        <div className="header-right">
          <div className="contact-info">
            <Text className="contact-label">Liên hệ: </Text>
            <span className="phone-icon">
              <PhoneOutlined />
            </span>
            <Text className="phone-number">0123 456 789</Text>
          </div>
          <Button
            type="primary"
            style={{
              borderRadius: 15,
              fontWeight: 600,
              height: 40,
              fontSize: 16,
            }}
            onClick={() => {
              navigate('/login');
              localStorage.setItem('redirectAfterLogin', '/y-te');
            }}
          >
            Đăng nhập
          </Button>
        </div>
      </Header>

      <Content className="content">
        <Title
          level={1}
          className="title"
          style={{
            maxWidth: '50%',
            margin: '0 auto',
            color: '#f500b1',
            fontFamily: 'cursive',
          }}
        >
          GenApp – Người bạn đồng hành trong chăm sóc sức khỏe
        </Title>
        <div className="cards-row">
          <Row gutter={[32, 32]} justify="center">
            {plans.map((plan, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card
                  title={
                    <span
                      style={{
                        color: '#1da1f2',
                        fontWeight: 500,
                        fontFamily: 'cursive',
                      }}
                    >
                      {plan.title}{' '}
                      {plan.popular && (
                        <span className="popular">{plan.popularText}</span>
                      )}
                    </span>
                  }
                  bordered={true}
                  className="pricing-card"
                >
                  {/* <Title level={3}>{plan.price}</Title> */}
                  <ul
                    style={{
                      paddingLeft: 0,
                      textAlign: 'left',
                      minHeight: 280,
                    }}
                  >
                    {plan.description.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                  <Button
                    type="primary"
                    block
                    style={{ fontWeight: 500 }}
                    onClick={() => {
                      navigate(plan.moveto);
                      if (plan.redirectAfterLogin) {
                        localStorage.setItem(
                          'redirectAfterLogin',
                          plan.redirectAfterLogin
                        );
                      }
                    }}
                  >
                    {plan.action}
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default FirstPage;
