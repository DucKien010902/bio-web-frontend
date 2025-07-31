import React, { useEffect, useState, useRef } from 'react';
import { Input, Row, Col, Card, Typography, Carousel } from 'antd';
import './content.css';
import axiosClient from '../../api/apiConfig';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import dichvu from '../../assets/images/dichvu.png';
import dichvu1 from '../../assets/images/dichvu1.png';
import dichvu2 from '../../assets/images/dichvu2.png';
import imagehoptac1 from '../../assets/images/hoptac1.webp';
import imagehoptac2 from '../../assets/images/hoptac2.webp';
import imagehoptac3 from '../../assets/images/hoptac3.webp';
import appstore from '../../assets/images/appleStore.png';
import googleplay from '../../assets/images/googleplay.png';
import round from '../../assets/images/round.png';
import phone from '../../assets/images/phone.png';
import { FaQuoteLeft } from 'react-icons/fa';
import {
  CheckCircleFilled,
  EnvironmentOutlined,
  StarFilled,
  BankOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import TypingInput from './contentSearchInput';
import { Avatar, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

const { Title, Paragraph } = Typography;

const bannerImages = [
  'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F5ddb363f-8886-4b33-bde9-f57bec34a86b-care247-tro-ly-ca-nhan-ho-tro-nguoi-dan-di-kham.png&w=1200&q=100',
  'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fda64c9ee-fdd6-4a13-bc52-fe74255fc079-promote-vaccine-d.jpg&w=1200&q=100',
  'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F2ef4ca2e-7283-457f-a9c1-e7d9a08d94db-giai-phap-quan-ly-phong-mach.png&w=1200&q=100',
];
const bannerImagesMobile = [
  'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fb391767a-71b5-4b43-a50c-ee0956c52dff-promote-vaccine-m.jpg&w=828&q=100',
  'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fd748611c-3d49-4d5b-b22b-a5eca0fe390f-care247-tro-ly-ca-nhan-ho-tro-nguoi-dan-di-kham.png&w=828&q=100',
  'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F2ec142a8-0bc6-495d-a9bb-463dba4dec95-dat-kham-medpro-zalopay-mobile.jpg&w=828&q=100',
];

const clinicList = [
  {
    name: 'Trung Tâm Nội Soi Tiêu Hoá Doctor Check',
    address: 'Quận 10, Thành phố Hồ Chí Minh',
    rating: 5,
    logo: imagehoptac1,
    verified: true,
  },
  {
    name: 'Trung Tâm Nội Soi Tiêu Hoá Doctor Check',
    address: 'Quận 10, Thành phố Hồ Chí Minh',
    rating: 5,
    logo: imagehoptac1,
    verified: true,
  },
  {
    name: 'Trung Tâm Nội Soi Tiêu Hoá Doctor Check',
    address: 'Quận 10, Thành phố Hồ Chí Minh',
    rating: 5,
    logo: imagehoptac1,
    verified: true,
  },
  {
    name: 'Trung Tâm Nội Soi Tiêu Hoá Doctor Check',
    address: 'Quận 10, Thành phố Hồ Chí Minh',
    rating: 5,
    logo: imagehoptac1,
    verified: true,
  },
  {
    name: 'Trung Tâm Nội Soi Tiêu Hoá Doctor Check',
    address: 'Quận 10, Thành phố Hồ Chí Minh',
    rating: 5,
    logo: imagehoptac1,
    verified: true,
  },
];
const serviceList = [
  {
    name: 'Tiêm ngừa viêm gan B',
    image:
      'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fcce223da-f510-40d2-9d96-21fcac5d4bd8-tiaaam_ngaaaa_-_banner_section_-_277x150_px_.png&w=640&q=75',
    clinic: 'Trung tâm nội soi tiêu hóa Doctor Check',
    verified: true,
    price: 300,
  },
  {
    name: 'Tiêm ngừa viêm gan B',
    image:
      'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fcce223da-f510-40d2-9d96-21fcac5d4bd8-tiaaam_ngaaaa_-_banner_section_-_277x150_px_.png&w=640&q=75',
    clinic: 'Trung tâm nội soi tiêu hóa Doctor Check',
    verified: true,
    price: 300,
  },
  {
    name: 'Tiêm ngừa viêm gan B',
    image:
      'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fcce223da-f510-40d2-9d96-21fcac5d4bd8-tiaaam_ngaaaa_-_banner_section_-_277x150_px_.png&w=640&q=75',
    clinic: 'Trung tâm nội soi tiêu hóa Doctor Check',
    verified: true,
    price: 300,
  },
  {
    name: 'Tiêm ngừa viêm gan B',
    image:
      'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fcce223da-f510-40d2-9d96-21fcac5d4bd8-tiaaam_ngaaaa_-_banner_section_-_277x150_px_.png&w=640&q=75',
    clinic: 'Trung tâm nội soi tiêu hóa Doctor Check',
    verified: true,
    price: 300,
  },
  {
    name: 'Tiêm ngừa viêm gan B',
    image:
      'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fcce223da-f510-40d2-9d96-21fcac5d4bd8-tiaaam_ngaaaa_-_banner_section_-_277x150_px_.png&w=640&q=75',
    clinic: 'Trung tâm nội soi tiêu hóa Doctor Check',
    verified: true,
    price: 300,
  },
];
const newsList = [
  {
    title: '5 dấu hiệu cảnh báo bệnh tiểu đường',
    image:
      'https://cdn.tgdd.vn//News/1405384//nhung-dau-hieu-nhan-som-nhan-biet-bi-tieu-duong-(2)-800x450.jpg',
  },
  {
    title: 'Cách phòng tránh đột quỵ mùa nắng nóng',
    image: 'https://bvdklangson.com.vn/sites/default/files/3333_0.jpg',
  },
  {
    title: 'Chăm sóc sức khỏe người cao tuổi',
    image:
      'https://cloudpro.vn/public/media/images/mo-hinh-cham-soc-suc-khoe-tai-nha1%402x-100.jpg',
  },
];

const ContentComponent = () => {
  // console.log('re-render');
  const isMobile = useMediaQuery({ maxWidth: 797 });
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const fetchAllClinic = async () => {
    try {
      const res = await axiosClient.get('/clinic/fetchall');
      localStorage.setItem('allclinics', JSON.stringify(res.data));
    } catch (error) {
      console.log('Không thể lấy danh sách phòng khám');
    }
  };
  const fetchServices = async () => {
    try {
      const res = await axiosClient.get('/testservice/fetchall');
      localStorage.setItem('alltests', JSON.stringify(res.data));
    } catch (error) {
      console.error(error);
      console.log('Không thể tải dữ liệu dịch vụ');
    }
  };
  const fullText = 'Tìm kiếm dịch vụ y tế';
  const [placeholder, setPlaceholder] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const scrollCards = (direction) => {
    const container = document.getElementById('carousel');
    const cardWidth = 80; // chiều rộng card + khoảng cách giữa
    if (container) {
      container.scrollBy({
        left: direction * cardWidth * 2,
        behavior: 'smooth',
      });
    }
  };
  const scrollCards1 = (direction) => {
    const container = document.getElementById('carousel1');
    const cardWidth = 80; // chiều rộng card + khoảng cách giữa
    if (container) {
      container.scrollBy({
        left: direction * cardWidth * 2,
        behavior: 'smooth',
      });
    }
  };
  console.log('re-render');

  useEffect(() => {
    fetchServices();
    fetchAllClinic();
  }, []);
  const DesktopLayOut = () => {
    return (
      <>
        <div
          style={{
            width: '100%',
            height: 40,
            backgroundColor: '#ffb54a',
            overflow: 'hidden',
            position: 'relative',
            color: 'white',
            fontWeight: 500,
            fontSize: 17,
            padding: '4px 0',
            paddingTop: 6,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 'fit-content',
              whiteSpace: 'nowrap',
              animation: 'scroll-left 20s linear infinite',
            }}
          >
            {[...Array(3)].map((_, i) => (
              <span key={i} style={{ marginRight: 40 }}>
                📢 Đặt ngay Trợ Lý Giúp Việc để người thân luôn được chăm sóc
                khi đi khám bệnh
              </span>
            ))}
          </div>
        </div>
        {/* Phần chính */}
        <div className="main-content" style={{ backgroundColor: 'white' }}>
          <div className="banner">
            <Title
              level={1}
              style={{
                fontWeight: 700,
                color: '#065c8c',
                marginBottom: 0,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // đổ bóng nhẹ sang phải dưới
              }}
            >
              Kết nối Người Dân với Cơ sở & Dịch vụ Y tế hàng đầu
            </Title>

            <TypingInput />

            {/* SVG ưu điểm */}
            <ul className="advantages">
              {[
                'Đặt khám nhanh – Lấy số thứ tự trực tuyến – Tư vấn sức khỏe từ xa',
                'Đặt khám theo giờ – Đặt càng sớm để có cơ sở thụ hưởng tốt nhất',
                'Được hoàn tiền khi hủy khám – Có cơ hội nhận ưu đãi hoàn tiền',
              ].map((text, i) => (
                <li key={i} style={{ display: 'flex', flexDirection: 'row' }}>
                  <svg
                    viewBox="0 0 24 24"
                    color="#03fc0f"
                    height="18"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    />
                  </svg>{' '}
                  <p style={{ color: '#065c8c', marginBottom: 0 }}>{text}</p>
                </li>
              ))}
            </ul>
            <div className="service-carousel-wrapper">
              <button
                className="scroll-btn left"
                onClick={() => scrollCards(-1)}
              >
                <RxCaretLeft size={24} color="black" />
              </button>

              <div className="service-cards-container" id="carousel">
                {[
                  {
                    title: 'Xét nghiệm tổng quát',
                    image: dichvu,
                  },
                  {
                    title: 'Xét nghiệm máu',
                    image: dichvu1,
                  },
                  {
                    title: 'Xét nghiệm ADN huyết thống',
                    image: dichvu2,
                  },
                  {
                    title: 'Xét nghiệm dị tật thai nhi (NIPT)',
                    image: dichvu,
                  },
                  {
                    title: 'Xét nghiệm bệnh lây qua đường tình dục',
                    image: dichvu1,
                  },
                  {
                    title: 'Xét nghiệm miễn dịch',
                    image: dichvu2,
                  },
                  {
                    title: 'Xét nghiệm COVID-19 PCR',
                    image: dichvu,
                  },
                ].map((item, index) => (
                  <div key={index} className="service-card">
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: '40%',
                        height: '40%',
                        objectFit: 'contain',
                        // borderRadius: '50%',
                      }}
                      className="card-image"
                    />
                    <h3 className="card-title">{item.title}</h3>
                  </div>
                ))}
              </div>

              <button
                className="scroll-btn right"
                onClick={() => scrollCards(1)}
              >
                <RxCaretRight size={24} color="black" />
              </button>
            </div>
          </div>
          <Title
            level={2}
            style={{
              margin: '20px 0 10px',
              color: '#065c8c',
              textAlign: 'center',
              fontWeight: 700,
            }}
          >
            Được tin tưởng hợp tác và đồng hành
          </Title>
          <div className="service-carousel-wrapper" style={{ marginTop: 40 }}>
            <button
              className="scroll-btn left"
              onClick={() => scrollCards1(-1)}
            >
              <RxCaretLeft size={24} color="black" />
            </button>

            <div className="service-cards-container" id="carousel1">
              {[
                {
                  title: 'Xét nghiệm tổng quát',
                  image: imagehoptac1,
                },
                {
                  title: 'Xét nghiệm máu',
                  image: imagehoptac2,
                },
                {
                  title: 'Xét nghiệm ADN huyết thống',
                  image: imagehoptac3,
                },
                {
                  title: 'Xét nghiệm dị tật thai nhi (NIPT)',
                  image: imagehoptac1,
                },
                {
                  title: 'Xét nghiệm bệnh lây qua đường tình dục',
                  image: imagehoptac2,
                },
                {
                  title: 'Xét nghiệm miễn dịch',
                  image: imagehoptac3,
                },
                {
                  title: 'Xét nghiệm COVID-19 PCR',
                  image: imagehoptac1,
                },
                {
                  title: 'Xét nghiệm COVID-19 PCR',
                  image: imagehoptac1,
                },
                {
                  title: 'Xét nghiệm COVID-19 PCR',
                  image: imagehoptac1,
                },
                {
                  title: 'Xét nghiệm COVID-19 PCR',
                  image: imagehoptac1,
                },
              ].map((item, index) => (
                <div>
                  <img
                    src={item.image}
                    alt=""
                    className="card-image"
                    style={{
                      // width: '40%',
                      height: '70px',
                      marginLeft: 35,
                      marginRight: 35,
                      objectFit: 'contain',
                    }}
                  />
                  <div
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      marginTop: 10,
                      color: '#003553',
                      fontSize: 16,
                    }}
                  >
                    {item.title}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="scroll-btn right"
              onClick={() => scrollCards1(1)}
            >
              <RxCaretRight size={24} color="black" />
            </button>
          </div>
          {/* Banner y tế */}
          <div style={{ width: '80%', margin: '60px auto' }}>
            <Carousel autoplay>
              {bannerImages.map((src, i) => (
                <div key={i}>
                  <img
                    src={src}
                    alt={`banner-${i}`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 20,
                      objectFit: 'cover',
                      maxHeight: 320,
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          {/* Danh sách bác sĩ */}
          <div
            style={{
              background: `linear-gradient(
      to bottom,
      white 0px,
      #e8f8fd 50px,
      #e8f8fd calc(100% - 50px),
      white 100%
    )`,
            }}
          >
            <Title
              level={2}
              style={{
                margin: '60px 0 10px',
                color: '#065c8c',
                textAlign: 'center',
                fontWeight: 700,
              }}
            >
              Cơ sở y tế được yêu thích
            </Title>
            <div
              style={{
                width: '80%',
                margin: '0 auto',
                overflowX: 'auto',
                padding: '40px 0',
              }}
            >
              <Row
                gutter={[32, 32]}
                wrap={false} // quan trọng: không xuống dòng
                style={{ minWidth: 'max-content' }} // giữ các item theo chiều ngang
              >
                {clinicList.map((clinic, i) => (
                  <Col key={i} style={{ width: 310 }}>
                    <Card
                      hoverable
                      bodyStyle={{ padding: 0 }}
                      style={{
                        borderRadius: 16,
                        padding: '36px 16px',
                        boxShadow: '0 4px 12px rgba(0, 191, 255, 0.3)',
                        textAlign: 'start',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginBottom: 16,
                        }}
                      >
                        <img
                          src={clinic.logo}
                          alt={clinic.name}
                          style={{
                            width: 120,
                            height: 120,
                            objectFit: 'contain',
                          }}
                        />
                      </div>
                      <Title level={4} style={{ marginBottom: 8 }}>
                        {clinic.name}{' '}
                        {clinic.verified && (
                          <CheckCircleFilled
                            style={{ color: '#1890ff', fontSize: 16 }}
                          />
                        )}
                      </Title>
                      <p
                        style={{
                          color: '#003553',
                          marginBottom: 8,
                          fontSize: 16,
                          fontWeight: 500,
                        }}
                      >
                        <EnvironmentOutlined
                          style={{ marginRight: 6, fontSize: 18 }}
                        />
                        {clinic.address}
                      </p>

                      <div
                        style={{
                          marginBottom: 12,
                          color: '#003553',
                          fontSize: 18,
                        }}
                      >
                        <span style={{ marginRight: 6 }}>(5)</span>
                        {[...Array(clinic.rating)].map((_, i) => (
                          <StarFilled
                            key={i}
                            style={{
                              color: '#ffb54a',
                              fontSize: 20,
                              marginRight: 2,
                            }}
                          />
                        ))}
                      </div>

                      <button
                        style={{
                          backgroundColor: '#00bfff',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: 8,
                          width: '100%',
                          height: 40,
                          cursor: 'pointer',
                          fontWeight: 'bold',
                        }}
                      >
                        Đặt khám ngay
                      </button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
          <div
            style={{
              background: `linear-gradient(
      to bottom,
      white 0px,
      #e8f8fd 50px,
      #e8f8fd calc(100% - 50px),
      white 100%
    )`,
            }}
          >
            {/* Tin tức y tế */}
            <Title
              level={2}
              style={{
                margin: '40px 0 10px',
                color: '#065c8c',
                textAlign: 'center',
                fontWeight: 700,
              }}
            >
              Tin tức y tế
            </Title>
            <Row
              gutter={[32, 32]}
              style={{ padding: '2% 10%', paddingTop: 40, paddingBottom: 40 }}
            >
              {newsList.map((news, i) => (
                <Col xs={24} sm={12} md={8} key={i}>
                  <Card
                    style={{ boxShadow: '4px 2px 8px rgba(0, 191, 255, 0.4)' }}
                    hoverable
                    cover={
                      <img
                        alt={news.title}
                        src={news.image}
                        style={{
                          height: 180,
                          objectFit: 'cover',
                          // shadow màu xanh
                        }}
                      />
                    }
                  >
                    <Card.Meta title={news.title} />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          (
          <div style={{ padding: '40px 20px' }}>
            <Title
              level={2}
              style={{
                textAlign: 'center',
                color: '#065c8c',
                fontWeight: 700,
              }}
            >
              Tải ứng dụng đặt xét nghiệm tại{' '}
              <span style={{ color: 'blue' }}>GennovaX</span>
            </Title>

            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <img
                src={appstore}
                alt="App Store"
                style={{ height: 50, marginRight: 10 }}
              />
              <img src={googleplay} alt="Google Play" style={{ height: 50 }} />
            </div>

            {/* Main layout */}
            <Row
              justify="center"
              align="middle"
              gutter={32}
              style={{ marginTop: 60 }}
            >
              {/* Left Info */}
              <Col xs={24} md={6} style={{ textAlign: 'end' }}>
                <Paragraph strong style={{ fontSize: 20, color: '#065c8c' }}>
                  Lấy số thứ tự khám nhanh trực tuyến
                </Paragraph>
                <Paragraph type="secondary">
                  Đăng ký khám, tái khám theo bác sĩ chuyên khoa, theo lịch hẹn
                </Paragraph>

                <Paragraph
                  strong
                  style={{ fontSize: 20, color: '#065c8c', paddingRight: 50 }}
                >
                  Tư vấn sức khỏe từ xa
                </Paragraph>
                <Paragraph type="secondary" style={{ paddingRight: 50 }}>
                  Gọi video với bác sĩ, chuyên gia
                </Paragraph>

                <Paragraph strong style={{ fontSize: 20, color: '#065c8c' }}>
                  Tra cứu kết quả cận lâm sàng
                </Paragraph>
                <Paragraph type="secondary">
                  Xem kết quả xét nghiệm trực tuyến dễ dàng
                </Paragraph>
              </Col>

              {/* Phone in center */}
              <Col
                xs={24}
                md={8}
                style={{
                  position: 'relative',
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Ảnh tròn phía sau */}
                <img
                  src={round}
                  alt="Background Circle"
                  style={{
                    width: 500,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                  }}
                />

                {/* Ảnh điện thoại phía trước */}
                <img
                  src={phone}
                  alt="App Screenshot"
                  style={{
                    width: 220,
                    position: 'relative',
                    zIndex: 2,
                  }}
                />
              </Col>

              {/* Right Info */}
              <Col xs={24} md={6}>
                <Paragraph strong style={{ fontSize: 20, color: '#065c8c' }}>
                  Thanh toán viện phí
                </Paragraph>
                <Paragraph type="secondary">
                  Hỗ trợ nhiều hình thức thanh toán trực tuyến tiện lợi
                </Paragraph>

                <Paragraph
                  strong
                  style={{ fontSize: 20, color: '#065c8c', paddingLeft: 50 }}
                >
                  Chăm sóc y tế tại nhà
                </Paragraph>
                <Paragraph type="secondary" style={{ paddingLeft: 50 }}>
                  Điều dưỡng, xét nghiệm tại nhà chuyên nghiệp
                </Paragraph>

                <Paragraph strong style={{ fontSize: 20, color: '#065c8c' }}>
                  Mạng lưới cơ sở hợp tác
                </Paragraph>
                <Paragraph type="secondary">
                  Kết nối phòng khám, bệnh viện khắp cả nước
                </Paragraph>
              </Col>
            </Row>
          </div>
          <div style={{ marginTop: 100 }}>
            <iframe
              width="900"
              height="500"
              src="https://www.youtube.com/embed/qb9kSd-e8_s"
              title="Tập 1: Làm thế nào để cả nhà cùng sống vui - sống khỏe? | PGS.TS.BS Nguyễn Văn Trí | Video AloBacsi"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              style={{ display: 'block', margin: '40px auto' }}
            ></iframe>
          </div>
        </div>
      </>
    );
  };
  const MobileLayout = () => {
    console.log('re-render');
    return (
      <>
        <div
          style={{
            width: '100%',
            height: 36,
            backgroundColor: '#ffb54a',
            overflow: 'hidden',
            position: 'relative',
            color: 'white',
            fontWeight: 500,
            fontSize: 15,
            padding: '4px 0',
            paddingTop: 6,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 'fit-content',
              whiteSpace: 'nowrap',
              animation: 'scroll-left 20s linear infinite',
            }}
          >
            {[...Array(3)].map((_, i) => (
              <span key={i} style={{ marginRight: 40 }}>
                📢 Đặt ngay Trợ Lý Giúp Việc để người thân luôn được chăm sóc
                khi đi khám bệnh
              </span>
            ))}
          </div>
        </div>
        {/* Phần chính */}
        <div className="main-content" style={{ backgroundColor: 'white' }}>
          <div className="banner" style={{ height: 220, overflow: 'visible' }}>
            <Title
              level={1}
              style={{
                fontWeight: 600,
                fontSize: 22,
                color: '#065c8c',
                marginTop: 10,
                marginBottom: 0,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // đổ bóng nhẹ sang phải dưới
              }}
            >
              Kết nối Người Dân với Cơ sở & Dịch vụ Y tế hàng đầu
            </Title>

            <TypingInput />

            <div className="service-carousel-wrapper" style={{ zIndex: 10 }}>
              <div className="service-cards-container" id="carousel">
                {[
                  {
                    title: 'Xét nghiệm tổng quát',
                    image: dichvu,
                  },
                  {
                    title: 'Xét nghiệm máu',
                    image: dichvu1,
                  },
                  {
                    title: 'Xét nghiệm ADN huyết thống',
                    image: dichvu2,
                  },
                  {
                    title: 'Xét nghiệm dị tật thai nhi (NIPT)',
                    image: dichvu,
                  },
                  {
                    title: 'Xét nghiệm bệnh lây qua đường tình dục',
                    image: dichvu1,
                  },
                  {
                    title: 'Xét nghiệm miễn dịch',
                    image: dichvu2,
                  },
                  {
                    title: 'Xét nghiệm COVID-19 PCR',
                    image: dichvu,
                  },
                ].map((item, index) => (
                  <div key={index} className="service-card">
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: '40%',
                        height: '40%',
                        objectFit: 'contain',
                        // borderRadius: '50%',
                      }}
                      className="card-image"
                    />
                    <h3 className="card-title">{item.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Title
            level={4}
            style={{
              fontSize: 18,
              margin: '20px 0 10px',
              color: '#065c8c',
              textAlign: 'center',
              fontWeight: 600,
              marginTop: 100,
            }}
          >
            Được tin tưởng hợp tác và đồng hành
          </Title>
          <div
            className="service-carousel-wrapper"
            style={{ marginTop: 20, boxShadow: 'none' }}
          >
            <div
              className="service-cards-container"
              id="carousel1"
              style={{ boxShadow: 'none' }}
            >
              {[
                {
                  title: 'Xét nghiệm tổng quát',
                  image: imagehoptac1,
                },
                {
                  title: 'Xét nghiệm máu',
                  image: imagehoptac2,
                },
                {
                  title: 'Xét nghiệm ADN huyết thống',
                  image: imagehoptac3,
                },
                {
                  title: 'Xét nghiệm dị tật thai nhi (NIPT)',
                  image: imagehoptac1,
                },
                {
                  title: 'Xét nghiệm bệnh lây qua đường tình dục',
                  image: imagehoptac2,
                },
                {
                  title: 'Xét nghiệm miễn dịch',
                  image: imagehoptac3,
                },
                {
                  title: 'Xét nghiệm COVID-19 PCR',
                  image: imagehoptac1,
                },
                {
                  title: 'Xét nghiệm COVID-19 PCR',
                  image: imagehoptac1,
                },
                {
                  title: 'Xét nghiệm COVID-19 PCR',
                  image: imagehoptac1,
                },
                {
                  title: 'Xét nghiệm COVID-19 PCR',
                  image: imagehoptac1,
                },
              ].map((item, index) => (
                <div>
                  <img
                    src={item.image}
                    alt=""
                    className="card-image"
                    style={{
                      // width: '40%',
                      height: '40px',
                      marginLeft: 35,
                      marginRight: 35,
                      objectFit: 'contain',
                    }}
                  />
                  <div
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      marginTop: 10,
                      color: '#003553',
                      fontSize: 13,
                    }}
                  >
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Banner y tế */}
          <div style={{ width: '90%', margin: '40px auto' }}>
            <Carousel autoplay>
              {bannerImagesMobile.map((src, i) => (
                <div key={i}>
                  <img
                    src={src}
                    alt={`banner-${i}`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 20,
                      objectFit: 'cover',
                      maxHeight: 320,
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div
            style={{
              background: `linear-gradient(
      to bottom,
      white 0px,
      #e8f8fd 50px,
      #e8f8fd calc(100% - 50px),
      white 100%
    )`,
            }}
          >
            <Title
              level={4}
              style={{
                fontSize: 18,
                margin: '20px 0 10px',
                color: '#065c8c',
                textAlign: 'center',
                fontWeight: 600,
                // marginTop: 100,
              }}
            >
              Cơ sở y tế được yêu thích
            </Title>
            <div
              style={{
                width: '90%',
                margin: '0 auto',
                overflowX: 'auto',
                padding: '20px 0',
              }}
            >
              <Row
                gutter={[8, 8]}
                wrap={false} // quan trọng: không xuống dòng
                style={{ minWidth: 'max-content' }} // giữ các item theo chiều ngang
              >
                {clinicList.map((clinic, i) => (
                  <Col key={i} style={{ width: 200 }}>
                    <Card
                      hoverable
                      bodyStyle={{ padding: 0, margin: '0 5px' }}
                      style={{
                        borderRadius: 16,
                        padding: '16px 8px',
                        boxShadow: '0 4px 12px rgba(0, 191, 255, 0.3)',
                        textAlign: 'start',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          margin: 0,
                          marginBottom: 16,
                        }}
                      >
                        <img
                          src={clinic.logo}
                          alt={clinic.name}
                          style={{
                            width: 60,
                            height: 60,
                            objectFit: 'contain',
                          }}
                        />
                      </div>
                      <Title
                        level={5}
                        style={{ marginBottom: 8, fontSize: 14 }}
                      >
                        {clinic.name}{' '}
                        {clinic.verified && (
                          <CheckCircleFilled
                            style={{ color: '#1890ff', fontSize: 16 }}
                          />
                        )}
                      </Title>
                      <p
                        style={{
                          color: '#003553',
                          marginBottom: 8,
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                      >
                        <EnvironmentOutlined
                          style={{ marginRight: 6, fontSize: 15 }}
                        />
                        {clinic.address}
                      </p>

                      <div
                        style={{
                          marginBottom: 12,
                          color: '#003553',
                          fontSize: 15,
                        }}
                      >
                        <span style={{ marginRight: 6 }}>(5)</span>
                        {[...Array(clinic.rating)].map((_, i) => (
                          <StarFilled
                            key={i}
                            style={{
                              color: '#ffb54a',
                              fontSize: 14,
                              marginRight: 2,
                            }}
                          />
                        ))}
                      </div>

                      <button
                        style={{
                          backgroundColor: '#00bfff',
                          color: 'white',
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: 8,
                          width: '100%',
                          height: 30,
                          cursor: 'pointer',
                          fontWeight: 'bold',
                        }}
                      >
                        Đặt khám ngay
                      </button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
          <div
            style={{
              background: `linear-gradient(
      to bottom,
      white 0px,
      #e8f8fd 50px,
      #e8f8fd calc(100% - 50px),
      white 100%
    )`,
            }}
          >
            <Title
              level={4}
              style={{
                fontSize: 18,
                margin: '20px 0 10px',
                color: '#065c8c',
                textAlign: 'center',
                fontWeight: 600,
                // marginTop: 100,
              }}
            >
              Các dịch vụ xét nghiệm
            </Title>
            <div
              style={{
                width: '90%',
                margin: '0 auto',
                overflowX: 'auto',
                padding: '20px 0',
              }}
            >
              <Row
                gutter={[8, 8]}
                wrap={false} // quan trọng: không xuống dòng
                style={{ minWidth: 'max-content' }} // giữ các item theo chiều ngang
              >
                {serviceList.map((service, i) => (
                  <Col key={i} style={{ width: 200 }}>
                    <Card
                      hoverable
                      bodyStyle={{ padding: 0, margin: '0 0px' }}
                      style={{
                        borderRadius: 16,
                        // padding: '16px 8px',
                        boxShadow: '0 4px 12px rgba(0, 191, 255, 0.3)',
                        textAlign: 'start',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          margin: 0,
                          marginBottom: 16,
                        }}
                      >
                        <img
                          src={service.image}
                          alt={service.name}
                          style={{
                            width: '100%',
                            // height: 60,
                            objectFit: 'contain',
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                          }}
                        />
                      </div>
                      <div style={{ padding: '16px 8px', paddingTop: 0 }}>
                        <Title
                          level={5}
                          style={{ marginBottom: 8, fontSize: 14 }}
                        >
                          {service.name}{' '}
                          {service.verified && (
                            <CheckCircleFilled
                              style={{ color: '#1890ff', fontSize: 16 }}
                            />
                          )}
                        </Title>
                        <p
                          style={{
                            color: '#003553',
                            marginBottom: 8,
                            fontSize: 13,
                            fontWeight: 500,
                          }}
                        >
                          <BankOutlined
                            style={{ marginRight: 6, fontSize: 15 }}
                          />
                          {service.clinic}
                        </p>

                        <div
                          style={{
                            marginBottom: 12,
                            color: '#003553',
                            fontSize: 15,
                          }}
                        >
                          <span style={{ marginRight: 6 }}>
                            <DollarOutlined />
                          </span>
                          {service.price.toString()}.000đ
                        </div>

                        <button
                          style={{
                            backgroundColor: '#00bfff',
                            color: 'white',
                            border: 'none',
                            padding: '4px 8px',
                            borderRadius: 8,
                            width: '100%',
                            height: 30,
                            cursor: 'pointer',
                            fontWeight: 'bold',
                          }}
                        >
                          Đặt khám ngay
                        </button>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </div>

          <div style={{ padding: '0px 20px' }}>
            <Title
              level={4}
              style={{
                fontSize: 18,
                margin: '20px 0 10px',
                color: '#065c8c',
                textAlign: 'center',
                fontWeight: 600,
                // marginTop: 100,
              }}
            >
              Tải ứng dụng{' '}
              <span style={{ color: '#00b5f1', fontWeight: 700 }}>GENAPP</span>
            </Title>

            <div
              style={{
                textAlign: 'center',
                marginTop: 16,
                display: 'flex',
                justifyContent: 'space-evenly',
              }}
            >
              <img
                src={appstore}
                alt="App Store"
                style={{ height: 45, marginRight: 10 }}
              />
              <img src={googleplay} alt="Google Play" style={{ height: 45 }} />
            </div>
          </div>
          <div
            style={{
              background: `linear-gradient(
      to bottom,
      white 0px,
      #e8f8fd 50px,
      #e8f8fd calc(100% - 50px),
      white 100%
    )`,
            }}
          >
            <Title
              level={4}
              style={{
                fontSize: 18,
                margin: '30px 0 10px',
                color: '#065c8c',
                textAlign: 'center',
                fontWeight: 600,
                // marginTop: 100,
              }}
            >
              Cảm nhận từ khách hàng
            </Title>
            <div
              style={{
                width: '90%',
                margin: 'auto',
                padding: 16,
                borderRadius: 16,
                backgroundColor: '#f4f9fd',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 24, color: '#ccc' }}>
                <FaQuoteLeft size={20} color="#ccc" />
              </div>
              <Text style={{ fontSize: 16, color: '#2b4263', lineHeight: 1.6 }}>
                Đặt lịch xét nghiệm bên này rất gọn, có ngày giờ cụ thể luôn lên
                là được xét nghiệm liền không rườm rà gì mấy. An tâm đặt cho gia
                đình, có cả xét nghiệm tận nhà, không mất thời gian.
              </Text>

              <Divider style={{ margin: '16px 0' }} />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <Avatar
                  src="https://i.pinimg.com/736x/b7/91/44/b79144e03dc4996ce319ff59118caf65.jpg"
                  icon={<UserOutlined />}
                />
                <Text strong>Kiên Nguyễn</Text>
              </div>
            </div>
          </div>
          <div style={{}}>
            <iframe
              width="320"
              height="180"
              src="https://www.youtube.com/embed/qb9kSd-e8_s"
              title="Tập 1: Làm thế nào để cả nhà cùng sống vui - sống khỏe? | PGS.TS.BS Nguyễn Văn Trí | Video AloBacsi"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              style={{ display: 'block', margin: '40px auto' }}
            ></iframe>
          </div>
        </div>
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

export default ContentComponent;
