// src/pages/OrderHistory.jsx
import React, { useEffect, useState } from 'react';
import {
  Layout,
  Typography,
  Row,
  Col,
  Card,
  Image,
  Tag,
  Divider,
  Spin,
  Empty,
} from 'antd';
import { GiShop } from 'react-icons/gi';
import axiosClient from '../../api/apiConfig'; // đường dẫn đúng đến config axios của bạn

const { Content } = Layout;
const { Text, Title } = Typography;

const statusColorMap = {
  'Đã đặt đơn': 'blue',
  'Đang chuẩn bị hàng': 'orange',
  'Đã giao cho đơn vị vận chuyển': 'cyan',
  'Đang vận chuyển': 'purple',
  'Đã giao hàng': 'green',
  'Đã hủy': 'red',
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (value) =>
    value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.phoneNumber) {
          setOrders([]);
          return;
        }

        const res = await axiosClient.get(
          `/order/getOrderHistorybyPhone?phone=${user.phoneNumber}`
        );

        const formattedOrders = res.data.map((o) => ({
          orderId: o.orderID,
          status: o.status,
          createdAt: o.createdAt,
          total: o.totalPrice,
          shopName: o.shopName,
          items: [
            {
              productName: o.productName,
              image: o.productImage || '', // cần thêm nếu backend trả ảnh
              category: o.productCategory,
              quantify: o.totalCount,
              price: o.productPrice,
              vouncher: 0,
            },
          ],
        }));

        setOrders(formattedOrders);
      } catch (error) {
        console.error('Lỗi lấy đơn hàng:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Layout style={{ background: '#f5f5f5', minHeight: '100vh', padding: 20 }}>
      <Content>
        <Title level={4}>🍟 Lịch sử đơn hàng</Title>

        {loading ? (
          <Spin />
        ) : orders.length === 0 ? (
          <Empty description="Không có đơn hàng nào" />
        ) : (
          orders.map((order, idx) => (
            <Card
              key={idx}
              style={{
                marginBottom: 24,
                borderRadius: 12,
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              }}
              bodyStyle={{ padding: 20 }}
            >
              <Row justify="space-between" align="middle">
                <Col>
                  <Text style={{ color: '#db625c', fontWeight: 'bold' }}>
                    <GiShop style={{ color: 'orange', marginRight: 5 }} />
                    {order.shopName}
                  </Text>
                  <br />
                  <Text strong>Mã đơn hàng: {order.orderId}</Text>
                  <br />
                  <Text type="secondary">
                    Ngày đặt:{' '}
                    {new Date(order.createdAt).toLocaleString('vi-VN')}
                  </Text>
                </Col>
                <Col style={{ textAlign: 'right' }}>
                  <Tag color={statusColorMap[order.status] || 'default'}>
                    {order.status}
                  </Tag>
                  <br />
                  <Text
                    style={{
                      color: '#b50920',
                      fontWeight: 500,
                      marginTop: 10,
                      fontSize: 16,
                      display: 'block',
                    }}
                  >
                    Tổng tiền: {formatCurrency(order.total * 1000)}
                  </Text>
                </Col>
              </Row>

              <Divider style={{ margin: '16px 0' }} />

              {order.items.map((item, index) => (
                <Row
                  key={index}
                  gutter={16}
                  style={{
                    padding: '12px 0',
                    borderBottom:
                      index !== order.items.length - 1
                        ? '1px solid #f0f0f0'
                        : 'none',
                  }}
                >
                  <Col xs={24} sm={4}>
                    <Image
                      src={
                        item.image ||
                        'https://via.placeholder.com/80?text=No+Image'
                      }
                      width={80}
                    />
                  </Col>
                  <Col xs={24} sm={14}>
                    <Text strong>{item.productName}</Text>
                    <div style={{ color: '#888' }}>
                      Phân loại: {item.category}
                    </div>
                    {item.quantity === 1 ? (
                      <div style={{ color: '#888' }}>x1</div>
                    ) : (
                      <div style={{ color: '#888' }}>
                        Số lượng: x{item.quantify}
                      </div>
                    )}
                    {item.vouncher > 0 && (
                      <Tag color="red">Giảm {item.vouncher}%</Tag>
                    )}
                  </Col>
                  <Col
                    xs={24}
                    sm={6}
                    style={{ textAlign: 'right', marginTop: 4 }}
                  >
                    <Text style={{ color: '#ee4d2d', fontWeight: 500 }}>
                      {formatCurrency(item.price * item.quantify * 1000)}
                    </Text>
                  </Col>
                </Row>
              ))}
            </Card>
          ))
        )}
      </Content>
    </Layout>
  );
};

export default OrderHistory;
