import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Carousel,
  Col,
  Divider,
  Row,
  Typography,
} from 'antd';
import { useRef } from 'react';
import { AiFillFire, AiOutlineBars } from 'react-icons/ai';
import { LuMessageSquareMore } from 'react-icons/lu';
import { SiTicktick } from 'react-icons/si';
import { useMediaQuery } from 'react-responsive';
import { useLocation, useNavigate } from 'react-router-dom';
import AllProductContent1 from '../productall/AllProductContent1';
import AllProductHeader from '../productall/AllProductHeader';
import AllProductContent2 from './AllProductContent2';
import AllProductContentMobile2 from './AllProductContentMobile2';
import AllProductFooter from './AllProductFooter';

const { Title, Paragraph, Text, Link } = Typography;

const HomePageProduct = () => {
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
    {
      title: 'Găng tay y tế',
      image:
        'https://donganhsafety.com.vn/wp-content/uploads/2024/05/gang-tay-nitrile-thuc-pham-ssglove.png',
    },
    {
      title: 'Khẩu trang y tế',
      image:
        'https://rando.com.vn/upload/products/khau-trang-khang-khuan-eco-fresh-rando-1-1-500x500-A1D1732257697.webp',
    },
    {
      title: 'Máy xông chăm sóc tai mũi họng',
      image:
        'https://bwell-swiss.ch/wp-content/uploads/2017/12/WF-1000_galereya.png',
    },
    {
      title: 'Sản phẩm chăm sóc người cao tuổi',
      image:
        'https://png.pngtree.com/png-vector/20250430/ourmid/pngtree-nurse-supporting-an-elderly-patient-caring-for-the-aging-population-png-image_16149510.png',
    },
    {
      title: 'Bơm kim tiêm',
      image: 'https://cdnus.globalso.com/kindly-group/IMG_8968_11.png',
    },
    {
      title: 'Bộ kit xét nghiệm',
      image:
        'https://png.pngtree.com/png-clipart/20250516/original/pngtree-medical-diagnostic-test-kit-illustration-png-image_20998979.png',
    },
    {
      title: 'Máy đo huyết áp, đường huyết',
      image:
        'https://bizweb.dktcdn.net/100/099/321/products/may-do-huyet-ap-mj710.png?v=1487409965640',
    },
    {
      title: 'Ghế massage, đai lưng y tế',
      image:
        'https://thegioidodung.vn/wp-content/uploads/2025/06/ghe-massage-daikiosan-dkgm-30002-lcd-phai-truoc-832.png',
    },
    {
      title: 'Găng tay y tế',
      image:
        'https://donganhsafety.com.vn/wp-content/uploads/2024/05/gang-tay-nitrile-thuc-pham-ssglove.png',
    },
    {
      title: 'Khẩu trang y tế',
      image:
        'https://rando.com.vn/upload/products/khau-trang-khang-khuan-eco-fresh-rando-1-1-500x500-A1D1732257697.webp',
    },
    {
      title: 'Máy xông chăm sóc tai mũi họng',
      image:
        'https://bwell-swiss.ch/wp-content/uploads/2017/12/WF-1000_galereya.png',
    },
    {
      title: 'Sản phẩm chăm sóc người cao tuổi',
      image:
        'https://png.pngtree.com/png-vector/20250430/ourmid/pngtree-nurse-supporting-an-elderly-patient-caring-for-the-aging-population-png-image_16149510.png',
    },
    {
      title: 'Bơm kim tiêm',
      image: 'https://cdnus.globalso.com/kindly-group/IMG_8968_11.png',
    },
    {
      title: 'Bộ kit xét nghiệm',
      image:
        'https://png.pngtree.com/png-clipart/20250516/original/pngtree-medical-diagnostic-test-kit-illustration-png-image_20998979.png',
    },
    {
      title: 'Máy đo huyết áp, đường huyết',
      image:
        'https://bizweb.dktcdn.net/100/099/321/products/may-do-huyet-ap-mj710.png?v=1487409965640',
    },
    {
      title: 'Ghế massage, đai lưng y tế',
      image:
        'https://thegioidodung.vn/wp-content/uploads/2025/06/ghe-massage-daikiosan-dkgm-30002-lcd-phai-truoc-832.png',
    },
  ];
  const feedbacks = [
    {
      content:
        '“Máy đo huyết áp mua ở đây dùng ổn định, màn hình rõ ràng, dễ thao tác. Người lớn tuổi trong nhà cũng tự đo được mà không cần trợ giúp.”',
      name: 'Nguyễn Thị Hồng',
      location: 'Hà Nội',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    },
    {
      content:
        '“Nhiệt kế điện tử đo rất nhanh, chỉ vài giây có kết quả. So với loại thủy ngân thì an toàn hơn nhiều, nhất là khi có trẻ nhỏ.”',
      name: 'Phạm Văn Cường',
      location: 'TP. Hồ Chí Minh',
      avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
    },
    {
      content:
        '“Tôi mua máy xông mũi họng cho con, chạy êm, hơi mịn và đều. Bé hợp tác hơn hẳn, không còn sợ mỗi lần phải xông nữa.”',
      name: 'Lê Thu Trang',
      location: 'Đà Nẵng',
      avatar: 'https://randomuser.me/api/portraits/women/30.jpg',
    },
  ];
  const articles = [
    {
      title: 'Khách hàng đánh giá cao độ bền của máy đo huyết áp Omron',
      image:
        'https://product.hstatic.net/200000727141/product/100610698__7__bc676f375b4344b19b4997caa6f6a01a_master.jpg',
      highlight: true,
      summary:
        'Nhiều khách hàng sau khi sử dụng máy đo huyết áp Omron cho biết sản phẩm có thiết kế chắc chắn, đo nhanh và chính xác.',
      detail:
        'Máy đo huyết áp Omron được nhiều người dùng y tế tại nhà cũng như phòng khám tin tưởng. Trên GennovaX, khách hàng chia sẻ rằng thiết bị hoạt động ổn định, pin lâu, màn hình dễ quan sát và có chế độ lưu kết quả tiện lợi. Đây là lựa chọn phổ biến cho gia đình muốn theo dõi sức khỏe hằng ngày.',
    },
    {
      title: 'Cảm nhận về nhiệt kế điện tử Microlife từ người dùng',
      image:
        'https://product.hstatic.net/200000727141/product/100610698__7__bc676f375b4344b19b4997caa6f6a01a_master.jpg',
      summary:
        'Người dùng nhận xét nhiệt kế Microlife đo nhanh, tiện lợi, phù hợp với cả trẻ nhỏ và người lớn.',
    },
    {
      title: 'Người bệnh chia sẻ trải nghiệm sử dụng máy xông khí dung',
      image:
        'https://product.hstatic.net/200000727141/product/100610698__7__bc676f375b4344b19b4997caa6f6a01a_master.jpg',
      summary:
        'Máy xông khí dung được đánh giá là hỗ trợ hiệu quả cho bệnh nhân hô hấp, dễ vệ sinh và sử dụng tại nhà.',
    },
    {
      title: 'Khách hàng nói gì về gối y tế chỉnh hình cổ?',
      image:
        'https://product.hstatic.net/200000727141/product/100610698__7__bc676f375b4344b19b4997caa6f6a01a_master.jpg',
      summary:
        'Nhiều phản hồi tích cực cho rằng gối chỉnh hình giúp giảm đau mỏi cổ vai gáy, hỗ trợ giấc ngủ sâu hơn.',
    },
  ];

  const bannerImages = [
    'https://royalmed.com.vn/wp-content/uploads/2025/03/banner-y-te-1-1.jpg',
    'https://royalmed.com.vn/wp-content/uploads/2025/03/banner-y-te-2.1.jpg',
    'https://royalmed.com.vn/wp-content/uploads/2025/03/banner-y-te-3.1.jpg',
  ];

  const DesktopLayout = () => {
    return (
      <>
        <AllProductHeader />
        <div style={{ width: '100%', backgroundColor: 'white' }}>
          <div
            style={{
              width: '100%',
              maxWidth: 1300,
              margin: '0 auto',
              paddingTop: 20,
              backgroundColor: 'white',
            }}
          >
            <div style={{ width: '100%', backgroundColor: 'white' }}>
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
                          src="https://nakawa.vn/public/storage/banner/org/banner-giuong-benh-nhan-dieu-khien-bang-dien.webp"
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
                          src="https://royalmed.com.vn/wp-content/uploads/2025/03/banner-y-te-1-1.jpg"
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
                  marginTop: 30,
                  padding: '30px 70px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0px 0px 8px 8px rgba(0, 0, 0, 0.1)',
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
                                    `/san-pham?danhmuc=${encodedCategory}`
                                  );
                                }}
                              >
                                <img
                                  src={item.image}
                                  alt="icon"
                                  style={{
                                    width: '60%',
                                    height: '60%',
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
                                onClick={() => {
                                  const category = item.title;
                                  const encodedCategory =
                                    encodeURIComponent(category);
                                  navigate(
                                    `/san-pham?danhmuc=${encodedCategory}`
                                  );
                                }}
                              >
                                <img
                                  src={item.image}
                                  alt="icon"
                                  style={{
                                    width: '60%',
                                    height: '60%',
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
                  height: 420,
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
                            fontSize: 13,
                            lineHeight: 1.4,
                            display: '-webkit-box',
                            WebkitLineClamp: 4, // Giữ cố định 4 dòng
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            height: '6em', // 4 dòng * lineHeight (1.2 ~ 1.4)
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
        <AllProductHeader />
        <div style={{ width: '100%', backgroundColor: '#e4f5f7' }}>
          <div
            style={{
              width: '100%',
              maxWidth: 1300,
              margin: '0 auto',
              paddingTop: 10,
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
                <div
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: 'white',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      overflowX: 'auto',
                      scrollbarWidth: 'none', // Firefox
                      msOverflowStyle: 'none', // IE 10+
                    }}
                    className="scroll-container"
                  >
                    {[
                      {
                        label: 'Mã Giảm Giá',
                        image:
                          'https://cf.shopee.vn/file/vn-50009109-8a387d78a7ad954ec489d3ef9abd60b4_xxhdpi',
                      },
                      {
                        label: 'GenshopVip',
                        image:
                          'https://cf.shopee.vn/file/vn-11134258-7ras8-may04c8sak759f_xxhdpi',
                      },
                      {
                        label: 'Hàng Chọn Giá Hời Cực Sốc',
                        image:
                          'https://cf.shopee.vn/file/vn-50009109-5bf65d4dc0eb8f6b42074751e8b736a7_xxhdpi',
                      },
                      {
                        label: 'Deal Giờ Vàng',
                        image:
                          'https://cf.shopee.vn/file/vn-11134258-7ras8-mb6e1ufaxoldb9_xxhdpi',
                      },
                      {
                        label: 'Săn xu',
                        image:
                          'https://cf.shopee.vn/file/1d25d74d6900b85cfde8f967e613041d_xxhdpi',
                      },
                      {
                        label: 'Khách hàng thân thiết',
                        image:
                          'https://cf.shopee.vn/file/vn-50009109-f692e9b0be05d1a11cded7f9f72b5f0b_xxhdpi',
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        style={{
                          minWidth: 80,
                          margin: '0 8px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.label}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                            marginBottom: 6,
                            objectFit: 'cover',
                            flexShrink: 0,
                          }}
                        />
                        <div
                          style={{
                            fontSize: 10,
                            lineHeight: '16px',
                            textAlign: 'center',
                            wordBreak: 'break-word',
                            maxWidth: 70,
                          }}
                        >
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                style={{
                  // height: 360,
                  backgroundColor: 'white',
                  marginTop: 10,
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
                                    `/san-pham?danhmuc=${encodedCategory}`
                                  );
                                }}
                              >
                                <img
                                  src={item.image}
                                  alt="icon"
                                  style={{
                                    width: '70%',
                                    height: '70%',
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
                                onClick={() => {
                                  const category = item.title;
                                  const encodedCategory =
                                    encodeURIComponent(category);
                                  navigate(
                                    `/san-pham?danhmuc=${encodedCategory}`
                                  );
                                }}
                              >
                                <img
                                  src={item.image}
                                  alt="icon"
                                  style={{
                                    width: '70%',
                                    height: '70%',
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
