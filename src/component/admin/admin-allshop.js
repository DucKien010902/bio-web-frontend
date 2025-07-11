import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  Space,
  Switch,
  message,
  Typography,
} from 'antd';
import axios from 'axios';
import axiosClient from '../../api/apiConfig';
const { Title } = Typography;

const ShopManagementPage = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();

  // 📥 Lấy dữ liệu shop từ server
  const fetchShops = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get('/shop/fetchAllShop'); // tùy vào route backend bạn định nghĩa
      console.log(res.data);
      setShops(res.data);
    } catch (err) {
      message.error('Lỗi khi tải danh sách shop');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  // 🆕 Thêm shop mới
  const handleAdd = async (values) => {
    try {
      await axios.post('/api/shops', values);
      message.success('Thêm shop thành công');
      setOpenModal(false);
      form.resetFields();
      fetchShops();
    } catch (err) {
      message.error('Lỗi khi thêm shop');
    }
  };

  // ❌ Xóa shop
  const handleDelete = async (shopID) => {
    try {
      await axios.delete(`/api/shops/${shopID}`);
      message.success('Đã xóa shop');
      fetchShops();
    } catch {
      message.error('Xóa shop thất bại');
    }
  };

  // ✅ Toggle trạng thái hoạt động
  const toggleOnline = async (shopID, verified) => {
    try {
      await axios.patch(`/api/shops/${shopID}`, { verified: !verified });
      fetchShops();
    } catch {
      message.error('Không thể cập nhật trạng thái');
    }
  };

  const columns = [
    { title: 'Tên shop', dataIndex: 'shopName', key: 'shopName' },
    { title: 'SĐT', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    {
      title: 'Avatar',
      dataIndex: 'avatarUrl',
      render: (url) => <img src={url} alt="avatar" width={40} />,
    },
    // {
    //   title: 'Ảnh bìa',
    //   dataIndex: 'coverUrl',
    //   render: (url) => <img src={url} alt="cover" width={60} />,
    // },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
    {
      title: 'Hoạt động',
      dataIndex: 'verified',
      render: (text, record) => (
        <Switch
          checked={record.verified}
          onChange={() => toggleOnline(record.shopID, record.verified)}
        />
      ),
    },
    // { title: 'Sản phẩm', dataIndex: 'productsCount' },
    // { title: 'Đánh giá', dataIndex: 'ratingCount' },
    // { title: 'Tỉ lệ phản hồi', dataIndex: 'replyRate', render: (r) => `${r}%` },
    // { title: 'Thời gian phản hồi', dataIndex: 'replyTime' },
    {
      title: 'Ngày tham gia',
      dataIndex: 'joinedAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    // { title: 'Lượt theo dõi', dataIndex: 'followerCount' },
    { title: 'Mô tả', dataIndex: 'description' },
    // {
    //   title: 'Xác minh',
    //   dataIndex: 'verified',
    //   render: (val) => (val ? '✅' : '❌'),
    // },
    {
      title: 'Thao tác',
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Bạn có chắc muốn xóa shop này?"
            onConfirm={() => handleDelete(record.shopID)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* <Title level={2} style={{ textAlign: 'center' }}>
        Quản lý Shop
      </Title> */}
      <Button
        type="primary"
        onClick={() => setOpenModal(true)}
        style={{ marginBottom: 16 }}
      >
        Thêm Shop
      </Button>
      <Table
        columns={columns}
        dataSource={shops}
        rowKey="shopID"
        loading={loading}
        scroll={{ x: 'max-content' }}
      />

      {/* Modal Thêm Shop */}
      <Modal
        title="Thêm Shop"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={handleAdd}>
          <Form.Item name="shopID" label="Shop ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="shopName"
            label="Tên shop"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="avatarUrl" label="Avatar URL">
            <Input />
          </Form.Item>
          {/* <Form.Item name="coverUrl" label="Ảnh bìa URL">
            <Input />
          </Form.Item> */}
          <Form.Item name="address" label="Địa chỉ">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ShopManagementPage;
