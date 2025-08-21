import React, { useState, useRef } from 'react';
import { Input, Button, Typography, Row, Col, message } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import firebase from '../../config/firebase-config';
import axiosClient from '../../api/apiConfig';

const { Title, Text } = Typography;

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState('phone'); // phone -> otp -> resetPassword
  const [loading, setLoading] = useState(false);
  const confirmResultRef = useRef(null);
  const recaptchaVerifierRef = useRef(null);

  // Khởi tạo reCAPTCHA
  const setupRecaptcha = async () => {
    if (!recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new firebase.auth.RecaptchaVerifier(
        'forgot-password-recaptcha',
        {
          size: 'invisible',
          callback: () => console.log('reCAPTCHA resolved'),
          defaultCountry: 'VN',
        }
      );
      await recaptchaVerifierRef.current.render();
    }
  };

  // Bước 1: Gửi OTP
  const handleSendOtp = async () => {
    if (!phoneNumber) return message.warning('Vui lòng nhập số điện thoại!');
    try {
      setLoading(true);
      await setupRecaptcha();
      const formattedPhone = '+84' + phoneNumber.slice(1);
      const confirmation = await firebase
        .auth()
        .signInWithPhoneNumber(formattedPhone, recaptchaVerifierRef.current);

      confirmResultRef.current = confirmation;
      setStep('otp');
      message.success('Đã gửi mã OTP');
    } catch (error) {
      console.error(error);
      message.error('Không gửi được OTP, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  // Bước 2: Xác thực OTP
  const handleVerifyOtp = async () => {
    if (!otp) return message.warning('Vui lòng nhập mã OTP!');
    try {
      setLoading(true);
      await confirmResultRef.current.confirm(otp);
      setStep('resetPassword');
      message.success('Xác thực OTP thành công!');
    } catch (error) {
      console.error(error);
      message.error('Mã OTP không chính xác!');
    } finally {
      setLoading(false);
    }
  };

  // Bước 3: Đổi mật khẩu
  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      return message.warning('Vui lòng nhập đầy đủ mật khẩu!');
    }
    if (newPassword !== confirmPassword) {
      return message.error('Mật khẩu xác nhận không khớp!');
    }
    try {
      setLoading(true);
      await axiosClient.post('/users/resetpassword', {
        phoneNumber,
        newPassword,
      });
      message.success('Đổi mật khẩu thành công!');
      navigate('/login');
    } catch (error) {
      console.error(error);
      message.error(
        error.response?.data?.message || 'Có lỗi xảy ra khi đổi mật khẩu!'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row
      style={{
        minHeight: '100vh',
        backgroundImage:
          "url('https://p16-hera-sg.larksuitecdn.com/tos-alisg-i-hn4qzgxq2n-sg/b2432d9ed2dc49b68258bf9f7bfae6fa.avif~tplv-hn4qzgxq2n-image-v1:0:0.image')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
            onClick={() => navigate('/login')}
          />
        </div>

        <div style={{ maxWidth: 400, width: '100%' }}>
          <Title
            level={2}
            style={{
              color: '#1890ff',
              fontFamily: 'cursive',
              fontSize: 40,
              textAlign: 'center',
            }}
          >
            Quên mật khẩu
          </Title>
          <Text
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 32,
            }}
          >
            {step === 'phone' && 'Nhập số điện thoại để nhận OTP'}
            {step === 'otp' && 'Nhập mã OTP vừa nhận'}
            {step === 'resetPassword' && 'Nhập mật khẩu mới của bạn'}
          </Text>

          {step === 'phone' && (
            <>
              <Input
                size="large"
                placeholder="Nhập số điện thoại"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{ marginBottom: 16, borderRadius: 8, height: 50 }}
                onPressEnter={handleSendOtp}
              />
              <Button
                type="primary"
                size="large"
                block
                loading={loading}
                onClick={handleSendOtp}
              >
                Tiếp tục
              </Button>
            </>
          )}

          {step === 'otp' && (
            <>
              <Input
                size="large"
                placeholder="Nhập mã OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ marginBottom: 16, borderRadius: 8, height: 50 }}
                onPressEnter={handleVerifyOtp}
              />
              <Button
                type="primary"
                size="large"
                block
                loading={loading}
                onClick={handleVerifyOtp}
              >
                Xác nhận OTP
              </Button>
            </>
          )}

          {step === 'resetPassword' && (
            <>
              <Input.Password
                size="large"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ marginBottom: 16, borderRadius: 8, height: 50 }}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              <Input.Password
                size="large"
                placeholder="Xác nhận mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ marginBottom: 16, borderRadius: 8, height: 50 }}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              <Button
                type="primary"
                size="large"
                block
                loading={loading}
                onClick={handleResetPassword}
              >
                Đổi mật khẩu
              </Button>
            </>
          )}
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

      {/* reCAPTCHA ẩn */}
      <div id="forgot-password-recaptcha" style={{ display: 'none' }}></div>
    </Row>
  );
};

export default ForgotPasswordPage;
