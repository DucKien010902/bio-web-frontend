import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  message,
  Modal,
  Select,
  Tag,
  Input,
  Row,
  Col,
} from 'antd';
import axiosClient from '../../api/apiConfig';
import 'antd/dist/reset.css';

const STATUS_LEVELS = [
  'Đã xác nhận',
  'Đã thu mẫu',
  'Đang xét nghiệm',
  'Đã có kết quả',
];

const statusTagColor = (status) => {
  switch (status) {
    case 'Đã xác nhận':
      return 'blue';
    case 'Đã thu mẫu':
      return 'purple';
    case 'Đang xét nghiệm':
      return '#c804cf';
    case 'Đã có kết quả':
      return 'green';
    default:
      return 'default';
  }
};

const ClinicBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [searchKeyword, setSearchKeyword] = useState({ bookID: '', phone: '' });

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/booking/fetchall`);
      const sortedData = [...res.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      const filtered = sortedData.filter(
        (item) => item.status !== 'Đã đặt đơn'
      );
      setBookings(filtered);
      setFilteredBookings(filtered);
    } catch {
      message.error('Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateBookingStatus = async (id, fields) => {
    try {
      await axiosClient.put(`/booking/${id}/confirm`, fields);
      message.success('Cập nhật thành công');
      fetchBookings();
      setEditedData((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch {
      message.error('Lỗi cập nhật trạng thái');
    }
  };

  const handleUpdate = (record) => {
    const change = editedData[record.bookID];
    const newStatus = change?.status;

    if (
      !change ||
      (newStatus === record.status &&
        !change?.sampleCollectorID &&
        !change?.sampleCollectorName &&
        !change?.resultLink)
    ) {
      message.info('Không có thay đổi để cập nhật');
      return;
    }

    Modal.confirm({
      title: 'Xác nhận cập nhật',
      content: 'Bạn có chắc muốn cập nhật thông tin này?',
      okText: 'Cập nhật',
      cancelText: 'Hủy',
      onOk: () =>
        updateBookingStatus(record.bookID, {
          status: newStatus,
          sampleCollectorID: change?.sampleCollectorID,
          sampleCollectorName: change?.sampleCollectorName,
          resultLink: change?.resultLink,
        }),
    });
  };

  const getAllowedStatusOptions = (currentStatus) => {
    const currentIndex = STATUS_LEVELS.indexOf(currentStatus);
    if (currentIndex === -1) return [];
    return STATUS_LEVELS.slice(currentIndex + 1);
  };

  const handleSearch = () => {
    const { bookID, phone } = searchKeyword;

    if (bookID && phone) {
      message.warning('Chỉ được tìm theo một điều kiện tại một thời điểm');
      return;
    }

    if (!bookID && !phone) {
      message.info('Vui lòng nhập Mã hồ sơ hoặc Số điện thoại để tìm');
      return;
    }

    const filtered = bookings.filter((item) => {
      if (bookID) return item.bookID.includes(bookID.trim());
      if (phone) return item.phone?.includes(phone.trim());
      return false;
    });

    if (filtered.length === 0) {
      message.info('Không tìm thấy kết quả phù hợp');
    }

    setFilteredBookings(filtered);
  };

  const resetSearch = () => {
    setSearchKeyword({ bookID: '', phone: '' });
    setFilteredBookings(bookings);
  };

  const columns = [
    { title: 'Cơ sở', dataIndex: 'facility' },
    { title: 'Mã hồ sơ', dataIndex: 'bookID' },
    { title: 'Họ tên', dataIndex: 'name' },
    { title: 'Loại dịch vụ', dataIndex: 'serviceName' },
    { title: 'SĐT', dataIndex: 'phone' },
    { title: 'Địa chỉ', dataIndex: 'location' },
    { title: 'Giờ', dataIndex: 'time' },
    {
      title: 'Trạng thái hiện tại',
      dataIndex: 'status',
      render: (status) => <Tag color={statusTagColor(status)}>{status}</Tag>,
    },
    {
      title: 'Phương thức lấy mẫu',
      dataIndex: 'samplingMethod',
    },
    {
      title: 'Mã nhân viên thu mẫu',
      render: (_, record) => {
        if (record.samplingMethod !== 'Tại nhà') return null;
        const value =
          editedData[record.bookID]?.sampleCollectorID ??
          record.sampleCollectorID;
        const isEditable = !record.sampleCollectorID;
        return isEditable ? (
          <input
            value={value || ''}
            onChange={(e) =>
              setEditedData((prev) => ({
                ...prev,
                [record.bookID]: {
                  ...prev[record.bookID],
                  sampleCollectorID: e.target.value,
                },
              }))
            }
            style={{
              borderRadius: '6px',
              border: '1px solid #999df2',
              outline: 'none',
            }}
          />
        ) : (
          value
        );
      },
    },
    {
      title: 'Tên nhân viên thu mẫu',
      render: (_, record) => {
        if (record.samplingMethod !== 'Tại nhà') return null;
        const value =
          editedData[record.bookID]?.sampleCollectorName ??
          record.sampleCollectorName;
        const isEditable = !record.sampleCollectorName;
        return isEditable ? (
          <input
            value={value || ''}
            onChange={(e) =>
              setEditedData((prev) => ({
                ...prev,
                [record.bookID]: {
                  ...prev[record.bookID],
                  sampleCollectorName: e.target.value,
                },
              }))
            }
            style={{
              borderRadius: '6px',
              border: '1px solid #999df2',
              outline: 'none',
            }}
          />
        ) : (
          value
        );
      },
    },
    {
      title: 'Cập nhật trạng thái',
      dataIndex: 'status',
      render: (status, record) => {
        const allowedOptions = getAllowedStatusOptions(status);
        const value = editedData[record.bookID]?.status ?? status;

        if (allowedOptions.length === 0) {
          return (
            <Tag color={statusTagColor(status)}>Không có trạng thái mới</Tag>
          );
        }

        return (
          <Select
            style={{ width: 180 }}
            value={value}
            onChange={(val) =>
              setEditedData((prev) => ({
                ...prev,
                [record.bookID]: {
                  ...prev[record.bookID],
                  status: val,
                },
              }))
            }
          >
            <Select.Option key={status} value={status}>
              {status} (Hiện tại)
            </Select.Option>
            {allowedOptions.map((opt) => (
              <Select.Option key={opt} value={opt}>
                {opt}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: 'Link kết quả',
      render: (_, record) => {
        const currentStatus =
          editedData[record.bookID]?.status || record.status;
        if (currentStatus !== 'Đã có kết quả') return null;

        const value =
          editedData[record.bookID]?.resultLink ?? record.resultLink;
        const isEditable = !record.resultLink;

        return isEditable ? (
          <input
            value={value || ''}
            placeholder="Nhập link kết quả"
            onChange={(e) =>
              setEditedData((prev) => ({
                ...prev,
                [record.bookID]: {
                  ...prev[record.bookID],
                  resultLink: e.target.value,
                },
              }))
            }
            style={{
              borderRadius: '6px',
              border: '1px solid #999df2',
              outline: 'none',
            }}
          />
        ) : (
          <a href={value} target="_blank" rel="noopener noreferrer">
            Xem kết quả
          </a>
        );
      },
    },

    {
      title: 'Thao tác',
      render: (_, record) => {
        const change = editedData[record.bookID];
        const disabled =
          !change ||
          ((!change.status || change.status === record.status) &&
            !change.sampleCollectorID &&
            !change.sampleCollectorName);
        return (
          <Button
            type="primary"
            disabled={disabled}
            onClick={() => handleUpdate(record)}
          >
            Cập nhật trạng thái
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ padding: 0 }}>
      <h2>Quản lý phòng khám</h2>

      {/* Tìm kiếm */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Input
            placeholder="Tìm theo Mã hồ sơ"
            value={searchKeyword.bookID}
            onChange={(e) =>
              setSearchKeyword({
                bookID: e.target.value,
                phone: '',
              })
            }
            allowClear
          />
        </Col>
        <Col>
          <Input
            placeholder="Tìm theo Số điện thoại"
            value={searchKeyword.phone}
            onChange={(e) =>
              setSearchKeyword({
                phone: e.target.value,
                bookID: '',
              })
            }
            allowClear
          />
        </Col>
        <Col>
          <Button type="primary" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </Col>
        <Col>
          <Button onClick={resetSearch}>Đặt lại</Button>
        </Col>
      </Row>

      {/* Bảng dữ liệu */}
      <Table
        dataSource={filteredBookings}
        columns={columns}
        rowKey="bookID"
        loading={loading}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default ClinicBookingPage;
