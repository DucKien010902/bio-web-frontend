import React, { useState, useEffect } from 'react';
import { Layout, Menu, Checkbox, Input, Button, Divider } from 'antd';
import ProductDetailPage from './productdetail';
import ShopeeProductCard from './productcard';
import axiosClient from '../../api/apiConfig';
import { useNavigate } from 'react-router-dom';
const { Sider, Content } = Layout;

const ShopProductContent = ({ shopInfo }) => {
  const [inputMinPrice, setInputMinPrice] = useState('');
  const [inputMaxPrice, setInputMaxPrice] = useState('');
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  console.log(minPrice, maxPrice);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [allproducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const shopID = shopInfo.shopID;
  console.log(shopID + '///');
  const fetchAllProducts = async () => {
    try {
      const res = await axiosClient.get(
        `/product/fetchbyShop?shopID=${shopInfo.shopID}`
      );
      setAllProducts(res.data);
      setProducts(res.data);
      console.log(res.data);
    } catch (error) {
      console.log('Không thể lấy sản phẩm');
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <>
      <Layout>
        <Content style={{ padding: '0px', background: '#f5f5f5' }}>
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
    </>
  );
};

export default ShopProductContent;
