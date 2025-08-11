import React, { use, useEffect, useState } from 'react';
import { Input, Avatar } from 'antd';
import { MessageOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { TbBrandShopee } from 'react-icons/tb';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaFacebook, FaInstagram, FaQuestionCircle } from 'react-icons/fa';
import {
  HomeOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { RxDividerVertical } from 'react-icons/rx';
import { FaBriefcaseMedical } from 'react-icons/fa';
import { CiMedicalCase } from 'react-icons/ci';
import { IoHome } from 'react-icons/io5';
import axiosClient from '../../api/apiConfig';
import { useMediaQuery } from 'react-responsive';
import ChatPanel from './ChatDrawer';
import ChatPanelMobile from './ChatDrawerMobile';
import { useSelector, useDispatch } from 'react-redux';
import { openChatPanel, closeChatPanel } from '../../redux/slices/chatSlice';
import AnimatedSearch from './InputSearch';
import AnimatedSearchMobile from './InputSearchMobile';
import genAppLogo from '../../assets/images/logo.webp';

const AllProductHeader = ({
  handleSearch,
  setProducts,
  allproducts,
  setSelectedProduct,
  setCurrentPage,
}) => {
  const dispatch = useDispatch();
  const chatOpen = useSelector((state) => state.chat.openChat);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const navigate = useNavigate();
  const phoneNumber = JSON.parse(localStorage.getItem('user'))?.phoneNumber;
  const fullName =
    JSON.parse(localStorage.getItem('user'))?.fullName == 'undefined'
      ? null
      : JSON.parse(localStorage.getItem('user'))?.fullName;
  const avatarImage = JSON.parse(localStorage.getItem('user'))?.avatarImage;
  const [cartQuantity, setCartQuantify] = useState(0);
  const fetchCartsData = async () => {
    try {
      const res = await axiosClient(
        `/product/getcarts?phoneNumber=${phoneNumber}`
      );
      setCartQuantify(res.data.length);
    } catch (error) {
      console.log('khong the get Cart');
    }
  };
  useEffect(() => {
    fetchCartsData();
  }, []);
  const DesktopLayout = () => {
    return (
      <div
        style={{
          // background: 'linear-gradient(to bottom, #306bcaff, #00b5f1)',
          backgroundImage:
            "url('https://banghieuviet.org/wp-content/uploads/2023/08/nen-xanh-duong-pastel.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          // position: 'fixed',
          // top: 0,
          // left: 0,
          // right: 0,
          // zIndex: 10,
        }}
      >
        {/* Thanh trên */}
        <div
          style={{
            width: '100%',
            height: '40px',
            color: '#1932b0',
            display: 'flex',
            alignItems: 'center',
            padding: '8px 30px',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          <div style={{ flex: 6 }}></div>
          <div
            style={{
              flex: 12,
              display: 'flex',
              alignItems: 'center',
              // paddingLeft: 300,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              Kênh người bán <RxDividerVertical />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                window.open(
                  'https://play.google.com/store/games?hl=vi',
                  'blank'
                );
              }}
            >
              Tải ứng dụng <RxDividerVertical />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                window.open(
                  'https://www.facebook.com/GentechVietnam/?locale=vi_VN',
                  'blank'
                );
              }}
            >
              Kết nối
              <FaFacebook style={{ marginLeft: '4px' }} />
              <FaInstagram style={{ marginLeft: '4px' }} />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              flex: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                navigate('/y-te');
              }}
            >
              <FaBriefcaseMedical style={{ marginRight: '6px' }} />
              Xét nghiệm <RxDividerVertical />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <FaQuestionCircle style={{ marginRight: '6px' }} />
              Hỗ trợ <RxDividerVertical />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                // fontWeight: 'bold',
                // color: '#f7f705',
              }}
              onClick={() => navigate('/')}
            >
              <IoHome style={{ marginRight: '6px' }} /> Tin tức
            </div>
            <div
              style={{
                marginLeft: 15,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                if (phoneNumber) {
                  navigate('/san-pham/tai-khoan');
                } else {
                  localStorage.setItem(
                    'redirectAfterLogin',
                    window.location.pathname
                  );
                  navigate('/login');
                }
              }}
            >
              <Avatar
                size={25}
                src={
                  avatarImage ||
                  'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-260nw-1913928688.jpg'
                }
                style={{ marginRight: 5 }}
              />
              {phoneNumber ? fullName || 'User' : 'Đăng nhập'}
            </div>
          </div>
        </div>

        {/* Thanh logo và tìm kiếm */}
        <div
          style={{
            padding: '0 50px',
            display: 'flex',
            alignItems: 'center',
            height: 60,
            // paddingTop: 10,
          }}
        >
          <div
            style={{
              flex: 6,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              navigate('/san-pham/trang-chu');
            }}
          >
            <img
              src={genAppLogo}
              alt="GenApp Logo"
              style={{
                height: 50,
                objectFit: 'contain',
              }}
            />
          </div>

          {/* Thanh tìm kiếm */}
          <div style={{ flex: 20, borderWidth: 1, borderColor: '#0ba1b8' }}>
            <AnimatedSearch />
          </div>

          {/* Icon giỏ hàng + badge */}
          <div
            style={{
              flex: 4,
              display: 'flex',
              alignItems: 'center',
              marginLeft: 60,
            }}
          >
            <div style={{ position: 'relative' }}>
              <MdOutlineShoppingCart
                size={30}
                color="#0ba1b8"
                onClick={() => {
                  if (!phoneNumber) {
                    localStorage.setItem(
                      'redirectAfterLogin',
                      window.location.pathname
                    );
                    navigate('/login');
                  } else {
                    navigate('/san-pham/gio-hang');
                  }
                }}
                style={{ cursor: 'pointer' }}
              />

              {cartQuantity > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    background: 'red',
                    color: '#0ba1b8',
                    borderRadius: '50%',
                    width: 18,
                    height: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}
                >
                  {cartQuantity}
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            width: '100%',
            height: '20px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            padding: '0 30px',
            fontSize: '13px',
          }}
        >
          {/* <div style={{ flex: 6 }}></div>
          <div
            style={{
              flex: 24,
              display: 'flex',
              alignItems: 'center',
              // textAlign:''
              // paddingLeft: 300,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              Balo Nữ <RxDividerVertical />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              Chuột Bluetooth <RxDividerVertical />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              Túi Chống Sốc Laptop <RxDividerVertical />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              Camera EZVIZ <RxDividerVertical />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              Chuông Cửa Không Dây <RxDividerVertical />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              Balo Văn Phòng <RxDividerVertical />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              Kẹo Socola
            </div>
          </div> */}
        </div>
        <div
          style={{
            width: '100%',
            backgroundColor: '#073278',
            height: 40,
            color: '#e3de40',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontStyle: 'italic',
            textDecoration: 'underline',
            fontSize: 16,
          }}
        >
          Chương trình&nbsp;{' '}
          <span style={{ fontWeight: 'bold' }}>khuyến mãi</span>&nbsp; tại đây!
          &gt;&gt;
        </div>
      </div>
    );
  };
  const MobileLayout = () => {
    return (
      <div
        style={{
          background: 'linear-gradient(to bottom, #306bcaff, #00b5f1)',
          padding: '20px 10px',
        }}
      >
        {/* Row: Tìm kiếm + Giỏ hàng + Avatar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 8,
          }}
        >
          {/* Ô tìm kiếm */}
          <AnimatedSearchMobile />

          {/* Giỏ hàng */}
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <MdOutlineShoppingCart
              size={24}
              color="white"
              onClick={() => {
                if (!phoneNumber) {
                  localStorage.setItem(
                    'redirectAfterLogin',
                    window.location.pathname
                  );
                  navigate('/login');
                } else {
                  navigate('/san-pham/gio-hang');
                }
              }}
            />
            {cartQuantity > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  background: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  width: 16,
                  height: 16,
                  fontSize: 11,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                }}
              >
                {cartQuantity}
              </div>
            )}
          </div>

          {/* Avatar hoặc Đăng nhập */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              marginLeft: 8,
              marginRight: 4,
            }}
            // onClick={() => {
            //   if (phoneNumber) {
            //     navigate('/san-pham/tai-khoan');
            //   } else {
            //     localStorage.setItem(
            //       'redirectAfterLogin',
            //       window.location.pathname
            //     );
            //     navigate('/login');
            //   }
            // }}
            onClick={() => {
              dispatch(openChatPanel());
            }}
          >
            {/* <Avatar
              size={28}
              src={
                avatarImage ||
                'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-260nw-1913928688.jpg'
              }
              style={{ marginRight: 5 }}
            /> */}
            <MessageOutlined
              size={40}
              style={{ color: 'white', fontSize: 20, marginBottom: 4 }}
              // onClick={() => {
              //   setChatOpen(true);
              // }}
            />
          </div>
        </div>

        {/* Chương trình khuyến mãi */}
        <div
          style={{
            backgroundColor: '#073278',
            height: 40,
            color: '#e3de40',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontStyle: 'italic',
            textDecoration: 'underline',
            fontSize: 14,
            borderRadius: 6,
          }}
        >
          Chương trình&nbsp;{' '}
          <span style={{ fontWeight: 'bold' }}>khuyến mãi</span>&nbsp; tại đây!
          &gt;&gt;
        </div>
        <ChatPanelMobile
          open={chatOpen}
          onClose={() => dispatch(closeChatPanel())}
        />
      </div>
    );
  };
  return (
    <div>
      {isMobile && <MobileLayout />}
      {isDesktop && <DesktopLayout />}
    </div>
  );
};

export default AllProductHeader;
