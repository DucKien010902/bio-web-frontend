import React from 'react';
import { Typography, Row, Col, Card, Carousel, Button } from 'antd';
import './intro-page.css';

const { Title, Paragraph } = Typography;

const bannerImages = [
  'https://res.cloudinary.com/da6f4dmql/image/upload/v1748336183/pngtree-medical-icon-simple-banner-background-picture-image_1539751_lbymi7.png',
  'https://res.cloudinary.com/da6f4dmql/image/upload/v1748336182/5917.jpg_wh860_kh7esi.jpg',
  'https://res.cloudinary.com/da6f4dmql/image/upload/v1748336181/design-de-modelo-de-centro-medico_23-2150144640_sgculr.avif',
];

const GenTechIntro = () => {
  return (
    <div
      className="gen-tech-intro"
      style={{ backgroundColor: '#e8f4fd', paddingTop: 40 }}
    >
      {/* Banner section */}
      <div style={{ width: '80%', margin: '30px auto' }}>
        <Carousel autoplay>
          {bannerImages.map((src, i) => (
            <div key={i}>
              <img
                src={src}
                alt={`banner-${i}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 20,
                  objectFit: 'cover',
                  maxHeight: 400,
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Company Intro */}
      <div style={{ padding: '60px 10%', textAlign: 'center' }}>
        <Title level={1} style={{ color: '#065c8c', fontWeight: 'bold' }}>
          Giới thiệu về GenTech
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
          GenTech là nền tảng kết nối người dân với các cơ sở và dịch vụ y tế
          hàng đầu. Chúng tôi cung cấp giải pháp công nghệ hiện đại giúp việc
          khám chữa bệnh trở nên dễ dàng, nhanh chóng và tiện lợi hơn bao giờ
          hết. Với sứ mệnh "Vì một cộng đồng khỏe mạnh hơn", GenTech cam kết
          luôn đồng hành cùng bạn trong hành trình chăm sóc sức khỏe.
        </Paragraph>
      </div>

      {/* Feature Highlights */}
      <Row gutter={[32, 32]} style={{ padding: '40px 10%' }}>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable>
            <Title level={4}>Kết nối y tế toàn diện</Title>
            <Paragraph>
              Dễ dàng đặt lịch, tư vấn từ xa và tiếp cận các dịch vụ y tế chỉ
              với vài cú nhấp.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable>
            <Title level={4}>Hệ sinh thái thông minh</Title>
            <Paragraph>
              Ứng dụng công nghệ AI và dữ liệu lớn để cá nhân hóa trải nghiệm
              người dùng.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable>
            <Title level={4}>Đội ngũ chuyên gia uy tín</Title>
            <Paragraph>
              Hợp tác cùng nhiều bác sĩ đầu ngành và bệnh viện hàng đầu trên
              toàn quốc.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Call to Action */}
      <div
        style={{
          backgroundColor: '#e6f7ff',
          padding: '60px 10%',
          textAlign: 'center',
        }}
      >
        <Title level={2} style={{ color: '#065c8c' }}>
          Tham gia cùng GenTech ngay hôm nay
        </Title>
        <Paragraph style={{ fontSize: '16px' }}>
          Đăng ký để được tư vấn và trải nghiệm các dịch vụ y tế chất lượng cao.
        </Paragraph>
        <Button
          type="primary"
          size="large"
          style={{ backgroundColor: '#00bfff', border: 'none' }}
        >
          Đăng ký ngay
        </Button>
      </div>
    </div>
  );
};

export default GenTechIntro;
