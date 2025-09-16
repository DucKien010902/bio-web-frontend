import {
  Button,
  Card,
  Checkbox,
  Col,
  List,
  Modal,
  Row,
  Typography,
} from 'antd';
import { useState } from 'react';

const { Title, Text } = Typography;

const mockData = [
  {
    _id: '1',
    serviceName: 'Xét nghiệm máu tổng quát',
    facility: 'Phòng khám A',
    date: '20/09/2025',
    time: '08:30',
    servicePrice: 500000,
  },
  {
    _id: '2',
    serviceName: 'Nội soi dạ dày',
    facility: 'Phòng khám B',
    date: '21/09/2025',
    time: '09:00',
    servicePrice: 1200000,
  },
  {
    _id: '3',
    serviceName: 'Siêu âm tổng quát',
    facility: 'Phòng khám C',
    date: '22/09/2025',
    time: '10:00',
    servicePrice: 300000,
  },
];

const BookingCart = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (checked, order) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, order]);
    } else {
      setSelectedOrders(selectedOrders.filter((o) => o._id !== order._id));
    }
  };

  const totalPrice = selectedOrders.reduce((sum, o) => sum + o.servicePrice, 0);

  const handleConfirm = () => {
    setIsModalOpen(false);
    // TODO: call API thanh toán
    console.log('Thanh toán các đơn: ', selectedOrders);
  };

  return (
    <Row gutter={24}>
      {/* Cột bên trái */}
      <Col span={6}>
        <Card
          bordered={false}
          style={{
            backgroundColor: '#fafafa',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: 12,
          }}
        >
          <Title level={4}>Tổng cộng</Title>
          <Text strong style={{ fontSize: 20, color: '#1890ff' }}>
            {totalPrice.toLocaleString()} đ
          </Text>
          <Button
            type="primary"
            block
            size="large"
            disabled={selectedOrders.length === 0}
            style={{ marginTop: 20, borderRadius: 8 }}
            onClick={() => setIsModalOpen(true)}
          >
            Thanh toán
          </Button>
        </Card>
      </Col>

      {/* Cột bên phải */}
      <Col span={18}>
        <List
          dataSource={mockData}
          renderItem={(item) => (
            <Card
              key={item._id}
              bordered={false}
              style={{
                marginBottom: 16,
                backgroundColor: '#e6f7ff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
                borderRadius: 10,
              }}
              bodyStyle={{ padding: '16px' }}
              className="booking-card"
            >
              <Row justify="space-between" align="middle">
                <Col>
                  <Title level={5} style={{ margin: 0 }}>
                    {item.serviceName}
                  </Title>
                  <Text type="secondary">
                    {item.facility} • {item.date} {item.time}
                  </Text>
                  <br />
                  <Text strong style={{ fontSize: 16, color: '#1890ff' }}>
                    {item.servicePrice.toLocaleString()} đ
                  </Text>
                </Col>
                <Col>
                  <Checkbox
                    checked={selectedOrders.some((o) => o._id === item._id)}
                    onChange={(e) => handleSelect(e.target.checked, item)}
                  />
                </Col>
              </Row>
            </Card>
          )}
        />
      </Col>

      {/* Modal confirm */}
      <Modal
        title="Xác nhận thanh toán"
        open={isModalOpen}
        onOk={handleConfirm}
        onCancel={() => setIsModalOpen(false)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn thanh toán {selectedOrders.length} dịch vụ?</p>
        <p>
          <strong>Tổng tiền: </strong>
          {totalPrice.toLocaleString()} đ
        </p>
      </Modal>
    </Row>
  );
};

export default BookingCart;
