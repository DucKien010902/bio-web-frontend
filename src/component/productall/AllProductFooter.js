import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';

const { Footer } = Layout;
const { Title, Text } = Typography;

const FooterSection = () => {
  return (
    <Footer
      style={{
        backgroundColor: '#2f4699',
        color: '#fff',
        padding: '24px',
        paddingBottom: 150,
      }}
    >
      <Row gutter={[16, 32]}>
        {/* Cột thông tin liên hệ */}
        <Col xs={24} md={9}>
          <Title
            level={2}
            style={{ color: '#fff', fontFamily: 'cursive', marginBottom: 0 }}
          >
            GENAPP
          </Title>
          <Text style={{ color: '#fff', fontSize: 14 }}>
            ĐÍCH ĐẾN CỦA NIỀM TIN
          </Text>
          <div style={{ marginTop: 16, fontSize: 13 }}>
            <p>
              <strong>Văn phòng:</strong> Số 26 Đoàn Thị Điểm, Quốc Tử Giám,
              Đống Đa, HN
            </p>
            <p>
              <strong>Điện thoại:</strong> 0968.694.777
            </p>
            <p>
              <strong>Email:</strong> info@gennovax.vn
            </p>
            <p>
              <strong>Fanpage:</strong> GennovaX
            </p>
          </div>
        </Col>

        {/* Các danh mục chia theo nhóm 3 cột mỗi hàng trên tablet, 1 cột trên mobile */}
        <Col xs={24} md={15}>
          <Row gutter={[16, 24]}>
            {[
              {
                title: 'Danh mục Y tế',
                items: [
                  'Dịch vụ y tế',
                  'Khám chữa bệnh',
                  'Xét nghiệm',
                  'Tư vấn từ xa',
                ],
              },
              {
                title: 'Cơ sở Y tế',
                items: [
                  'Bệnh viện',
                  'Phòng khám',
                  'Nhà thuốc',
                  'Trung tâm xét nghiệm',
                ],
              },
              {
                title: 'Hướng dẫn',
                items: [
                  'Đặt lịch khám',
                  'Thanh toán',
                  'Tải ứng dụng',
                  'Liên hệ hỗ trợ',
                ],
              },
              {
                title: 'Liên hệ hợp tác',
                items: [
                  'Đăng ký cơ sở',
                  'Chính sách đối tác',
                  'Hợp tác truyền thông',
                ],
              },
              {
                title: 'Tin tức y tế',
                items: [
                  'Tin mới nhất',
                  'Dinh dưỡng',
                  'Sức khỏe tinh thần',
                  'Covid-19',
                ],
              },
              {
                title: 'Về GennovaX',
                items: [
                  'Giới thiệu',
                  'Điều khoản',
                  'Chính sách bảo mật',
                  'Quy định sử dụng',
                ],
              },
            ].map((section, idx) => (
              <Col xs={12} sm={8} md={8} key={idx}>
                <Title level={5} style={{ color: '#fff', marginBottom: 12 }}>
                  {section.title}
                </Title>
                <Space direction="vertical" size={10}>
                  {section.items.map((item, i) => (
                    <a
                      key={i}
                      href="http://gennovax.vn"
                      style={{
                        color: '#fff',
                        fontSize: 13,
                        textDecoration: 'none',
                        cursor: 'pointer',
                        display: 'block',
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item}
                    </a>
                  ))}
                </Space>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterSection;
