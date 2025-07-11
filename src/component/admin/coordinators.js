import React, { useState } from 'react';
import {
  Table,
  Input,
  Button,
  Space,
  Modal,
  Select,
  Form,
  message,
} from 'antd';

const initialEmployees = [
  {
    id: 'NV001',
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    facility: 'Phòng khám A',
  },
  {
    id: 'NV002',
    name: 'Trần Thị B',
    phone: '0912345678',
    facility: 'Phòng khám B',
  },
  {
    id: 'NV003',
    name: 'Lê Văn C',
    phone: '0987654321',
    facility: 'Phòng khám A',
  },
  {
    id: 'NV004',
    name: 'Phạm Thị D',
    phone: '0978123456',
    facility: 'Phòng khám C',
  },
];

const CoordinatorsList = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchType, setSearchType] = useState('id');
  const [searchValue, setSearchValue] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState(initialEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSearch = () => {
    const keyword = searchValue.trim().toLowerCase();
    if (!keyword) {
      setFilteredEmployees(employees);
      return;
    }

    const result = employees.filter((emp) =>
      String(emp[searchType]).toLowerCase().includes(keyword)
    );
    setFilteredEmployees(result);
  };

  const handleAdd = () => {
    form.validateFields().then((values) => {
      const exists = employees.find((e) => e.id === values.id);
      if (exists) {
        message.error('Mã nhân viên đã tồn tại');
        return;
      }
      const newList = [...employees, values];
      setEmployees(newList);
      setFilteredEmployees(newList);
      form.resetFields();
      setIsModalOpen(false);
      message.success('Thêm nhân viên thành công');
    });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc muốn xóa nhân viên này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => {
        const newList = employees.filter((e) => e.id !== id);
        setEmployees(newList);
        setFilteredEmployees(newList);
        message.success('Đã xóa');
      },
    });
  };

  const columns = [
    { title: 'Mã điều phối viên', dataIndex: 'id' },
    { title: 'Tên', dataIndex: 'name' },
    { title: 'SĐT', dataIndex: 'phone' },
    // { title: 'Phòng khám', dataIndex: 'facility' },
    {
      title: 'Thao tác',
      render: (_, record) => (
        <Button danger onClick={() => handleDelete(record.id)}>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Danh sách điều phối viên</h2>
      <Space style={{ marginBottom: 16 }}>
        <Select
          value={searchType}
          onChange={setSearchType}
          style={{ width: 160 }}
        >
          <Select.Option value="id">Tìm theo Mã</Select.Option>
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
            setFilteredEmployees(employees);
          }}
        >
          Đặt lại
        </Button>
        <Button type="dashed" onClick={() => setIsModalOpen(true)}>
          Thêm nhân viên
        </Button>
      </Space>

      <Table
        dataSource={filteredEmployees}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Thêm nhân viên"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAdd}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="id"
            label="Mã nhân viên"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="SĐT" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CoordinatorsList;
