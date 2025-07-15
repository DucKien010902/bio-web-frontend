import React from 'react';
import AllProductHeader from '../productall/AllProductHeader';
import { Col, Row, Divider, Carousel } from 'antd';
import { AiOutlineBars } from 'react-icons/ai';
import { AiFillFire } from 'react-icons/ai';
import { SiTicktick } from 'react-icons/si';
import { useRef } from 'react';
import { Button, Card, Typography, Rate, Avatar } from 'antd';
import { useMediaQuery } from 'react-responsive';
import dichvu from '../../assets/images/dichvu.webp';
import dichvu1 from '../../assets/images/dichvu1.webp';
import dichvu2 from '../../assets/images/dichvu2.webp';
import dichvu3 from '../../assets/images/dichvu3.webp';
import dichvu4 from '../../assets/images/dichvu4.webp';
import dichvu5 from '../../assets/images/dichvu5.webp';
import dichvu6 from '../../assets/images/dichvu6.webp';
import {
  LeftOutlined,
  RightOutlined,
  EnvironmentOutlined,
  CheckCircleTwoTone,
  CheckSquareTwoTone,
} from '@ant-design/icons';
import { LuMessageSquareMore } from 'react-icons/lu';
import ShopProductContent from '../productall/shopInfoProductContent';
import AllProductContent1 from '../productall/AllProductContent1';
import AllProductContentMobile1 from './AllProductContentMobile1';
import { useNavigate } from 'react-router-dom';
import AllProductFooter from './AllProductFooter';
import AllProductContent2 from './AllProductContent2';
import VoucherGen from './voucherGen';
import { useLocation } from 'react-router-dom';
import HeaderComponent from '../layout/header';
import AllProductContentMobile2 from './AllProductContentMobile2';

const { Title, Paragraph, Text, Link } = Typography;

