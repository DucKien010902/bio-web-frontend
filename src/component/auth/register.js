import React, { useState } from 'react';
import { Input, Button, Typography, Row, Col, DatePicker, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axiosClient from '../../api/apiConfig';

const { Title } = Typography;

const LabelInput = ({ label, children }) => (
  <Row style={{ marginBottom: 16 }} align="middle">
    <Col span={8} style={{ fontWeight: 500 }}>
      {label}
    </Col>
    <Col span={16}>{children}</Col>
  </Row>
);

const RegisterPage = () => {
  const navigate = useNavigate();

  // State lưu thông tin người dùng
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    console.log(phone, name, password, confirmPassword);
    if (!phone || !name || !password || !confirmPassword) {
      console.log('error');
      message.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (password !== confirmPassword) {
      message.error('Mật khẩu không khớp!');
      return;
    }

    const userData = {
      phoneNumber: phone,
      name,
      password,
    };
    try {
      console.log(phone, name, password);
      const res = await axiosClient.post('/users/createaccount', userData);
      message.success('Da tao tai khoan thanh cong');
      navigate('/login');
    } catch (error) {
      message.error('Khong the tao tai khoan');
    }
  };

  return (
    <Row
      style={{
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Col
        xs={24}
        md={12}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <div style={{ maxWidth: 600, width: '100%', paddingBottom: 120 }}>
          <Title
            level={2}
            style={{
              color: '#1890ff',
              fontFamily: 'cursive',
              fontSize: 60,
              textAlign: 'center',
            }}
          >
            GennovaX
          </Title>
          <p
            style={{
              textAlign: 'center',
              marginBottom: 32,
              fontFamily: 'cursive',
            }}
          >
            Tạo tài khoản mới
          </p>
          <LabelInput label="Họ và tên:">
            <Input
              size="large"
              style={{ borderRadius: 8, height: 40 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </LabelInput>

          <LabelInput label="Số điện thoại:">
            <Input
              size="large"
              style={{ borderRadius: 8, height: 40 }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </LabelInput>

          <LabelInput label="Mật khẩu:">
            <Input.Password
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              style={{ borderRadius: 8, height: 40 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </LabelInput>

          <LabelInput label="Nhập lại mật khẩu:">
            <Input.Password
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              style={{ borderRadius: 8, height: 40 }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </LabelInput>

          <Row justify="end" style={{ marginTop: 24 }}>
            <Col span={16}>
              <Button
                type="primary"
                size="large"
                block
                style={{
                  backgroundColor: '#1890ff',
                  borderRadius: 8,
                  fontWeight: 600,
                  height: 50,
                }}
                onClick={handleRegister}
              >
                Đăng ký
              </Button>
            </Col>
          </Row>

          <div
            style={{
              marginTop: 16,
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <a
              style={{ color: '#1890ff', marginLeft: 20 }}
              onClick={() => navigate('/login')}
            >
              Đã có tài khoản ➡ Đăng nhập ngay
            </a>
          </div>
        </div>
      </Col>

      <Col
        xs={0}
        md={12}
        style={{
          position: 'relative',
          backgroundImage:
            'url("https://res.cloudinary.com/da6f4dmql/image/upload/v1746512082/samples/balloons.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 30,
            right: 30,
            color: '#fff',
            textAlign: 'center',
            fontStyle: 'italic',
            fontSize: 20,
            textShadow: '0 2px 6px rgba(0,0,0,0.4)',
          }}
        >
          “Bắt đầu hành trình <b>chăm sóc sức khỏe</b> toàn diện cùng GenBio”
        </div>
      </Col>
    </Row>
  );
};

export default RegisterPage;
