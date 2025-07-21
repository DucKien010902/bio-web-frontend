import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import './vouncher.css';
import axiosClient from '../../api/apiConfig';
import { GiShop } from 'react-icons/gi';
import dayjs from 'dayjs';

const VoucherCard = ({ data }) => {
  const formattedDiscount = `${data.discount}%`;
  const formattedMinOrder = `₫${data.minOrder.toLocaleString()}k`;
  const formattedMaxDiscount = `₫${data.maxDiscount.toLocaleString()}k`;
  const formattedExpiry = dayjs(data.expiry).format('DD.MM.YYYY');
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="voucher-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        // height: 140,
        // width: 260,
        // backgroundColor: '#fff5f6',
        // border: '1px solid rgb(231, 66, 66)',
        // display: 'flex',
        // justifyContent: 'space-between',
        // padding: 16,
        // borderRadius: 6,
        // scrollSnapAlign: 'start',
        // position: 'relative',
        boxShadow: isHovered
          ? '0 4px 12px rgba(0, 0, 0, 0.2)'
          : '0 2px 4px rgba(0, 0, 0, 0.05)',
        transform: isHovered ? 'translateY(-2px)' : 'none',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
    >
      <div
        className="voucher-left"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 14, color: '#c712c1' }}>
          <GiShop style={{ color: 'orange', marginRight: 5 }} />
          {data.shopName}
        </div>
        <div style={{ fontWeight: 600, fontSize: 13, color: '#d0011b' }}>
          Giảm {formattedDiscount}
        </div>
        <div style={{ color: '#d0011b', fontSize: 13 }}>
          Đơn Tối Thiểu {formattedMinOrder} Giảm tối đa {formattedMaxDiscount}
        </div>
        <div style={{ marginTop: 8, color: '#888', fontSize: 10 }}>
          HSD: {formattedExpiry}
        </div>
      </div>
    </div>
  );
};

const VoucherListUser = ({ shopInfo }) => {
  const [vouchers, setVouchers] = useState([]);
  const phoneNumber = JSON.parse(localStorage.getItem('user')).phoneNumber;

  const fetchVoucher = async () => {
    try {
      const res = await axiosClient.get(
        `/voucher/getVoucherByUser?phoneNumber=${phoneNumber}`
      );
      setVouchers(res.data);
    } catch (error) {
      console.log('Không thể lấy danh sách voucher');
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
        // height: 200,
        // backgroundColor: 'white',
        overflow: 'hidden',
      }}
    >
      <div
        className="voucher-container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          // justifyContent: 'space-evenly',
        }}
      >
        {vouchers.map((voucher, index) => (
          <VoucherCard key={index} data={voucher} />
        ))}
      </div>
    </div>
  );
};

export default VoucherListUser;
