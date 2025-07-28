import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Image,
  Typography,
  Rate,
  Button,
  Divider,
  Tag,
  Space,
  InputNumber,
  Radio,
  Tooltip,
  message,
  Spin,
} from 'antd';
import './productdetail.css';
import { ShoppingCartOutlined, ThunderboltOutlined } from '@ant-design/icons';
import {
  FacebookFilled,
  InstagramFilled,
  TwitterOutlined,
  MessageOutlined,
  HeartFilled,
  HeartOutlined,
} from '@ant-design/icons';
import axiosClient from '../../api/apiConfig';
import { use } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import AllProductHeader from './AllProductHeader';
import AllProductFooter from './AllProductFooter';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import ChatDrawer from './ChatDrawer';
import { useMediaQuery } from 'react-responsive';
import ChatPanel from './ChatDrawer';
import ScrollToTopButton from './scrollToTop';
import ChatPanelMobile from './ChatDrawerMobile';
import { useDispatch, useSelector } from 'react-redux';
import { openChatPanel, closeChatPanel } from '../../redux/slices/chatSlice';

dayjs.extend(relativeTime);
dayjs.locale('vi');
const { Title, Text } = Typography;

const ProductDetailPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const dispatch = useDispatch();
  const chatOpen = useSelector((state) => state.chat.openChat);
  const location = useLocation();
  const productState = location.state;
  const [searchParams] = useSearchParams();
  const Id = searchParams.get('Id');
  const [product, setProduct] = useState(productState || null);
  const navigate = useNavigate();
  const [counts, setCounts] = useState(1);
  const [shopInfo, setShopInfo] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(100); // ví dụ ban đầu
  const phoneNumber = JSON.parse(localStorage.getItem('user'))?.phoneNumber;
  const [selectedType, setSelectedType] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingShop, setLoadingShop] = useState(true);

  const handleAddtoCart = async () => {
    if (phoneNumber) {
      if (!selectedType && product.pdClassify) {
        message.warning('Vui lòng chọn loại sản phẩm');
      } else {
        console.log(selectedType);
        try {
          const res = await axiosClient.post('/product/addtocart', {
            phoneNumber: phoneNumber,
            Id: product.Id,
            pdImage: product.pdImage,
            pdName: product.pdName,
            pdDes: product.pdDes,
            pdPrice: product.pdPrice,
            pdVouncher: product.pdVouncher,
            pdShopID: product.pdShopID,
            pdShopName: product.pdShopName,
            pdCountSale: product.pdCountSale,
            pdClassify: product.pdClassify,
            pdCategory: product.pdCategory,
            pdType: selectedType,
            pdStar: product.pdStar,
            pdDayDelivery: product.pdDayDelivery,
            counts: counts,
          });
          message.success('Thêm vào giỏ hàng thành công');
          console.log('success');
        } catch (error) {
          message.error('Thêm vào giỏ hàng thất bại');
        }
      }
    } else {
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      navigate('/login');
    }
  };
  const handleOrder = async () => {
    if (!phoneNumber) {
      navigate('/login');
    } else {
      if (!selectedType && product.pdClassify) {
        message.warning('Vui lòng chọn loại sản phẩm');
      } else {
        navigate('/product/invoice', {
          state: [
            {
              Id: product.Id,
              productName: product.pdName,
              productShopID: product.pdShopID,
              productShopName: product.pdShopName,

              image: product.pdImage,
              category: selectedType,
              productPrice: product.pdPrice,
              price:
                Math.floor(product.pdPrice * (1 - product.pdVouncher / 100)) +
                '.000',
              originalPrice: product.pdPrice + '.000',
              quantify: counts,
              vouncher: product.pdVouncher,
            },
          ],
        });
      }
    }
  };

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const res = await axiosClient.get(`/product/getproductbyid?Id=${Id}`);
        setProduct(res.data);
      } catch (error) {
        console.log('Không thể lấy thông tin sản phẩm');
      } finally {
        setLoadingProduct(false); // ✅ Đặt lại dù thành công hay thất bại
      }
    };

    fetchProductInfo();
  }, [Id]);

  useEffect(() => {
    const fetchShopInfo = async () => {
      if (!product?.pdShopID) return;
      try {
        const res = await axiosClient.get(
          `/shop/fetchShopInfoByID?shopID=${product.pdShopID}`
        );
        setShopInfo(res.data);
      } catch (error) {
        console.log('Không thể lấy thông tin shop');
      } finally {
        setLoadingShop(false); // ✅
      }
    };

    if (product?.pdShopID) {
      fetchShopInfo();
    }
  }, [product?.pdShopID]);
  if (loadingProduct & !product) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin size="large" tip="Đang tải sản phẩm..." />
      </div>
    );
  }

  const DesktopLayout = () => {
    return (
      <div style={{ backgroundColor: '#f7f7f2' }}>
        <AllProductHeader />

        <div
          style={{
            height: 48,
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <span style={{ color: 'blue', marginRight: 4 }}>
            GennovaX &gt; {product?.pdCategory} &gt; {product?.pdClassify} &gt;
          </span>
          <span>{product?.pdName}</span>
        </div>

        <div
          style={{
            width: '100%',
            maxWidth: 1200, // hoặc 1000, 960,... tùy bạn
            margin: '0 auto',
            backgroundColor: 'white',
          }}
        >
          <Row gutter={24} style={{ padding: 24 }}>
            <Col span={10}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <Image.PreviewGroup>
                  <Image
                    width={'100%'}
                    src={product?.pdImage}
                    alt="Product"
                    preview={{
                      mask: <span style={{ fontSize: 16 }}>Xem ảnh lớn</span>,
                    }}
                  />
                  <Space style={{ marginTop: 12 }}>
                    <Image width={60} src={product?.pdImage} />
                    <Image width={60} src={product?.pdImage} />
                    <Image width={60} src={product?.pdImage} />
                  </Space>
                </Image.PreviewGroup>
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: 24,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Space>
                    <Text strong>Chia sẻ:</Text>
                    <FacebookFilled
                      style={{ fontSize: 24, color: '#1877F2' }}
                    />
                    <MessageOutlined
                      style={{ fontSize: 24, color: '#00B2FF' }}
                    />
                    <InstagramFilled
                      style={{ fontSize: 24, color: '#E1306C' }}
                    />
                    <TwitterOutlined
                      style={{ fontSize: 24, color: '#1DA1F2' }}
                    />
                  </Space>

                  <span
                    onClick={() => {
                      setLiked(!liked);
                      setLikeCount((prev) => prev + (liked ? -1 : 1));
                    }}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      // flexDirection: 'row',
                      alignItems: 'center',
                      // justifyContent: 'space-around',
                      marginRight: '20%',
                    }}
                  >
                    {liked ? (
                      <HeartFilled style={{ color: '#ff424f', fontSize: 24 }} />
                    ) : (
                      <HeartOutlined
                        style={{ color: '#ff424f', fontSize: 24 }}
                      />
                    )}
                    <span style={{ marginLeft: 8 }}>
                      Đã thích ({likeCount})
                    </span>
                  </span>
                </div>
              </div>
            </Col>
            <Col span={14}>
              <Title level={4}>{product?.pdName}</Title>
              <Space
                split={<Divider type="vertical" style={{ height: '100' }} />}
                align="center"
              >
                <Text
                  underline
                  style={{
                    fontSize: 15,
                    lineHeight: '20px',
                    color: '#d422b0',
                    fontFamily: 'cursive',
                  }}
                >
                  {product ? product.pdStar : 0}
                </Text>
                <Rate
                  allowHalf
                  disabled
                  value={product?.pdStar}
                  style={{ fontSize: 12, color: '#e6b31c' }}
                />
                <Text>74 đánh giá</Text>
                <Text strong>Đã bán {product?.pdCountSale}</Text>
              </Space>

              <Divider />

              <Space
                direction="horizontal"
                size={30}
                style={{
                  width: '100%',
                  paddingLeft: 20,
                  paddingRight: 20,
                  backgroundColor: '#fafafa',
                }}
              >
                <Text
                  type="secondary"
                  style={{ fontWeight: 'bold', color: 'orange' }}
                >
                  Giá gốc:{' '}
                  <Text delete style={{ color: 'orange' }}>
                    ₫{product?.pdPrice}.000
                  </Text>
                </Text>
                <Title
                  level={2}
                  style={{
                    color: '#d0011b',
                    margin: 0, // tránh xuống dòng do Title mặc định có margin
                  }}
                >
                  ₫
                  {Math.floor(
                    product?.pdPrice * (1 - product?.pdVouncher / 100)
                  )}
                  .000
                </Title>
                <Tag color="red">Giảm {product?.pdVouncher}%</Tag>
              </Space>

              <Divider />
              <Text strong>Vận chuyển : </Text>
              <img
                style={{ width: 16, height: 10 }}
                src="https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.53/pc/76dff349290d20891fc1.svg"
                alt=""
              />
              <Text> Nhận từ 11 Th05 - 13 Th05 · Miễn phí vận chuyển</Text>

              <Divider />

              <Text strong>Phân loại:</Text>
              <Radio.Group
                style={{ display: 'block', marginTop: 8 }}
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {product?.pdTypes?.map((item) => (
                  <Radio.Button
                    key={item}
                    value={item}
                    className={
                      selectedType === item
                        ? 'custom-radio-selected'
                        : 'custom-radio'
                    }
                  >
                    {item}
                  </Radio.Button>
                ))}
              </Radio.Group>

              <Divider />

              <div>
                <Text strong>Số lượng:</Text>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 8,
                    gap: 8,
                  }}
                >
                  <Button
                    onClick={() => setCounts((prev) => Math.max(1, prev - 1))}
                    disabled={counts <= 1}
                  >
                    -
                  </Button>
                  <InputNumber
                    min={1}
                    max={99}
                    value={counts}
                    onChange={setCounts}
                    controls={false} // ẩn nút mặc định của AntD
                    style={{ textAlign: 'center' }}
                  />
                  <Button
                    onClick={() => setCounts((prev) => Math.min(99, prev + 1))}
                    disabled={counts >= 99}
                  >
                    +
                  </Button>
                </div>
                {/* <Text type="secondary" style={{ marginTop: 4, display: 'block' }}>
                Còn lại: 500 sản phẩm
              </Text> */}
              </div>

              <Divider />

              <Space>
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  size="large"
                  onClick={handleAddtoCart}
                >
                  Thêm Vào Giỏ Hàng
                </Button>
                <Button
                  danger
                  type="primary"
                  icon={<ThunderboltOutlined />}
                  size="large"
                  onClick={handleOrder}
                >
                  Mua Với Voucher ₫
                  {Math.floor(
                    product?.pdPrice * (1 - product?.pdVouncher / 100)
                  )}
                  .000
                </Button>
              </Space>
            </Col>
          </Row>
          <div style={{ height: 20, backgroundColor: '#f7f7f2' }}></div>
          <Row style={{ padding: 24 }} gutter={24}>
            <Col span={7}>
              <Row gutter={24}>
                <Col span={8}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      backgroundColor: '#eee',
                    }}
                  >
                    <img
                      src={shopInfo?.avatarUrl}
                      alt="Avatar"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </Col>
                <Col span={16}>
                  <Row justify="space-between" align="middle" style={{}}>
                    <Col>
                      <Text strong style={{ fontSize: 16 }}>
                        {shopInfo?.shopName}
                      </Text>
                      <div
                        style={{
                          marginTop: 4,
                          color: '#888',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: shopInfo?.isOnline
                              ? 'limegreen'
                              : 'red',
                            display: 'inline-block',
                          }}
                        ></span>

                        {shopInfo?.isOnline
                          ? 'Đang online'
                          : shopInfo?.lastActive
                          ? `Online ${dayjs(shopInfo.lastActive).fromNow()}`
                          : 'Offline'}
                      </div>
                    </Col>
                    <Col style={{ marginTop: 10 }}>
                      <Space>
                        <div
                          style={{
                            color: '#f53d2d',
                            border: '1px solid #f53d2d',
                            padding: '4px 8px',
                            borderRadius: 4,
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            if (phoneNumber) {
                              dispatch(openChatPanel());
                            }
                          }}
                        >
                          Chat Ngay
                        </div>
                        <div
                          style={{
                            cursor: 'pointer',
                            border: '1px solid #ccc',
                            padding: '4px 8px',
                            borderRadius: 4,
                          }}
                          onClick={() => {
                            navigate('/shopInfo', { state: shopInfo });
                          }}
                        >
                          Xem Shop
                        </div>
                      </Space>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>

            <Col
              span={1}
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: 0,
                width: 10,
              }}
            >
              <Divider
                type="vertical"
                style={{
                  height: '100%',
                  borderColor: 'rgba(0, 0, 0, 0.2)',
                  borderWidth: 1,
                }}
              />
            </Col>

            <Col span={16}>
              <Row gutter={24}>
                {/* Cột 1 */}
                <Col span={6}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Text>Đánh Giá</Text>
                    </Col>
                    <Col>
                      <Text style={{ color: '#d0011b' }}>
                        {shopInfo?.ratingCount}
                      </Text>
                    </Col>
                  </Row>
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ marginTop: 16 }}
                  >
                    <Col>
                      <Text>Sản phẩm</Text>
                    </Col>
                    <Col>
                      <Text style={{ color: '#d0011b' }}>
                        {shopInfo?.productsCount}
                      </Text>
                    </Col>
                  </Row>
                </Col>
                <Col
                  span={1}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Divider
                    type="vertical"
                    style={{
                      height: '100%',
                    }}
                  />
                </Col>

                {/* Cột 2 */}
                <Col span={8}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Text>Tỷ lệ phản hồi</Text>
                    </Col>
                    <Col>
                      <Text style={{ color: '#d0011b' }}>
                        {shopInfo?.replyRate}%
                      </Text>
                    </Col>
                  </Row>
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ marginTop: 16 }}
                  >
                    <Col>
                      <Text>Thời gian phản hồi</Text>
                    </Col>
                    <Col>
                      <Text style={{ color: '#d0011b' }}>
                        {shopInfo?.replyTime}
                      </Text>
                    </Col>
                  </Row>
                </Col>
                <Col
                  span={1}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Divider
                    type="vertical"
                    style={{
                      height: '100%',
                    }}
                  />
                </Col>

                {/* Cột 3 */}
                <Col span={6}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Text>Tham gia</Text>
                    </Col>
                    <Col>
                      <Text style={{ color: '#d0011b' }}>
                        {shopInfo
                          ? dayjs(shopInfo.joinedAt).format('MM/YYYY')
                          : ''}
                      </Text>
                    </Col>
                  </Row>
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ marginTop: 16 }}
                  >
                    <Col>
                      <Text>Người Theo Dõi</Text>
                    </Col>
                    <Col>
                      <Text style={{ color: '#d0011b' }}>
                        {shopInfo?.followerCount}
                      </Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <div style={{ height: 20, backgroundColor: '#f7f7f2' }}></div>
          <div style={{ padding: '24px', background: '#fff' }}>
            <div
              style={{
                fontSize: 20,
                backgroundColor: '#fafafa',
                paddingLeft: 10,
                paddingTop: 15,
                paddingBottom: 15,
              }}
            >
              CHI TIẾT SẢN PHẨM
            </div>

            <div style={{ paddingTop: 16 }}>
              {product?.pdDetailData?.map((item, index) => (
                <Row gutter={[16, 8]} key={index}>
                  <Col span={8}>
                    <p
                      style={{ color: '#a3ab9f', padding: '10px 0 10px 10px' }}
                    >
                      {item.key}
                    </p>
                  </Col>
                  <Col span={16}>
                    {item.value
                      .split('.,')
                      .filter((v) => v.trim() !== '')
                      .map((sentence, idx) => (
                        <p key={idx} style={{ padding: '10px 0 10px 10px' }}>
                          {sentence.trim()}.
                        </p>
                      ))}
                  </Col>
                </Row>
              ))}
            </div>
            <div
              style={{
                fontSize: 20,
                backgroundColor: '#fafafa',
                paddingLeft: 10,
                paddingTop: 15,
                paddingBottom: 15,
                marginTop: 30,
              }}
            >
              MÔ TẢ SẢN PHẨM
            </div>
            <div style={{ marginTop: 20, paddingLeft: 10, fontSize: 15 }}>
              {product?.pdMoreDescriptions?.split('.,').map((line, index) => (
                <p key={index} style={{ marginBottom: 8 }}>
                  {line.trim()}
                </p>
              ))}
            </div>
            <div
              style={{
                width: '100%',
                marginTop: 20,
                // 75vw',
                // margin: '0 auto',
              }}
            >
              <img
                src={product?.pdImage}
                alt=""
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>

          <div style={{ height: 20, backgroundColor: '#f7f7f2' }}></div>
          <ChatPanel
            open={chatOpen}
            onClose={() => dispatch(closeChatPanel())}
            shopInfo={shopInfo}
          />
          <ScrollToTopButton />
        </div>
        <AllProductFooter />
      </div>
    );
  };
  const MobileLayout = () => {
    return (
      <div style={{ backgroundColor: '#f7f7f2' }}>
        <AllProductHeader />

        <div
          style={{
            height: 40,
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            // display: 'flex',
            alignItems: 'center',
            fontSize: 10,
            fontWeight: 500,
            padding: '10px 20px',
          }}
        >
          <span style={{ color: 'blue', marginRight: 4 }}>
            GennovaX &gt; {product?.pdCategory} &gt; {product?.pdClassify} &gt;
          </span>
          <span>{product?.pdName}</span>
        </div>

        <div
          style={{
            width: '100%',
            maxWidth: 1200, // hoặc 1000, 960,... tùy bạn
            margin: '0 auto',
            backgroundColor: 'white',
          }}
        >
          <Row gutter={24} style={{ padding: 16 }}>
            {/* Ảnh và chia sẻ */}
            <Col span={24}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Image.PreviewGroup>
                  <Image
                    width={'100%'}
                    src={product?.pdImage}
                    alt="Product"
                    preview={{
                      mask: <span style={{ fontSize: 16 }}>Xem ảnh lớn</span>,
                    }}
                  />
                  <Space style={{ marginTop: 12 }}>
                    <Image width={60} src={product?.pdImage} />
                    <Image width={60} src={product?.pdImage} />
                    <Image width={60} src={product?.pdImage} />
                  </Space>
                </Image.PreviewGroup>

                <div
                  style={{
                    marginTop: 24,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Space>
                    <Text strong>Chia sẻ:</Text>
                    <FacebookFilled
                      style={{ fontSize: 18, color: '#1877F2' }}
                    />
                    <MessageOutlined
                      style={{ fontSize: 18, color: '#00B2FF' }}
                    />
                    <InstagramFilled
                      style={{ fontSize: 18, color: '#E1306C' }}
                    />
                    <TwitterOutlined
                      style={{ fontSize: 18, color: '#1DA1F2' }}
                    />
                  </Space>

                  <div
                    onClick={() => {
                      setLiked(!liked);
                      setLikeCount((prev) => prev + (liked ? -1 : 1));
                    }}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {liked ? (
                      <HeartFilled style={{ color: '#ff424f', fontSize: 18 }} />
                    ) : (
                      <HeartOutlined
                        style={{ color: '#ff424f', fontSize: 18 }}
                      />
                    )}
                    <span style={{ marginLeft: 8 }}>
                      Đã thích ({likeCount})
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            {/* Thông tin sản phẩm */}
            <Col span={24} style={{ marginTop: 10 }}>
              <Title level={5}>{product?.pdName}</Title>

              <Space
                split={<Divider type="vertical" style={{ height: '100%' }} />}
                align="center"
              >
                <Text
                  underline
                  style={{
                    fontSize: 13,
                    color: '#d422b0',
                    // fontFamily: 'cursive',
                  }}
                >
                  {product?.pdStar}
                </Text>
                <Rate
                  allowHalf
                  disabled
                  value={product?.pdStar}
                  style={{ fontSize: 10 }}
                />
                <Text>74 đánh giá</Text>
                <Text strong>Đã bán {product?.pdCountSale}</Text>
              </Space>

              <Divider style={{ margin: 10 }} />

              <Space direction="vertical" style={{ width: '100%' }}>
                <Text
                  type="secondary"
                  style={{ fontWeight: 'bold', color: 'orange' }}
                >
                  Giá gốc:{' '}
                  <Text delete style={{ color: 'orange' }}>
                    ₫{product?.pdPrice}.000
                  </Text>
                </Text>

                <Title level={2} style={{ color: '#d0011b', margin: 0 }}>
                  ₫
                  {Math.floor(
                    product?.pdPrice * (1 - product?.pdVouncher / 100)
                  )}
                  .000
                </Title>

                <Tag color="red">Giảm {product?.pdVouncher}%</Tag>
              </Space>

              <Divider style={{ margin: 10 }} />

              <Text strong>Vận chuyển : </Text>
              <img
                style={{ width: 16, height: 10 }}
                src="https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.53/pc/76dff349290d20891fc1.svg"
                alt=""
              />
              <Text> Nhận từ 11 Th05 - 13 Th05 · Miễn phí vận chuyển</Text>

              <Divider style={{ margin: 10 }} />

              <Text strong>Phân loại:</Text>
              <Radio.Group
                style={{ display: 'block', marginTop: 8 }}
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {product?.pdTypes?.map((item) => (
                  <Radio.Button
                    key={item}
                    value={item}
                    className={
                      selectedType === item
                        ? 'custom-radio-selected'
                        : 'custom-radio'
                    }
                  >
                    {item}
                  </Radio.Button>
                ))}
              </Radio.Group>

              <Divider style={{ margin: 10 }} />

              <div>
                <Text strong>Số lượng:</Text>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 8,
                    gap: 8,
                  }}
                >
                  <Button
                    onClick={() => setCounts((prev) => Math.max(1, prev - 1))}
                    disabled={counts <= 1}
                  >
                    -
                  </Button>
                  <InputNumber
                    min={1}
                    max={99}
                    value={counts}
                    onChange={setCounts}
                    controls={false}
                  />
                  <Button
                    onClick={() => setCounts((prev) => Math.min(99, prev + 1))}
                    disabled={counts >= 99}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Divider style={{ margin: 10 }} />

              <Space
                direction="vertical"
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  size="middle"
                  onClick={handleAddtoCart}
                  block
                  style={{ fontSize: 11 }}
                >
                  Thêm Vào Giỏ Hàng
                </Button>
                <Button
                  danger
                  type="primary"
                  icon={<ThunderboltOutlined />}
                  size="middle"
                  onClick={handleOrder}
                  block
                  style={{ fontSize: 11 }}
                >
                  Mua Với Voucher ₫
                  {Math.floor(
                    product?.pdPrice * (1 - product?.pdVouncher / 100)
                  )}
                  .000
                </Button>
              </Space>
            </Col>
          </Row>

          <div style={{ height: 20, backgroundColor: '#f7f7f2' }}></div>
          <div style={{ padding: 16 }}>
            {/* Avatar + tên + online */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  backgroundColor: '#eee',
                }}
              >
                <img
                  src={shopInfo?.avatarUrl}
                  alt="Avatar"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Text strong style={{ fontSize: 14 }}>
                  {shopInfo?.shopName}
                </Text>
                <div
                  style={{
                    marginTop: 4,
                    color: '#888',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: shopInfo?.isOnline ? 'limegreen' : 'red',
                      display: 'inline-block',
                    }}
                  ></span>
                  {shopInfo?.isOnline
                    ? 'Đang online'
                    : shopInfo?.lastActive
                    ? `Online ${dayjs(shopInfo.lastActive).fromNow()}`
                    : 'Offline'}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button
                  size="small"
                  type="primary"
                  onClick={() => dispatch(openChatPanel())}
                  style={{ marginBottom: 4 }}
                >
                  Chat
                </Button>
                <Button
                  size="small"
                  onClick={() => navigate('/shopInfo', { state: shopInfo })}
                >
                  Xem Shop
                </Button>
              </div>
            </div>

            {/* Dòng 1: Sản phẩm - Đánh giá - Người theo dõi */}
            <Row gutter={16} style={{ marginTop: 16, textAlign: 'center' }}>
              <Col span={8} style={{ alignItems: 'center' }}>
                <Text>Sản phẩm</Text>
                <div style={{ color: '#d0011b', fontWeight: 500 }}>
                  {shopInfo?.productsCount}
                </div>
              </Col>
              <Col span={8}>
                <Text>Phản hồi</Text>
                <div style={{ color: '#d0011b', fontWeight: 500 }}>
                  {shopInfo?.replyRate}%
                </div>
              </Col>
              <Col span={8}>
                <Text>Tham gia</Text>
                <div style={{ color: '#d0011b', fontWeight: 500 }}>
                  {shopInfo?.joinedAt
                    ? dayjs(shopInfo.joinedAt).format('MM/YYYY')
                    : ''}
                </div>
              </Col>
            </Row>
          </div>
          <div style={{ height: 20, backgroundColor: '#f7f7f2' }}></div>
          <div style={{ padding: '24px', background: '#fff' }}>
            <div
              style={{
                fontSize: 20,
                backgroundColor: '#fafafa',
                paddingLeft: 10,
                paddingTop: 15,
                paddingBottom: 15,
              }}
            >
              CHI TIẾT SẢN PHẨM
            </div>

            <div style={{ paddingTop: 16 }}>
              {product?.pdDetailData?.map((item, index) => (
                <Row gutter={[16, 8]} key={index}>
                  <Col span={8}>
                    <p
                      style={{ color: '#a3ab9f', padding: '10px 0 10px 10px' }}
                    >
                      {item.key}
                    </p>
                  </Col>
                  <Col span={16}>
                    {item.value
                      .split('.,')
                      .filter((v) => v.trim() !== '')
                      .map((sentence, idx) => (
                        <p key={idx} style={{ padding: '10px 0 10px 10px' }}>
                          {sentence.trim()}.
                        </p>
                      ))}
                  </Col>
                </Row>
              ))}
            </div>
            <div
              style={{
                fontSize: 20,
                backgroundColor: '#fafafa',
                paddingLeft: 10,
                paddingTop: 15,
                paddingBottom: 15,
                marginTop: 30,
              }}
            >
              MÔ TẢ SẢN PHẨM
            </div>
            <div style={{ marginTop: 20, paddingLeft: 10, fontSize: 15 }}>
              {product?.pdMoreDescriptions?.split('.,').map((line, index) => (
                <p key={index} style={{ marginBottom: 8 }}>
                  {line.trim()}
                </p>
              ))}
            </div>
            <div
              style={{
                width: '100%',
                marginTop: 20,
                // 75vw',
                // margin: '0 auto',
              }}
            >
              <img
                src={product?.pdImage}
                alt=""
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>

          <div style={{ height: 20, backgroundColor: '#f7f7f2' }}></div>
          <ChatPanelMobile
            open={chatOpen}
            onClose={() => dispatch(closeChatPanel())}
            shopInfo={shopInfo}
          />
        </div>
        <AllProductFooter />
      </div>
    );
  };
  return (
    <div>
      {isDesktop && <DesktopLayout />}
      {isMobile && <MobileLayout />}
    </div>
  );
};

export default ProductDetailPage;
