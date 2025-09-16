import {
  BankOutlined,
  CheckCircleFilled,
  CloseOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  StarFilled,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Carousel, Col, Divider, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { FaQuoteLeft, FaUser } from 'react-icons/fa';
import { LuMessageSquareMore } from 'react-icons/lu';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { SiTicktick } from 'react-icons/si';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/apiConfig';
import appstore from '../../assets/images/appleStore.png';
import dichvu from '../../assets/images/dichvu.png';
import dichvu1 from '../../assets/images/dichvu1.png';
import dichvu2 from '../../assets/images/dichvu2.png';
import googleplay from '../../assets/images/googleplay.png';
import imagehoptac1 from '../../assets/images/hoptac1.webp';
import imagehoptac2 from '../../assets/images/hoptac2.webp';
import imagehoptac3 from '../../assets/images/hoptac3.webp';
import phone from '../../assets/images/phone.png';
import round from '../../assets/images/round.png';
import './content.css';
import TypingInput from './contentSearchInput';
import LatestNews from './LatestNews';

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
    name: 'Trung tâm xét nghiệm GoLAB Hà Đông',
    address: ' Số 12 Trần Phú, Quận Hà Đông, Hà Nội',
    rating: 5,
    logo: 'https://edeninterior.vn/wp-content/uploads/2025/06/thiet-ke-logo-phong-kham-28.jpg',
    verified: true,
    id: 'golab-hadong',
  },
  {
    name: 'Phòng xét nghiệm GoLAB Ba Đình',
    address: 'Số 10 Nguyễn Thái Học, Ba Đình, Hà Nội',
    rating: 5,
    logo: 'https://edeninterior.vn/wp-content/uploads/2025/06/thiet-ke-logo-phong-kham-24.jpg',
    verified: true,
    id: 'golab-badinh',
  },
  {
    name: 'Phòng xét nghiệm GoLab Vĩnh Yên',
    address: 'Đinh Tiên Hoàng, Khai Quang, Vĩnh Yên, Vĩnh Phúc, Việt Nam',
    rating: 5,
    logo: 'https://edeninterior.vn/wp-content/uploads/2025/06/thiet-ke-logo-phong-kham-4.jpg',
    verified: true,
    id: 'golab-vinhyen',
  },
  {
    name: 'Trung tâm xét nghiệm GoLAB Hòa Bình',
    address:
      'Số 83 Cù Chính Lan, phường Đồng Tiến, TP Hòa Bỉnh,  Tỉnh Hòa Bình, Hòa Bình',
    rating: 5,
    logo: 'https://edeninterior.vn/wp-content/uploads/2025/06/thiet-ke-logo-phong-kham-10.jpg',
    verified: true,
    id: 'golab-hoabinh',
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
    name: 'Xét nghiệm huyết thống cha - con',
    image:
      'https://i-suckhoe.vnecdn.net/2016/03/11/Xet-nghiem-adn-truy-nhan-cha-c-1132-7786-1457689550.jpg',
    clinic: 'Trung tâm xét nghiệm GoLAB Hà Đông',
    verified: true,
    price: 3000,
    id: 'ADN01',
  },
  {
    name: 'Kiểm tra chức năng gan',
    image:
      'https://cdn.diag.vn/2024/08/9f0ddb90-kiem-tra-chuc-nang-gan-can-thuc-hien-nhieu-xet-nghiem-mau..jpg',
    clinic: 'Trung tâm xét nghiệm GoLAB Hà Đông',
    verified: true,
    price: 3000,
    id: 'SBH01',
  },
  {
    name: 'Sàng lọc trước sinh không xâm lấn',
    image:
      'https://tasscare.com/wp-content/uploads/2022/03/xet-nghiem-sang-loc-truoc-sinh-nipt.jpg',
    clinic: 'Phòng xét nghiệm GoLAB Ba Đình',
    verified: true,
    price: 3000,
    id: 'NIP01',
  },
  {
    name: 'Tiêm ngừa viêm gan B',
    image:
      'https://cdn.tiemchunglongchau.com.vn/unsafe/2560x0/filters:quality(90)/tiem_ngua_viem_gan_b_co_uong_ruou_bia_duoc_khong_1_a6ce8d1e96.jpg',
    clinic: 'Phòng xét nghiệm GoLAB Ba Đình',
    verified: true,
    price: 300,
  },
  {
    name: 'Tiêm ngừa viêm gan B',
    image:
      'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fcce223da-f510-40d2-9d96-21fcac5d4bd8-tiaaam_ngaaaa_-_banner_section_-_277x150_px_.png&w=640&q=75',
    clinic: 'Phòng xét nghiệm GoLAB Ba Đình',
    verified: true,
    price: 300,
  },
];
const newsList = [
  {
    title: '5 dấu hiệu cảnh báo bệnh tiểu đường',
    image: 'https://bhd.1cdn.vn/2025/03/17/tim-phong-soi(1).jpg',
  },
  {
    title: 'Cách phòng tránh đột quỵ mùa nắng nóng',
    image: 'https://ddk.1cdn.vn/thumbs/900x600/2025/05/22/dich-1.jpg',
  },
  {
    title: 'Chăm sóc sức khỏe người cao tuổi',
    image:
      'https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2025/5/21/y-te-1-17477964568891106942355-5-0-805-1280-crop-17477965632561903370553.jpg',
  },
];
const feedbacks = [
  {
    content:
      '“Tôi đăng ký gói xét nghiệm máu tổng quát, nhân viên đến đúng giờ, thao tác nhanh và rất nhẹ nhàng. Kết quả có trong ngày nên theo dõi sức khỏe tiện lợi.”',
    name: 'Nguyễn Văn An',
    location: 'Hà Nội',
    avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
  },
  {
    content:
      '“Xét nghiệm tầm soát mỡ máu cho bố mẹ, quy trình gọn gàng, không phải chờ đợi. Có cả tư vấn bác sĩ sau khi có kết quả nên gia đình rất yên tâm.”',
    name: 'Trần Thị Thu',
    location: 'Đà Nẵng',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
  },
  {
    content:
      '“Đặt lịch xét nghiệm tiểu đường online rất nhanh, chỉ vài phút là xác nhận. Nhân viên tận tình, có kết quả gửi qua ứng dụng nên dễ theo dõi lâu dài.”',
    name: 'Lê Quốc Hùng',
    location: 'TP. Hồ Chí Minh',
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
];
const doctorList = [
  {
    id: 1,
    name: 'BS CKI. Vũ Thị Hà',
    specialty: 'Mắt',
    price: 150000,
    rating: 4.7,
    visits: 30,
    role: 'Bác sĩ Chuyên Khoa',
    image:
      'https://hthaostudio.com/wp-content/uploads/2022/08/Anh-profile-bac-si-min.jpg',
  },
  {
    id: 2,
    name: 'Ths BS. Lê Hoàng Thiên',
    specialty: 'Nội tổng quát',
    price: 149000,
    rating: 4.8,
    visits: 40,
    role: 'Bác sĩ Chuyên Khoa',
    image:
      'https://hthaostudio.com/wp-content/uploads/2022/08/Anh-profile-bac-si-min.jpg',
  },
  {
    id: 3,
    name: 'BS CKI. Đỗ Đăng Khoa',
    specialty: 'Tim mạch can thiệp',
    price: 200000,
    rating: 4.4,
    visits: 75,
    role: 'Bác sĩ Chuyên Khoa',
    image:
      'https://hthaostudio.com/wp-content/uploads/2022/08/Anh-profile-bac-si-min.jpg',
  },
  {
    id: 4,
    name: 'BS CKI. Nguyễn Phúc Thiện',
    specialty: 'Nội tim mạch',
    price: 0,
    priceMax: 300000,
    rating: 4.9,
    visits: 143,
    role: 'Bác sĩ Chuyên Khoa',
    image:
      'https://hthaostudio.com/wp-content/uploads/2022/08/Anh-profile-bac-si-min.jpg',
  },
  {
    id: 5,
    name: 'Ths BS. Trần Thị Lan',
    specialty: 'Tai Mũi Họng',
    price: 180000,
    rating: 4.7,
    visits: 89,
    role: 'Bác sĩ Chuyên Khoa',
    image:
      'https://hthaostudio.com/wp-content/uploads/2022/08/Anh-profile-bac-si-min.jpg',
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
  const navigate = useNavigate();
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
    const [isModalOpen, setIsModalOpen] = useState(false); // ban đầu false

    useEffect(() => {
      const hasShown = sessionStorage.getItem('gennovaxModalShown');
      if (!hasShown) {
        const timer = setTimeout(() => {
          setIsModalOpen(true);
          sessionStorage.setItem('gennovaxModalShown', 'true');
        }, 1200); // 2000 ms = 2 giây

        return () => clearTimeout(timer); // cleanup khi component unmount
      }
    }, []);

    const handleClose = () => {
      setIsModalOpen(false);
    };
    const buttonStyle = {
      border: 'none',
      color: '#fff',
      borderRadius: '20px',
      padding: '8px 16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease', // mượt khi hover
    };

    return (
      <>
        {isModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.4)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
            }}
            onClick={handleClose}
          >
            <div
              style={{
                position: 'relative',
                background: '#fff',
                borderRadius: '30px',
                maxWidth: '900px',
                width: '95%',
                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Nút X */}
              <button
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '-15px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '2px solid #ccc',
                  background: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#666',
                  fontSize: '18px',
                  transition: 'all 0.2s ease',
                  zIndex: 2,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#0071bc';
                  e.currentTarget.style.color = '#0071bc';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#ccc';
                  e.currentTarget.style.color = '#666';
                }}
              >
                <CloseOutlined />
              </button>

              {/* Ảnh nền + 2 button ở giữa */}
              <div
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* Nền */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '600 / 400', // hoặc tỉ lệ gốc của ảnh (width / height)
                    backgroundImage:
                      'url("https://choraymc.khamdichvu.vn/upload/hinhanh/ng%C3%A0y%20nh%C3%A0%20gi%C3%A1o%20vi%E1%BB%87t%20nam%20(10).jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />

                {/* (Optional) overlay nhẹ để chữ/nút nổi hơn */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.05))',
                  }}
                />

                {/* Button group ở giữa */}
                <div
                  style={{
                    position: 'absolute',
                    fontSize: 25,
                    inset: 0,
                    display: 'flex',
                    // flexDirection: 'column',
                    justifyContent: 'left',
                    alignItems: 'end',
                    pointerEvents: 'none', // để không chặn close overlay
                    marginLeft: 45,
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: 10,
                      pointerEvents: 'auto',
                      // flexDirection: 'column',
                    }}
                  >
                    <button
                      style={{
                        ...buttonStyle,
                        background: '#0071bc',
                        boxShadow: `
                  0 0 8px rgba(0, 113, 188, 0.9),
                  0 0 20px rgba(0, 113, 188, 0.8)
                `,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = `
                  0 0 12px rgba(0, 113, 188, 1),
                  0 0 28px rgba(0, 113, 188, 0.9)
                `;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = `
                  0 0 8px rgba(0, 113, 188, 0.9),
                  0 0 20px rgba(0, 113, 188, 0.8)
                `;
                      }}
                      onClick={() => {
                        navigate('/y-te/danh-sach-dich-vu');
                      }}
                    >
                      Gói Xét Nghiệm
                    </button>

                    <button
                      style={{
                        ...buttonStyle,
                        background: '#00a859',
                        boxShadow: `
                  0 0 8px rgba(0, 168, 89, 0.9),
                  0 0 20px rgba(0, 168, 89, 0.8)
                `,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = `
                  0 0 12px rgba(0, 168, 89, 1),
                  0 0 28px rgba(59, 234, 152, 0.9)
                `;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = `
                  0 0 8px rgba(0, 168, 89, 0.9),
                  0 0 20px rgba(39, 244, 148, 0.8)
                `;
                      }}
                      onClick={() => {
                        navigate('/y-te/dat-lich-xet-nghiem');
                      }}
                    >
                      Đặt Ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
                  <div
                    key={index}
                    className="service-card"
                    onClick={() => {
                      navigate('/y-te/danh-sach-dich-vu');
                    }}
                  >
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
                  title: 'Phòng khám Đa khoa Quốc tế Thu Cúc',
                  image: imagehoptac1,
                },
                {
                  title: 'Phòng khám Đa khoa Medlatec',
                  image: imagehoptac2,
                },
                {
                  title: 'Phòng khám Đa khoa Hồng Ngọc',
                  image: imagehoptac3,
                },
                {
                  title: 'Trung tâm Y tế Vinmec Times City',
                  image:
                    'https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%2Fstatic%2Fimages%2Fumc2%2Fweb%2Flogo.png&w=128&q=75',
                },
                {
                  title: 'Phòng khám Đa khoa Bạch Mai (Hà Nội)',
                  image:
                    'https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%3A5000%2Fstatic%2Fimages%2Fbinhthanhhcm%2Fweb%2Flogo.png%3Ft%3DTue%2520Sep%252013%25202022%252010%3A08%3A08%2520GMT%2B0700%2520(Indochina%2520Time)&w=128&q=75',
                },
                {
                  title: 'Trung tâm Y khoa Family Medical Practice Hà Nội',
                  image: imagehoptac3,
                },
                {
                  title: 'Bệnh viện Đa khoa Quốc tế Hải Phòng',
                  image: imagehoptac1,
                },
                {
                  title: 'Phòng khám Đa khoa Hoàn Mỹ Bắc Ninh',
                  image: imagehoptac2,
                },
                {
                  title: 'Trung tâm Xét nghiệm Quảng Ninh',
                  image: imagehoptac3,
                },
                {
                  title: 'Phòng khám Đa khoa Hưng Thịnh (Hà Nội)',
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
              className="scroll-container"
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
                          fontSize: 12,
                          fontWeight: 500,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          minHeight: '32px', // 2 dòng * ~16px line-height
                          lineHeight: '16px',
                        }}
                      >
                        <EnvironmentOutlined
                          style={{ marginRight: 6, fontSize: 16 }}
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
                        onClick={() => {
                          navigate(`/y-te/chi-tiet-phong-kham?ID=${clinic.id}`);
                        }}
                      >
                        Xem chi tiết
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
              level={2}
              style={{
                margin: '60px 0 10px',
                color: '#065c8c',
                textAlign: 'center',
                fontWeight: 700,
              }}
            >
              Các dịch vụ xét nghiệm
            </Title>

            <div
              className="scroll-container"
              style={{
                width: '80%',
                margin: '0 auto',
                overflowX: 'auto',
                padding: '40px 0',
              }}
            >
              <Row
                gutter={[32, 32]}
                wrap={false}
                style={{ minWidth: 'max-content' }}
              >
                {serviceList.map((service, i) => (
                  <Col key={i} style={{ width: 310 }}>
                    <Card
                      hoverable
                      bodyStyle={{ padding: 0 }}
                      style={{
                        borderRadius: 16,
                        // padding: '16px 16px',
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
                          src={service.image}
                          alt={service.name}
                          style={{
                            width: '100%',
                            height: 170,
                            objectFit: 'cover',
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                          }}
                        />
                      </div>

                      <div style={{ padding: '16px 16px', paddingTop: 0 }}>
                        {/* Title giữ nguyên kích thước 2 dòng */}
                        <Title
                          level={4}
                          style={{
                            marginBottom: 8,
                            fontSize: 17,
                            lineHeight: '20px',
                            height: '40px', // cố định 2 dòng
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            whiteSpace: 'normal',
                          }}
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
                            fontSize: 15,
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
                          onClick={() => {
                            navigate(
                              `/y-te/dat-lich-xet-nghiem?code=${service.id}`
                            );
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
          <div
            style={{
              background: `linear-gradient(
          to bottom,
          white 0px,
          #e8f8fd 50px,
          #e8f8fd calc(100% - 50px),
          white 100%
        )`,
              paddingBottom: 40,
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
              Danh sách bác sỹ được đề xuất
            </Title>

            <div
              className="scroll-container"
              style={{
                width: '80%',
                margin: '0 auto',
                overflowX: 'auto',
                padding: '40px 0',
              }}
            >
              <Row
                gutter={[32, 32]}
                wrap={false}
                style={{ minWidth: 'max-content' }}
              >
                {doctorList.map((doctor) => (
                  <Col key={doctor.id} style={{ width: 310 }}>
                    <Card
                      hoverable
                      bodyStyle={{ padding: 0 }}
                      style={{
                        borderRadius: 16,
                        boxShadow: '0 4px 12px rgba(0, 191, 255, 0.3)',
                        textAlign: 'start',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginTop: 16,
                        }}
                      >
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          style={{
                            width: 120,
                            height: 120,
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>

                      <div style={{ padding: '16px' }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 8,
                            fontSize: 15,
                            color: '#003553',
                          }}
                        >
                          <span>
                            Đánh giá: {doctor.rating}{' '}
                            <StarFilled style={{ color: '#facc14ff' }} />
                          </span>
                          <span>
                            Lượt khám: {doctor.visits}{' '}
                            <FaUser
                              style={{ marginLeft: 4, color: '#facc14ff' }}
                            />
                          </span>
                        </div>

                        <Title
                          level={4}
                          style={{ margin: '4px 0', fontSize: 19 }}
                        >
                          {doctor.name}
                        </Title>

                        <p
                          style={{
                            marginBottom: 6,
                            fontSize: 17,
                            color: '#003553',
                          }}
                        >
                          <TeamOutlined style={{ marginRight: 6 }} />
                          {doctor.specialty}
                        </p>

                        <p
                          style={{
                            marginBottom: 6,
                            fontSize: 17,
                            color: '#003553',
                          }}
                        >
                          <DollarOutlined style={{ marginRight: 6 }} />
                          {doctor.priceMax
                            ? `${doctor.price}đ - ${doctor.priceMax}đ`
                            : `${doctor.price.toLocaleString()}đ`}
                        </p>

                        <p
                          style={{
                            marginBottom: 12,
                            fontSize: 17,
                            color: '#003553',
                          }}
                        >
                          {doctor.role}
                        </p>

                        <button
                          style={{
                            backgroundColor: '#00bfff',
                            color: 'white',
                            border: 'none',
                            padding: '6px 8px',
                            borderRadius: 8,
                            width: '100%',
                            height: 36,
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: 16,
                          }}
                          onClick={() =>
                            navigate(
                              `/y-te/dat-lich-tu-van?doctor=${doctor.id}`
                            )
                          }
                        >
                          Tư vấn ngay
                        </button>
                      </div>
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
              Tin tức y tế mới nhất
            </Title>
            <div
              style={{
                width: '100%',
                margin: '16px auto',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '60%',
                  margin: '0 auto',
                  backgroundColor: '#b4e4f4ff',
                  borderRadius: 8,
                  padding: '12px 16px', // tăng chiều cao
                }}
              >
                <audio
                  src="https://res.cloudinary.com/dh3rdryux/video/upload/v1756357363/udrxrrusumrrvg51xixt.mp3"
                  controls
                  style={{
                    width: '100%',
                    display: 'block',
                  }}
                />
              </div>
            </div>

            <LatestNews />
          </div>

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
                style={{ height: 40, marginRight: 20, cursor: 'pointer' }}
              />
              <img
                src={googleplay}
                alt="Google Play"
                style={{ height: 40, cursor: 'pointer' }}
                onClick={() => {
                  window.open(
                    'https://expo.dev/accounts/bkc_duckien/projects/bio-app-frontent/builds/0d8138ea-3da8-4107-8acb-30db9a6463ee',
                    '_blank'
                  );
                }}
              />
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
                {/* Mục 1 */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}
                >
                  <div style={{ textAlign: 'end' }}>
                    <Paragraph
                      strong
                      style={{
                        fontSize: 20,
                        color: '#065c8c',
                        marginBottom: 0,
                      }}
                    >
                      Lấy số thứ tự khám nhanh trực tuyến
                    </Paragraph>
                    <Paragraph type="secondary" style={{ margin: 0 }}>
                      Đăng ký khám, tái khám theo bác sĩ chuyên khoa, theo lịch
                      hẹn
                    </Paragraph>
                  </div>
                  <img
                    src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Fbae71420-d9ef-48b7-91a9-0151c50c73da-fcf47d13-a9c5-4be8-aa6c-4d4e9b162c19-icon_dang_ky.svg.svg&w=3840&q=75"
                    alt="icon"
                    style={{ width: 60, height: 60, marginLeft: 20 }}
                  />
                </div>

                {/* Mục 2 */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20,
                    paddingRight: 60,
                  }}
                >
                  <div style={{ textAlign: 'end' }}>
                    <Paragraph
                      strong
                      style={{
                        fontSize: 20,
                        color: '#065c8c',
                        marginBottom: 0,
                      }}
                    >
                      Tư vấn sức khỏe từ xa
                    </Paragraph>
                    <Paragraph type="secondary" style={{ margin: 0 }}>
                      Gọi video với bác sĩ, chuyên gia
                    </Paragraph>
                  </div>
                  <img
                    src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Fbae71420-d9ef-48b7-91a9-0151c50c73da-fcf47d13-a9c5-4be8-aa6c-4d4e9b162c19-icon_dang_ky.svg.svg&w=3840&q=75"
                    alt="icon"
                    style={{ width: 60, height: 60, marginLeft: 20 }}
                  />
                </div>

                {/* Mục 3 */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ textAlign: 'end' }}>
                    <Paragraph
                      strong
                      style={{
                        fontSize: 20,
                        color: '#065c8c',
                        marginBottom: 0,
                      }}
                    >
                      Tra cứu kết quả cận lâm sàng
                    </Paragraph>
                    <Paragraph type="secondary" style={{ margin: 0 }}>
                      Xem kết quả xét nghiệm trực tuyến dễ dàng
                    </Paragraph>
                  </div>
                  <img
                    src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Fbae71420-d9ef-48b7-91a9-0151c50c73da-fcf47d13-a9c5-4be8-aa6c-4d4e9b162c19-icon_dang_ky.svg.svg&w=3840&q=75"
                    alt="icon"
                    style={{ width: 60, height: 60, marginLeft: 20 }}
                  />
                </div>
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
              <Col xs={24} md={6} style={{ textAlign: 'start' }}>
                {/* Mục 1 */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}
                >
                  <img
                    src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F4fff6c05-f49b-4f4a-a532-f2de15060877-5.svg&w=3840&q=75"
                    alt="icon"
                    style={{ width: 60, height: 60, marginRight: 20 }}
                  />
                  <div>
                    <Paragraph
                      strong
                      style={{
                        fontSize: 20,
                        color: '#065c8c',
                        marginBottom: 0,
                      }}
                    >
                      Thanh toán viện phí
                    </Paragraph>
                    <Paragraph type="secondary" style={{ margin: 0 }}>
                      Hỗ trợ nhiều hình thức thanh toán trực tuyến tiện lợi
                    </Paragraph>
                  </div>
                </div>

                {/* Mục 2 */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 20,
                    justifyContent: 'space-between',
                    paddingLeft: 60,
                  }}
                >
                  <img
                    src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F4fff6c05-f49b-4f4a-a532-f2de15060877-5.svg&w=3840&q=75"
                    alt="icon"
                    style={{ width: 60, height: 60, marginRight: 20 }}
                  />
                  <div>
                    <Paragraph
                      strong
                      style={{
                        fontSize: 20,
                        color: '#065c8c',
                        marginBottom: 0,
                      }}
                    >
                      Chăm sóc y tế tại nhà
                    </Paragraph>
                    <Paragraph type="secondary" style={{ margin: 0 }}>
                      Điều dưỡng, xét nghiệm tại nhà chuyên nghiệp
                    </Paragraph>
                  </div>
                </div>

                {/* Mục 3 */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F4fff6c05-f49b-4f4a-a532-f2de15060877-5.svg&w=3840&q=75"
                    alt="icon"
                    style={{ width: 60, height: 60, marginRight: 20 }}
                  />
                  <div>
                    <Paragraph
                      strong
                      style={{
                        fontSize: 20,
                        color: '#065c8c',
                        marginBottom: 0,
                      }}
                    >
                      Mạng lưới cơ sở hợp tác
                    </Paragraph>
                    <Paragraph type="secondary" style={{ margin: 0 }}>
                      Kết nối phòng khám, bệnh viện khắp cả nước
                    </Paragraph>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div
            style={{
              height: 400,
              padding: '30px 70px',
              display: 'flex',
              flexDirection: 'column',
              maxWidth: 1000,
              margin: '0 auto',
              marginTop: 30,
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
                    Nền tảng kết nối hệ thống Y Tế toàn quốc dành cho người Việt
                    Nam
                  </Title>
                </div>

                {/* Đoạn giới thiệu */}
                <Paragraph style={{ fontSize: 17 }}>
                  Sứ mệnh của chúng tôi là giúp người Việt tiếp cận các dịch vụ
                  Y tế{' '}
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
                    Đối tác Y tế Toàn quốc (Bệnh viện, bác sĩ, nhà thuốc, ...)
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
        </div>
      </>
    );
  };
  const MobileLayout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
      const hasShown = sessionStorage.getItem('gennovaxModalShown');
      if (!hasShown) {
        const timer = setTimeout(() => {
          setIsModalOpen(true);
          sessionStorage.setItem('gennovaxModalShown', 'true');
        }, 2000); // hiện sau 2 giây
        return () => clearTimeout(timer);
      }
    }, []);

    const handleClose = () => {
      setIsModalOpen(false);
    };
    return (
      <>
        {isModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.4)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
              padding: '10px',
            }}
            onClick={handleClose}
          >
            <div
              style={{
                position: 'relative',
                background: '#fff',
                maxWidth: '500px',
                width: '95%',
                borderRadius: 20,
                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Nút X */}
              <button
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '-15px',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  border: '2px solid #ccc',
                  background: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#666',
                  fontSize: '18px',
                  transition: 'all 0.2s ease',
                  zIndex: 10,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#0071bc';
                  e.currentTarget.style.color = '#0071bc';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#ccc';
                  e.currentTarget.style.color = '#666';
                }}
              >
                <CloseOutlined />
              </button>
              <div style={{ overflow: 'hidden', borderRadius: 20 }}>
                {/* Phần đầu */}
                <div
                  style={{
                    background: 'linear-gradient(180deg, #ffffff, #e7f7ff)',
                    padding: '15px',
                    textAlign: 'center',
                  }}
                >
                  <h3
                    style={{
                      color: '#0071bc',
                      fontWeight: 'bold',
                      fontSize: '15px',
                      marginBottom: '6px',
                    }}
                  >
                    → ĐẶT LỊCH XÉT NGHIỆM TẠI NHÀ ←
                  </h3>
                  <h1
                    style={{
                      color: '#0071bc',
                      fontWeight: 900,
                      fontSize: '18px',
                      marginBottom: '6px',
                    }}
                  >
                    DỊCH VỤ XÉT NGHIỆM TỔNG QUÁT GenNovaX
                  </h1>
                  <h2
                    style={{
                      color: '#00a859',
                      fontWeight: 'bold',
                      fontSize: '15px',
                      margin: 0,
                    }}
                  >
                    NHANH CHÓNG - CHÍNH XÁC - AN TOÀN
                  </h2>
                </div>

                {/* Phần giữa */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '15px',
                    gap: '15px',
                    background: '#f9fcff',
                  }}
                >
                  {/* Cột trái */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '12px',
                      }}
                    >
                      <button
                        style={{
                          background: '#0071bc',
                          border: 'none',
                          color: '#fff',
                          borderRadius: '20px',
                          padding: '8px 14px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          fontSize: '13px',
                          flex: '1 1 auto',
                          boxShadow:
                            '0 0 8px rgba(0, 113, 188, 0.5), 0 0 16px rgba(0, 113, 188, 0.4)',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-3px)';
                          e.target.style.boxShadow =
                            '0 0 12px rgba(0, 113, 188, 0.6), 0 0 22px rgba(0, 113, 188, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow =
                            '0 0 8px rgba(0, 113, 188, 0.5), 0 0 16px rgba(0, 113, 188, 0.4)';
                        }}
                        onClick={() => {
                          navigate('/y-te/danh-sach-dich-vu');
                        }}
                      >
                        Xem Gói Xét Nghiệm
                      </button>

                      <button
                        style={{
                          background: '#00a859',
                          border: 'none',
                          color: '#fff',
                          borderRadius: '20px',
                          padding: '8px 14px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          fontSize: '13px',
                          flex: '1 1 auto',
                          boxShadow:
                            '0 0 8px rgba(0, 168, 89, 0.5), 0 0 16px rgba(0, 168, 89, 0.4)',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-3px)';
                          e.target.style.boxShadow =
                            '0 0 12px rgba(0, 168, 89, 0.6), 0 0 22px rgba(0, 168, 89, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow =
                            '0 0 8px rgba(0, 168, 89, 0.5), 0 0 16px rgba(0, 168, 89, 0.4)';
                        }}
                        onClick={() => {
                          navigate('/y-te/dat-lich-xet-nghiem');
                        }}
                      >
                        Đặt Ngay
                      </button>
                    </div>

                    <h3
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#0071bc',
                        marginBottom: '8px',
                      }}
                    >
                      Dịch vụ xét nghiệm GenNovaX
                    </h3>

                    <p
                      style={{
                        fontSize: '14px',
                        lineHeight: '1.5',
                        color: '#534c4cff',
                        marginBottom: '14px',
                        fontWeight: 500,
                      }}
                    >
                      Đội ngũ kỹ thuật viên y tế chuyên nghiệp, lấy mẫu tại nhà,
                      trả kết quả nhanh chóng qua ứng dụng.
                    </p>

                    {/* <div
                      style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
                    >
                      {[
                        'Xét nghiệm máu tổng quát',
                        'Xét nghiệm đường huyết',
                        'Xét nghiệm mỡ máu',
                        'Xét nghiệm chức năng gan, thận',
                        'Xét nghiệm tầm soát bệnh lý',
                      ].map((item, index) => (
                        <div
                          key={index}
                          style={{
                            background: '#e6f4f9',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '13px',
                            color: '#0071bc',
                            fontWeight: 500,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div> */}
                  </div>

                  {/* Cột phải */}
                  <div>
                    <img
                      src="https://bvphusanct.com.vn/Portals/0/67d0390c86dc42821bcd.jpg"
                      alt="Xét nghiệm GenNovaX"
                      style={{
                        width: '100%',
                        height: '200px',
                        borderRadius: '10px',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
                  <div
                    key={index}
                    className="service-card"
                    onClick={() => {
                      navigate('/y-te/danh-sach-dich-vu');
                    }}
                  >
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
                  title: 'Phòng khám Đa khoa Quốc tế Thu Cúc',
                  image: imagehoptac1,
                },
                {
                  title: 'Phòng khám Đa khoa Medlatec',
                  image: imagehoptac2,
                },
                {
                  title: 'Phòng khám Đa khoa Hồng Ngọc',
                  image: imagehoptac3,
                },
                {
                  title: 'Trung tâm Y tế Vinmec Times City',
                  image: imagehoptac1,
                },
                {
                  title: 'Phòng khám Đa khoa Bạch Mai (Hà Nội)',
                  image: imagehoptac2,
                },
                {
                  title: 'Trung tâm Y khoa Family Medical Practice Hà Nội',
                  image: imagehoptac3,
                },
                {
                  title: 'Bệnh viện Đa khoa Quốc tế Hải Phòng',
                  image: imagehoptac1,
                },
                {
                  title: 'Phòng khám Đa khoa Hoàn Mỹ Bắc Ninh',
                  image: imagehoptac2,
                },
                {
                  title: 'Trung tâm Xét nghiệm Quảng Ninh',
                  image: imagehoptac3,
                },
                {
                  title: 'Phòng khám Đa khoa Hưng Thịnh (Hà Nội)',
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
                      fontSize: 12,
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
                        style={{
                          marginBottom: 8,
                          fontSize: 14,
                          lineHeight: '20px', // chiều cao 1 dòng
                          height: '40px', // 2 dòng (20px * 2)
                          overflow: 'hidden',
                        }}
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
                          lineHeight: '20px', // chiều cao 1 dòng
                          height: '60px', // 3 dòng (20px * 3)
                          overflow: 'hidden',
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
                        onClick={() => {
                          navigate(`/y-te/chi-tiet-phong-kham?ID=${clinic.id}`);
                        }}
                      >
                        Xem chi tiết
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
                wrap={false}
                style={{ minWidth: 'max-content' }}
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
                            height: 100,
                            objectFit: 'cover',
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                          }}
                        />
                      </div>
                      <div style={{ padding: '16px 8px', paddingTop: 0 }}>
                        <Title
                          level={5}
                          style={{
                            marginBottom: 8,
                            fontSize: 14,
                            lineHeight: '20px', // chiều cao mỗi dòng
                            height: '40px', // 2 dòng => 20px * 2
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            whiteSpace: 'normal',
                          }}
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
                          onClick={() => {
                            navigate(
                              `/y-te/dat-lich-xet-nghiem?code=${service.id}`
                            );
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
          <div>
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
              Tin tức y tế mới nhất
            </Title>
            <div
              style={{
                width: '100%',
                margin: '16px auto',
                textAlign: 'center',
              }}
            >
              <audio
                src="https://res.cloudinary.com/dh3rdryux/video/upload/v1756357363/udrxrrusumrrvg51xixt.mp3"
                controls
                style={{ width: '90%', display: 'block', margin: '0 auto' }}
              />
            </div>
            <LatestNews />
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
              <img
                src={googleplay}
                alt="Google Play"
                style={{ height: 45 }}
                onClick={() => {
                  window.open(
                    'https://expo.dev/accounts/bkc_duckien/projects/bio-app-frontent/builds/0d8138ea-3da8-4107-8acb-30db9a6463ee',
                    '_blank'
                  );
                }}
              />
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
                // marginBottom: 0,
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
