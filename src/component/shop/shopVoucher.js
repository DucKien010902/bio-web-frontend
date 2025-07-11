import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Popconfirm,
  message,
} from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import axiosClient from '../../api/apiConfig';

const VoucherTable = ({ shopID, shopName }) => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shopInfo = JSON.parse(localStorage.getItem('shopInfo'));
  const [form] = Form.useForm();

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(
        `/voucher/getVoucherByShopID?shopID=${shopInfo.shopID}`
      );
      setVouchers(res.data);
    } catch (err) {
      message.error('Không tải được voucher');
    }
    setLoading(false);
  };

  const handleAddVoucher = () => {
    form.validateFields().then(async (values) => {
      try {
        await axiosClient.post('/voucher/addVoucher', {
          ...values,
          shopID: shopInfo.shopID,
          shopName: shopInfo.shopName,
        });
        message.success('Thêm voucher thành công');
        form.resetFields();
        setIsModalOpen(false);
        fetchVouchers();
      } catch (err) {
        message.error('Thêm voucher thất bại');
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      await axiosClient.post(`/voucher/deleteVoucherByID`, {
        voucherID: id,
      });
      message.success('Xóa voucher thành công');
      fetchVouchers();
    } catch {
      message.error('Xóa thất bại');
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, [shopID]);

  const columns = [
    { title: 'VoucherID', dataIndex: 'voucherID', key: 'voucherID' },
    { title: 'Giảm giá (%)', dataIndex: 'discount' },
    { title: 'Đơn tối thiểu', dataIndex: 'minOrder' },
    { title: 'Giảm tối đa', dataIndex: 'maxDiscount' },
    { title: 'Số lượng', dataIndex: 'quantity' },
    {
      title: 'Hạn dùng',
      dataIndex: 'expiry',
      render: (text) => dayjs(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Hành động',
      render: (_, record) => (
        <Popconfirm
          title="Xác nhận xoá?"
          onConfirm={() => handleDelete(record.voucherID)}
        >
          <Button danger>Xoá</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        style={{ marginBottom: 16 }}
      >
        Thêm Voucher
      </Button>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={vouchers}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Thêm Voucher"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddVoucher}
        okText="Thêm"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="discount"
            label="Giảm giá (%)"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} max={100} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="minOrder"
            label="Đơn tối thiểu (nghìn VND)"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="maxDiscount"
            label="Giảm tối đa (nghìn VND)"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Số lượng"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="expiry"
            label="Hạn dùng"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VoucherTable;
