import React, { useEffect, useState } from 'react';
import { Input, Typography, Row, Col, Card, Button, Rate } from 'antd';
import genbio1 from '../../assets/images/genbio1.jpg';
import './list-clinic.css';
import {
  EnvironmentOutlined,
  CheckCircleTwoTone,
  SearchOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const ClinicListMobilePage = () => {
  const [clinics, setClinics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadClinics = async () => {
      try {
        const data = localStorage.getItem('allclinics');
        if (data) {
          const parsed = JSON.parse(data);
          const formatted = parsed.map((item, index) => ({
            id: index + 1,
            ID: item.ID,
            name: item.name,
            address: item.address,
            rating: item.rating || 0,
            image: item.mainImage || genbio1,
            descriptions: item.descriptions || ['Không có mô tả.'],
            mapEmbedUrl: item.mapEmbedUrl || '',
            isVerified: item.isVerified || false,
          }));
          setClinics(formatted);
        }
      } catch (error) {
        console.error('Lỗi khi đọc dữ liệu clinic từ localStorage:', error);
      }
    };

    loadClinics();
  }, []);

  const removeVietnameseTones = (str) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/\s+/g, '')
      .toLowerCase();

  const filteredClinics = clinics.filter((clinic) =>
    removeVietnameseTones(clinic.name).includes(
      removeVietnameseTones(searchTerm)
    )
  );

  return (
    <div
      style={{
        backgroundColor: '#e8f4fd',
        padding: '16px',
        minHeight: '100vh',
      }}
    >
      <Title
        level={3}
        style={{
          color: '#00b5f1',
          textAlign: 'center',
          fontSize: 32,
          fontWeight: 700,
        }}
      >
        Cơ sở y tế
      </Title>
      <Text
        style={{
          display: 'block',
          textAlign: 'center',
          color: '#003553',
          fontSize: 16,
          fontWeight: 400,
          lineHeight: '18px',
        }}
      >
        Với những cơ sở y tế hàng đầu sẽ giúp bạn trải nghiệm khám, chữa bệnh
        của bạn tốt hơn
      </Text>

      <div className="search-input">
        <Input
          placeholder="Tìm kiếm cơ sở y tế..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<SearchOutlined style={{ color: '#ccc', marginLeft: 8 }} />}
          size="large"
          bordered={false}
        />
      </div>

      <Row gutter={[12, 16]}>
        {filteredClinics.map((clinic) => (
          <Col key={clinic.id} span={24}>
            <Card
              hoverable
              style={{
                borderRadius: 12,
                boxShadow: '0 4px 10px rgba(90, 82, 243, 0.1)',
              }}
              bodyStyle={{ padding: 12 }}
              onClick={() =>
                navigate(`/y-te/chi-tiet-phong-kham?ID=${clinic.ID}`)
              }
            >
              <Row gutter={12}>
                <Col span={7}>
                  <img
                    src={clinic.image}
                    alt={clinic.name}
                    style={{
                      width: '100%',
                      height: 80,
                      borderRadius: 8,
                      objectFit: 'cover',
                    }}
                  />
                </Col>
                <Col span={17}>
                  <div style={{ fontWeight: 'bold', fontSize: 16 }}>
                    {clinic.name}
                    {clinic.isVerified && (
                      <CheckCircleTwoTone
                        twoToneColor="#52c41a"
                        style={{ marginLeft: 6 }}
                      />
                    )}
                  </div>
                  <div style={{ fontSize: 13, color: '#666', margin: '4px 0' }}>
                    <EnvironmentOutlined /> {clinic.address}
                  </div>
                  <Rate
                    disabled
                    value={clinic.rating}
                    allowHalf
                    style={{ fontSize: 14, color: '#f7c860' }}
                  />
                  <span style={{ marginLeft: 6, color: '#f760b6' }}>
                    ({clinic.rating})
                  </span>
                </Col>
              </Row>

              <div style={{ marginTop: 5, textAlign: 'center' }}>
                <Button
                  size="small"
                  style={{
                    borderRadius: 20,
                    borderColor: '#00b5f1',
                    color: '#00b5f1',
                    marginRight: 8,
                    height: 30,
                    width: '35%',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/y-te/chi-tiet-phong-kham?ID=${clinic.ID}`);
                  }}
                >
                  Xem chi tiết
                </Button>
                <Button
                  size="small"
                  type="primary"
                  style={{
                    borderRadius: 20,
                    backgroundColor: '#00b5f1',
                    borderColor: '#00b5f1',
                    height: 30,
                    width: '35%',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/y-te/dat-lich-xet-nghiem?ID=${clinic.ID}`);
                  }}
                >
                  Đặt khám ngay
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ClinicListMobilePage;
