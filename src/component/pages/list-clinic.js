import {
  CheckCircleTwoTone,
  EnvironmentOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Input, Rate, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import genbio1 from '../../assets/images/genbio1.jpg';
import './list-clinic.css';

const { Title, Text, Paragraph } = Typography;

const ClinicListPage = () => {
  const [clinics, setClinics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClinic, setSelectedClinic] = useState(null);
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
          setSelectedClinic(formatted[0]);
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
        padding: '20px 60px',
        textAlign: 'center',
      }}
    >
      <Title
        level={1}
        style={{ fontWeight: 700, color: '#00b5f1', textAlign: 'center' }}
      >
        Phòng Khám
      </Title>
      <Text
        style={{
          display: 'block',
          textAlign: 'center',
          // marginBottom: 16,
          fontSize: 18,
          color: '#245c87',
        }}
      >
        Trải nghiệm chăm sóc y tế tập trung và gần gũi tại phòng khám chuyên
        khoa
      </Text>

      <Input
        placeholder="Tìm kiếm cơ sở y tế..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        prefix={<SearchOutlined style={{ color: '#ccc', marginLeft: 8 }} />}
        size="large"
        className="search-input"
        bordered={false}
      />

      <Row gutter={24} style={{ marginLeft: '5%' }}>
        {/* Danh sách phòng khám bên trái */}
        <Col span={15}>
          <Row gutter={[16, 16]}>
            {filteredClinics.map((clinic) => (
              <Col key={clinic.id} span={24}>
                <Card
                  hoverable
                  style={{
                    borderRadius: 16,
                    boxShadow: '4px 4px 12px rgba(183, 163, 245, 0.5)',
                    minHeight: 200,
                  }}
                  bodyStyle={{ padding: 16 }}
                  className="clinic-card"
                  onClick={() => setSelectedClinic(clinic)}
                >
                  <Row gutter={16} align="middle" style={{ minHeight: 200 }}>
                    <Col span={6}>
                      <img
                        src={clinic.image}
                        alt={clinic.name}
                        style={{
                          width: '100%',
                          height: 200,
                          borderRadius: 12,
                          objectFit: 'cover',
                        }}
                      />
                    </Col>
                    <Col
                      span={18}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        height: 200,
                      }}
                    >
                      <Title level={3} style={{ margin: 0 }}>
                        {clinic.name}
                        {clinic.isVerified && (
                          <CheckCircleTwoTone
                            twoToneColor="#52c41a"
                            style={{ marginLeft: 8 }}
                          />
                        )}
                      </Title>

                      <Text type="secondary" style={{ fontSize: 16 }}>
                        <EnvironmentOutlined /> {clinic.address}
                      </Text>

                      <div
                        style={{
                          marginTop: 8,
                          color: '#f7c860',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Rate
                          disabled
                          value={clinic.rating}
                          allowHalf
                          style={{ color: '#f7c860' }}
                        />
                        <Text style={{ marginLeft: 8, color: '#f760b6' }}>
                          ({clinic.rating})
                        </Text>
                      </div>

                      <div style={{ marginTop: 12 }}>
                        <Button
                          type="default"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/y-te/chi-tiet-phong-kham?ID=${clinic.ID}`
                            );
                          }}
                          style={{
                            marginRight: 12,
                            borderRadius: 30,
                            width: 130,
                            height: 45,
                            fontWeight: 600,
                            color: '#00b5f1',
                            borderColor: '#00b5f1',
                          }}
                        >
                          Xem chi tiết
                        </Button>
                        <Button
                          type="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/y-te/dat-lich-xet-nghiem?ID=${clinic.ID}`
                            );
                          }}
                          style={{
                            borderRadius: 30,
                            width: 130,
                            height: 45,
                            fontWeight: 600,
                            background: '#00b5f1',
                          }}
                        >
                          Đặt khám ngay
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        {/* Chi tiết phòng khám bên phải */}
        <Col span={8}>
          {selectedClinic ? (
            <Card
              title={
                <span
                  style={{
                    color: '#380d75',
                    fontWeight: 'bold',
                    fontSize: 18,
                    display: 'flex',
                    textAlign: 'center',
                  }}
                >
                  {selectedClinic.name}
                </span>
              }
              bordered={false}
              style={{
                borderRadius: 16,
                boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
              }}
              headStyle={{ padding: '12px 16px' }}
            >
              <img
                src={selectedClinic.image}
                alt="clinic"
                style={{
                  width: '100%',
                  height: 180,
                  borderRadius: 12,
                  objectFit: 'cover',
                  marginBottom: 16,
                }}
              />
              <Text strong>Địa chỉ:</Text>
              <Paragraph>
                <EnvironmentOutlined /> {selectedClinic.address}
              </Paragraph>

              <Text strong>Mô tả:</Text>
              <div style={{ marginBottom: 16 }}>
                {Array.isArray(selectedClinic.descriptions) ? (
                  selectedClinic.descriptions.map((desc, index) => (
                    <Paragraph key={index} style={{ textAlign: 'start' }}>
                      {desc}
                    </Paragraph>
                  ))
                ) : (
                  <Paragraph>
                    {selectedClinic.descriptions || 'Không có mô tả.'}
                  </Paragraph>
                )}
              </div>

              {selectedClinic.mapEmbedUrl && (
                <div style={{ marginTop: 16 }}>
                  <Text strong>Bản đồ:</Text>
                  <div style={{ marginTop: 8 }}>
                    <iframe
                      src={selectedClinic.mapEmbedUrl}
                      width="100%"
                      height="250"
                      style={{ border: 0, borderRadius: 12 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Clinic Location"
                    ></iframe>
                  </div>
                </div>
              )}
            </Card>
          ) : (
            <div
              style={{
                height: '100%',
                minHeight: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: 16,
                fontStyle: 'italic',
              }}
            >
              Vui lòng chọn một phòng khám để xem chi tiết.
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ClinicListPage;
