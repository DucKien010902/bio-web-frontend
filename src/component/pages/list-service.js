import React, { useState, useEffect } from 'react';
import {
  Card,
  Radio,
  Row,
  Col,
  Typography,
  Button,
  Divider,
  Space,
  message,
  Modal,
  Input,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/apiConfig';

const { Title, Text } = Typography;

const ServicePage = () => {
  const navigate = useNavigate();
  const [testTypes, setTestTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = localStorage.getItem('alltests');
        setTestTypes(JSON.parse(data));
        setLoading(false);
      } catch (error) {
        console.error(error);
        message.error('Không thể tải dữ liệu dịch vụ');
      }
    };

    fetchServices();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const removeVietnameseTones = (str) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();

  const getDisplayedServices = () => {
    let allServices =
      selectedCategory === 'all'
        ? testTypes.flatMap((type) =>
            type.packages.map((pkg) => ({
              ...pkg,
              typeName: type.typeName,
            }))
          )
        : testTypes
            .find((type) => type.typeName === selectedCategory)
            ?.packages.map((pkg) => ({
              ...pkg,
              typeName: selectedCategory,
            })) || [];

    if (searchTerm.trim()) {
      const keyword = removeVietnameseTones(searchTerm);
      allServices = allServices.filter((service) =>
        removeVietnameseTones(service.name).includes(keyword)
      );
    }

    return allServices;
  };

  const servicesToDisplay = getDisplayedServices();

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const cardTitleStyle = {
    textAlign: 'center',
    background: 'linear-gradient(36deg, #00b5f1, #00e0ff)',
    padding: '12px 0',
    margin: '-24px -24px 24px -24px',
    borderBottom: '1px solid #f0f0f0',
    borderRadius: '12px 12px 0 0',
  };

  return (
    <div style={{ backgroundColor: '#e8f4fd', padding: '40px 150px' }}>
      <Row gutter={24}>
        <Col span={6}>
          <Card bordered>
            <div style={cardTitleStyle}>
              <Title level={4} style={{ margin: 0, color: 'white' }}>
                Chọn loại dịch vụ
              </Title>
            </div>
            <Radio.Group
              onChange={handleCategoryChange}
              value={selectedCategory}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <Radio value="all">Tất cả</Radio>
              {testTypes.map((type) => (
                <Radio key={type.typeName} value={type.typeName}>
                  {type.typeName}
                </Radio>
              ))}
            </Radio.Group>
          </Card>
        </Col>
        <Col span={18}>
          <Card bordered style={{ borderRadius: '12px' }}>
            <div style={cardTitleStyle}>
              <Title level={4} style={{ margin: 0, color: 'white' }}>
                Danh sách dịch vụ
              </Title>
            </div>
            <Input.Search
              placeholder="Tìm kiếm dịch vụ"
              allowClear
              size="large"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginBottom: 20 }}
            />
            <Row gutter={[0, 16]}>
              <Col span={2}>
                <Text strong style={{ color: '#1890ff', fontSize: 16 }}>
                  #
                </Text>
              </Col>
              <Col span={11}>
                <Text strong style={{ color: '#1890ff', fontSize: 16 }}>
                  Dịch vụ
                </Text>
              </Col>
              <Col span={3}>
                <Text strong style={{ color: '#1890ff', fontSize: 16 }}>
                  Giá
                </Text>
              </Col>
              <Col span={8} style={{ textAlign: 'right', fontSize: 16 }}></Col>
            </Row>

            <Divider style={{ margin: '12px 0' }} />

            {loading ? (
              <Text>Đang tải dữ liệu...</Text>
            ) : servicesToDisplay.length === 0 ? (
              <Text>Không có dịch vụ nào</Text>
            ) : (
              servicesToDisplay.map((service, index) => (
                <div key={service.code}>
                  <Row gutter={[0, 16]} align="middle">
                    <Col span={2}>
                      <Text style={{ fontSize: 16 }}>
                        <strong>{index + 1}</strong>
                      </Text>
                    </Col>
                    <Col span={11} style={{ paddingRight: 20 }}>
                      <Text style={{ fontSize: 16 }}>
                        <strong>{service.name}</strong>
                        <br />
                        <i style={{ fontSize: 14 }}>
                          Lịch khám: {service.schedule}
                        </i>
                        <br />
                        <i style={{ fontSize: 14 }}>
                          Thời gian trả kết quả:{' '}
                          <strong>{service.turnaroundTime}</strong>
                        </i>
                      </Text>
                    </Col>
                    <Col span={3}>
                      <Text style={{ fontSize: 16 }} strong>
                        {service.price.toLocaleString('vi-VN')}₫
                      </Text>
                    </Col>
                    <Col span={8} style={{ textAlign: 'right' }}>
                      <Space>
                        <Button
                          onClick={() => setSelectedService(service)}
                          style={{
                            borderRadius: 15,
                            backgroundColor: '#c4f2f5',
                            color: '#1d328f',
                            fontWeight: 500,
                          }}
                        >
                          Chi tiết
                        </Button>
                        <Button
                          type="primary"
                          onClick={() =>
                            navigate(
                              `/mainbio/dat-lich-xet-nghiem?code=${service.code}`
                            )
                          }
                          style={{ fontWeight: 500, borderRadius: 15 }}
                        >
                          Đặt khám ngay
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                  <Divider style={{ margin: '16px 0' }} />
                </div>
              ))
            )}
          </Card>
        </Col>
      </Row>

      {/* Modal Chi tiết dịch vụ */}
      <Modal
        open={!!selectedService}
        onCancel={handleCloseModal}
        footer={null}
        centered
        width={500}
        bodyStyle={{ padding: 0, borderRadius: 12, overflow: 'hidden' }}
        closeIcon={false}
      >
        {selectedService && (
          <div
            style={{ borderRadius: 12, overflow: 'hidden', background: '#fff' }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
                padding: '20px 28px',
                paddingLeft: '20%',
              }}
            >
              <Title level={4} style={{ color: 'white', margin: 0 }}>
                🩺 Mô tả chi tiết dịch vụ
              </Title>
            </div>
            <div
              style={{
                padding: '24px 28px',
                maxHeight: 400,
                overflowY: 'auto',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 1.75,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {selectedService.description ||
                  'Không có mô tả cho dịch vụ này.'}
              </Text>
            </div>
            <div
              style={{
                padding: '16px 28px',
                display: 'flex',
                justifyContent: 'flex-end',
                borderTop: '1px solid #f0f0f0',
                backgroundColor: '#fafafa',
              }}
            >
              <Button onClick={handleCloseModal}>Đóng</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ServicePage;
