import React from 'react';
import {
  Form,
  Input,
  Button,
  Upload,
  Radio,
  DatePicker,
  Typography,
  Avatar,
} from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // thêm dòng này

const { Title } = Typography;

const ProfileContent = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate(); // khởi tạo hook điều hướng
  const user = JSON.parse(localStorage.getItem('user'));

  const onFinish = (values) => {
    console.log('Form submitted:', values);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // xoá thông tin đăng nhập
    navigate('/login'); // điều hướng về trang đăng nhập
  };

  return (
    <div style={{ padding: '10px 20px' }}>
      <Title level={4}>Hồ Sơ Của Tôi</Title>
      <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          phoneNumber: user?.phoneNumber,
          name: user?.fullName,
          email: user?.email,
          address: user?.address,
          gender: 'male',
          birthday: null,
        }}
      >
        <Form.Item label="Số điện thoại" name="phoneNumber">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Tên" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Địa chỉ" name="address">
          <Input />
        </Form.Item>
        <Form.Item label="Giới tính" name="gender">
          <Radio.Group>
            <Radio value="male">Nam</Radio>
            <Radio value="female">Nữ</Radio>
            <Radio value="other">Khác</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Ngày sinh" name="birthday">
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
        <Form.Item>
          <Button danger onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileContent;
