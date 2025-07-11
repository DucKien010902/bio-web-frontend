import React, { useState, useEffect } from 'react';
import { Layout, Menu, Checkbox, Input, Button, Divider } from 'antd';
import ProductDetailPage from './productdetail';
import ShopeeProductCard from './productcard';
import axiosClient from '../../api/apiConfig';
import { useNavigate } from 'react-router-dom';
const { Sider, Content } = Layout;

const AllProductContent2 = () => {
  const [inputMinPrice, setInputMinPrice] = useState('');
  const [inputMaxPrice, setInputMaxPrice] = useState('');
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [allproducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState('products'); // 'products' | 'cart' | 'checkout' | 'history'
  const [productsInvoice, setProductsInvoice] = useState([]);
  const fetchAllProducts = async () => {
    try {
      const res = await axiosClient.get('/product/getallproducts');
      setAllProducts(res.data);
      const top5Products = res.data
        .sort((a, b) => b.pdCountSale - a.pdCountSale) // sắp xếp giảm dần
        .slice(0, 5); // lấy 5 sản phẩm đầu tiên

      setProducts(top5Products);
    } catch (error) {
      console.log('Không thể lấy sản phẩm');
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <>
      <Layout style={{ backgroundColor: '#f5f5f5' }}>
        <Content style={{ padding: '40px' }}>
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

export default AllProductContent2;
