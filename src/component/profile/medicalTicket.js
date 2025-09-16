import {
  Button,
  Card,
  Divider,
  Empty,
  message,
  Modal,
  Select,
  Steps,
  Tag,
} from 'antd';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import axiosClient from '../../api/apiConfig';

const { Step } = Steps;
const { Option } = Select;

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
  const [filterStatus, setFilterStatus] = useState('Tất cả');

  const fetchMedicalTicket = async () => {
    try {
      const res = await axiosClient.get(`/booking/fetchbyphone?phone=${phone}`);
      const sortedData = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setMockBookings(sortedData);
    } catch (error) {
      console.log('Không thể lấy lịch sử phiếu');
    }
  };

  useEffect(() => {
    fetchMedicalTicket();
  }, []);

  // Hàm hủy đơn
  const handleCancelBooking = (bookID) => {
    Modal.confirm({
      title: 'Xác nhận hủy đơn',
      content: `Bạn có chắc muốn hủy phiếu ${bookID}?`,
      okText: 'Hủy đơn',
      cancelText: 'Đóng',
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await axiosClient.post('/booking/cancel', { phone, bookID });
          message.success('Đã hủy đơn thành công');
          fetchMedicalTicket();
        } catch (err) {
          message.error('Hủy đơn thất bại');
        }
      },
    });
  };

  // lọc danh sách theo trạng thái
  const filteredBookings =
    filterStatus === 'Tất cả'
      ? mockBookings
      : mockBookings.filter((ticket) => ticket.status === filterStatus);

  const FilterBar = () => (
    <div style={{ marginBottom: 16 }}>
      <span style={{ marginRight: 8, fontWeight: 500 }}>Lọc trạng thái:</span>
      <Select
        value={filterStatus}
        onChange={(val) => setFilterStatus(val)}
        style={{ minWidth: 160 }}
      >
        <Option value="Tất cả">Tất cả</Option>
        {[...statusSteps, 'Đã hủy'].map((status) => (
          <Option key={status} value={status}>
            {status}
          </Option>
        ))}
      </Select>
    </div>
  );

  const DesktopLayout = () => {
    return (
      <Card
        title="Phiếu xét nghiệm"
        bordered={false}
        style={{ borderRadius: 12 }}
      >
        <FilterBar />
        {filteredBookings.length > 0 ? (
          filteredBookings.map((ticket) => (
            <Card
              key={ticket.bookID}
              type="inner"
              title={`Mã phiếu: ${ticket.bookID}`}
              style={{ marginBottom: 16 }}
              extra={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Tag color={statusColors[ticket.status]}>{ticket.status}</Tag>
                  {ticket.status === 'Đã đặt đơn' && (
                    <Button
                      danger
                      size="small"
                      onClick={() => handleCancelBooking(ticket.bookID)}
                      style={{ fontSize: 12 }}
                    >
                      Hủy đơn
                    </Button>
                  )}
                </div>
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
            </Card>
          ))
        ) : (
          <Empty description="Không có phiếu theo trạng thái này" />
        )}
      </Card>
    );
  };

  const MobileLayout = () => {
    return (
      <div style={{ padding: '12px' }}>
        <h3 style={{ marginBottom: 12 }}>Lịch sử xét nghiệm</h3>
        <FilterBar />
        {filteredBookings.length > 0 ? (
          filteredBookings.map((ticket) => (
            <Card
              key={ticket.bookID}
              type="inner"
              title={
                <span style={{ fontSize: 14 }}>Mã phiếu: {ticket.bookID}</span>
              }
              size="small"
              style={{ marginBottom: 16, borderRadius: 12 }}
              extra={
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Tag color={statusColors[ticket.status]}>{ticket.status}</Tag>
                  {ticket.status === 'Đã đặt đơn' && (
                    <Button
                      danger
                      size="small"
                      onClick={() => handleCancelBooking(ticket.bookID)}
                    >
                      Hủy
                    </Button>
                  )}
                </div>
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
          <Empty description="Không có phiếu theo trạng thái này" />
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
