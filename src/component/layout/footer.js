import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import {
  FacebookFilled,
  YoutubeFilled,
  AppleFilled,
  AndroidFilled,
} from '@ant-design/icons';
import { SiZalo, SiTiktok } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const FooterComponent = () => {
  const navigate = useNavigate();
  return (
    <Footer style={{ backgroundColor: '#fff', padding: '0px 0px 0' }}>
      <Row gutter={[48, 32]} style={{ padding: 40 }}>
        <Col xs={24} md={12} style={{ paddingLeft: 150 }}>
          <Title
            level={1}
            style={{
              color: '#178ee8',
              marginBottom: 0,
              fontSize: 80,
              marginTop: 0,
              fontFamily: 'cursive',
            }}
          >
            GennovaX
          </Title>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 300,
              color: '#4da2e3',
              margin: 0,
              padding: 0,
              fontFamily: 'cursive',
            }}
          >
            Đặt khám nhanh
          </Text>
          <div style={{ marginTop: 16 }}>
            <Text>
              <strong>Địa chỉ:</strong> 28 Thành Thái -Phường Dịch Vọng- Quận
              Cầu Giấy - TP.Hà Nội
            </Text>
            <br />
            <Text>
              <strong>Website:</strong> https://genapp.vn
            </Text>
            <br />
            <Text>
              <strong>Email:</strong> cskh@genapp.vn
            </Text>
            <br />
            <Text>
              <strong>Điện thoại:</strong> (028) 710 78098
            </Text>
          </div>
        </Col>

        <Col xs={24} md={12}>
          {/* Hàng 1 */}
          <Row gutter={[32, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Title level={5}>Dịch vụ xét nghiệm</Title>
              <Space direction="vertical">
                <Link
                  style={{ color: '#6ab0e6' }}
                  onClick={() => {
                    navigate('/mainbio/dat-lich-xet-nghiem');
                  }}
                >
                  Đặt khám tại cơ sở
                </Link>
                <Link style={{ color: '#6ab0e6' }}>Lấy mẫu tại nhà</Link>
                <Link style={{ color: '#6ab0e6' }}>Tư vẫn xét nghiệm</Link>
              </Space>
            </Col>

            <Col xs={24} sm={12} md={16}>
              <Title level={5}>Cơ sở xét nghiệm</Title>
              <Space direction="vertical">
                <Link style={{ color: '#6ab0e6' }}>
                  Phòng xét nghiệm GoLAB Ba Đình
                </Link>
                <Link style={{ color: '#6ab0e6' }}>
                  Cơ sở xét nghiệm GoLAB Hải Phòng
                </Link>
                <Link style={{ color: '#6ab0e6' }}>
                  Phòng xét nghiệm GoLAB Hòa Bình
                </Link>
                <Link style={{ color: '#6ab0e6' }}>
                  Phòng xét nghiệm GoLAB Việt Trì
                </Link>
                <Link style={{ color: '#6ab0e6' }}>
                  Phòng xét nghiệm GoLAB Hà Tĩnh
                </Link>
                <Link style={{ color: '#6ab0e6' }}>
                  Lab xét nghiệm GenLAB Hồ Chí Minh
                </Link>
                <Link style={{ color: '#6ab0e6' }}>
                  Lab xét nghiệm GenovaX Hà Nội 183 Trường Chinh
                </Link>
              </Space>
            </Col>
          </Row>

          {/* Hàng 2 */}
        </Col>
      </Row>

      <Divider style={{ marginTop: 40 }} />
      <Row
        justify="center"
        align="middle"
        style={{
          padding: '0 8px',
          backgroundColor: '#00b5f1',
          height: 70,
          textAlign: 'center',
        }}
      >
        <Col>
          <Text style={{ color: '#fff' }}>
            <strong>
              © 2025 - Bản quyền thuộc Công Ty Cổ Phần Truyền Thông Và Công Nghệ
              GenTech
            </strong>
          </Text>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
