import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Tag, message, Modal, Select, Space } from 'antd';
import axiosClient from '../../api/apiConfig';

const EmployeeBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [searchType, setSearchType] = useState('bookID');
  const [searchValue, setSearchValue] = useState('');
  const [filteredBookings, setFilteredBookings] = useState([]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get('/booking/fetchall');
      const sortedData = [...res.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBookings(sortedData);
      setFilteredBookings(sortedData);
    } catch (error) {
      message.error('Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateBookingStatus = async (id, value) => {
    try {
      await axiosClient.put(`/booking/${id}/confirm`, { status: value });
      message.success('Cập nhật trạng thái thành công');
      fetchBookings();
    } catch {
      message.error('Lỗi cập nhật trạng thái');
    }
  };

  const updateBookingFields = async (id, fields) => {
    try {
      await axiosClient.put(`/booking/${id}`, fields);
      message.success('Cập nhật thành công');
      fetchBookings();
      setEditedData((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch {
      message.error('Lỗi cập nhật');
    }
  };

  const handleToggleStatus = (record) => {
    const nextStatus =
      record.status === 'Đã đặt đơn' ? 'Đã xác nhận' : 'Đã đặt đơn';
    Modal.confirm({
      title: 'Xác nhận thay đổi trạng thái',
      content: `Bạn có chắc muốn chuyển trạng thái sang "${nextStatus}"?`,
      okText: 'Có',
      cancelText: 'Không',
      onOk: () => updateBookingStatus(record.bookID, nextStatus),
    });
  };

  const handleUpdate = (record) => {
    const changes = editedData[record.bookID];
    if (!changes) {
      message.info('Không có thay đổi để cập nhật');
      return;
    }

    Modal.confirm({
      title: 'Xác nhận cập nhật',
      content: 'Bạn có chắc muốn cập nhật thông tin này?',
      okText: 'Cập nhật',
      cancelText: 'Hủy',
      onOk: () => updateBookingFields(record.bookID, changes),
    });
  };

  const handleSearch = () => {
    const keyword = searchValue.trim().toLowerCase();
    if (!keyword) {
      setFilteredBookings(bookings);
      return;
    }

    const result = bookings.filter((item) =>
      String(item[searchType]).toLowerCase().includes(keyword)
    );

    setFilteredBookings(result);
  };

  const statusTagColor = (status) => {
    switch (status) {
      case 'Đã đặt đơn':
        return 'orange';
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

  const columns = [
    { title: 'Mã hồ sơ', dataIndex: 'bookID' },
    { title: 'Họ tên', dataIndex: 'name' },
    { title: 'SĐT', dataIndex: 'phone' },
    { title: 'Ngày', dataIndex: 'date' },
    { title: 'Giờ', dataIndex: 'time' },
    {
      title: 'Địa điểm',
      dataIndex: 'location',
      render: (text, record) => (
        <Input
          value={
            editedData[record.bookID]?.location !== undefined
              ? editedData[record.bookID].location
              : text
          }
          onChange={(e) =>
            setEditedData((prev) => ({
              ...prev,
              [record.bookID]: {
                ...prev[record.bookID],
                location: e.target.value,
              },
            }))
          }
        />
      ),
    },
    { title: 'Tên phòng khám', dataIndex: 'facility' },
    { title: 'Mã phòng khám', dataIndex: 'facilityID' },
    { title: 'Mã dịch vụ', dataIndex: 'serviceCode' },
    { title: 'Tên dịch vụ', dataIndex: 'serviceName' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status) => <Tag color={statusTagColor(status)}>{status}</Tag>,
    },
    {
      title: 'Phương thức lấy mẫu',
      dataIndex: 'samplingMethod',
      render: (method, record) => (
        <Select
          value={
            editedData[record.bookID]?.samplingMethod !== undefined
              ? editedData[record.bookID].samplingMethod
              : method
          }
          onChange={(value) =>
            setEditedData((prev) => ({
              ...prev,
              [record.bookID]: {
                ...prev[record.bookID],
                samplingMethod: value,
              },
            }))
          }
          style={{ width: 150 }}
        >
          <Select.Option value="Tại nhà">Tại nhà</Select.Option>
          <Select.Option value="Tại phòng khám">Tại phòng khám</Select.Option>
        </Select>
      ),
    },
    {
      title: 'Thao tác',
      render: (_, record) => {
        const isEditable =
          record.status === 'Đã đặt đơn' || record.status === 'Đã xác nhận';
        return (
          <div style={{ display: 'flex', gap: 8 }}>
            {isEditable && (
              <>
                <Button
                  type="primary"
                  onClick={() => handleToggleStatus(record)}
                >
                  {record.status === 'Đã đặt đơn'
                    ? 'Xác nhận đơn'
                    : 'Bỏ xác nhận'}
                </Button>
                <Button onClick={() => handleUpdate(record)}>Cập nhật</Button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ padding: 0 }}>
      <h2>Quản lý lịch đặt</h2>
      <Space style={{ marginBottom: 16 }}>
        <Select
          value={searchType}
          onChange={(val) => setSearchType(val)}
          style={{ width: 160 }}
        >
          <Select.Option value="bookID">Tìm theo Mã hồ sơ</Select.Option>
          <Select.Option value="phone">Tìm theo SĐT</Select.Option>
        </Select>
        <Input
          placeholder="Nhập từ khóa"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={handleSearch}>
          Tìm kiếm
        </Button>
        <Button
          onClick={() => {
            setSearchValue('');
            setFilteredBookings(bookings);
          }}
        >
          Đặt lại
        </Button>
      </Space>
      <Table
        dataSource={filteredBookings}
        columns={columns}
        rowKey="_id"
        loading={loading}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default EmployeeBookingPage;
