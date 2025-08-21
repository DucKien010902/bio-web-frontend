import {
  BellOutlined,
  CaretDownOutlined,
  CloseOutlined,
  FacebookFilled,
  FileTextOutlined,
  LogoutOutlined,
  MobileOutlined,
  ProfileOutlined,
  UnorderedListOutlined,
  YoutubeFilled,
} from '@ant-design/icons';
import { Badge, Button, Dropdown, Layout, Menu, Space } from 'antd';
import { BiSupport } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { RxDividerVertical } from 'react-icons/rx';
import { SiTiktok, SiZalo } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import gennovaXLogo from '../../assets/images/GenApp logo.png';
import { closeMenuBio, openMenuBio } from '../../redux/slices/openMenuSlice';
import './header.css';
const { Header } = Layout;

// Tạo Menu dropdown

const HeaderComponent = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const isDesktop = useMediaQuery({ minWidth: 992 });
  const accountMenu = (
    <Menu
      style={{
        minWidth: 300,
        padding: 8,
        borderRadius: 12,
        boxShadow: '0 4px 16px rgba(45, 144, 206, 0.5)',
        marginTop: 10,
      }}
    >
      <Menu.Item
        key="1"
        icon={<ProfileOutlined style={{ fontSize: 23 }} />}
        style={{ padding: '12px 16px', fontSize: 16 }}
        onClick={() =>
          navigate('/y-te/tai-khoan', { state: { key: 'history' } })
        }
      >
        Hồ sơ kết quả
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<FileTextOutlined style={{ fontSize: 23 }} />}
        style={{ padding: '12px 16px', fontSize: 16 }}
        onClick={() =>
          navigate('/y-te/tai-khoan', { state: { key: 'tickets' } })
        }
      >
        Phiếu khám bệnh
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<BellOutlined style={{ fontSize: 23 }} />}
        style={{ padding: '12px 16px', fontSize: 16 }}
        onClick={() =>
          navigate('/y-te/tai-khoan', { state: { key: 'notifications' } })
        }
      >
        Thông báo
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="4"
        icon={<LogoutOutlined style={{ fontSize: 23, color: '#ff4d4f' }} />}
        danger
        style={{ padding: '12px 16px', fontSize: 16 }}
        onClick={() => {
          localStorage.removeItem('user');
          navigate('/login');
        }}
      >
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  const menuItems = [
    { label: 'Sản phẩm', key: '1' },
    { label: 'Dịch vụ y tế', key: '2' },
    { label: 'Vật tư y tế', key: '4' },
    { label: 'Tin tức', key: '5' },
    { label: 'Đối tác', key: '6' },
    { label: 'Liên hệ', key: '7' },
  ];
  const user = JSON.parse(localStorage.getItem('user'));
  // console.log(user?.phone);
  const subMenus = {
    1: [
      // { label: 'Bệnh viện', path: '/y-te' },
      // { label: 'Trạm y tế', path: '/y-te' },
    ],
    2: [
      { label: 'Các dịch vụ', path: '/y-te/danh-sach-dich-vu' },
      { label: 'Phòng khám', path: '/y-te/danh-sach-phong-kham' },
      // { label: 'Xét nghiệm', path: '/y-te' },
      // { label: 'Chẩn đoán hình ảnh', path: '/y-te' },
    ],
    3: [
      // { label: 'Gói khám cho doanh nghiệp', path: '/y-te' },
      // { label: 'Khám định kỳ', path: '/y-te' },
    ],
    4: [{ label: 'Sản phẩm y tế', path: '/y-te' }],
    5: [
      { label: 'Tin tức y tế', path: '/y-te/tin-tuc' },
      // { label: 'Hướng dẫn thanh toán', path: '/y-te' },
    ],
    6: [
      // { label: 'Cơ sở y tế', path: '/y-te' },
    ],
    7: [
      { label: 'Về GennovaX', path: 'https://www.gennovax.vn/' },
      // { label: 'Cơ sở y tế', path: '/y-te' },
      // { label: 'Về GenBio', path: '/y-te/gioi-thieu' },
      // { label: 'Sản phẩm y tế', path: '/y-te/product' },
    ],
  };

  const renderDropdownMenu = (key) => (
    <Menu
      style={{
        width: 220,
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {subMenus[key]?.map((subItem, index) => (
        <Menu.Item
          key={`${key}-${index}`}
          onClick={() => {
            if (subItem.path.startsWith('http')) {
              window.open(subItem.path, '_blank');
            } else {
              navigate(subItem.path);
            }
          }}
        >
          {subItem.label}
        </Menu.Item>
      ))}
    </Menu>
  );
  const DesktopLayout = () => {
    return (
      <div>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottom: '1px solid #f0f0f0',
            height: 140,
          }}
        >
          {/* Logo */}
          <div
            style={{
              flex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              navigate('/y-te');
            }}
          >
            <img
              src={gennovaXLogo}
              alt="GennovaX Logo"
              style={{
                height: 75, // bạn có thể thay đổi kích thước nếu muốn
                objectFit: 'contain',
              }}
            />
          </div>

          {/* Nội dung bên phải */}
          <div
            style={{
              flex: 15,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              padding: '12px 0',
              paddingTop: 8,
            }}
          >
            {/* Dòng trên: social + button */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 24,
                borderBottom: '1px solid rgb(200, 193, 193)',
              }}
            >
              <Space size="small" style={{ flex: 12 }}>
                <SiTiktok size={16} className="contact-icon" />
                <strong
                  className="contact-icon"
                  onClick={() => {
                    window.open(
                      'https://www.youtube.com/watch?v=HxhUfenf0nQ',
                      'blank'
                    );
                  }}
                >
                  Tiktok
                </strong>
                <RxDividerVertical size={15} />
                <SiZalo size={16} className="contact-icon" />
                <strong
                  className="contact-icon"
                  onClick={() => {
                    window.open(
                      'https://www.youtube.com/watch?v=HxhUfenf0nQ',
                      'blank'
                    );
                  }}
                >
                  Zalo
                </strong>
                <RxDividerVertical size={15} />
                <FacebookFilled className="contact-icon" />
                <strong
                  className="contact-icon"
                  onClick={() => {
                    window.open(
                      'https://www.youtube.com/watch?v=HxhUfenf0nQ',
                      'blank'
                    );
                  }}
                >
                  Facebook
                </strong>
                <RxDividerVertical size={15} />
                <YoutubeFilled className="contact-icon" />
                <strong
                  className="contact-icon"
                  onClick={() => {
                    window.open(
                      'https://www.youtube.com/watch?v=HxhUfenf0nQ',
                      'blank'
                    );
                  }}
                >
                  Youtube
                </strong>
              </Space>

              <Space size="small" style={{ flex: 9, position: 'relative' }}>
                <Button
                  type="primary"
                  icon={<MobileOutlined />}
                  size="large"
                  className="button-dowload"
                  style={{
                    borderRadius: 20,
                    backgroundColor: '#fca103',
                    fontWeight: 500,
                    width: 160,
                  }}
                  onClick={() => {
                    window.open(
                      'https://play.google.com/store/games?hl=vi',
                      '_blank'
                    );
                  }}
                >
                  Tải ứng dụng
                </Button>

                {user?.phoneNumber ? (
                  <>
                    <Dropdown
                      overlay={accountMenu}
                      trigger={['click']}
                      placement="bottomRight"
                    >
                      <Button
                        icon={<FaUser />}
                        size="large"
                        style={{
                          borderRadius: 20,
                          color: '#00b5f1',
                          fontWeight: 500,
                          borderColor: '#00b5f1',
                          marginLeft: 10,
                          minwidth: 160,
                        }}
                        className="button-name"
                      >
                        {user?.fullName || 'Tài khoản'}
                      </Button>
                    </Dropdown>

                    {/* RGB Popup */}
                  </>
                ) : (
                  <Button
                    icon={<FaUser />}
                    size="large"
                    style={{
                      borderRadius: 20,
                      color: '#00b5f1',
                      fontWeight: 500,
                      borderColor: '#00b5f1',
                      marginLeft: 10,
                      width: 160,
                    }}
                    className="button-name"
                    onClick={() => {
                      localStorage.setItem(
                        'redirectAfterLogin',
                        window.location.pathname + window.location.search
                      );
                      navigate('/login');
                    }}
                  >
                    Tài khoản
                  </Button>
                )}
                <div className="popup-rgb-reminder">
                  👈 Xem kết quả xét nghiệm
                </div>
              </Space>
            </div>

            {/* Dòng dưới: hotline + menu */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 32,
              }}
            >
              <div
                style={{
                  flex: 9,
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 14,
                  color: '#333',
                }}
              >
                <BiSupport size={45} style={{ marginRight: 8, color: 'red' }} />
                <div>
                  <strong style={{ fontSize: 25, color: '#ffb54a' }}>
                    1900 1234
                  </strong>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 24, flex: 11 }}>
                {menuItems.map((item) => {
                  if (item.key === '1') {
                    return (
                      <div
                        key={item.key}
                        className="menu-item"
                        onClick={() => navigate('/san-pham/trang-chu')}
                      >
                        {item.label}
                      </div>
                    );
                  }

                  return (
                    <Dropdown
                      key={item.key}
                      overlay={renderDropdownMenu(item.key)}
                      trigger={['hover']}
                      placement="bottomLeft"
                      overlayClassName="custom-dropdown"
                      overlayStyle={{ minWidth: 300 }}
                      autoAdjustOverflow={false}
                    >
                      <div className="menu-item">
                        {item.label}
                        <CaretDownOutlined
                          style={{ fontSize: 15, paddingTop: 2, marginLeft: 5 }}
                        />
                      </div>
                    </Dropdown>
                  );
                })}
              </div>
            </div>
          </div>
        </Header>

        {/* Dòng chữ chạy */}

        {/* Custom CSS */}
        <style>
          {`
    @keyframes scroll-left {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    @keyframes slide-down {
      0% {
        opacity: 0;
        transform: translateY(-10px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .custom-dropdown .ant-dropdown-menu {
  animation: slide-down 0.3s ease-out;
  border-radius: 8px;
  background-color: #fcf7f7;
}

.custom-dropdown .ant-dropdown-menu .ant-dropdown-menu-item {
  font-size: 13px !important;
  font-weight: 600 !important;
  background-color: #fcf7f7 !important;
  padding-top: 8px !important;
  padding-bottom: 8px !important;
  line-height: 1.6 !important;
}



    .custom-dropdown .ant-dropdown-menu-item:hover {
      color: #1890ff !important;
      background-color: #f0f0f0 !important;
    }

    .menu-item {
  display: flex;
  align-items: center; /* Căn icon và text cùng hàng */
  font-size: 16px;
  color: #333;
  cursor: pointer;
  font-weight: 500;
  white-space: nowrap; /* Ngăn chữ và icon bị xuống dòng */
}

    .menu-item:hover {
      border-bottom: 2px solid #1890ff;
    }
  `}
        </style>
      </div>
    );
  };
  const MobileLayout = () => {
    const isOpenMenu = useSelector((state) => state.openMenu.IsOpenMenu);
    const dispatch = useDispatch();
    return (
      <div>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottom: '1px solid #f0f0f0',
            // height: 140,
          }}
        >
          <div
            style={{
              flex: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <div
              onClick={() => {
                navigate('/y-te');
              }}
              style={{
                margin: 0,
                fontFamily: 'cursive',
                fontSize: 30,
                fontWeight: 700,
                background: 'linear-gradient(to right, #1890ff, #cf1952)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              <img
                src={gennovaXLogo}
                alt="GennovaX Logo"
                style={{
                  height: 40, // bạn có thể thay đổi kích thước nếu muốn
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              // paddingTop: 5,
              width: 70,
              justifyContent: 'space-between',
            }}
          >
            {/* Chuông có badge */}
            <Badge count={6} offset={[-2, 2]}>
              <BellOutlined style={{ fontSize: 22, color: '#1890ff' }} />
            </Badge>

            {isOpenMenu ? (
              <CloseOutlined
                style={{ fontSize: 22 }}
                onClick={() => {
                  dispatch(closeMenuBio());
                  navigate('/y-te');
                }}
              />
            ) : (
              <UnorderedListOutlined
                style={{ fontSize: 22 }}
                onClick={() => {
                  dispatch(openMenuBio());
                  navigate('/y-te/menu');
                }}
              />
            )}
          </div>
        </Header>

        {/* Dòng chữ chạy */}

        {/* Custom CSS */}
        <style>
          {`
    @keyframes scroll-left {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    @keyframes slide-down {
      0% {
        opacity: 0;
        transform: translateY(-10px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .custom-dropdown .ant-dropdown-menu {
  animation: slide-down 0.3s ease-out;
  border-radius: 8px;
  background-color: #fcf7f7;
}

.custom-dropdown .ant-dropdown-menu .ant-dropdown-menu-item {
  font-size: 13px !important;
  font-weight: 600 !important;
  background-color: #fcf7f7 !important;
  padding-top: 8px !important;
  padding-bottom: 8px !important;
  line-height: 1.6 !important;
}



    .custom-dropdown .ant-dropdown-menu-item:hover {
      color: #1890ff !important;
      background-color: #f0f0f0 !important;
    }

    .menu-item {
  display: flex;
  align-items: center; /* Căn icon và text cùng hàng */
  font-size: 16px;
  color: #333;
  cursor: pointer;
  font-weight: 500;
  white-space: nowrap; /* Ngăn chữ và icon bị xuống dòng */
}

    .menu-item:hover {
      border-bottom: 2px solid #1890ff;
    }
  `}
        </style>
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

export default HeaderComponent;
