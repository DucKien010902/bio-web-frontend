import React, { use, useEffect, useState } from 'react';
import { Button, message, Typography } from 'antd';
import './vouncher.css';
import axiosClient from '../../api/apiConfig';
import dayjs from 'dayjs';

const VoucherCard = ({ data }) => {
  const [quantity, setQuantity] = useState(data.quantity);
  const formattedDiscount = `${data.discount}%`;
  const formattedMinOrder = `₫${data.minOrder.toLocaleString()}k`;
  const formattedMaxDiscount = `₫${data.maxDiscount.toLocaleString()}k`;
  const formattedQuantity = `x${quantity}`;
  const formattedExpiry = dayjs(data.expiry).format('DD.MM.YYYY');

  return (
    <div className="voucher-card" style={{ backgroundColor: '#f1faf0' }}>
      <div className="voucher-left">
        <div style={{ fontWeight: 600, fontSize: 15, color: 'green' }}>
          FreeShip
        </div>
        <div style={{ color: '#d0011b', fontSize: 15 }}>
          Đơn Tối Thiểu {formattedMinOrder}
        </div>
        <div style={{ marginTop: 8, color: '#888', fontSize: 12 }}>
          HSD: {formattedExpiry}
        </div>
      </div>
      <div className="voucher-right">
        <div className="voucher-qty">{formattedQuantity}</div>
        <Button type="primary" danger size="small">
          Lưu
        </Button>
      </div>
    </div>
  );
};

const VoucherGen = ({ shopInfo }) => {
  const [vouchers, setVouchers] = useState([]);
  const fetchVoucher = async () => {
    try {
      const res = await axiosClient.get(`/voucher/getVoucherGen`);
      setVouchers(res.data);
    } catch (error) {
      console.log('Khong the lay danh sach voucher');
    }
  };
  useEffect(() => {
    fetchVoucher();
  }, []);
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
        height: 160,
        backgroundColor: 'white',
        overflow: 'hidden',
      }}
    >
      <div className="voucher-container">
        {vouchers.map((voucher, index) => (
          <VoucherCard key={index} data={voucher} />
        ))}
      </div>
    </div>
  );
};

export default VoucherGen;
