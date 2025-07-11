import React, { useEffect, useState } from 'react';
import { Card, Steps, Tag, Divider, Empty } from 'antd';
import axiosClient from '../../api/apiConfig';

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
  const phone = JSON.parse(localStorage.getItem('user')).phoneNumber;
  const [mockBookings, setMockBookings] = useState([]);

  const fetchMedicalTicket = async () => {
    try {
      const res = await axiosClient.get(`/booking/fetchbyphone?phone=${phone}`);
      const sortedData = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      console.log(res.data);
      console.log(sortedData);
      setMockBookings(sortedData);
    } catch (error) {
      console.log('Không thể lấy lịch sử phiếu');
    }
  };

  useEffect(() => {
    fetchMedicalTicket();
  }, []);

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
                <strong>Nhân viên thu mẫu:</strong> {ticket.sampleCollectorName}
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

export default MedicalTickets;
