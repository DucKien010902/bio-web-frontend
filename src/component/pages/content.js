import React, { useEffect, useState } from 'react';
import { Input, Row, Col, Card, Typography, Carousel } from 'antd';
import './content.css';
import axiosClient from '../../api/apiConfig';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import image from '../../assets/images/dichvu.png';
import imagehoptac1 from '../../assets/images/hoptac1.png';
import imagehoptac2 from '../../assets/images/hoptac2.png';
import imagehoptac3 from '../../assets/images/hoptac3.png';
import appstore from '../../assets/images/appleStore.png';
import googleplay from '../../assets/images/googleplay.png';
import round from '../../assets/images/round.png';
import phone from '../../assets/images/phone.png';
const { Title, Paragraph } = Typography;

const bannerImages = [
  'https://res.cloudinary.com/da6f4dmql/image/upload/v1748336183/pngtree-medical-icon-simple-banner-background-picture-image_1539751_lbymi7.png',
  'https://res.cloudinary.com/da6f4dmql/image/upload/v1748336182/5917.jpg_wh860_kh7esi.jpg',
  'https://res.cloudinary.com/da6f4dmql/image/upload/v1748336181/design-de-modelo-de-centro-medico_23-2150144640_sgculr.avif',
];

const doctorList = [
  {
    name: 'TS. BS. Nguyễn Văn A',
    specialty: 'Chức vụ 1',
    image:
      'https://res.cloudinary.com/da6f4dmql/image/upload/v1746512082/samples/smile.jpg',
  },
  {
    name: 'ThS. BS. Trần Thị B',
    specialty: 'Chức vụ 2',
    image:
      'https://res.cloudinary.com/da6f4dmql/image/upload/v1746512082/samples/smile.jpg',
  },
  {
    name: 'BS. Nguyễn Văn C',
    specialty: 'Chức vụ 3',
    image:
      'https://res.cloudinary.com/da6f4dmql/image/upload/v1746512082/samples/smile.jpg',
  },
  {
    name: 'BS. Nguyễn Văn D',
    specialty: 'Chức vụ 4',
    image:
      'https://res.cloudinary.com/da6f4dmql/image/upload/v1746512082/samples/smile.jpg',
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
      'https://image.nhandan.vn/w800/Uploaded/2025/zdjwperwq/2025_01_26/42222-8072-9336.jpg.webp',
  },
];

