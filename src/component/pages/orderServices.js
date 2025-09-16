import {
  Button,
  Card,
  Checkbox,
  Col,
  Empty,
  List,
  Modal,
  Row,
  Spin,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import axiosClient from '../../api/apiConfig';
import './orderServices.css';

const { Title, Text } = Typography;

const BookingCart = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const phone = JSON.parse(localStorage.getItem('user'))?.phoneNumber;

  // fetch data từ API
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/booking/fetchbyphone?phone=${phone}`);

      const formatted = (res.data || [])
        .filter((item) => item.isPaid === false && item.status !== 'Đã hủy')
        .map((item) => ({
          _id: item._id,
          serviceName: item.serviceName,
          facility: item.facility,
          date: item.date,
          time: item.time,
          servicePrice: item.servicePrice,
        }));

      setOrders(formatted);
    } catch (error) {
      console.error('Fetch bookings error:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (phone) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [phone]);

  const handleSelect = (checked, order) => {
    if (checked) {
      setSelectedOrders((prev) => [...prev, order]);
    } else {
      setSelectedOrders((prev) => prev.filter((o) => o._id !== order._id));
    }
  };

  const totalPrice = selectedOrders.reduce(
    (sum, o) => sum + (o.servicePrice || 0),
    0
  );

  const handleConfirm = () => {
    setIsModalOpen(false);
    console.log('Thanh toán các đơn: ', selectedOrders);
  };

  return (
    <Row gutter={24} style={{ padding: '30px 8%', minHeight: '100vh' }}>
      {/* Cột bên trái */}
      <Col xs={24} md={8} lg={6}>
        <Card
          bordered={false}
          style={{
            backgroundColor: '#fafafa',
            boxShadow: '0 6px 18px rgba(0,0,0,0.16)',
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
      <Col xs={24} md={16} lg={18}>
        {loading ? (
          <Spin
            size="large"
            style={{ display: 'block', margin: '50px auto' }}
          />
        ) : orders.length === 0 ? (
          <Empty description="Không có đơn chưa thanh toán" />
        ) : (
          <List
            dataSource={orders}
            renderItem={(item) => (
              <Card
                key={item._id}
                bordered={false}
                style={{
                  marginBottom: 16,
                  backgroundColor: '#e6f7ff',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.16)',
                  transition: 'all 0.28s ease',
                  borderRadius: 10,
                }}
                bodyStyle={{ padding: '16px' }}
                className="booking-card"
              >
                <Row align="middle">
                  {/* Left: service + facility + date/time */}
                  <Col flex="auto" style={{ minWidth: 0 }}>
                    <Title
                      level={4}
                      style={{
                        margin: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.serviceName}
                    </Title>

                    <Text
                      type="secondary"
                      style={{ display: 'block', marginTop: 6, fontSize: 16 }}
                    >
                      {item.facility}
                    </Text>

                    <Text
                      type="secondary"
                      style={{ display: 'block', marginTop: 6, fontSize: 16 }}
                    >
                      {item.date} | {item.time}
                    </Text>
                  </Col>

                  {/* Middle: giá */}
                  <Col
                    style={{
                      textAlign: 'center',
                      minWidth: 140,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      strong
                      style={{
                        fontSize: 18,
                        color: '#1890ff',
                        display: 'block',
                      }}
                    >
                      {Number(item.servicePrice || 0).toLocaleString()} đ
                    </Text>
                  </Col>

                  {/* Right: checkbox */}
                  <Col
                    style={{
                      textAlign: 'right',
                      width: 60,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <div style={{ transform: 'scale(1.3)' }}>
                      <Checkbox
                        checked={selectedOrders.some((o) => o._id === item._id)}
                        onChange={(e) => handleSelect(e.target.checked, item)}
                      />
                    </div>
                  </Col>
                </Row>
              </Card>
            )}
          />
        )}
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
