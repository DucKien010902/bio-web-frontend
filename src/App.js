import Header from './component/layout/header';
import ContentComponent from './component/pages/content';
import FooterComponent from './component/layout/footer';
import { Router, Route, Routes } from 'react-router-dom';
import IntroPage from './component/pages/intro-page';
import Error from './component/pages/error';
import ClinicListPage from './component/pages/list-clinic';
import DetailClinic from './component/pages/detail-clinic';
import ServicePage from './component/pages/list-service';
import BookingPage from './component/pages/book-calender';
import LoginPage from './component/auth/login';
import RegisterPage from './component/auth/register';
import UserProfile from './component/profile/profile';
import BookingSuccess from './component/pages/booking-success';
import AdminLayout from './component/admin/homeAdmin';
import ClinicLayout from './component/coordinator/homeClinic';
import 'antd/dist/reset.css';
import StaffLayout from './component/advisor/homeStaff';
import VNPaySuccess from './component/productall/VNPaySuccess';
import { useMediaQuery } from 'react-responsive';
import AllProductContent from './component/productall/AllProductContent';
import CartPage from './component/productall/AllProductCart';
import ShopeeProfile from './component/productall/customerProfile';
import CheckoutPage from './component/productall/productinvoice';
import ProductDetailPage from './component/productall/productdetail';
import ShopLayout from './component/shop/shopHome';
import ShopProfile from './component/productall/shopInfo';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HomePageProduct from './component/productall/HomeProduct';
import ChatWidget from './component/productall/ChatWidget';
import ChatWidgetAI from './component/productall/ChatWidgetAI';
import BottomTabBar from './component/productall/BottomTab';
import { useSelector } from 'react-redux';
import LiveStreamLayOut from './component/productall/LiveStream';
import NotificationLayOut from './component/productall/NotificationLayOut';
import AllProductContentSearch from './component/productall/AllproductContentForSearch';
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // KHÔNG cuộn nếu là về trang chủ "/"
    if (pathname === '/') return;

    const scrollTarget = document.scrollingElement || document.documentElement;
    scrollTarget.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

function Admin() {
  return (
    <Routes>
      <Route path="" element={<AdminLayout />}></Route>
    </Routes>
  );
}
function ServiceStaff() {
  return (
    <Routes>
      <Route path="" element={<StaffLayout />}></Route>
    </Routes>
  );
}
const Product = ({ chatOpen, setChatOpen }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isMobile = useMediaQuery({ maxWidth: 797 });
  return (
    <>
      {/* <AllProductHeader/> */}
      <Routes>
        <Route path="" element={<AllProductContent />} />
        <Route path="search" element={<AllProductContentSearch />} />
        <Route path="result" element={<VNPaySuccess />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="profile" element={<ShopeeProfile />} />
        <Route path="invoice" element={<CheckoutPage />} />
        <Route
          path="detail"
          element={
            <ProductDetailPage chatOpen={chatOpen} setChatOpen={setChatOpen} />
          }
        />
      </Routes>
      {isDesktop && <ChatWidget />}
    </>
  );
};
function MainApp() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<ContentComponent />} />
        <Route path="gioi-thieu" element={<IntroPage />} />
        <Route path="danh-sach-phong-kham" element={<ClinicListPage />} />
        <Route path="chi-tiet-phong-kham" element={<DetailClinic />} />
        <Route path="danh-sach-dich-vu" element={<ServicePage />} />
        <Route path="dat-lich-xet-nghiem" element={<BookingPage />} />
        <Route path="tai-khoan" element={<UserProfile />} />
        <Route path="booking-success" element={<BookingSuccess />} />
      </Routes>
      <FooterComponent />
    </>
  );
}
function App() {
  const chatOpen = useSelector((state) => state.chat.openChat);
  const location = useLocation();
  const { pathname } = location;

  // Kiểm tra các path cần hiển thị chat
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isMobile = useMediaQuery({ maxWidth: 797 });
  const shouldShowChat =
    (pathname === '/' && isDesktop) ||
    (pathname.startsWith('/product') && isDesktop) ||
    (pathname === '/shopInfo' && isDesktop);
  const shouldShowChatAI = pathname === '/mainbio' && isDesktop;
  return (
    <div className="app-wrapper">
      <ScrollToTop />
      {shouldShowChat && <ChatWidget />}
      {shouldShowChatAI && <ChatWidgetAI />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/quan-tri-vien/*" element={<Admin />} />
        <Route path="/dieu-phoi-vien/*" element={<ClinicLayout />} />
        <Route path="/tu-van-vien/*" element={<ServiceStaff />} />
        <Route path="/product/*" element={<Product />} />
        <Route path="/shopInfo" element={<ShopProfile />} />
        <Route path="/shop/*" element={<ShopLayout />} />
        <Route path="/error" element={<Error />} />
        <Route path="/*" element={<HomePageProduct />} />
        <Route path="/livestream*" element={<LiveStreamLayOut />} />
        <Route path="/notification*" element={<NotificationLayOut />} />
        <Route path="/mainbio*" element={<MainApp />} />
      </Routes>
      {!chatOpen && isMobile && <BottomTabBar />}
    </div>
  );
}

export default App;
