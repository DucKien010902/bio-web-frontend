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

const MedicalTickets = () => {
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
  const DesktopLayout = () => {
    return (
      <Card
        title="Phiếu xét nghiệm"
        bordered={false}
        style={{ borderRadius: 12 }}
      >
        {mockBookings.length > 0 ? (
          mockBookings.map((ticket) => (
            <Card
              key={ticket.bookID}
              type="inner"
              title={`Mã phiếu: ${ticket.bookID}`}
              style={{ marginBottom: 16 }}
              extra={
                <Tag color={statusColors[ticket.status]}>{ticket.status}</Tag>
              }
            >
              <Steps current={getCurrentStep(ticket.status)} size="small">
                {statusSteps.map((step) => (
                  <Step key={step} title={step} />
                ))}
              </Steps>
              <Divider />

              <p>
                <strong>Thời gian đặt:</strong>{' '}
                {new Date(ticket.createdAt).toLocaleString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </p>
              <p>
                <strong>Họ và tên:</strong> {ticket.name}
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
                <strong>Phương thức lấy mẫu:</strong> {ticket.samplingMethod}
              </p>

              {ticket.sampleCollectorName && (
                <p>
                  <strong>Nhân viên thu mẫu:</strong>{' '}
                  {ticket.sampleCollectorName}
                </p>
              )}
              {ticket.resultLink && (
                <p>
                  <strong>Kết quả xét nghiệm:</strong>{' '}
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: 'red',
                      cursor: 'pointer',
                    }}
                    // onClick={() => {
                    //   window.open(ticket.resultLink, 'blank');
                    // }}
                  >
                    <a
                      href={ticket.resultLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'red' }}
                    >
                      Xem kết quả
                    </a>
                  </span>
                </p>
              )}
            </Card>
          ))
        ) : (
          <Empty description="Chưa có lịch sử đặt xét nghiệm" />
        )}
      </Card>
    );
  };
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

  return (
    <div>
      {isDesktop && <DesktopLayout />}
      {isMobile && <MobileLayout />}
    </div>
  );
};

export default MedicalTickets;
