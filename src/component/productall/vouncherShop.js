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
  const phoneNumber = JSON.parse(localStorage.getItem('user')).phoneNumber;
  const onSaveVoucher = async () => {
    try {
      const res = await axiosClient.post('/voucher/saveUserVoucher', {
        phoneNumber: phoneNumber,
        shopID: data.shopID,
        voucherID: data.voucherID,
        shopName: data.shopName,
        discount: data.discount,
        minOrder: data.minOrder,
        maxDiscount: data.maxDiscount,
        expiry: data.expiry,
      });

      message.success('Đã lưu voucher thành công');
      setQuantity(res.data.remainingQuantity);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          message.warning(data.message || 'Yêu cầu không hợp lệ');
        } else if (status === 500) {
          message.error('Lỗi máy chủ, vui lòng thử lại sau');
        } else {
          message.error('Có lỗi xảy ra, vui lòng thử lại');
        }
      } else {
        message.error('Không thể kết nối đến server');
      }
    }
  };
  return (
    <div className="voucher-card">
      <div className="voucher-left">
        <div style={{ fontWeight: 600, fontSize: 15, color: '#d0011b' }}>
          Giảm {formattedDiscount}
        </div>
        <div style={{ color: '#d0011b', fontSize: 15 }}>
          Đơn Tối Thiểu {formattedMinOrder} Giảm tối đa {formattedMaxDiscount}
        </div>
        <div style={{ marginTop: 8, color: '#888', fontSize: 12 }}>
          HSD: {formattedExpiry}
        </div>
      </div>
      <div className="voucher-right">
        <div className="voucher-qty">{formattedQuantity}</div>
        <Button type="primary" danger size="small" onClick={onSaveVoucher}>
          Lưu
        </Button>
      </div>
    </div>
  );
};

const VoucherList = ({ shopInfo }) => {
  const [vouchers, setVouchers] = useState([]);
  const fetchVoucher = async () => {
    try {
      const res = await axiosClient.get(
        `/voucher/getVoucherByShopID?shopID=${shopInfo.shopID}`
      );
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

export default VoucherList;