const ContentComponent = () => {
  const fetchAllClinic = async () => {
    try {
      const res = await axiosClient.get('/clinic/fetchall');
      await localStorage.setItem('allclinics', JSON.stringify(res.data));
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
  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setPlaceholder(fullText.substring(0, index + 1));
        setIndex((prev) => prev + 1);
        if (index + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 1000); // Đợi 1s rồi bắt đầu xoá
        }
      } else {
        setPlaceholder(fullText.substring(0, index - 1));
        setIndex((prev) => prev - 1);
        if (index - 1 === 0) {
          setIsDeleting(false); // Bắt đầu lại
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [index, isDeleting]);
  useEffect(() => {
    fetchServices();
    fetchAllClinic();
  }, []);

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
              📢 Đặt ngay Trợ Lý Giúp Việc để người thân luôn được chăm sóc khi
              đi khám bệnh
            </span>
          ))}
        </div>
      </div>
      {/* Phần chính */}
      <div className="main-content" style={{ backgroundColor: '#e8f4fd' }}>
        <div className="banner">
          <Title
            level={1}
            style={{ fontWeight: 700, color: '#065c8c', marginBottom: 0 }}
          >
            Kết nối Người Dân với Cơ sở & Dịch vụ Y tế hàng đầu
          </Title>
          <Input.Search
            placeholder={placeholder || ''}
            enterButton
            size="large"
            className="search-input"
          />

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
            <button className="scroll-btn left" onClick={() => scrollCards(-1)}>
              <RxCaretLeft size={30} color="black" />
            </button>

            <div className="service-cards-container" id="carousel">
              {[
                {
                  title: 'Xét nghiệm tổng quát',
                  image: image,
                },
                {
                  title: 'Xét nghiệm máu',
                  image: image,
                },
                {
                  title: 'Xét nghiệm ADN huyết thống',
                  image: image,
                },
                {
                  title: 'Xét nghiệm dị tật thai nhi (NIPT)',
                  image: image,
                },
                {
                  title: 'Xét nghiệm bệnh lây qua đường tình dục',
                  image: image,
                },
                {
                  title: 'Xét nghiệm miễn dịch',
                  image: image,
                },
                {
                  title: 'Xét nghiệm COVID-19 PCR',
                  image: image,
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

            <button className="scroll-btn right" onClick={() => scrollCards(1)}>
              <RxCaretRight size={30} color="black" />
            </button>
          </div>
        </div>
        {/* Banner y tế */}
        <div style={{ width: '80%', margin: '30px auto' }}>
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
                    maxHeight: 400,
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <Title
          level={2}
          style={{
            margin: '60px 0 10px',
            color: '#065c8c',
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          Được tin tưởng hợp tác và đồng hành
        </Title>
        <div className="service-carousel-wrapper" style={{ marginTop: 0 }}>
          <button className="scroll-btn left" onClick={() => scrollCards1(-1)}>
            <RxCaretLeft size={30} color="black" />
          </button>

          <div className="service-cards-container" id="carousel1">
            {[
              {
                // title: 'Xét nghiệm tổng quát',
                image: imagehoptac1,
              },
              {
                // title: 'Xét nghiệm máu',
                image: imagehoptac2,
              },
              {
                // title: 'Xét nghiệm ADN huyết thống',
                image: imagehoptac3,
              },
              {
                // title: 'Xét nghiệm dị tật thai nhi (NIPT)',
                image: imagehoptac1,
              },
              {
                // title: 'Xét nghiệm bệnh lây qua đường tình dục',
                image: imagehoptac2,
              },
              {
                // title: 'Xét nghiệm miễn dịch',
                image: imagehoptac3,
              },
              {
                // title: 'Xét nghiệm COVID-19 PCR',
                image: imagehoptac1,
              },
              {
                // title: 'Xét nghiệm COVID-19 PCR',
                image: imagehoptac1,
              },
              {
                // title: 'Xét nghiệm COVID-19 PCR',
                image: imagehoptac1,
              },
              {
                // title: 'Xét nghiệm COVID-19 PCR',
                image: imagehoptac1,
              },
            ].map((item, index) => (
              <img
                src={item.image}
                alt=""
                className="card-image"
                style={{
                  width: '50%',
                  height: '120px',
                  marginLeft: 30,
                  objectFit: 'contain',
                }}
              />
            ))}
          </div>

          <button className="scroll-btn right" onClick={() => scrollCards1(1)}>
            <RxCaretRight size={30} color="black" />
          </button>
        </div>
        {/* Danh sách bác sĩ */}
        <Title
          level={2}
          style={{
            margin: '60px 0 10px',
            color: '#065c8c',
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          Đội ngũ bác sĩ
        </Title>
        <Row
          gutter={[32, 32]}
          style={{ padding: '2% 10%', paddingTop: 10, paddingBottom: 40 }}
        >
          {doctorList.map((doc, i) => (
            <Col xs={24} sm={12} md={6} key={i}>
              <Card
                hoverable
                style={{
                  textAlign: 'center',
                  borderRadius: 12,
                  padding: 16,
                  boxShadow: '4px 2px 8px rgba(0, 191, 255, 0.4)', // shadow màu xanh
                }}
              >
                <img
                  alt={doc.name}
                  src={doc.image}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: 16,
                  }}
                />
                <Title level={5} style={{ margin: 0 }}>
                  {doc.name}
                </Title>
                <p style={{ color: 'gray', margin: '4px 0 12px' }}>
                  {doc.specialty}
                </p>
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
                  }}
                >
                  Tư vấn ngay
                </button>
              </Card>
            </Col>
          ))}
        </Row>
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
          style={{ padding: '2% 10%', paddingTop: 10, paddingBottom: 40 }}
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
              <Paragraph strong style={{ fontSize: 18, color: '#065c8c' }}>
                Lấy số thứ tự khám nhanh trực tuyến
              </Paragraph>
              <Paragraph type="secondary">
                Đăng ký khám, tái khám theo bác sĩ chuyên khoa, theo lịch hẹn
              </Paragraph>

              <Paragraph
                strong
                style={{ fontSize: 18, color: '#065c8c', paddingRight: 50 }}
              >
                Tư vấn sức khỏe từ xa
              </Paragraph>
              <Paragraph type="secondary" style={{ paddingRight: 50 }}>
                Gọi video với bác sĩ, chuyên gia
              </Paragraph>

              <Paragraph strong style={{ fontSize: 18, color: '#065c8c' }}>
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
              <Paragraph strong style={{ fontSize: 18, color: '#065c8c' }}>
                Thanh toán viện phí
              </Paragraph>
              <Paragraph type="secondary">
                Hỗ trợ nhiều hình thức thanh toán trực tuyến tiện lợi
              </Paragraph>

              <Paragraph
                strong
                style={{ fontSize: 18, color: '#065c8c', paddingLeft: 50 }}
              >
                Chăm sóc y tế tại nhà
              </Paragraph>
              <Paragraph type="secondary" style={{ paddingLeft: 50 }}>
                Điều dưỡng, xét nghiệm tại nhà chuyên nghiệp
              </Paragraph>

              <Paragraph strong style={{ fontSize: 18, color: '#065c8c' }}>
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

export default ContentComponent;
