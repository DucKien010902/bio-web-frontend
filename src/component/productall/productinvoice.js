import React, { useEffect, useState } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Divider,
  Input,
  Image,
  Space,
  Button,
  message,
  Modal,
} from 'antd';
import axiosClient from '../../api/apiConfig';
import { useLocation } from 'react-router-dom';
import AllProductHeader from './AllProductHeader';
import AllProductFooter from './AllProductFooter';

const { Title, Text } = Typography;
const { TextArea } = Input;

const CheckoutPage = () => {
  const location = useLocation();
  const phoneNumber = JSON.parse(localStorage.getItem('user')).phoneNumber;
  const productsInvoice = location.state || [];
  console.log(productsInvoice);

  const [groupedProducts, setGroupedProducts] = useState([]);
  const [vouchersMap, setVouchersMap] = useState({});
  const [selectedVouchers, setSelectedVouchers] = useState({});

  const shippingFee = 12800;

  useEffect(() => {
    // Group products by shopID
    const grouped = productsInvoice.reduce((acc, item) => {
      const shopID = item.productShopID;
      if (!acc[shopID]) acc[shopID] = [];
      acc[shopID].push(item);
      return acc;
    }, {});

    const result = Object.entries(grouped).map(([shopID, products]) => ({
      shopID,
      products,
    }));

    setGroupedProducts(result);

    // Fetch vouchers per shop
    result.forEach(async ({ shopID }) => {
      try {
        const res = await axiosClient.get(
          `/voucher/getVoucherByUserAndID?shopID=${shopID}&phoneNumber=${phoneNumber}`
        );
        setVouchersMap((prev) => ({ ...prev, [shopID]: res.data }));
      } catch (err) {
        message.error(`Không tải được voucher cho shop ${shopID}`);
      }
    });
  }, []);

  const handleSelectVoucher = (shopID, voucher, totalItemPrice) => {
    const subtotal = totalItemPrice * 1000;
    if (subtotal >= voucher.minOrder * 1000) {
      setSelectedVouchers((prev) => ({ ...prev, [shopID]: voucher }));
    } else {
      message.warning(
        `Đơn hàng shop ${shopID} chưa đạt tối thiểu ₫${voucher.minOrder.toLocaleString()} để dùng voucher`
      );
    }
  };

  const getShopSummary = (products, voucher) => {
    const itemTotal = products.reduce(
      (acc, p) => acc + p.price * p.quantify,
      0
    );
    let discount = 0;
    if (voucher && itemTotal * 1000 >= voucher.minOrder * 1000) {
      discount = Math.min(
        Math.floor((voucher.discount / 100) * itemTotal * 1000),
        voucher.maxDiscount * 1000
      );
    }
    return {
      itemTotal,
      discount,
      total: itemTotal * 1000 + shippingFee - discount,
    };
  };

  const grandTotal = groupedProducts.reduce((acc, group) => {
    const summary = getShopSummary(
      group.products,
      selectedVouchers[group.shopID]
    );
    return acc + summary.total;
  }, 0);
  const applyVoucher = async (voucherID) => {
    try {
      await axiosClient.post(`/voucher/deleteVoucherByID`, {
        voucherID,
        phoneNumber,
      });
      console.log('Đã sử dụng voucher');
    } catch {
      message.error('Không sử dụng được voucher');
    }
  };
  const handlePayment = async () => {
    Modal.confirm({
      title: 'Xác nhận đặt hàng',
      content: 'Bạn có chắc chắn muốn đặt toàn bộ đơn hàng này?',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk: async () => {
        if (grandTotal <= 0) {
          message.error('Tổng thanh toán không hợp lệ!');
          return;
        }

        localStorage.setItem('productInvoice', JSON.stringify(productsInvoice));

        try {
          const res = await axiosClient.post(`/product/creatpaymenturl`, {
            amount: grandTotal,
          });
          const data = await res.data;

          if (data.paymentUrl) {
            Object.values(selectedVouchers).forEach((voucher) => {
              if (voucher?.voucherID) {
                applyVoucher(voucher.voucherID);
              }
            });
            window.location.href = data.paymentUrl;
          } else {
            message.error('Không lấy được link thanh toán!');
          }
        } catch (error) {
          console.error('Lỗi khi gọi API:', error);
          message.error('Có lỗi xảy ra khi thanh toán.');
        }
      },
    });
  };

  return (
    <>
      <AllProductHeader />
      <div style={{ width: '80%', margin: '0 auto', padding: 20 }}>
        {groupedProducts.map(({ shopID, products }) => {
          const vouchers = vouchersMap[shopID] || [];
          const selectedVoucher = selectedVouchers[shopID];
          const summary = getShopSummary(products, selectedVoucher);

          return (
            <Card
              key={shopID}
              title={`Sản phẩm từ Shop ${shopID}`}
              style={{ marginBottom: 30 }}
            >
              {products.map((item, index) => (
                <Row
                  key={index}
                  gutter={16}
                  style={{ marginBottom: 20, alignItems: 'center' }}
                  wrap={false} // Chống dòng xuống nếu không cần thiết
                >
                  <Col>
                    <Image src={item.image} width={60} />
                  </Col>

                  <Col flex="1" style={{ minWidth: 0 }}>
                    <Title
                      level={5}
                      style={{
                        margin: 0,
                        wordBreak: 'break-word',
                        whiteSpace: 'normal',
                        overflowWrap: 'break-word',
                      }}
                    >
                      {item.productName}
                    </Title>
                    <Text type="secondary">Loại: {item.category}</Text>
                  </Col>

                  <Col>
                    <Text>₫{item.price.toLocaleString()}</Text>
                  </Col>

                  <Col>
                    <Text>Số lượng: {item.quantify}</Text>
                  </Col>

                  <Col>
                    <Text strong style={{ color: 'red' }}>
                      ₫{(item.price * item.quantify * 1000).toLocaleString()}
                    </Text>
                  </Col>
                </Row>
              ))}

              <Divider />
              <Text strong>Chọn voucher shop:</Text>
              <div
                style={{
                  display: 'flex',
                  overflowX: 'auto',
                  paddingBottom: 10,
                }}
              >
                {vouchers.map((voucher) => {
                  const isSelected =
                    selectedVoucher?.voucherID === voucher.voucherID;
                  const subtotal = summary.itemTotal * 1000;
                  const isEligible = subtotal >= voucher.minOrder * 1000;
                  return (
                    <div
                      key={voucher.voucherID}
                      onClick={() =>
                        isEligible &&
                        handleSelectVoucher(shopID, voucher, summary.itemTotal)
                      }
                      style={{
                        position: 'relative',
                        border: `2px solid ${isSelected ? '#ee4d2d' : '#ccc'}`,
                        borderRadius: 8,
                        padding: 10,
                        marginRight: 10,
                        width: 220,
                        opacity: isEligible ? 1 : 0.5,
                        cursor: isEligible ? 'pointer' : 'not-allowed',
                        backgroundColor: '#fff',
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            color: '#ee4d2d',
                            fontSize: 18,
                          }}
                        >
                          ✔
                        </div>
                      )}
                      <Text strong style={{ color: '#ee4d2d' }}>
                        Giảm {voucher.discount}% - Tối đa ₫
                        {voucher.maxDiscount.toLocaleString()}k
                      </Text>
                      <br />
                      <Text>
                        Đơn tối thiểu: ₫{voucher.minOrder.toLocaleString()}k
                      </Text>
                      <br />
                      {/* <Text>Số lượng: {voucher.quantity}</Text>
                      <br /> */}
                      <Text type="secondary">
                        HSD:{' '}
                        {new Date(voucher.expiry).toLocaleDateString('vi-VN')}
                      </Text>
                    </div>
                  );
                })}
              </div>

              <Divider />
              <Row
                justify="space-between"
                style={{ alignItems: 'center', display: 'flex' }}
              >
                <Text>
                  Tổng tiền hàng: ₫{(summary.itemTotal * 1000).toLocaleString()}
                </Text>
                <Text>Phí vận chuyển: ₫{shippingFee.toLocaleString()}</Text>
                <Text>Voucher giảm: -₫{summary.discount.toLocaleString()}</Text>
                <Title level={5} style={{ color: '#ee4d2d' }}>
                  Tổng: ₫{summary.total.toLocaleString()}
                </Title>
              </Row>
            </Card>
          );
        })}

        <Card>
          <Title level={4}>Tổng thanh toán toàn bộ đơn hàng:</Title>
          <Title
            level={2}
            style={{
              color: '#ee4d2d',
              paddingBottom: 20,
              paddingTop: 20,
              margin: 0,
            }}
          >
            ₫{grandTotal.toLocaleString()}
          </Title>
          <Button type="primary" size="large" block onClick={handlePayment}>
            Đặt hàng tất cả
          </Button>
        </Card>
      </div>
      <AllProductFooter />
    </>
  );
};

export default CheckoutPage;