const HomePageProduct = ({ chatOpen, setChatOpen }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const location = useLocation();
  const navigate = useNavigate();
  localStorage.removeItem('order_submitted');
  const scrollRef = useRef();
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };
  const scrollRef1 = useRef();

  const scroll1 = (direction) => {
    if (scrollRef.current) {
      scrollRef1.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };
  const featuredHospitals = [
    {
      name: 'Viện công nghệ và phân tích di truyền GENLAB',
      address: '183 Trường Chinh, Đống Đa, Hà Nội',
      rating: 4,
      logo: 'https://genlab.vn/wp-content/uploads/2020/05/logo-genlab.png',
    },
    {
      name: 'Bệnh viện Đại học Y Hà Nội',
      address: '183 Trường Chinh, Đống Đa, Hà Nội',
      rating: 4,
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi07v2eZmAvVlbdS-Fl4X5xct2UmpNmZu5Eg&s',
    },
    {
      name: 'Bệnh viện Bạch Mai',
      address: '183 Trường Chinh, Đống Đa, Hà Nội',
      rating: 4,
      logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-Benh-Vien-Bach-Mai-Wh.png',
    },
    {
      name: 'Bệnh viện Bạch Mai',
      address: '183 Trường Chinh, Đống Đa, Hà Nội',
      rating: 4,
      logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-Benh-Vien-Bach-Mai-Wh.png',
    },
    {
      name: 'Bệnh viện Bạch Mai',
      address: '183 Trường Chinh, Đống Đa, Hà Nội',
      rating: 4,
      logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-Benh-Vien-Bach-Mai-Wh.png',
    },
    // Thêm nữa nếu cần
  ];
  const categories = [
    { title: 'Thuyết bị điện tử', image: dichvu },
    { title: 'Balo & Túi xách', image: dichvu1 },
    { title: 'Thuyết bị quay phim', image: dichvu2 },
    { title: 'Thuyết bị điện gia dụng', image: dichvu3 },
    { title: 'Ô tô & xe máy', image: dichvu4 },
    { title: 'Sức khỏe', image: dichvu5 },
    { title: 'Mẹ và bé', image: dichvu4 },
    { title: 'Mẹ và bé', image: dichvu4 },
    { title: 'Mẹ và bé', image: dichvu4 },
    { title: 'Mẹ và bé', image: dichvu4 },
    { title: 'Mẹ và bé', image: dichvu4 },
    { title: 'Mẹ và bé', image: dichvu4 },
    { title: 'Mẹ và bé', image: dichvu4 },
    { title: 'Mẹ và bé', image: dichvu4 },
    { title: 'Mẹ và bé', image: dichvu4 },
    { title: 'Mẹ và bé', image: dichvu4 },
    { title: 'Mẹ và bé', image: dichvu4 },
    { title: 'Mẹ và bé', image: dichvu4 },
    { title: 'Mẹ và bé', image: dichvu4 },
    { title: 'Mẹ và bé', image: dichvu4 },
  ];
  const feedbacks = [
    {
      content:
        '“Đặt lịch xét nghiệm bên này rất gọn, có ngày giờ cụ thể luôn lên là được xét nghiệm liền không rườm rà gì mấy. An tâm đặt cho gia đình, có cả xét nghiệm tận nhà, không mất thời gian.”',
      name: 'Trần Mai',
      location: 'Hà Nội',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      content:
        '“Đặt lịch xét nghiệm bên này rất gọn, có ngày giờ cụ thể luôn lên là được xét nghiệm liền không rườm rà gì mấy. An tâm đặt cho gia đình, có cả xét nghiệm tận nhà, không mất thời gian.”',
      name: 'Trần Mai',
      location: 'Hà Nội',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      content:
        '“Đặt lịch xét nghiệm bên này rất gọn, có ngày giờ cụ thể luôn lên là được xét nghiệm liền không rườm rà gì mấy. An tâm đặt cho gia đình, có cả xét nghiệm tận nhà, không mất thời gian.”',
      name: 'Trần Mai',
      location: 'Hà Nội',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  ];
  const articles = [
    {
      title:
        'Nội soi dạ dày, đại tràng không đau tại Doctor Check có tốt không?',
      image:
        'https://phuongchau.com/Data/Sites/2/Product/8719/goi-noi-soi-da-day-va-dai-trang-gay-me-tai-benh-vien-phuong-nam.jpg',
      highlight: true,
      summary:
        'Bạn đang tìm kiếm địa chỉ nội soi dạ dày, đại tràng không đau? Tham khảo ngay Trung Tâm Nội Soi Tiêu Hóa Doctor Check trên GennovaX!',
      detail:
        'Doctor Check hiện là một trong những địa chỉ nội soi tiêu hóa uy tín, được nhiều người biết đến tại TPHCM. GennovaX đã có bài đánh giá khách quan về dịch vụ nội soi dạ dày, đại tràng không đau tại đây, giúp bạn có góc nhìn rõ ràng và đưa ra lựa chọn phù hợp ...',
    },
    {
      title:
        'Nội soi dạ dày, đại tràng không đau tại Doctor Check có tốt không?',
      image:
        'https://phuongchau.com/Data/Sites/2/Product/8719/goi-noi-soi-da-day-va-dai-trang-gay-me-tai-benh-vien-phuong-nam.jpg',
      summary:
        'Bạn đang tìm kiếm địa chỉ nội soi dạ dày, đại tràng không đau? Tham khảo ngay Trung Tâm Nội Soi Tiêu Hóa Doctor Check trên GennovaX!',
    },
    {
      title:
        'Nội soi dạ dày, đại tràng không đau tại Doctor Check có tốt không?',
      image:
        'https://phuongchau.com/Data/Sites/2/Product/8719/goi-noi-soi-da-day-va-dai-trang-gay-me-tai-benh-vien-phuong-nam.jpg',
      summary:
        'Bạn đang tìm kiếm địa chỉ nội soi dạ dày, đại tràng không đau? Tham khảo ngay Trung Tâm Nội Soi Tiêu Hóa Doctor Check trên GennovaX!',
    },
    {
      title:
        'Nội soi dạ dày, đại tràng không đau tại Doctor Check có tốt không?',
      image:
        'https://phuongchau.com/Data/Sites/2/Product/8719/goi-noi-soi-da-day-va-dai-trang-gay-me-tai-benh-vien-phuong-nam.jpg',
      summary:
        'Bạn đang tìm kiếm địa chỉ nội soi dạ dày, đại tràng không đau? Tham khảo ngay Trung Tâm Nội Soi Tiêu Hóa Doctor Check trên GennovaX!',
    },
  ];
  const bannerImages = [
    'https://digital.fpt.com/wp-content/uploads/2020/07/xetnghiemyte.jpg',
    'https://static.maysols.com/apollo/chir/655030097442508800/img_Hv8cQpyp7EuPJP.webp',
    'https://www.happyvisa.vn/wp-content/uploads/2019/10/banner_du-lich-nhat-ban-y-te-3.jpg',
  ];
  const DesktopLayout = () => {
    return (
      <>
        <AllProductHeader />
        <div style={{ width: '100%', backgroundColor: '#e4f5f7' }}>
          <div
            style={{
              width: '100%',
              maxWidth: 1300,
              margin: '0 auto',
              paddingTop: 20,
              backgroundColor: '#e4f5f7',
            }}
          >
            <div style={{ width: '100%', backgroundColor: '#e1f4f7' }}>
              <div
                style={{
                  // height: 480,
                  // marginTop: 20,
                  // padding: '20px',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div>
                  <Row gutter={24} style={{ height: '100%' }}>
                    {/* import {Carousel} from 'antd'; */}
                    <Col span={16} style={{ height: '100%' }}>
                      <Carousel autoplay effect="fade">
                        {bannerImages.map((src, index) => (
                          <div key={index}>
                            <img
                              src={src}
                              alt={`Banner-${index}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          </div>
                        ))}
                      </Carousel>
                    </Col>
                    <Col span={8} style={{ height: '100%' }}>
                      <Row style={{ height: '50%', paddingBottom: 5 }}>
                        <img
                          src="https://hongngochospital.vn/_default_upload_bucket/uu-dai-kham-suc-khoe-tong-quat-2.png"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                          alt="Ảnh nhỏ 1"
                        />
                      </Row>
                      <Row style={{ height: '50%', paddingTop: 5 }}>
                        <img
                          src="https://cdn.tuoitrethudo.vn/stores/news_dataimages/tuoitrethudocomvn/032020/23/14/doi-ngu-y-bac-si-keu-goi-chung-tay-day-lui-dai-dich-covid-19-08-.6096.jpg"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                          alt="Ảnh nhỏ 2"
                        />
                      </Row>
                    </Col>
                  </Row>
                </div>
                <div style={{ height: 30, backgroundColor: 'white' }}></div>
              </div>
              {/* <div
              style={{
                // height: 360,
                backgroundColor: 'white',
                marginTop: 30,
                padding: '10px 70px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
              }}
            >
              <VoucherGen />
            </div> */}
              <div
                style={{
                  // height: 360,
                  backgroundColor: 'white',
                  marginTop: 30,
                  padding: '30px 70px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      gap: 8, // khoảng cách giữa icon và chữ
                      fontWeight: 700,
                      fontSize: 24,
                      color: '#065c8c',
                    }}
                  >
                    <AiOutlineBars style={{ marginTop: 2 }} />
                    DANH MỤC
                  </div>
                </div>

                <Divider
                  style={{
                    margin: '8px 0',
                    borderWidth: 2,
                    borderColor: '#d2d8d9',
                  }}
                />

                <div
                  style={{
                    position: 'relative',
                    padding: '20px',
                  }}
                >
                  {/* Nút trái */}
                  <Button
                    shape="circle"
                    icon={<LeftOutlined />}
                    onClick={() => scroll('left')}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 1,
                      backgroundColor: '#e3bdbd',
                    }}
                  />

                  {/* Vùng scroll */}
                  <div
                    ref={scrollRef}
                    style={{
                      overflowX: 'auto',
                      padding: '0 30px',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 20,
                      }}
                    >
                      {/* Hai hàng */}
                      <div style={{ display: 'flex', gap: 16 }}>
                        {categories
                          .slice(0, Math.ceil(categories.length / 2))
                          .map((item, index) => (
                            <div
                              key={index}
                              style={{
                                flex: '0 0 auto',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginRight: 75,
                              }}
                            >
                              <div style={{ width: '100%', height: 10 }} />
                              <div
                                style={{
                                  width: 100,
                                  height: 100,
                                  borderRadius: '50%',
                                  backgroundColor: 'white',
                                  boxShadow: '0 0 12px rgba(0,0,0,0.15)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: 32,
                                  cursor: 'pointer',
                                }}
                                onClick={() => {
                                  const category = item.title;
                                  const encodedCategory =
                                    encodeURIComponent(category);
                                  navigate(
                                    `/product?danhmuc=${encodedCategory}`
                                  );
                                }}
                              >
                                <img
                                  src={item.image}
                                  alt="icon"
                                  style={{
                                    width: '80%',
                                    height: '80%',
                                    objectFit: 'contain',
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  marginTop: 12,
                                  fontSize: 14,
                                  fontWeight: 500,
                                  textAlign: 'center',
                                  maxWidth: 100,
                                  color: '#333',
                                }}
                              >
                                {item.title}
                              </div>
                            </div>
                          ))}
                      </div>

                      <div style={{ display: 'flex', gap: 16 }}>
                        {categories
                          .slice(Math.ceil(categories.length / 2))
                          .map((item, index) => (
                            <div
                              key={index}
                              style={{
                                flex: '0 0 auto',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginRight: 75,
                              }}
                            >
                              <div style={{ width: '100%', height: 10 }} />
                              <div
                                style={{
                                  width: 100,
                                  height: 100,
                                  borderRadius: '50%',
                                  backgroundColor: 'white',
                                  boxShadow: '0 0 12px rgba(0,0,0,0.15)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: 32,
                                  cursor: 'pointer',
                                }}
                                onClick={() => navigate('/product')}
                              >
                                <img
                                  src={item.image}
                                  alt="icon"
                                  style={{
                                    width: '80%',
                                    height: '80%',
                                    objectFit: 'contain',
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  marginTop: 12,
                                  fontSize: 14,
                                  fontWeight: 500,
                                  textAlign: 'center',
                                  maxWidth: 100,
                                  color: '#333',
                                }}
                              >
                                {item.title}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Nút phải */}
                  <Button
                    shape="circle"
                    icon={<RightOutlined />}
                    onClick={() => scroll('right')}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 1,
                      backgroundColor: '#e3bdbd',
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  // height: 540,
                  backgroundColor: 'white',
                  marginTop: 30,
                  padding: '30px 70px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                  backgroundColor: '#c4394e',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      gap: 8, // khoảng cách giữa icon và chữ
                      fontWeight: 700,
                      fontSize: 24,
                      color: 'yellow',
                    }}
                  >
                    <AiFillFire style={{ fontSize: 30 }} />
                    <span style={{ color: 'white' }}>DEAL HOT HÔM NAY</span>
                  </div>
                </div>

                <Divider
                  style={{
                    margin: '8px 0',
                    borderWidth: 2,
                    borderColor: '#d2d8d9',
                  }}
                />
                <div style={{ flex: 5 }}>
                  <AllProductContent2 />
                </div>
              </div>
              <div
                style={{
                  // height: 540,
                  marginTop: 30,
                  padding: '30px 70px',
                  display: 'flex',
                  flexDirection: 'column',
                  // boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                  backgroundColor: '#e6ad75',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      gap: 8, // khoảng cách giữa icon và chữ
                      fontWeight: 700,
                      fontSize: 24,
                      color: '#065c8c',
                    }}
                  >
                    <span style={{ color: '' }}>SẢN PHẨM GỢI Ý</span>
                  </div>
                </div>

                <Divider
                  style={{
                    margin: '8px 0',
                    borderWidth: 2,
                    borderColor: '#d2d8d9',
                  }}
                />
                <div style={{ flex: 9 }}>
                  <AllProductContent1 />
                </div>
              </div>
              <div
                style={{
                  height: 480,
                  marginTop: 30,
                  padding: '30px 70px',
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: `
      0 0 0 10px #f5fbfd,
      0 0 0 20px #eaf7fa,
      0 0 0 30px #e1f4f7
    `,
                  borderRadius: 16, // tuỳ chọn nếu muốn bo nhẹ góc
                }}
              >
                <Title
                  level={3}
                  style={{
                    textAlign: 'center',
                    color: '#1c3380',
                    marginBottom: 48,
                    fontWeight: 700,
                    fontSize: 24,
                  }}
                >
                  CƠ SỞ Y TẾ NỔI BẬT
                </Title>

                <div style={{ position: 'relative' }}>
                  {/* Nút trái */}
                  <Button
                    shape="circle"
                    icon={<LeftOutlined />}
                    onClick={() => scroll1('left')}
                    style={{
                      position: 'absolute',
                      left: -20,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 1,
                      backgroundColor: '#e3bdbd',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    }}
                  />

                  {/* Danh sách cơ sở */}
                  <div
                    ref={scrollRef1}
                    style={{
                      display: 'flex',
                      overflowX: 'auto',
                      gap: 24,
                      padding: '10px 30px',
                      scrollBehavior: 'smooth',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}
                  >
                    {featuredHospitals.map((hospital, index) => (
                      <Card
                        key={index}
                        style={{
                          flex: '0 0 auto',
                          width: 240,
                          borderRadius: 24,
                          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                          padding: 16,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          marginLeft: 10,
                          marginRight: 10,
                        }}
                        bodyStyle={{ padding: 0 }}
                      >
                        <img
                          src={hospital.logo}
                          alt="Logo"
                          style={{
                            height: 60,
                            objectFit: 'contain',
                            marginTop: 12,
                            marginBottom: 12,
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                          }}
                        />

                        <Divider
                          style={{
                            margin: '8px 0',
                            borderWidth: 2,
                            borderColor: '#d2d8d9',
                          }}
                        />
                        <div style={{ padding: '4px 16px 0', width: '100%' }}>
                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: 14,
                              marginBottom: 4,
                              height: 40, // đảm bảo đủ chỗ cho 2 dòng
                              lineHeight: '20px',
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {hospital.name}{' '}
                            <CheckCircleTwoTone twoToneColor="#1890ff" />
                          </div>

                          <Text type="secondary" style={{ fontSize: 13 }}>
                            <EnvironmentOutlined style={{ marginRight: 4 }} />
                            {hospital.address}
                          </Text>
                          <div style={{ margin: '8px 0' }}>
                            <Rate
                              disabled
                              defaultValue={hospital.rating}
                              style={{ fontSize: 16 }}
                            />
                            <span style={{ marginLeft: 8, fontSize: 13 }}>
                              (4)
                            </span>
                          </div>
                        </div>
                        <div style={{ padding: '0 16px 16px', width: '100%' }}>
                          <Button
                            type="primary"
                            block
                            style={{
                              borderRadius: 8,
                              backgroundColor: '#3a7fd5',
                              fontWeight: 600,
                            }}
                            onClick={() => {
                              window.open('https://genlabvn.com/', '_blank');
                            }}
                          >
                            Xem cơ sở
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Nút phải */}
                  <Button
                    shape="circle"
                    icon={<RightOutlined />}
                    onClick={() => scroll1('right')}
                    style={{
                      position: 'absolute',
                      right: -20,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 1,
                      backgroundColor: '#e3bdbd',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  height: 420,
                  marginTop: 30,
                  padding: '30px 70px',
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: 1000,
                  margin: '0 auto',
                }}
              >
                <Title
                  level={3}
                  style={{
                    textAlign: 'center',
                    color: '#1c3380',
                    marginBottom: 32,
                    fontSize: 24,
                    fontWeight: 700,
                  }}
                >
                  CẢM NHẬN TỪ KHÁCH HÀNG
                </Title>

                <Row gutter={24} justify="center">
                  {feedbacks.map((fb, index) => (
                    <Col key={index} xs={24} sm={12} md={8}>
                      <Card
                        style={{
                          borderRadius: 10,
                          minHeight: 200,
                          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
                        }}
                      >
                        <LuMessageSquareMore
                          style={{ fontSize: 30, color: '#999' }}
                        />
                        <p
                          style={{
                            margin: '16px 0',
                            fontSize: 12,
                            lineHeight: 1.2,
                          }}
                        >
                          {fb.content}
                        </p>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 16,
                          }}
                        >
                          <Avatar src={fb.avatar} size={40} />
                          <div style={{ marginLeft: 12 }}>
                            <Text style={{ fontWeight: 600, color: '#1c3380' }}>
                              {fb.name}
                            </Text>
                            <div style={{ fontSize: 13, color: '#888' }}>
                              {fb.location}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 600,
                  padding: '30px 60px',
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: 1300,
                  backgroundColor: 'white',
                  margin: '0 auto',
                  borderRadius: 40,
                  marginBottom: 30,
                }}
              >
                <Title
                  level={3}
                  style={{
                    textAlign: 'center',
                    color: '#1c3380',
                    marginBottom: 30,
                    fontSize: 24,
                    fontWeight: 700,
                  }}
                >
                  TIN TỨC Y TẾ
                </Title>
                <Row gutter={24}>
                  {/* Bài viết nổi bật bên trái */}
                  <Col span={10}>
                    <Card
                      style={{
                        borderRadius: 30,
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                        height: '100%',
                      }}
                      bodyStyle={{ padding: 16 }}
                    >
                      <img
                        src={articles[0].image}
                        alt="news"
                        style={{
                          width: '100%',
                          height: 200,
                          objectFit: 'cover',
                          borderRadius: 8,
                          marginBottom: 16,
                        }}
                      />
                      <Title level={5} style={{ fontWeight: 600 }}>
                        {articles[0].title}
                      </Title>
                      <div
                        style={{
                          height: 2,
                          width: 40,
                          backgroundColor: '#b33030',
                          margin: '8px 0',
                        }}
                      ></div>
                      <Paragraph
                        italic
                        style={{ fontSize: 14, marginBottom: 8, color: '#444' }}
                      >
                        {articles[0].summary}
                      </Paragraph>
                      <Paragraph style={{ fontSize: 14, color: '#444' }}>
                        {articles[0].detail}
                      </Paragraph>
                    </Card>
                  </Col>

                  {/* Danh sách bài viết bên phải */}
                  <Col span={14}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 20,
                        height: '100%',
                      }}
                    >
                      {articles.slice(1).map((item, index) => (
                        <Card
                          key={index}
                          style={{
                            borderRadius: 30,
                            boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                          }}
                          bodyStyle={{ display: 'flex', gap: 16, padding: 16 }}
                        >
                          <img
                            src={item.image}
                            alt="news"
                            style={{
                              width: 140,
                              height: 90,
                              objectFit: 'cover',
                              borderRadius: 10,
                            }}
                          />
                          <div>
                            <Text strong style={{ fontSize: 15 }}>
                              {item.title}
                            </Text>
                            <div
                              style={{
                                height: 2,
                                width: 40,
                                backgroundColor: '#b33030',
                                margin: '8px 0',
                              }}
                            ></div>
                            <Text
                              italic
                              style={{ fontSize: 13, color: '#444' }}
                            >
                              {item.summary}
                            </Text>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </Col>
                </Row>
              </div>
              <div
                style={{
                  // marginTop: 30,
                  marginBottom: 30,
                  width: '100%',
                  height: 450,
                  padding: '30px 60px',
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: 1300,
                  backgroundColor: 'white',
                  margin: '0 auto',
                }}
              >
                <Row gutter={32} align="middle" style={{ height: '100%' }}>
                  {/* Ảnh bên trái */}
                  <Col span={10}>
                    <img
                      src="https://nld.mediacdn.vn/2020/3/23/89963885102126374520495725234434303294701568o-15849685424641174163940.jpg"
                      alt="Doctors"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 32,
                      }}
                    />
                  </Col>

                  {/* Nội dung bên phải */}
                  <Col
                    span={14}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                      padding: '20px 20px',
                    }}
                  >
                    {/* Tiêu đề */}
                    <div>
                      <Title
                        level={3}
                        style={{
                          color: '#1c3380',
                          fontWeight: 700,
                          marginBottom: 8,
                        }}
                      >
                        Về GenApp
                      </Title>
                      <Title
                        level={4}
                        style={{
                          color: '#4d8dde',
                          marginTop: 0,
                          fontWeight: 500,
                        }}
                      >
                        Nền tảng kết nối hệ thống Y Tế toàn quốc dành cho người
                        Việt Nam
                      </Title>
                    </div>

                    {/* Đoạn giới thiệu */}
                    <Paragraph style={{ fontSize: 17 }}>
                      Sứ mệnh của chúng tôi là giúp người Việt tiếp cận các dịch
                      vụ Y tế{' '}
                      <strong>
                        nhanh chóng, tiện lợi với chất lượng dịch vụ cao nhất
                      </strong>
                    </Paragraph>

                    {/* Danh sách tính năng */}
                    <div>
                      <Paragraph style={{ fontSize: 17 }}>
                        <SiTicktick
                          style={{
                            marginRight: 10,
                            color: '#4d8dde',
                            fontSize: 20,
                          }}
                        />
                        Thanh toán tiện lợi ngay trên nền tảng
                      </Paragraph>

                      <Paragraph style={{ fontSize: 17 }}>
                        <SiTicktick
                          style={{
                            marginRight: 10,
                            color: '#4d8dde',
                            fontSize: 20,
                          }}
                        />
                        Đối tác Y tế Toàn quốc (Bệnh viện, bác sĩ, nhà thuốc,
                        ...)
                      </Paragraph>

                      <Paragraph style={{ fontSize: 17 }}>
                        <SiTicktick
                          style={{
                            marginRight: 10,
                            color: '#4d8dde',
                            fontSize: 20,
                          }}
                        />
                        Quản lý Dữ liệu người bệnh trực tuyến
                      </Paragraph>
                    </div>

                    {/* Link xem thêm */}
                    <Paragraph style={{ marginBottom: 0 }}>
                      <a
                        href="http://gennovax.vn"
                        style={{
                          fontWeight: 600,
                          color: '#1c3380',
                          textDecoration: 'underline',
                          fontSize: 16,
                        }}
                        target="_blank"
                      >
                        Xem thêm về GenApp &gt;&gt;
                      </a>
                    </Paragraph>
                  </Col>
                </Row>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 30,
                }}
              ></div>
            </div>
          </div>
        </div>
        <AllProductFooter />
      </>
    );
  };
  const MobileLayout = () => {
    return (
      <>
        <AllProductHeader chatOpen={chatOpen} setChatOpen={setChatOpen} />
        <div style={{ width: '100%', backgroundColor: '#e4f5f7' }}>
          <div
            style={{
              width: '100%',
              maxWidth: 1300,
              margin: '0 auto',
              paddingTop: 20,
              backgroundColor: '#e4f5f7',
            }}
          >
            <div style={{ width: '100%', backgroundColor: '#e1f4f7' }}>
              <div
                style={{
                  // height: 480,
                  // marginTop: 20,
                  // padding: '20px',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div>
                  <Row gutter={24} style={{ height: '100%' }}>
                    {/* import {Carousel} from 'antd'; */}
                    <Col span={24} style={{ height: '100%' }}>
                      <Carousel autoplay effect="fade">
                        {bannerImages.map((src, index) => (
                          <div key={index}>
                            <img
                              src={src}
                              alt={`Banner-${index}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          </div>
                        ))}
                      </Carousel>
                    </Col>
                  </Row>
                </div>
                {/* <div style={{ height: 30, backgroundColor: 'white' }}></div> */}
              </div>
              {/* <div
              style={{
                // height: 360,
                backgroundColor: 'white',
                marginTop: 30,
                padding: '10px 70px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
              }}
            >
              <VoucherGen />
            </div> */}
              <div
                style={{
                  // height: 360,
                  backgroundColor: 'white',
                  marginTop: 20,
                  padding: '10px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      gap: 8, // khoảng cách giữa icon và chữ
                      fontWeight: 700,
                      fontSize: 16,
                      color: 'red',
                    }}
                  >
                    {/* <AiOutlineBars style={{ marginTop: 2 }} /> */}
                    Danh Mục
                  </div>
                </div>

                <Divider
                  style={{
                    margin: '8px 0',
                    borderWidth: 2,
                    borderColor: '#d2d8d9',
                  }}
                />

                <div
                  style={{
                    position: 'relative',
                    padding: '10px 0px',
                  }}
                >
                  {/* Nút trái */}
                  {/* <Button
                    shape="circle"
                    icon={<LeftOutlined />}
                    onClick={() => scroll('left')}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 1,
                      backgroundColor: '#e3bdbd',
                    }}
                  /> */}

                  {/* Vùng scroll */}
                  <div
                    ref={scrollRef}
                    style={{
                      overflowX: 'auto',
                      padding: '0 10px',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0,
                      }}
                    >
                      {/* Hai hàng */}
                      <div style={{ display: 'flex', gap: 0 }}>
                        {categories
                          .slice(0, Math.ceil(categories.length / 2))
                          .map((item, index) => (
                            <div
                              key={index}
                              style={{
                                flex: '0 0 auto',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginRight: 15,
                              }}
                            >
                              <div style={{ width: '100%', height: 10 }} />
                              <div
                                style={{
                                  width: 70,
                                  height: 70,
                                  borderRadius: '50%',
                                  backgroundColor: 'white',
                                  boxShadow: '0 0 12px rgba(0,0,0,0.15)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: 32,
                                  cursor: 'pointer',
                                }}
                                onClick={() => {
                                  const category = item.title;
                                  const encodedCategory =
                                    encodeURIComponent(category);
                                  navigate(
                                    `/product?danhmuc=${encodedCategory}`
                                  );
                                }}
                              >
                                <img
                                  src={item.image}
                                  alt="icon"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  marginTop: 12,
                                  fontSize: 12,
                                  fontWeight: 400,
                                  textAlign: 'center',
                                  width: 100,
                                  color: '#333',
                                }}
                              >
                                {item.title}
                              </div>
                            </div>
                          ))}
                      </div>

                      <div style={{ display: 'flex', gap: 0 }}>
                        {categories
                          .slice(Math.ceil(categories.length / 2))
                          .map((item, index) => (
                            <div
                              key={index}
                              style={{
                                flex: '0 0 auto',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginRight: 15,
                              }}
                            >
                              <div style={{ width: '100%', height: 10 }} />
                              <div
                                style={{
                                  width: 70,
                                  height: 70,
                                  borderRadius: '50%',
                                  backgroundColor: 'white',
                                  boxShadow: '0 0 12px rgba(0,0,0,0.15)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: 32,
                                  cursor: 'pointer',
                                }}
                                onClick={() => navigate('/product')}
                              >
                                <img
                                  src={item.image}
                                  alt="icon"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  marginTop: 12,
                                  fontSize: 12,
                                  fontWeight: 400,
                                  textAlign: 'center',
                                  width: 100,
                                  color: '#333',
                                }}
                              >
                                {item.title}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Nút phải */}
                  {/* <Button
                    shape="circle"
                    icon={<RightOutlined />}
                    onClick={() => scroll('right')}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 1,
                      backgroundColor: '#e3bdbd',
                    }}
                  /> */}
                </div>
              </div>
              <div
                style={{
                  // height: 540,
                  backgroundColor: 'white',
                  marginTop: 20,
                  padding: '10px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                  backgroundColor: '#c4394e',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      gap: 8, // khoảng cách giữa icon và chữ
                      fontWeight: 700,
                      fontSize: 16,
                      color: 'yellow',
                    }}
                  >
                    <AiFillFire style={{ fontSize: 25, color: '#edaa5c' }} />
                    <span style={{ color: 'white' }}>Gợi ý cho bạn</span>
                  </div>
                </div>

                <Divider
                  style={{
                    margin: '8px 0',
                    borderWidth: 2,
                    borderColor: '#d2d8d9',
                  }}
                />
                <div style={{ flex: 5 }}>
                  <AllProductContentMobile2 />
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  padding: '20px 16px',
                  backgroundColor: 'white',
                  // borderRadius: 20,
                  margin: '20px auto 20px',
                  maxWidth: 600,
                }}
              >
                <Title
                  level={4}
                  style={{
                    textAlign: 'center',
                    color: '#1c3380',
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 20,
                  }}
                >
                  TIN TỨC Y TẾ
                </Title>

                {/* Bài viết nổi bật */}
                <Card
                  style={{
                    borderRadius: 20,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    marginBottom: 20,
                  }}
                  bodyStyle={{ padding: 12 }}
                >
                  <img
                    src={articles[0].image}
                    alt="news"
                    style={{
                      width: '100%',
                      height: 160,
                      objectFit: 'cover',
                      borderRadius: 8,
                      marginBottom: 12,
                    }}
                  />
                  <Title level={5} style={{ fontWeight: 600, fontSize: 16 }}>
                    {articles[0].title}
                  </Title>
                  <div
                    style={{
                      height: 2,
                      width: 40,
                      backgroundColor: '#b33030',
                      margin: '6px 0',
                    }}
                  />
                  <Paragraph
                    italic
                    style={{ fontSize: 13, marginBottom: 6, color: '#444' }}
                  >
                    {articles[0].summary}
                  </Paragraph>
                  <Paragraph style={{ fontSize: 13, color: '#444' }}>
                    {articles[0].detail}
                  </Paragraph>
                </Card>

                {/* Danh sách bài viết khác */}
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                >
                  {articles.slice(1).map((item, index) => (
                    <Card
                      key={index}
                      style={{
                        borderRadius: 20,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                      bodyStyle={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 12,
                        gap: 8,
                      }}
                    >
                      {/* Hàng trên: ảnh + tiêu đề */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                        }}
                      >
                        <img
                          src={item.image}
                          alt="news"
                          style={{
                            width: 90,
                            height: 60,
                            objectFit: 'cover',
                            borderRadius: 8,
                          }}
                        />
                        <div>
                          <Text strong style={{ fontSize: 14 }}>
                            {item.title}
                          </Text>
                          <div
                            style={{
                              height: 2,
                              width: 30,
                              backgroundColor: '#b33030',
                              marginTop: 6,
                            }}
                          />
                        </div>
                      </div>

                      {/* Hàng dưới: summary */}
                      <Text italic style={{ fontSize: 12, color: '#444' }}>
                        {item.summary}
                      </Text>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Section giới thiệu GenApp */}
              <div
                style={{
                  marginBottom: 20,
                  padding: '20px 16px',
                  backgroundColor: 'white',
                  // borderRadius: 20,
                  maxWidth: 600,
                }}
              >
                {/* Ảnh ở trên, nội dung dưới */}
                <img
                  src="https://nld.mediacdn.vn/2020/3/23/89963885102126374520495725234434303294701568o-15849685424641174163940.jpg"
                  alt="Doctors"
                  style={{
                    width: '100%',
                    height: 180,
                    objectFit: 'cover',
                    borderRadius: 20,
                    marginBottom: 16,
                  }}
                />
                <Title level={4} style={{ color: '#1c3380', fontWeight: 700 }}>
                  Về GenApp
                </Title>
                <Title
                  level={5}
                  style={{
                    color: '#4d8dde',
                    fontWeight: 500,
                    marginBottom: 12,
                  }}
                >
                  Nền tảng kết nối hệ thống Y Tế toàn quốc
                </Title>
                <Paragraph style={{ fontSize: 15 }}>
                  Sứ mệnh của chúng tôi là giúp người Việt tiếp cận các dịch vụ
                  Y tế{' '}
                  <strong>
                    nhanh chóng, tiện lợi với chất lượng dịch vụ cao nhất
                  </strong>
                </Paragraph>

                {/* Tính năng */}
                <Paragraph style={{ fontSize: 15 }}>
                  <SiTicktick
                    style={{ marginRight: 10, color: '#4d8dde', fontSize: 18 }}
                  />
                  Thanh toán tiện lợi ngay trên nền tảng
                </Paragraph>
                <Paragraph style={{ fontSize: 15 }}>
                  <SiTicktick
                    style={{ marginRight: 10, color: '#4d8dde', fontSize: 18 }}
                  />
                  Đối tác Y tế Toàn quốc (Bệnh viện, bác sĩ, nhà thuốc, ...)
                </Paragraph>
                <Paragraph style={{ fontSize: 15 }}>
                  <SiTicktick
                    style={{ marginRight: 10, color: '#4d8dde', fontSize: 18 }}
                  />
                  Quản lý Dữ liệu người bệnh trực tuyến
                </Paragraph>

                <Paragraph style={{ marginBottom: 0 }}>
                  <a
                    href="http://gennovax.vn"
                    style={{
                      fontWeight: 600,
                      color: '#1c3380',
                      textDecoration: 'underline',
                      fontSize: 15,
                    }}
                    target="_blank"
                  >
                    Xem thêm về GenApp &gt;&gt;
                  </a>
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
        <AllProductFooter />
      </>
    );
  };
  return (
    <div>
      {isDesktop && <DesktopLayout />}
      {isMobile && <MobileLayout />}
    </div>
  );
};

export default HomePageProduct;
