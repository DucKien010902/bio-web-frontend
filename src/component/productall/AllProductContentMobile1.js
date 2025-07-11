import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import ProductDetailPage from './productdetail';
import ShopeeProductCardMobile from './productcardMobile';
import axiosClient from '../../api/apiConfig';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const AllProductContent1 = () => {
  const [products, setProducts] = useState([]);
  const [allproducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const fetchAllProducts = async () => {
    try {
      const res = await axiosClient.get('/product/getallproducts');
      setAllProducts(res.data);
      const top5Products = res.data;
      // .sort((a, b) => b.pdCountSale - a.pdCountSale)
      // .slice(0, 5);
      setProducts(top5Products);
    } catch (error) {
      console.log('Không thể lấy sản phẩm');
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <Layout style={{ backgroundColor: '#f5f5f5' }}>
      <Content style={{ padding: '16px' }}>
        {selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
          />
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
            }}
          >
            {products.map((product, index) => (
              <ShopeeProductCardMobile
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
  );
};

export default AllProductContent1;
