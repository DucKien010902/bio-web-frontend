import React, { useEffect, useState, useRef } from 'react';
import {
  Descriptions,
  Avatar,
  Input,
  DatePicker,
  InputNumber,
  Button,
  Form,
  Typography,
  Tag,
  message,
  Modal,
} from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axiosClient from '../../api/apiConfig';

dayjs.extend(relativeTime);
const { Title, Text } = Typography;

const ShopDetail = () => {
  const [form] = Form.useForm();
  const [shop, setShop] = useState(null);
  const coverInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  const fetchShopInfo = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('shopInfo'));
      setShop(data);
      form.setFieldsValue({
        ...data,
        joinedAt: dayjs(data.joinedAt),
      });
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu shop:', error);
    }
  };

  useEffect(() => {
    fetchShopInfo();
  }, []);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'DucKien');
    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/da6f4dmql/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error('Lỗi upload ảnh:', err);
      message.error('Không thể tải ảnh lên');
      return null;
    }
  };

  const handleImageChange = (type, file) => {
    Modal.confirm({
      title: `Xác nhận thay đổi ${
        type === 'coverUrl' ? 'ảnh bìa' : 'ảnh đại diện'
      }`,
      content: 'Bạn có chắc muốn thay ảnh này không?',
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk: async () => {
        const cloudUrl = await uploadToCloudinary(file);
        if (cloudUrl) {
          const updatedData = { ...shop, [type]: cloudUrl };
          await axiosClient.put(`/shop/update/${shop.shopID}`, updatedData);
          localStorage.setItem('shopInfo', JSON.stringify(updatedData));
          setShop(updatedData);
          form.setFieldsValue({ [type]: cloudUrl });
          message.success('Ảnh đã được cập nhật');
        }
      },
    });
  };

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
      <div
        style={{
          position: 'relative',
          textAlign: 'start',
          marginBottom: 80,
        }}
      >
        {/* Ảnh bìa */}
        <img
          src={shop.coverUrl}
          alt="cover"
          style={{
            width: '40%',
            height: 160,
            objectFit: 'cover',
            borderRadius: 8,
          }}
        />
        {/* Nút đổi ảnh bìa */}
        <Button
          shape="circle"
          icon={<CameraOutlined />}
          style={{
            position: 'absolute',
            top: 16,
            left: '36%',
            background: '#fff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          }}
          onClick={() => coverInputRef.current.click()}
        />
        <input
          type="file"
          accept="image/*"
          ref={coverInputRef}
          onChange={(e) => handleImageChange('coverUrl', e.target.files[0])}
          style={{ display: 'none' }}
        />

        {/* Ảnh đại diện */}
        <div
          style={{
            position: 'absolute',
            bottom: -70,
            left: '20%',
            transform: 'translateX(-50%)',
          }}
        >
          <Avatar size={80} src={shop.avatarUrl} />
          <Button
            size="small"
            icon={<CameraOutlined />}
            style={{ display: 'block', margin: '8px auto' }}
            onClick={() => avatarInputRef.current.click()}
          >
            Đổi ảnh
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={avatarInputRef}
            onChange={(e) => handleImageChange('avatarUrl', e.target.files[0])}
            style={{ display: 'none' }}
          />
        </div>
      </div>

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
            <Text>14</Text>
          </Descriptions.Item>

          <Descriptions.Item label="Ảnh bìa (cover)">
            <Form.Item name="coverUrl" noStyle>
              <Input disabled />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Ảnh đại diện (avatar)">
            <Form.Item name="avatarUrl" noStyle>
              <Input disabled />
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
        </Descriptions>

        <Button type="primary" htmlType="submit" style={{ marginTop: 24 }}>
          Lưu chỉnh sửa
        </Button>
      </Form>
    </div>
  );
};

export default ShopDetail;
