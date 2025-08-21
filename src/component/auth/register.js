import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons';
import { Button, Col, Input, message, Row, Typography } from 'antd';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/apiConfig';

const { Title } = Typography;

// Component dùng chung cho label + input
const LabelInput = ({ label, children, isMobile }) => {
  return isMobile ? (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontWeight: 500, marginBottom: 6 }}>{label}</div>
      <div>{children}</div>
    </div>
  ) : (
    <Row style={{ marginBottom: 16 }} align="middle">
      <Col span={8} style={{ fontWeight: 500 }}>
        {label}
      </Col>
      <Col span={16}>{children}</Col>
    </Row>
  );
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!phone || !name || !password || !confirmPassword) {
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
      await axiosClient.post('/users/createaccount', userData);
      message.success('Tạo tài khoản thành công');
      navigate('/login');
    } catch (error) {
      message.error('Không thể tạo tài khoản');
    }
  };

  const formContent = (
    <div
      style={{
        maxWidth: 600,
        width: '100%',
        padding: isMobile ? '20px' : '0 32px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div style={{ position: 'absolute', top: 24, left: 24 }}>
        <ArrowLeftOutlined
          style={{ fontSize: 24, color: '#1890ff', cursor: 'pointer' }}
          onClick={() => navigate('/login')}
        />
      </div>
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

      <LabelInput label="Họ và tên:" isMobile={isMobile}>
        <Input
          size="large"
          style={{ borderRadius: 8, height: 40 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập họ và tên"
        />
      </LabelInput>

      <LabelInput label="Số điện thoại:" isMobile={isMobile}>
        <Input
          size="large"
          style={{ borderRadius: 8, height: 40 }}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Nhập số điện thoại"
        />
      </LabelInput>

      <LabelInput label="Mật khẩu:" isMobile={isMobile}>
        <Input.Password
          size="large"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          style={{ borderRadius: 8, height: 40 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nhập mật khẩu"
        />
      </LabelInput>

      <LabelInput label="Nhập lại mật khẩu:" isMobile={isMobile}>
        <Input.Password
          size="large"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          style={{ borderRadius: 8, height: 40 }}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Nhập lại mật khẩu"
        />
      </LabelInput>

      <div style={{ marginTop: 24 }}>
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
      </div>
    </div>
  );

  return (
    <Row
      style={{
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundImage:
          "url('https://p16-hera-sg.larksuitecdn.com/tos-alisg-i-hn4qzgxq2n-sg/b2432d9ed2dc49b68258bf9f7bfae6fa.avif~tplv-hn4qzgxq2n-image-v1:0:0.image')",
      }}
    >
      {isMobile ? (
        <Col span={24} style={{ paddingTop: 40 }}>
          {formContent}
        </Col>
      ) : (
        <>
          <Col
            md={12}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              height: '100vh',
            }}
          >
            {formContent}
          </Col>
          <Col
            md={12}
            style={{
              position: 'relative',
              backgroundImage:
                'url("https://watermark.lovepik.com/photo/20211122/large/lovepik-images-of-doctors-and-nurses-picture_500737527.jpg")',
              backgroundSize: 'contain',
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
              “Bắt đầu hành trình <b>chăm sóc sức khỏe</b> toàn diện cùng
              GennovaX”
            </div>
          </Col>
        </>
      )}
    </Row>
  );
};

export default RegisterPage;
