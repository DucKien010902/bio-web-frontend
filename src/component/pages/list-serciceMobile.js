import React, { useState, useEffect } from 'react';
import {
  Card,
  Radio,
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

const ServicePageMobile = () => {
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

  const handleCloseModal = () => setSelectedService(null);

  return (
    <div
      style={{ padding: 16, backgroundColor: '#e8f4fd', minHeight: '100vh' }}
    >
      <Card bordered style={{ marginBottom: 16 }} bodyStyle={{ padding: 8 }}>
        <Title level={4} style={{ marginBottom: 12, textAlign: 'center' }}>
          Chọn loại dịch vụ
        </Title>
        <Radio.Group
          onChange={handleCategoryChange}
          value={selectedCategory}
          style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
        >
          <Radio value="all">Tất cả</Radio>
          {testTypes.map((type) => (
            <Radio key={type.typeName} value={type.typeName}>
              {type.typeName}
            </Radio>
          ))}
        </Radio.Group>
      </Card>

      <Input.Search
        placeholder="Tìm kiếm dịch vụ"
        allowClear
        size="large"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      {loading ? (
        <Text>Đang tải dữ liệu...</Text>
      ) : servicesToDisplay.length === 0 ? (
        <Text>Không có dịch vụ nào</Text>
      ) : (
        servicesToDisplay.map((service, index) => (
          <Card
            key={service.code}
            style={{ marginBottom: 16, borderRadius: 12 }}
            bodyStyle={{ padding: 16 }}
          >
            <Text strong style={{ fontSize: 16 }}>
              {index + 1}. {service.name}
            </Text>
            <div style={{ margin: '8px 0' }}>
              <Text type="secondary" style={{ fontSize: 14 }}>
                Lịch khám: {service.schedule}
              </Text>
              <br />
              <Text type="secondary" style={{ fontSize: 14 }}>
                Trả kết quả: <strong>{service.turnaroundTime}</strong>
              </Text>
            </div>
            <Text strong style={{ fontSize: 16, color: '#1890ff' }}>
              {service.price.toLocaleString('vi-VN')}₫
            </Text>
            <Divider style={{ margin: '12px 0' }} />
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button
                onClick={() => setSelectedService(service)}
                style={{
                  borderRadius: 20,
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
                  navigate(`/y-te/dat-lich-xet-nghiem?code=${service.code}`)
                }
                style={{ fontWeight: 500, borderRadius: 20 }}
              >
                Đặt khám
              </Button>
            </Space>
          </Card>
        ))
      )}

      <Modal
        open={!!selectedService}
        onCancel={handleCloseModal}
        footer={null}
        centered
        width="90%"
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
                padding: '20px',
              }}
            >
              <Title level={4} style={{ color: 'white', margin: 0 }}>
                🩺 Mô tả chi tiết dịch vụ
              </Title>
            </div>
            <div style={{ padding: 20, maxHeight: 400, overflowY: 'auto' }}>
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
                padding: '16px 20px',
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

export default ServicePageMobile;
