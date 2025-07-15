import React, { useEffect, useState } from 'react';
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
import ShopProductContent from './shopInfoProductContent';
import FooterSection from './AllProductFooter';

const { Title } = Typography;

const categories = [
  'Thiết bị mạch điện',
  'Thiết bị và phụ kiện xây dựng',
  'Đèn',
  'Phụ kiện tivi',
  'Dụng cụ điện & thiết bị lớn',
  'Dụng cụ cầm tay',
  'Máy hút bụi & Thiết bị làm sạch',
  'Trang trí nhà cửa',
  'Camera giám sát & Camera hệ thống',
];

const tabs = ['Phổ Biến', 'Mới Nhất', 'Bán Chạy', 'Giá'];

const mockCards = new Array(10).fill(0);
const { Text } = Typography;

const SortBar = () => {
  const [sortType, setSortType] = useState('popular');

  const handleMenuClick = (e) => {
    setSortType(e.key); // 'price_asc' or 'price_desc'
  };

  const priceMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="price_asc">Giá: Thấp đến Cao</Menu.Item>
      <Menu.Item key="price_desc">Giá: Cao đến Thấp</Menu.Item>
    </Menu>
  );

  const getBtnStyle = (key) => ({
    backgroundColor: sortType === key ? '#f53d2d' : 'white',
    color: sortType === key ? 'white' : 'black',
    border: '1px solid #d9d9d9',
    minWidth: key.includes('price') ? 120 : 80, // button "Giá" to hơn
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  const renderPriceButton = () => {
    return (
      <Dropdown overlay={priceMenu} trigger={['click']}>
        <Button
          style={getBtnStyle(sortType.startsWith('price') ? sortType : '')}
        >
          Giá{' '}
          {sortType === 'price_asc' ? (
            <UpOutlined style={{ marginLeft: 6 }} />
          ) : (
            <DownOutlined style={{ marginLeft: 6 }} />
          )}
        </Button>
      </Dropdown>
    );
  };

  return (
    <Row
      style={{
        marginBottom: 16,
        backgroundColor: '#ede7e6',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
      }}
      gutter={8}
    >
      <Col>
        <Button type="text" disabled style={{ fontWeight: 'bold' }}>
          Sắp xếp theo
        </Button>
      </Col>
      <Col>
        <Button
          style={getBtnStyle('popular')}
          onClick={() => setSortType('popular')}
        >
          Phổ biến
        </Button>
      </Col>
      <Col>
        <Button style={getBtnStyle('new')} onClick={() => setSortType('new')}>
          Mới nhất
        </Button>
      </Col>
      <Col>
        <Button
          style={getBtnStyle('bestseller')}
          onClick={() => setSortType('bestseller')}
        >
          Bán chạy
        </Button>
      </Col>
      <Col>{renderPriceButton()}</Col>
    </Row>
  );
};

const ShopInfoProduct = ({ shopInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const shopInfo = location.state;
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const category = shopInfo.productCategories.map((item) => item.categoryName);
  useEffect(() => {
    setTabs(['Dạo', 'Sản phẩm', ...category]);
  }, []);
  return (
    <>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 0' }}>
        <Row gutter={16}>
          {/* Sidebar */}
          <Col span={4}>
            <Title
              level={5}
              style={{
                // color: '#f53d2d',
                display: 'flex',
                alignItems: 'center',
                height: 50,
              }}
            >
              <AiOutlineBars style={{ marginRight: 10 }} /> Danh Mục
            </Title>
            <Divider style={{ margin: '8px 0' }} />
            <Menu
              mode="vertical"
              style={{ border: 'none', background: 'none' }}
            >
              {['Tất cả', ...category].map((item, index) => (
                <Menu.Item key={index}>{item}</Menu.Item>
              ))}
            </Menu>
          </Col>

          {/* Content */}
          <Col span={20}>
            {/* Tabs */}
            <SortBar />

            <Divider style={{ margin: '8px 0' }} />
            <ShopProductContent shopInfo={shopInfo} />
            {/* Grid Cards */}
          </Col>
        </Row>
      </div>
      {/* <FooterSection /> */}
    </>
  );
};

export default ShopInfoProduct;
