import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  message,
  Space,
} from 'antd';
import axiosClient from '../../api/apiConfig';
import { v4 as uuidv4 } from 'uuid'; // 👈 thêm uuid
import './home-admin.css';

const EditableCell = ({
  editing,
  dataIndex,
  inputType,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps} className={editing ? 'editable-cell' : ''}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Vui lòng nhập ${title}` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const AdminTestPackages = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [editingRowKey, setEditingRowKey] = useState('');
  const [addingRowTypeId, setAddingRowTypeId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get('/testservice/fetchall');
      setData(res.data);
    } catch (error) {
      message.error('Lỗi khi tải dữ liệu');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isEditing = (record) => record.key === editingRowKey;
  const isAdding = (record) => record.code === '__new';

  const cancel = () => {
    if (editingRowKey && addingRowTypeId) {
      setData((prev) =>
        prev.map((t) => {
          if (t._id === addingRowTypeId) {
            return {
              ...t,
              packages: t.packages.filter((p) => p.key !== editingRowKey),
            };
          }
          return t;
        })
      );
    }
    setEditingRowKey('');
    setAddingRowTypeId(null);
  };

  // ⚠️ CHỈ sửa các phần cần thiết để đồng bộ với Controller – các phần khác giữ nguyên

  const save = async (key, testTypeId, isNew = false) => {
    try {
      const row = await form.validateFields();
      document.activeElement?.blur(); // Unfocus input

      const currentTestType = data.find((d) => d._id === testTypeId);
      const typeName = currentTestType?.typeName;

      if (!typeName) {
        message.error('Không xác định được loại xét nghiệm');
        return;
      }

      if (isNew) {
        await axiosClient.post(
          `/testservice/addservice/${typeName}/packages`,
          row
        );
        message.success('Đã thêm mới');
      } else {
        console.log(typeName);
        await axiosClient.put(
          `/testservice/updateservice/${typeName}/${key}`,
          row // đây là body chứa dữ liệu cập nhật
        );
        message.success('Cập nhật thành công');
      }

      setEditingRowKey('');
      setAddingRowTypeId(null);
      fetchData();
    } catch (err) {
      console.error('❌ Lỗi khi lưu:', err);
      message.error('Thao tác thất bại');
    }
  };

  const handleDelete = async (testTypeId, code) => {
    try {
      const currentTestType = data.find((d) => d._id === testTypeId);
      const typeName = currentTestType?.typeName;

      if (!typeName) {
        message.error('Không xác định được loại xét nghiệm');
        return;
      }

      await axiosClient.delete(
        `/testservice/deleteservice/${typeName}/${code}`
      );
      message.success('Xóa thành công');
      fetchData();
    } catch (error) {
      message.error('Xóa thất bại');
    }
  };

  const mergedColumns = (record, testTypeId) => {
    const columns = [
      {
        title: 'Mã',
        dataIndex: 'code',
        width: '8%',
        editable: true,
      },
      {
        title: 'Tên',
        dataIndex: 'name',
        width: '16%',
        editable: true,
      },
      {
        title: 'Lịch làm việc',
        dataIndex: 'schedule',
        width: '15%',
        editable: true,
      },
      {
        title: 'Thời gian trả',
        dataIndex: 'turnaroundTime',
        width: '10%',
        editable: true,
      },
      {
        title: 'Giá',
        dataIndex: 'price',
        width: '10%',
        editable: true,
        render: (p) => (p ? `${p.toLocaleString()}đ` : ''),
      },
      {
        title: 'Mô tả',
        dataIndex: 'description',
        width: '31%',
        editable: true,
      },
      {
        title: 'Hành động',
        dataIndex: 'actions',
        width: '10%',
        render: (_, pkg) => {
          const editable = isEditing(pkg) || isAdding(pkg);
          return editable ? (
            <span>
              <Button
                type="link"
                onClick={() => save(pkg.code, testTypeId, isAdding(pkg))}
              >
                Lưu
              </Button>
              <Popconfirm title="Hủy?" onConfirm={cancel}>
                <Button type="link">Hủy</Button>
              </Popconfirm>
            </span>
          ) : (
            <Space>
              <Button
                type="link"
                onClick={() => {
                  form.setFieldsValue(pkg);
                  setEditingRowKey(pkg.key);
                }}
              >
                Sửa
              </Button>
              <Popconfirm
                title="Xác nhận xóa?"
                onConfirm={() => handleDelete(testTypeId, pkg.code)}
              >
                <Button type="link" danger>
                  Xóa
                </Button>
              </Popconfirm>
            </Space>
          );
        },
      },
    ];

    return columns.map((col) => {
      if (!col.editable) return col;
      return {
        ...col,
        onCell: (pkg) => ({
          record: pkg,
          inputType: col.dataIndex === 'price' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(pkg) || isAdding(pkg),
        }),
      };
    });
  };

  const handleAddRow = (testTypeId) => {
    const tempKey = uuidv4();
    const updated = data.map((t) => {
      if (t._id === testTypeId) {
        return {
          ...t,
          packages: [
            {
              key: tempKey,
              code: '__new',
              name: '',
              schedule: '',
              turnaroundTime: '',
              price: 0,
              description: '',
            },
            ...t.packages,
          ],
        };
      }
      return t;
    });
    setData(updated);
    form.resetFields();
    setEditingRowKey(tempKey);
    setAddingRowTypeId(testTypeId);
  };

  const columns = [
    {
      title: 'Loại xét nghiệm',
      dataIndex: 'typeName',
      key: 'typeName',
      render: (_, record) => (
        <Space direction="vertical">
          <strong>{record.typeName}</strong>
          <Button
            type="primary"
            size="small"
            onClick={() => handleAddRow(record._id)}
            disabled={editingRowKey !== ''}
          >
            + Thêm gói
          </Button>
        </Space>
      ),
    },
    {
      title: 'Gói xét nghiệm',
      key: 'packages',
      render: (_, record) => (
        <Form form={form} component={false}>
          <Table
            components={{ body: { cell: EditableCell } }}
            columns={mergedColumns(record, record._id)}
            dataSource={record.packages.map((p, idx) => ({
              ...p,
              key: p.key || p.code || `row-${idx}`,
            }))}
            pagination={false}
            rowClassName="editable-row"
            size="small"
          />
        </Form>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1
        className="text-2xl font-semibold mb-4"
        style={{ textAlign: 'center' }}
      >
        Quản lý gói xét nghiệm
      </h1>
      <Table
        style={{ Width: 2000 }}
        loading={loading}
        columns={columns}
        dataSource={data.map((t) => ({ ...t, key: t._id }))}
        expandable={{ defaultExpandAllRows: true }}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default AdminTestPackages;
