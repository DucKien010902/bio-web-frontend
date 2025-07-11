import React, { useEffect, useState } from 'react';
import {
  Descriptions,
  Avatar,
  Input,
  Switch,
  DatePicker,
  InputNumber,
  Button,
  Form,
  Typography,
  Space,
  Tag,
  message,
} from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axiosClient from '../../api/apiConfig';
dayjs.extend(relativeTime);

const { Title, Text } = Typography;

const ShopDetail = () => {
  const [form] = Form.useForm();
  const [shop, setShop] = useState(null);
  const phoneNumber = JSON.parse(localStorage.getItem('user')).phoneNumber;
  const fetchShopInfo = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('shopInfo'));
      setShop(data);
      form.setFieldsValue({
        ...data,
        joinedAt: dayjs(data.joinedAt),
      });
    } catch (error) {}
  };

  useEffect(() => {
    fetchShopInfo();
  }, []);
  const onFinish = async (values) => {
    try {
      const updatedData = {
        ...shop,
        ...values,
        joinedAt: values.joinedAt.toISOString(),
      };

      await axiosClient.put(`/shop/update/${shop.shopID}`, updatedData);
      message.success('Cập nhật thành công');
      localStorage.setItem('shopInfo', JSON.stringify(updatedData));
      setShop(updatedData);
    } catch (err) {
      message.error('Cập nhật thất bại');
    }
  };

  if (!shop) return <div>Đang tải thông tin shop...</div>;

  return (
    <div style={{ padding: 24 }}>
      {/* <Title level={3}>Thông tin chi tiết Shop</Title> */}

      <Space style={{ marginBottom: 24 }}>
        <Avatar size={100} src={shop.avatarUrl} />
        <div>
          <Title level={4}>{shop.shopName}</Title>
          <Text type="secondary">Mã Shop: {shop.shopID}</Text>
        </div>
      </Space>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Descriptions bordered column={2} size="middle">
          <Descriptions.Item label="Tên shop">
            <Text strong>{shop.shopName}</Text>
          </Descriptions.Item>

          <Descriptions.Item label="Số điện thoại">
            <Form.Item name="phoneNumber" noStyle>
              <Input />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Địa chỉ">
            <Form.Item name="address" noStyle>
              <Input />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Đang theo dõi">
            <Text style={{ marginLeft: 8 }}>14</Text>
          </Descriptions.Item>

          <Descriptions.Item label="Ảnh bìa (cover)">
            <Form.Item name="coverUrl" noStyle>
              <Input />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Ảnh đại diện (avatar)">
            <Form.Item name="avatarUrl" noStyle>
              <Input />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Ngày tham gia">
            <Form.Item name="joinedAt" noStyle>
              <DatePicker disabled style={{ width: '100%' }} />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Mô tả thêm">
            <Form.Item name="description" noStyle>
              <Input.TextArea rows={2} />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Tỷ lệ phản hồi">
            <Tag color="blue">{shop.replyRate}%</Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Thời gian phản hồi">
            <Text>{shop.replyTime}</Text>
          </Descriptions.Item>

          <Descriptions.Item label="Số lượng sản phẩm">
            <Form.Item name="productsCount" noStyle>
              <Input />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Số lượt đánh giá">
            <InputNumber value={shop.ratingCount} disabled />
          </Descriptions.Item>

          <Descriptions.Item label="Người theo dõi">
            <InputNumber value={shop.followerCount} disabled />
          </Descriptions.Item>

          <Descriptions.Item label="Xác minh">
            <Tag color={shop.verified ? 'green' : 'red'}>
              {shop.verified ? 'Đã xác minh' : 'Chưa xác minh'}
            </Tag>
          </Descriptions.Item>

          {/* <Descriptions.Item label="Danh sách sản phẩm" span={2}>
            <ul style={{ paddingLeft: 20 }}>
              {shop.productIds?.map((id) => (
                <li key={id}>
                  <Text copyable>{id}</Text>
                </li>
              ))}
            </ul>
          </Descriptions.Item> */}
        </Descriptions>

        <Button type="primary" htmlType="submit" style={{ marginTop: 24 }}>
          Lưu chỉnh sửa
        </Button>
      </Form>
    </div>
  );
};

export default ShopDetail;
