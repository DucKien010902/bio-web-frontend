import React, { useEffect, useState, useRef } from 'react';
import {
  Card,
  Button,
  Tabs,
  Row,
  Col,
  Typography,
  Space,
  Dropdown,
} from 'antd';
import { io } from 'socket.io-client';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { CiShop } from 'react-icons/ci';
import { LuUserRoundPlus } from 'react-icons/lu';
import { LuMessageSquareMore } from 'react-icons/lu';
import { GoPeople } from 'react-icons/go';
import { IoIosStarOutline } from 'react-icons/io';
import { LuUserRoundCheck } from 'react-icons/lu';
import { AiOutlineBars } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';
import AllProductHeader from './AllProductHeader';
import dayjs from 'dayjs';
import { Menu, Divider } from 'antd';
import ShopInfoProduct from './shopInfoProduct';
import VoucherList from './vouncherShop';
import ChatDrawer from './ChatDrawer';

const { Title } = Typography;

const { Text } = Typography;

const ShopProfile = () => {
  const shopProductRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const shopInfo = location.state;
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const category = shopInfo.productCategories.map((item) => item.categoryName);
  useEffect(() => {
    setTabs(['Dạo', 'Sản phẩm', ...category]);
  }, []);
  return (
    <>
      <AllProductHeader />
      <div style={{ backgroundColor: '#f7f7f2' }}>
        <div style={{ backgroundColor: 'white' }}>
          <div
            style={{
              width: '100%',
              maxWidth: 1200,
              margin: '0 auto',
            }}
          >
            <Row style={{ height: 180, margin: 0, paddingTop: 40 }} gutter={24}>
              <Col
                span={8}
                style={{
                  position: 'relative',
                  borderRadius: 5,
                  overflow: 'hidden',
                }}
              >
                {/* Nền mờ */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage:
                      'url("https://cdn.tgdd.vn/Files/2020/05/28/1259038/so-sanh-chuot-khong-day-va-chuot-khong-day-nen-mu.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.9,
                    zIndex: 0,
                  }}
                />

                {/* Nội dung */}
                <div style={{ position: 'relative', zIndex: 1, padding: 16 }}>
                  {/* Hàng trên: Avatar + Tên + Trạng thái */}
                  <Row gutter={16} align="middle">
                    <Col>
                      <div
                        style={{
                          width: 70,
                          height: 70,
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
                    <Col>
                      <Text strong style={{ fontSize: 16, color: 'white' }}>
                        {shopInfo?.shopName}
                      </Text>
                      <div
                        style={{
                          marginTop: 4,
                          color: 'white',
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

                        {shopInfo?.isOnline && 'Đang online'}
                        {!shopInfo?.isOnline &&
                          (shopInfo?.lastActive
                            ? `Online ${dayjs(shopInfo.lastActive).fromNow()}`
                            : 'Offline')}
                      </div>
                    </Col>
                  </Row>

                  {/* Hàng dưới: 2 nút hành động */}
                  <Row
                    style={{ marginTop: 12 }}
                    gutter={12}
                    justify="space-between"
                  >
                    <Col span={11}>
                      <div
                        style={{
                          color: '#f53d2d',
                          border: '1px solid #f53d2d',
                          padding: '4px 0',
                          borderRadius: 4,
                          cursor: 'pointer',
                          background: '#fff',
                          textAlign: 'center',
                          fontWeight: 500,
                        }}
                      >
                        + Theo dõi
                      </div>
                    </Col>
                    <Col span={11}>
                      <div
                        style={{
                          border: '1px solid #ccc',
                          padding: '4px 0',
                          borderRadius: 4,
                          cursor: 'pointer',
                          background: '#fff',
                          textAlign: 'center',
                          fontWeight: 500,
                        }}
                        // onClick={() => navigate('/product/shopInfo')}
                        onClick={() => setChatOpen(true)}
                      >
                        Tin nhắn
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>

              <Col span={8} style={{}}>
                <Row style={{ height: '100%', paddingLeft: 20 }}>
                  <Col
                    span={24}
                    style={{
                      padding: '8px 0',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <CiShop fontSize={18} />
                    <div style={{ marginLeft: 10 }}>Sản phẩm: </div>
                    <Text strong style={{ marginLeft: 10, color: 'red' }}>
                      {shopInfo.productsCount}
                    </Text>
                  </Col>
                  <Col
                    span={24}
                    style={{
                      padding: '8px 0',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <LuUserRoundPlus fontSize={18} />
                    <div style={{ marginLeft: 10 }}>Đang theo dõi: </div>
                    <Text strong style={{ marginLeft: 10, color: 'red' }}>
                      14
                    </Text>
                  </Col>
                  <Col
                    span={24}
                    style={{
                      padding: '8px 0',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <LuMessageSquareMore fontSize={18} />
                    <div style={{ marginLeft: 10 }}>Tỷ lệ phản hồi Chat: </div>
                    <Text strong style={{ marginLeft: 10, color: 'red' }}>
                      {shopInfo.replyRate}% ({shopInfo.replyTime})
                    </Text>
                  </Col>
                </Row>
              </Col>
              <Col span={8} style={{}}>
                <Row style={{ height: '100%' }}>
                  <Col
                    span={24}
                    style={{
                      padding: '8px 0',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <GoPeople fontSize={18} />
                    <div style={{ marginLeft: 10 }}>Số theo dõi: </div>
                    <Text strong style={{ marginLeft: 10, color: 'red' }}>
                      {shopInfo.followerCount}
                    </Text>
                  </Col>
                  <Col
                    span={24}
                    style={{
                      padding: '8px 0',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <IoIosStarOutline fontSize={18} />
                    <div style={{ marginLeft: 10 }}>Đánh giá: </div>
                    <Text strong style={{ marginLeft: 10, color: 'red' }}>
                      4.9 (2k+ đánh giá)
                    </Text>
                  </Col>
                  <Col
                    span={24}
                    style={{
                      padding: '8px 0',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <LuUserRoundCheck fontSize={18} />
                    <div style={{ marginLeft: 10 }}>Tham gia: </div>
                    <Text strong style={{ marginLeft: 10, color: 'red' }}>
                      04/2024
                    </Text>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row
              style={{
                height: 75,
                // backgroundColor: 'violet',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                paddingTop: 20,
              }}
            >
              {tabs.map((tab, index) => (
                <Col
                  key={index}
                  flex="1"
                  style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderBottom:
                      activeTab === index
                        ? '4px solid #f53d2d'
                        : '4px solid transparent',
                    fontWeight: activeTab === index ? 'bold' : 'normal',
                    padding: '0 8px',
                  }}
                  onClick={() => {
                    setActiveTab(index);
                    if (index > 0 && shopProductRef.current) {
                      setTimeout(() => {
                        shopProductRef.current.scrollIntoView({
                          behavior: 'smooth',
                        });
                      }, 100); // Delay nhỏ để đảm bảo DOM sẵn sàng
                    }
                  }}
                >
                  <span
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: 'inline-block',
                      maxWidth: '100%',
                      height: 20,
                    }}
                    title={tab} // Hiển thị tooltip khi hover
                  >
                    {tab}
                  </span>
                </Col>
              ))}
            </Row>
          </div>
        </div>
        <div style={{ height: 20 }}></div>
        <div
          style={{
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            height: 160,
            backgroundColor: 'white',
          }}
        >
          <VoucherList shopInfo={shopInfo} />
        </div>
        <div style={{ height: 20 }}></div>
        <div
          style={{
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
          <img
            src="https://down-bs-vn.img.susercontent.com/05dec0f3243a51c49a06fbc22eb19e47.webp"
            alt=""
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
        <div style={{ height: 20 }}></div>
        <div
          style={{
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
          <img
            src="https://down-bs-vn.img.susercontent.com/88981cc3d2763167d7c8fccb1c288b26.webp"
            alt=""
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
        <div style={{ height: 20 }}></div>
        <div
          style={{
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
          <img
            src="https://down-bs-vn.img.susercontent.com/23e40cc57d789a97c66b02d0446fbb4c.webp"
            alt=""
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
        <div style={{ height: 20 }}></div>
        <div ref={shopProductRef}>
          <ShopInfoProduct shopInfo={shopInfo} />
        </div>

        {/* <Row style={{ height: 100, }}></Row> */}
      </div>
      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
};

export default ShopProfile;
