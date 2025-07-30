import React, { useState, useEffect } from 'react';
import {
  Layout,
  Table,
  InputNumber,
  Button,
  Row,
  Col,
  Typography,
  Image,
  Tag,
  message,
} from 'antd';
import { Checkbox } from 'antd'; // THÊM nếu chưa import
import axiosClient from '../../api/apiConfig';
import AllProductHeader from './AllProductHeader';
import { useNavigate } from 'react-router-dom';
import AllProductFooter from './AllProductFooter';
import { useMediaQuery } from 'react-responsive';
const { Content } = Layout;
const { Text } = Typography;

const CartPage = ({ allproducts, setCurrentPage, setProductsInvoice }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isMobile = useMediaQuery({ maxWidth: 797 });
  const [cart, setCart] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isFixed, setIsFixed] = useState(true);
  const phoneNumber = JSON.parse(localStorage.getItem('user'))?.phoneNumber;
  const navigate = useNavigate();
  const fetchCartsData = async () => {
    try {
      const res = await axiosClient(
        `/product/getcarts?phoneNumber=${phoneNumber}`
      );
      setCart(
        res.data.map((product, index) => {
          return {
            key: index,
            Id: product.Id,
            productName: product.pdName,
            productShopID: product.pdShopID,
            productShopName: product.pdShopName,

            image: product.pdImage,
            category: product.pdType,
            productPrice: product.pdPrice,
            price:
              Math.floor(product.pdPrice * (1 - product.pdVouncher / 100)) +
              '.000',
            originalPrice: product.pdPrice + '.000',
            quantify: product.counts,
            vouncher: product.pdVouncher,
          };
        })
      );
    } catch (error) {
      console.log('khong the get Cart');
    }
  };
  const deletetoCart = async (id) => {
    try {
      const res = await axiosClient.post('/product/deletetocart', {
        phoneNumber: phoneNumber,
        Id: id,
      });
      message.success('xoa thanh cong');
    } catch (error) {
      message.error('xoa that bai');
    }
  };
  const onQuantityChange = (value, key) => {
    setCart((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, quantify: value } : item
      )
    );
  };

  const handleDelete = (record) => {
    setCart((prev) => prev.filter((item) => item.key !== record.key));
    setSelectedRowKeys((prev) => prev.filter((k) => k !== record.key));
    deletetoCart(record.Id);
  };
  const selectedItems = cart.filter((item) =>
    selectedRowKeys.includes(item.key)
  );
  // console.log(selectedItems);
  const total = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantify,
    0
  );

  useEffect(() => {
    fetchCartsData();
    const handleScroll = () => {
      const bottomOffset = 380;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      if (scrollY + windowHeight >= fullHeight - bottomOffset) {
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const DesktopLayOut = () => {
    return (
      <>
        <AllProductHeader />
        <Layout
          style={{
            background: '#f5f5f5',
            minHeight: '100vh',
            paddingBottom: 100,
          }}
        >
          <Content style={{ padding: '20px 100px' }}>
            <Table
              rowSelection={{
                selectedRowKeys,
                onChange: setSelectedRowKeys,
              }}
              pagination={false}
              columns={[
                {
                  title: 'Sản Phẩm',
                  dataIndex: 'productName',
                  render: (text, record) => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Image src={record.image} alt={text} width={80} />
                      <div
                        style={{ marginLeft: 12, cursor: 'pointer' }}
                        onClick={() => {
                          navigate(`/san-pham/chi-tiet?Id=${record.Id}`);
                        }}
                      >
                        <Text strong>{text}</Text>
                        <div>Phân Loại: {record.category}</div>
                        <Tag color="red">Giảm {record.vouncher}%</Tag>
                      </div>
                    </div>
                  ),
                },
                {
                  title: 'Đơn Giá',
                  dataIndex: 'price',
                  width: '180px',
                  render: (text, record) => (
                    <>
                      <Text delete style={{ marginRight: 8, color: '#faa00f' }}>
                        {record.originalPrice.toLocaleString()}đ
                      </Text>
                      <Text strong style={{ color: '#ee4d2d' }}>
                        {record.price.toLocaleString()}đ
                      </Text>
                    </>
                  ),
                },
                {
                  title: 'Số Lượng',
                  dataIndex: 'quantify',
                  render: (text, record) => (
                    <InputNumber
                      min={1}
                      max={record.stock}
                      value={record.quantify}
                      onChange={(value) => onQuantityChange(value, record.key)}
                    />
                  ),
                },
                {
                  title: 'Số Tiền',
                  dataIndex: 'total',
                  width: '100px',
                  render: (_, record) => (
                    <Text strong style={{ color: '#ee4d2d' }}>
                      {(record.quantify * record.price).toLocaleString()}.000đ
                    </Text>
                  ),
                },
                {
                  title: 'Thao Tác',
                  render: (_, record) => (
                    <Button
                      danger
                      type="link"
                      onClick={() => handleDelete(record)}
                    >
                      Xóa
                    </Button>
                  ),
                },
              ]}
              dataSource={cart}
            />
          </Content>

          {/* Thanh toán */}
          <div
            style={{
              // position: isFixed ? 'fixed' : '',
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100%',
              background: '#fff',
              boxShadow: isFixed ? '0 -2px 8px rgba(0,0,0,0.1)' : 'none',
              padding: '16px 100px',
              zIndex: 999,
            }}
          >
            <Row justify="end" align="middle" gutter={16}>
              <Col>
                <Text strong>
                  Tổng cộng ({selectedItems.length} sản phẩm):{' '}
                </Text>
                <Text style={{ fontSize: 20, color: '#ee4d2d', marginLeft: 8 }}>
                  {total.toLocaleString() != '0'
                    ? total.toLocaleString() + '.000đ'
                    : null}
                </Text>
              </Col>
              <Col>
                <Button
                  type="primary"
                  size="large"
                  style={{ background: '#ee4d2d', borderColor: '#ee4d2d' }}
                  disabled={selectedItems.length === 0}
                  onClick={() => {
                    navigate('/san-pham/dat-hang', { state: selectedItems });
                    // setProductsInvoice(selectedItems);
                  }}
                >
                  Mua Hàng
                </Button>
              </Col>
            </Row>
          </div>
        </Layout>
        <AllProductFooter />
      </>
    );
  };

  const MobileLayout = () => {
    return (
      <>
        <AllProductHeader />
        <Layout style={{ background: '#f5f5f5', paddingBottom: 100 }}>
          <Content style={{ padding: '12px' }}>
            {cart.map((item) => (
              <div
                key={item.key}
                style={{
                  background: '#fff',
                  marginBottom: 12,
                  padding: 12,
                  borderRadius: 8,
                  boxShadow: '0 1px 6px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Row gutter={12}>
                  <Col
                    span={8}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.productName}
                      width="100%"
                      preview={false}
                      onClick={() =>
                        navigate(`/san-pham/chi-tiet?Id=${item.Id}`)
                      }
                      style={{ borderRadius: 4 }}
                    />
                    <div style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={selectedRowKeys.includes(item.key)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRowKeys([...selectedRowKeys, item.key]);
                          } else {
                            setSelectedRowKeys(
                              selectedRowKeys.filter((k) => k !== item.key)
                            );
                          }
                        }}
                      />
                    </div>
                  </Col>
                  <Col span={16}>
                    <div
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        navigate(`/san-pham/chi-tiet?Id=${item.Id}`)
                      }
                    >
                      {item.productName}
                    </div>
                    <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>
                      Phân loại: {item.category}
                    </div>
                    <Tag color="red" style={{ marginTop: 4 }}>
                      Giảm {item.vouncher}%
                    </Tag>
                    <div style={{ marginTop: 8 }}>
                      <Text delete style={{ fontSize: 12, color: '#aaa' }}>
                        {item.originalPrice.toLocaleString()}đ
                      </Text>{' '}
                      <Text strong style={{ color: '#ee4d2d' }}>
                        {item.price.toLocaleString()}đ
                      </Text>
                    </div>
                    <div
                      style={{
                        marginTop: 12,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                          size="small"
                          onClick={() =>
                            onQuantityChange(
                              Math.max(1, item.quantify - 1),
                              item.key
                            )
                          }
                        >
                          -
                        </Button>
                        <InputNumber
                          min={1}
                          max={item.stock}
                          value={item.quantify}
                          size="small"
                          onChange={(value) =>
                            onQuantityChange(value, item.key)
                          }
                          style={{ margin: '0 8px', width: 60 }}
                        />
                        <Button
                          size="small"
                          onClick={() =>
                            onQuantityChange(item.quantify + 1, item.key)
                          }
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        type="link"
                        danger
                        size="small"
                        onClick={() => handleDelete(item)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </Content>

          {/* Thanh toán */}
          <div
            style={{
              position: isFixed ? 'fixed' : 'relative',
              position: 'fixed',
              bottom: 56,
              left: 0,
              width: '100%',
              background: '#fff',
              boxShadow: isFixed ? '0 -2px 8px rgba(0,0,0,0.1)' : 'none',
              padding: '12px',
              zIndex: 999,
            }}
          >
            <Row justify="space-between" align="middle">
              <Col>
                <Text strong>Tổng ({selectedItems.length} SP):</Text>
                <Text style={{ fontSize: 16, color: '#ee4d2d', marginLeft: 4 }}>
                  {total.toLocaleString() !== '0'
                    ? total.toLocaleString() + '.000đ'
                    : null}
                </Text>
              </Col>
              <Col>
                <Button
                  type="primary"
                  size="middle"
                  style={{ background: '#ee4d2d', borderColor: '#ee4d2d' }}
                  disabled={selectedItems.length === 0}
                  onClick={() => {
                    navigate('/san-pham/dat-hang', { state: selectedItems });
                  }}
                >
                  Mua Hàng
                </Button>
              </Col>
            </Row>
          </div>
        </Layout>
        <AllProductFooter />
      </>
    );
  };

  return (
    <div>
      {isDesktop && <DesktopLayOut />}
      {isMobile && <MobileLayout />}
    </div>
  );
};

export default CartPage;
