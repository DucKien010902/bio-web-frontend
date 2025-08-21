import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons';
import { Button, Col, Form, Input, message, Row, Typography } from 'antd';
import { useRef, useState } from 'react';
import { LuPhone } from 'react-icons/lu';
import { MdOutlineLock } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/apiConfig';
import firebase from '../../config/firebase-config';

const { Title, Text } = Typography;

const LoginPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 797 });
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);
  const [step, setStep] = useState('login');
  const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';

  const recaptchaVerifierRef = useRef(null); // ✅ lưu reCAPTCHA vào ref

  const setupRecaptcha = async () => {
    if (!recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new firebase.auth.RecaptchaVerifier(
        'sign-in-button',
        {
          size: 'invisible',
          callback: (response) => {
            console.log('reCAPTCHA resolved');
          },
          defaultCountry: 'VN',
        }
      );

      try {
        await recaptchaVerifierRef.current.render();
      } catch (err) {
        console.error('reCAPTCHA render error:', err);
      }
    }
  };

  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      return message.warning('Vui lòng nhập đầy đủ thông tin!');
    }

    try {
      setLoading(true);
      const response = await axiosClient.post('/users/checkaccount', {
        phoneNumber,
        password,
      });

      const user = response.data.user;
      const token = response.data.token;
      if (user.role === 'customer') {
        const formattedPhone = '+84' + phoneNumber.slice(1);
        await setupRecaptcha();
        const confirmation = await firebase
          .auth()
          .signInWithPhoneNumber(formattedPhone, recaptchaVerifierRef.current);

        setConfirmResult(confirmation);
        setStep('otp');
        sessionStorage.setItem('tempUser', JSON.stringify(user));
        sessionStorage.setItem('token', token);
        console.log(token);
        message.success('Đã gửi mã OTP');
      } else {
        // 👉 Lưu thông tin user vào localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('phoneNumber', user.phoneNumber);

        // 👉 Điều hướng theo vai trò
        switch (user.role) {
          case 'advisor':
            navigate('/tu-van-vien');
            break;
          case 'coordinator':
            navigate('/dieu-phoi-vien');
            break;
          case 'shop':
            navigate('/shop');
            break;
          default:
            navigate('/quan-tri-vien');
            break;
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        message.warning(error.response.data.message);
      } else {
        message.error('Lỗi kết nối máy chủ hoặc gửi OTP!');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    if (!confirmResult) return message.error('Không có thông tin xác thực OTP');
    try {
      await confirmResult.confirm(otp);
      message.success('Xác thực thành công');
      const tempUser = JSON.parse(sessionStorage.getItem('tempUser'));
      if (!tempUser) return message.error('Không tìm thấy người dùng tạm thời');

      localStorage.setItem('user', JSON.stringify(tempUser));
      localStorage.setItem('phoneNumber', tempUser.phoneNumber);
      sessionStorage.removeItem('tempUser');
      if (redirectPath == '/y-te/tai-khoan') {
        navigate(redirectPath, { state: { key: 'tickets' } });
      } else {
        navigate(redirectPath);
      }
      localStorage.removeItem('redirectAfterLogin');
    } catch (error) {
      console.error('OTP error:', error);
      message.error('Mã OTP không chính xác');
    }
  };

  return (
    <Row
      style={{
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundImage:
          "url('https://p16-hera-sg.larksuitecdn.com/tos-alisg-i-hn4qzgxq2n-sg/b2432d9ed2dc49b68258bf9f7bfae6fa.avif~tplv-hn4qzgxq2n-image-v1:0:0.image')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
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
          padding: '40px',
          height: '100vh',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 24, left: 24 }}>
          <ArrowLeftOutlined
            style={{ fontSize: 24, color: '#1890ff', cursor: 'pointer' }}
            onClick={() => {
              console.log(redirectPath);
              navigate(redirectPath);
            }}
            tabIndex={0}
          />
        </div>

        <div style={{ maxWidth: 400, width: '100%' }}>
          <Title
            level={2}
            style={{
              color: '#1890ff',
              fontFamily: 'cursive',
              fontSize: isMobile ? 50 : 60,
              display: 'flex',
              marginBottom: isMobile ? 0 : 30,
              justifyContent: 'center',
            }}
          >
            GennovaX
          </Title>
          <Text
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 8,
              marginBottom: 32,
              fontFamily: 'cursive',
            }}
          >
            Vui lòng đăng nhập để tiếp tục
          </Text>

          {step === 'login' ? (
            <Form layout="vertical">
              <Form.Item
                label={<span style={{ fontWeight: 500 }}>Số điện thoại:</span>}
              >
                <Input
                  size="large"
                  placeholder="Nhập số điện thoại"
                  prefix={
                    <LuPhone
                      style={{
                        color: '#bf17a9ff',
                        fontSize: 18,
                        marginRight: 5,
                      }}
                    />
                  }
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ borderRadius: 8, height: 50 }}
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ fontWeight: 500 }}>Nhập mật khẩu:</span>}
              >
                <Input.Password
                  size="large"
                  placeholder="Nhập mật khẩu:"
                  prefix={
                    <MdOutlineLock
                      style={{
                        color: '#bf17a9ff',
                        fontSize: 20,
                        marginRight: 5,
                      }}
                    />
                  }
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ borderRadius: 8, height: 50 }}
                  onPressEnter={handleLogin}
                />
              </Form.Item>

              <Button
                type="primary"
                size="large"
                block
                loading={loading}
                style={{
                  backgroundColor: '#1890ff',
                  borderRadius: 8,
                  fontWeight: 600,
                  height: 50,
                }}
                onClick={handleLogin}
              >
                Đăng nhập
              </Button>
            </Form>
          ) : (
            <>
              <Input
                size="large"
                placeholder="Nhập mã OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ marginBottom: 16, borderRadius: 8, height: 50 }}
                onPressEnter={handleOtpVerify}
              />
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
                onClick={handleOtpVerify}
              >
                Xác nhận OTP
              </Button>
            </>
          )}

          <div
            style={{
              marginTop: 16,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <a
              tabIndex={0}
              onClick={() => navigate('/register')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate('/register');
              }}
              style={{ color: '#1890ff', cursor: 'pointer' }}
            >
              Đăng kí tài khoản 👈
            </a>
            <a
              tabIndex={0}
              onClick={() => navigate('/quen-mat-khau')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') console.log('Quên mật khẩu');
              }}
              style={{ color: '#1890ff', cursor: 'pointer' }}
            >
              Quên mật khẩu ?
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
            'url("https://watermark.lovepik.com/photo/20211122/large/lovepik-images-of-doctors-and-nurses-picture_500737527.jpg")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }}
      />

      {/* ✅ reCAPTCHA gắn ẩn và không bị render lại */}
      <div id="sign-in-button" style={{ display: 'none' }}></div>
    </Row>
  );
};

export default LoginPage;
