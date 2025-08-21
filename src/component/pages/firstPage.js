import { PhoneOutlined } from '@ant-design/icons';
import { Card, Col, Layout, Row, Typography } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenAppLogo from '../../assets/images/GenApp logo.png';
import './firstPage.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const plans = [
  {
    title: 'Xét nghiệm chuẩn y khoa',
    description: [
      'Tối đa 20 mẫu xét nghiệm/lô',
      'Lưu trữ kết quả 18 tháng',
      'Dung lượng lưu trữ 100GB dữ liệu y khoa',
      '1.000 lượt xử lý mẫu tự động/tháng',
      'Dịch bệnh án và tài liệu y tế không giới hạn',
      'Tìm kiếm hồ sơ trên toàn hệ thống y tế',
      '...',
    ],
    action: 'Đăng ký ngay',
    moveto: '/y-te',
  },
  {
    title: 'Xem kết quả xét nghiệm',
    description: [
      'Xem kết quả xét nghiệm nhanh chóng, chính xác',
      'Lưu trữ kết quả xét nghiệm không giới hạn',
      'Hỗ trợ nhiều loại xét nghiệm: máu, nước tiểu, sinh hóa, v.v.',
      'Thông báo khi có kết quả mới',
      'Tải về bản PDF kết quả',
      '...',
    ],
    action: 'Xem ngay',
    moveto: '/login',
    redirectAfterLogin: '/y-te/tai-khoan',
  },
  {
    title: 'KIOT Y tế',
    description: [
      'Máy đo huyết áp tự động',
      'Máy đo đường huyết cá nhân',
      'Nhiệt kế hồng ngoại không tiếp xúc',
      'Ống nghe y tế chuyên dụng',
      'Bộ sơ cứu tiêu chuẩn',
      'Dụng cụ đo SpO2 tại nhà',
      '...',
    ],
    action: 'Tìm hiểu ngay',
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
        {/* Cụm trái: Logo + Menu */}
        <div className="header-left">
          <div className="logo">
            <img src={GenAppLogo} alt="GenApp Logo" className="logo-img" />
          </div>
          <nav className="nav">
            <a href="/san-pham">Sản phẩm</a>
            <a href="/giai-phap">Giải pháp</a>
            <a href="/tai-nguyen">Tài nguyên</a>
            <a href="/cong-ty">Công ty</a>
          </nav>
        </div>

        {/* Cụm phải: SĐT + Đăng nhập/Đăng ký */}
        <div className="header-right">
          <div className="header-right">
            <div className="contact-info">
              <PhoneOutlined
                style={{
                  fontSize: 20,
                  color: 'red',
                  border: '1px solid red',
                  borderRadius: '50%',
                  padding: 5,
                  marginRight: 8,
                }}
              />
              <span className="phone-number">0123 456 789</span>
            </div>
            <div className="auth-links">
              <span
                className="login-link"
                onClick={() => {
                  navigate('/login');
                  localStorage.setItem('redirectAfterLogin', '/y-te');
                }}
              >
                Đăng nhập
              </span>
              <span
                className="register-link"
                onClick={() => navigate('/register')}
              >
                Đăng ký
              </span>
            </div>
          </div>
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
            fontFamily: 'unset',
            fontSize: 36,
            fontWeight: 800,
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
                        fontWeight: 700,
                        fontSize: 18,
                        fontFamily: 'unset',
                      }}
                    >
                      {plan.title}
                    </span>
                  }
                  bordered={true}
                  className="pricing-card"
                >
                  <ul
                    style={{
                      paddingLeft: 0,
                      textAlign: 'left',
                      minHeight: 250,
                    }}
                  >
                    {plan.description.map((line, i) => (
                      <li
                        key={i}
                        style={{ fontWeight: 500, color: '#6c5a4bff' }}
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="custom-btn"
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
                  </button>
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
