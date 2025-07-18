import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Popconfirm,
  message,
  Typography,
  Tag,
  Space,
} from 'antd';
import axiosClient from '../../api/apiConfig';

const { Title } = Typography;

const AdminApproveSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmApprove, setConfirmApprove] = useState({
    open: false,
    item: null,
  });

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/approve/getallpropose');
      setSuggestions(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      message.error('Lỗi khi tải đề xuất');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (name) => {
    if (!name) return;
    try {
      await axiosClient.post('/approve/deletepropose', { name });
      message.success('Đã xoá đề xuất');
      fetchSuggestions();
    } catch (err) {
      message.error('Lỗi xoá đề xuất');
    }
  };

  const handleApprove = async () => {
    const item = confirmApprove?.item;
    if (!item || !item.name) {
      message.error('Không xác định được đề xuất để phê duyệt');
      return;
    }

    try {
      await axiosClient.post('/category/createOrUpdateCategory', {
        name: item.name,
        classifies: Array.isArray(item.classify) ? item.classify : [],
      });

      await axiosClient.post('/approve/deletepropose', {
        name: item.name,
      });

      message.success('Đã phê duyệt');
      setConfirmApprove({ open: false, item: null });
      fetchSuggestions();
    } catch (err) {
      message.error('Phê duyệt thất bại');
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      render: (text) => text || '(Không có tên)',
    },
    {
      title: 'Phân loại đề xuất',
      dataIndex: 'classify',
      key: 'classify',
      render: (classify) => {
        if (!Array.isArray(classify) || classify.length === 0) {
          return <Tag color="orange">Không có</Tag>;
        }
        return (
          <>
            {classify.map((item, idx) => (
              <Tag key={idx}>{item}</Tag>
            ))}
          </>
        );
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Bạn có chắc muốn xoá đề xuất này?"
            onConfirm={() => handleDelete(record?.name)}
          >
            <Button danger type="link">
              Xoá
            </Button>
          </Popconfirm>
          <Button
            type="primary"
            onClick={() =>
              setConfirmApprove({ open: true, item: record || null })
            }
            disabled={!record?.name}
          >
            Phê duyệt
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Quản lý đề xuất danh mục & phân loại</Title>
      <Table
        columns={columns}
        dataSource={suggestions}
        rowKey={(record) => record.name || record._id || Math.random()}
        loading={loading}
        locale={{ emptyText: 'Không có đề xuất nào' }}
      />

      <Modal
        open={confirmApprove.open}
        onCancel={() => setConfirmApprove({ open: false, item: null })}
        onOk={handleApprove}
        okText="Phê duyệt"
        cancelText="Huỷ"
        title="Xác nhận phê duyệt"
      >
        {confirmApprove?.item ? (
          <>
            <p>Bạn có chắc chắn muốn phê duyệt danh mục này không?</p>
            <p>
              <strong>{confirmApprove.item.name}</strong> với các phân loại:{' '}
              {Array.isArray(confirmApprove.item.classify) &&
              confirmApprove.item.classify.length > 0
                ? confirmApprove.item.classify.join(', ')
                : 'Không có'}
            </p>
          </>
        ) : (
          <p>Dữ liệu không hợp lệ hoặc đang tải...</p>
        )}
      </Modal>
    </div>
  );
};

export default AdminApproveSuggestions;
