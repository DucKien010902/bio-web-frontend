import { Button, Divider, message } from 'antd';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/apiConfig';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useMediaQuery } from 'react-responsive';

dayjs.extend(utc);
dayjs.extend(timezone);

const VNPaySuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const paymentData = {};
  for (let [key, value] of params.entries()) {
    paymentData[key] = value;
  }

  const isSuccess =
    paymentData.vnp_ResponseCode === '00' &&
    paymentData.vnp_TransactionStatus === '00';

  const productInvoice =
    JSON.parse(localStorage.getItem('productInvoice')) || [];
  const user = JSON.parse(localStorage.getItem('user'));

  const formatAmount = (amount) => {
    return (parseInt(amount, 10) / 100).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };

  const formatDate = (vnpDate) => {
    if (!vnpDate || vnpDate.length !== 14) return vnpDate;
    const yyyy = vnpDate.slice(0, 4);
    const mm = vnpDate.slice(4, 6);
    const dd = vnpDate.slice(6, 8);
    const hh = vnpDate.slice(8, 10);
    const min = vnpDate.slice(10, 12);
    const ss = vnpDate.slice(12, 14);
    return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
  };

  const addToOrderHistory = async () => {
    try {
      const promises = productInvoice.map((item) =>
        axiosClient.post('order/addtoOrderHistory', {
          totalPrice: item.productPrice * item.quantify,
          totalCount: item.quantify,
          shopID: item.productShopID,
          shopName: item.productShopName,
          productName: item.productName,
          productImage: item.image,
          productID: item.Id,
          productCategory: item.category,
          productPrice: item.productPrice,
          name: user.fullName,
          phone: user.phoneNumber,
          location: 'Ha Noi',
          status: 'Đã đặt đơn',
          collectAt: dayjs().tz('Asia/Ho_Chi_Minh').format(),
        })
      );

      await Promise.all(promises);
      message.success('Đã lưu tất cả đơn hàng thành công');
    } catch (error) {
      console.error(error);
      message.error('Không thể lưu toàn bộ đơn hàng');
    }
  };

  useEffect(() => {
    const alreadySubmitted =
      sessionStorage.getItem('order_submitted') === 'true';

    if (isSuccess && !alreadySubmitted) {
      addToOrderHistory();
      sessionStorage.setItem('order_submitted', 'true');
    }
  }, [isSuccess]);

  const DesktopLayout = () => (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={{ color: isSuccess ? '#2ecc71' : '#e74c3c' }}>
          {isSuccess ? '🎉 Thanh toán thành công!' : '❌ Thanh toán thất bại'}
        </h1>
        <p style={styles.message}>
          {isSuccess
            ? 'Cảm ơn bạn đã thanh toán qua VNPay.'
            : 'Giao dịch không thành công. Vui lòng thử lại.'}
        </p>

        <div style={styles.infoBox}>
          <h3>Thông tin giao dịch:</h3>
          <ul style={styles.list}>
            <li>
              <strong>Mã giao dịch:</strong> {paymentData.vnp_TransactionNo}
            </li>
            <li>
              <strong>Mã đơn hàng:</strong> {paymentData.vnp_TxnRef}
            </li>
            <li>
              <strong>Khách hàng:</strong> {user?.fullName} ({user?.phoneNumber}
              )
            </li>
            <li>
              <strong>Số sản phẩm:</strong> {productInvoice.length}
            </li>
            <li>
              <strong>Tổng số tiền:</strong>{' '}
              {formatAmount(paymentData.vnp_Amount)}
            </li>
            <li>
              <strong>Ngân hàng:</strong> {paymentData.vnp_BankCode}
            </li>
            <li>
              <strong>Thời gian:</strong> {formatDate(paymentData.vnp_PayDate)}
            </li>
          </ul>

          <Divider />

          <h3>Chi tiết sản phẩm đã đặt:</h3>
          <ul style={styles.list}>
            {productInvoice.map((item, index) => (
              <li key={index}>
                🛒 <strong>{item.productName}</strong> (Mã: {item.Id})<br />
                💰 Giá: {formatAmount(item.productPrice * 100000)} | Số lượng:{' '}
                {item.quantify} <br />
                🏬 Cửa hàng: {item.productShopName} (Mã: {item.productShopID})
                <Divider />
              </li>
            ))}
          </ul>
        </div>

        <Button
          style={{
            backgroundColor: '#099c3a',
            fontWeight: 500,
            color: 'white',
          }}
          onClick={() => {
            if (isSuccess) {
              sessionStorage.removeItem('order_submitted');
              navigate('/san-pham/tai-khoan?case=2');
            } else {
              sessionStorage.removeItem('order_submitted');
              navigate('/san-pham/gio-hang');
            }
          }}
        >
          Đồng ý
        </Button>
      </div>
    </div>
  );

  const MobileLayout = () => (
    <div style={stylesMobile.container}>
      <div style={stylesMobile.card}>
        <h2 style={{ color: isSuccess ? '#2ecc71' : '#e74c3c' }}>
          {isSuccess ? '🎉 Thành công' : '❌ Thất bại'}
        </h2>
        <p style={stylesMobile.message}>
          {isSuccess
            ? 'Cảm ơn bạn đã thanh toán qua VNPay.'
            : 'Giao dịch không thành công. Vui lòng thử lại.'}
        </p>

        <div style={stylesMobile.infoBox}>
          <h4>Thông tin giao dịch:</h4>
          <ul style={stylesMobile.list}>
            <li>
              <strong>Mã GD:</strong> {paymentData.vnp_TransactionNo}
            </li>
            <li>
              <strong>Đơn hàng:</strong> {paymentData.vnp_TxnRef}
            </li>
            <li>
              <strong>Khách:</strong> {user?.fullName} ({user?.phoneNumber})
            </li>
            <li>
              <strong>Sản phẩm:</strong> {productInvoice.length}
            </li>
            <li>
              <strong>Tổng tiền:</strong> {formatAmount(paymentData.vnp_Amount)}
            </li>
            <li>
              <strong>Ngân hàng:</strong> {paymentData.vnp_BankCode}
            </li>
            <li>
              <strong>Thời gian:</strong> {formatDate(paymentData.vnp_PayDate)}
            </li>
          </ul>

          <Divider />

          <h4>Chi tiết đơn hàng:</h4>
          <ul style={stylesMobile.list}>
            {productInvoice.map((item, index) => (
              <li key={index}>
                🛍 <strong>{item.productName}</strong>
                <br />
                💰 {formatAmount(item.productPrice * 100000)} | SL:{' '}
                {item.quantify}
                <br />
                🏬 {item.productShopName}
                <Divider />
              </li>
            ))}
          </ul>
        </div>

        <Button
          block
          type="primary"
          onClick={() => {
            if (isSuccess) {
              sessionStorage.removeItem('order_submitted');
              navigate('/san-pham/tai-khoan?case=2');
            } else {
              sessionStorage.removeItem('order_submitted');
              navigate('/san-pham/gio-hang');
            }
          }}
        >
          Đồng ý
        </Button>
      </div>
    </div>
  );

  return <div>{isMobile ? <MobileLayout /> : <DesktopLayout />}</div>;
};

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    background: '#f4f6f8',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    background: '#ffffff',
    padding: '30px 40px',
    borderRadius: 16,
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    maxWidth: 700,
    width: '100%',
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  infoBox: {
    textAlign: 'left',
    marginTop: 20,
  },
  list: {
    listStyle: 'none',
    padding: 0,
    lineHeight: '1.8em',
    color: '#333',
  },
};

const stylesMobile = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    background: '#f4f6f8',

    minHeight: '100vh',
    padding: '100px 12px', // margin tránh tabbar trên/dưới
  },
  card: {
    background: '#fff',
    borderRadius: 12,
    padding: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoBox: {
    fontSize: 14,
    color: '#333',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    fontSize: 13,
    lineHeight: '1.6em',
  },
};

export default VNPaySuccess;
