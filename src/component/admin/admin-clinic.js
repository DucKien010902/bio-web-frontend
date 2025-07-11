import React, { useEffect, useState } from 'react';
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Button,
  Space,
  message,
} from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import './home-admin.css';
import axiosClient from '../../api/apiConfig';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  children,
  ...restProps
}) => {
  let inputNode = <Input />;
  if (inputType === 'number') inputNode = <InputNumber />;
  else if (inputType === 'textarea') inputNode = <Input.TextArea autoSize />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: false, message: `Vui lòng nhập ${title}` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const AdminClinics = () => {
  const [form] = Form.useForm();
  const [clinics, setClinics] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [loading, setLoading] = useState(true);
  const isEditing = (record) => record.key === editingKey;

  const fetchClinics = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/clinic/fetchall');
      const formatted = res.data.map((c) => ({
        ...c,
        key: c._id,
        introBulletPoints: (c.introBulletPoints || []).join(', '),
        descriptions: (c.descriptions || []).join(', '),
        listService: (c.listService || []).join(', '),
      }));
      setClinics(formatted);
      setLoading(false);
    } catch (err) {
      message.error('Lỗi khi tải dữ liệu phòng khám');
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...clinics];
      const index = newData.findIndex((item) => item.key === key);
      const item = newData[index];

      const updated = {
        ...item,
        ...row,
        introBulletPoints:
          row.introBulletPoints?.split(',').map((s) => s.trim()) || [],
        descriptions: row.descriptions?.split(',').map((s) => s.trim()) || [],
        listService: row.listService?.split(',').map((s) => s.trim()) || [],
      };
      console.log('???');
      console.log(updated);
      if (item._id) {
        await axiosClient.put(`/clinic/updateclinic/${item._id}`, updated);
      } else {
        const res = await axiosClient.post('/clinic/create', updated);
        updated._id = res.data._id;
        updated.key = res.data._id;
      }

      newData.splice(index, 1, updated);
      setClinics(newData);
      setEditingKey('');
      message.success('Lưu thành công');
    } catch (err) {
      message.error('Lưu thất bại');
    }
  };

  const handleDelete = async (key) => {
    const newData = [...clinics];
    const index = newData.findIndex((item) => item.key === key);
    const item = newData[index];

    if (item._id) {
      await axiosClient.delete(`/clinic/${item._id}`);
    }

    newData.splice(index, 1);
    setClinics(newData);
    message.success('Đã xóa phòng khám');
  };

  const handleAdd = () => {
    const newClinic = {
      key: uuidv4(),
      ID: '',
      name: '',
      address: '',
      workingHours: '',
      phone: '',
      rating: 0,
      mainImage: '',
      introTitle: '',
      introBulletPoints: '',
      descriptions: '',
      branches: [],
      mapEmbedUrl: '',
      listService: '',
    };
    setClinics([newClinic, ...clinics]);
    setEditingKey(newClinic.key);
    form.setFieldsValue(newClinic);
  };

  const columns = [
    { title: 'ID', dataIndex: 'ID', editable: true, width: 150 }, // 1
    { title: 'Tên', dataIndex: 'name', editable: true, width: 150 }, // 2
    { title: 'Địa chỉ', dataIndex: 'address', editable: true, width: 150 }, // 3
    {
      title: 'Giờ làm việc',
      dataIndex: 'workingHours',
      editable: true,
      width: 150,
    }, // 4
    { title: 'Điện thoại', dataIndex: 'phone', editable: true, width: 150 }, // 5
    {
      title: 'Rating',
      dataIndex: 'rating',
      editable: true,
      inputType: 'number',
      width: 150,
    }, // 6
    {
      title: 'Ảnh chính',
      dataIndex: 'mainImage',
      editable: true,
      width: 150,
      render: (text) => (
        <a
          href={text}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {text}
        </a>
      ),
    }, // 7
    {
      title: 'Tiêu đề giới thiệu',
      dataIndex: 'introTitle',
      editable: true,
      width: 150,
    }, // 8

    {
      title: 'Gạch đầu dòng',
      dataIndex: 'introBulletPoints',
      editable: true,
      render: (text) => text,
      width: 500,
    }, // 9
    {
      title: 'Mô tả',
      dataIndex: 'descriptions',
      editable: true,
      render: (text) => text,
      width: 500,
    }, // 10
    {
      title: 'Dịch vụ',
      dataIndex: 'listService',
      editable: true,
      render: (text) => text,
      width: 500,
    }, // 11
    {
      title: 'Bản đồ',
      dataIndex: 'mapEmbedUrl',
      editable: true,
      width: 500,
      render: (text) => (
        <a
          href={text}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {text}
        </a>
      ),
    }, // 12

    {
      title: 'Thao tác',
      dataIndex: 'operation',
      width: 150,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Lưu
            </Typography.Link>
            <Popconfirm title="Hủy chỉnh sửa?" onConfirm={cancel}>
              <a>Hủy</a>
            </Popconfirm>
          </span>
        ) : (
          <Space>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              <EditOutlined />
            </Typography.Link>
            <Popconfirm
              title="Xóa phòng khám?"
              onConfirm={() => handleDelete(record.key)}
            >
              <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.inputType || 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <h1
        className="text-2xl font-semibold mb-4"
        style={{ textAlign: 'center' }}
      >
        Quản lý phòng khám
      </h1>
      <Button
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Thêm phòng khám
      </Button>
      <Form form={form} component={false}>
        <Table
          components={{ body: { cell: EditableCell } }}
          bordered
          loading={loading}
          dataSource={clinics}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{ pageSize: 5 }}
          scroll={{ x: 'max-content' }}
        />
      </Form>
    </div>
  );
};

export default AdminClinics;
