import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Button } from 'antd';

const { Title, Text } = Typography;

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return <Text>Không có dữ liệu đặt lịch.</Text>;
  }

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#e8f4fd',
        padding: 16,
      }}
    >
      <Card
        style={{
          maxWidth: '50%',
          width: '100%',
          padding: 24,
          borderRadius: 16,
          background: '#ffffffee',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}
      >
        <Title level={3} style={{ color: '#00b5f1' }}>
          🎉 Đặt lịch thành công!
        </Title>
        <Text style={{ fontSize: 16 }}>
          Cảm ơn bạn đã đặt lịch xét nghiệm. Nhân viên tư vấn sẽ liên hệ với bạn
          sớm nhất.
          <br /> Dưới đây là thông tin chi tiết:
        </Text>

        <div
          style={{
            marginTop: 20,
            display: 'grid',
            gridTemplateColumns: '150px 1fr',
            rowGap: 12,
            lineHeight: 1.8,
            textAlign: 'left',
          }}
        >
          <Text strong>Họ và tên:</Text> <Text>{data.name}</Text>
          <Text strong>Số điện thoại:</Text> <Text>{data.phone}</Text>
          <Text strong>Địa chỉ:</Text> <Text>{data.location}</Text>
          <Text strong>Ngày hẹn:</Text> <Text>{data.date}</Text>
          <Text strong>Khung giờ:</Text> <Text>{data.time}</Text>
          <Text strong>Cơ sở xét nghiệm:</Text> <Text>{data.facility}</Text>
          {/* <Text strong>ID cơ sở xét nghiệm:</Text>{' '}
          <Text>{data.facilityID}</Text> */}
          {/* <Text strong>ID dịch vụ xét nghiệm:</Text>{' '}
          <Text>{data.serviceCode}</Text> */}
          <Text strong>Dịch vụ xét nghiệm:</Text>{' '}
          <Text>{data.serviceName}</Text>
        </div>

        <Button
          type="primary"
          style={{
            marginTop: 24,
            borderRadius: 25,
            width: 180,
            height: 40,
            fontWeight: 500,
            background: 'linear-gradient(36deg, #00b5f1, #00e0ff)',
          }}
          onClick={() => navigate('/mainbio')}
        >
          Quay lại trang chủ
        </Button>
      </Card>
    </div>
  );
};

export default BookingSuccess;
