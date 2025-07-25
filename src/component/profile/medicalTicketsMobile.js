import React, { useEffect, useState } from 'react';
import { Card, Steps, Tag, Divider, Empty } from 'antd';
import axiosClient from '../../api/apiConfig';
import { useMediaQuery } from 'react-responsive';

const { Step } = Steps;

const statusSteps = [
  'Đã đặt đơn',
  'Đã xác nhận',
  'Đã thu mẫu',
  'Đang xét nghiệm',
  'Đã có kết quả',
];

const getCurrentStep = (status) => statusSteps.indexOf(status);

const statusColors = {
  'Đã đặt đơn': 'orange',
  'Đã xác nhận': 'blue',
  'Đã thu mẫu': 'purple',
  'Đang xét nghiệm': '#c804cf',
  'Đã có kết quả': 'green',
};

const MedicalTicketsMobile = () => {
  const isMobile = useMediaQuery({ maxWidth: 797 });
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const phone = JSON.parse(localStorage.getItem('user')).phoneNumber;
  const [mockBookings, setMockBookings] = useState([]);

  const fetchMedicalTicket = async () => {
    try {
      const res = await axiosClient.get(`/booking/fetchbyphone?phone=${phone}`);
      const sortedData = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      console.log(sortedData);
      setMockBookings(sortedData);
    } catch (error) {
      console.log('Không thể lấy lịch sử phiếu');
    }
  };

  useEffect(() => {
    fetchMedicalTicket();
  }, []);

  const MobileLayout = () => {
    return (
      <div style={{ padding: '12px' }}>
        <h3 style={{ marginBottom: 12 }}>Lịch sử xét nghiệm</h3>
        {mockBookings.length > 0 ? (
          mockBookings.map((ticket) => (
            <Card
              key={ticket.bookID}
              type="inner"
              title={
                <span style={{ fontSize: 14 }}>Mã phiếu: {ticket.bookID}</span>
              }
              size="small"
              style={{ marginBottom: 16, borderRadius: 12 }}
              extra={
                <Tag color={statusColors[ticket.status]}>{ticket.status}</Tag>
              }
            >
              <div style={{ marginBottom: 12 }}>
                <Steps
                  current={getCurrentStep(ticket.status)}
                  size="small"
                  direction="horizontal"
                  responsive={false}
                >
                  {statusSteps.map((step) => (
                    <Step key={step} title="" />
                  ))}
                </Steps>
                <div
                  style={{ textAlign: 'center', fontSize: 12, marginTop: 4 }}
                >
                  {ticket.status}
                </div>
              </div>

              <div style={{ fontSize: 13 }}>
                <p>
                  <strong>Thời gian đặt:</strong>{' '}
                  {new Date(ticket.createdAt).toLocaleString('vi-VN')}
                </p>
                <p>
                  <strong>Họ tên:</strong> {ticket.name}
                </p>
                <p>
                  <strong>Dịch vụ:</strong> {ticket.serviceName}
                </p>
                <p>
                  <strong>Ngày giờ:</strong> {ticket.date} lúc {ticket.time}
                </p>
                <p>
                  <strong>Phòng khám:</strong> {ticket.facility}
                </p>
                <p>
                  <strong>Lấy mẫu:</strong> {ticket.samplingMethod}
                </p>
                {ticket.sampleCollectorName && (
                  <p>
                    <strong>NV thu mẫu:</strong> {ticket.sampleCollectorName}
                  </p>
                )}
                {ticket.resultLink && (
                  <p>
                    <strong>KQXN:</strong>{' '}
                    <a
                      href={ticket.resultLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'red', fontWeight: 'bold' }}
                    >
                      Xem kết quả
                    </a>
                  </p>
                )}
              </div>
            </Card>
          ))
        ) : (
          <Empty description="Chưa có lịch sử đặt xét nghiệm" />
        )}
      </div>
    );
  };

  return <div>{isMobile && <MobileLayout />}</div>;
};

export default MedicalTicketsMobile;
