import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Checkbox, Input, Button, Divider, Select } from 'antd';
import ProductDetailPage from './productdetail';
import ShopeeProductCard from './productcard';
import axiosClient from '../../api/apiConfig';
import AllProductHeader from './AllProductHeader';
import AllProductFooter from './AllProductFooter';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import AllProductContentMobile2 from './AllProductContentMobile2';
import dichvu from '../../assets/images/dichvu.webp';
import dichvu1 from '../../assets/images/dichvu1.webp';
import dichvu2 from '../../assets/images/dichvu2.webp';
import dichvu3 from '../../assets/images/dichvu3.webp';
import dichvu4 from '../../assets/images/dichvu4.webp';
import dichvu5 from '../../assets/images/dichvu5.webp';
import { AiFillFire } from 'react-icons/ai';
const { Sider, Content } = Layout;

const AllProductContent = () => {
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  const isMobile = useMediaQuery({ maxWidth: 797 });
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const [danhmuc, setDanhmuc] = useState('');
  const [classifies, setClassifies] = useState([]);
  const [selectedClassify, setSelectedClassify] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [inputMinPrice, setInputMinPrice] = useState('');
  const [inputMaxPrice, setInputMaxPrice] = useState('');
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const [products, setProducts] = useState([]);
  const [allproducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState('products');
  const [productsInvoice, setProductsInvoice] = useState([]);

  // Lấy danh mục từ URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cate = params.get('danhmuc');
    if (cate) setDanhmuc(cate);
  }, [location.search]);

  // Fetch sản phẩm theo danh mục
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axiosClient.get(
          `/product/getproductbycategory?category=${encodeURIComponent(
            danhmuc
          )}`
        );
        setAllProducts(res.data);
        setProducts(res.data);

        const uniqueClassifies = [
          ...new Set(res.data.map((p) => p.pdClassify).filter(Boolean)),
        ];
        setClassifies(uniqueClassifies);
      } catch (error) {
        console.log('Không thể lấy sản phẩm');
      }
    };

    if (danhmuc) {
      fetchAllProducts();
      setSelectedClassify(null);
    }
  }, [danhmuc]);

  const removeVietnameseTones = (str) => {
    return str
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/\s+/g, '')
      .toLowerCase();
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    const normalizedValue = removeVietnameseTones(value);

    const filtered = allproducts.filter((product) => {
      const normalizedName = removeVietnameseTones(product.pdName || '');
      return normalizedName.includes(normalizedValue);
    });

    setProducts(filtered);
  };
  const DesktopLayOut = () => {
    return (
      <>
        <AllProductHeader
          handleSearch={handleSearch}
          setProducts={setProducts}
          allproducts={allproducts}
          setSelectedProduct={setSelectedProduct}
          setCurrentPage={setCurrentPage}
        />

        <Layout style={{ minHeight: 1200 }}>
          <Sider width="20%" style={{ background: '#fff', padding: '20px' }}>
            <Menu
              mode="inline"
              selectedKeys={[selectedClassify || 'all']}
              style={{ fontWeight: 500, marginBottom: 24 }}
              onClick={({ key }) => {
                setInputMinPrice('');
                setInputMaxPrice('');
                setMinPrice(null);
                setMaxPrice(null);

                if (key === 'all') {
                  setProducts(allproducts);
                  setSelectedClassify(null);
                } else {
                  setSelectedClassify(key);
                  const filtered = allproducts.filter(
                    (p) => p.pdClassify === key
                  );
                  setProducts(filtered);
                }
                setSelectedProduct(null);
              }}
            >
              <Menu.Item key="all" style={{ color: 'blue', fontSize: 16 }}>
                {danhmuc || 'Tất cả sản phẩm'}
              </Menu.Item>
              {classifies.map((cls) => (
                <Menu.Item key={cls}>▶ {cls}</Menu.Item>
              ))}
            </Menu>

            <Divider style={{ marginTop: 20, color: 'red' }} orientation="left">
              Đơn vị vận chuyển
            </Divider>
            <Checkbox.Group
              style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
            >
              <Checkbox value="hoa_toc">Hỏa Tốc</Checkbox>
              <Checkbox value="nhanh">Nhanh</Checkbox>
              <Checkbox value="tiet_kiem">Tiết Kiệm</Checkbox>
            </Checkbox.Group>

            <Divider style={{ marginTop: 20, color: 'red' }} orientation="left">
              Khoảng giá
            </Divider>
            <Select
              style={{ width: '100%', marginBottom: 10 }}
              placeholder="Chọn khoảng giá"
              onChange={(value) => {
                setSelectedPriceRange(value);

                let min = 0;
                let max = Infinity;

                switch (value) {
                  case '0-200k':
                    min = 0;
                    max = 200;
                    break;
                  case '200k-500k':
                    min = 200;
                    max = 500;
                    break;
                  case '500k-1m':
                    min = 500;
                    max = 1000;
                    break;
                  case '1m+':
                    min = 1000;
                    max = Infinity;
                    break;
                  default:
                    break;
                }

                const filtered = allproducts.filter((p) => {
                  const price = p.pdPrice * (1 - p.pdVouncher / 100);
                  return price >= min && price <= max;
                });

                setProducts(filtered);
                setSelectedProduct(null);
              }}
              value={selectedPriceRange}
              allowClear
            >
              <Select.Option value="0-200k">0 - 200.000đ</Select.Option>
              <Select.Option value="200k-500k">
                200.000 - 500.000đ
              </Select.Option>
              <Select.Option value="500k-1m">
                500.000 - 1.000.000đ
              </Select.Option>
              <Select.Option value="1m+">Trên 1.000.000đ</Select.Option>
            </Select>
          </Sider>

          <Content style={{ padding: '40px', background: '#f5f5f5' }}>
            {selectedProduct ? (
              <ProductDetailPage
                product={selectedProduct}
                onBack={() => setSelectedProduct(null)}
              />
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {products.map((product, index) => (
                  <ShopeeProductCard
                    key={index}
                    product={product}
                    onClick={() =>
                      navigate(`/product/detail?Id=${product.Id}`, {
                        state: product,
                      })
                    }
                  />
                ))}
              </div>
            )}
          </Content>
        </Layout>

        <AllProductFooter />
      </>
    );
  };
  const MobileLayout = () => {
    const scrollRef = useRef();
    const scroll = (direction) => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -300 : 300,
          behavior: 'smooth',
        });
      }
    };
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
    ];
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
              {/* <div
                style={{
                  // height: 360,
                  backgroundColor: 'white',
                  // marginTop: 10,
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
                </div>
              </div> */}
              <div
                style={{
                  // height: 540,
                  backgroundColor: 'white',
                  // marginTop: 10,
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
                    <span style={{ color: 'white' }}>{danhmuc}</span>
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
                  <AllProductContentMobile2 productsCate={products} />
                </div>
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
      {isDesktop && <DesktopLayOut />}
      {isMobile && <MobileLayout />}
    </div>
  );
};

export default AllProductContent;
