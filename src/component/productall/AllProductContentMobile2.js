import React, { useState, useEffect } from 'react';
import { Layout, Spin } from 'antd';
import ProductDetailPage from './productdetail';
import ShopeeProductCardMobile from './productcardMobile';
import axiosClient from '../../api/apiConfig';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const AllProductContentMobile2 = ({ productsCate }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(productsCate || []);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const fetchAllProducts = async () => {
    const startTime = Date.now();
    try {
      const res = await axiosClient.get('/product/getallproducts');
      setProducts(res.data);
    } catch (error) {
      console.log('Không thể lấy sản phẩm');
    } finally {
      const elapsed = Date.now() - startTime;
      const remaining = 500 - elapsed;
      if (remaining > 0) {
        setTimeout(() => setLoading(false), remaining);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!productsCate) {
      fetchAllProducts();
    } else {
      // Nếu có productsCate thì vẫn cần giữ spin 0.5s trước khi hiển thị
      const timer = setTimeout(() => setLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [productsCate]);

  return (
    <Layout style={{ backgroundColor: '#f5f5f5', minHeight: 300 }}>
      <Content style={{ padding: '10px' }}>
        {selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
          />
        ) : loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Spin tip="Đang tải sản phẩm..." size="large" />
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
            }}
          >
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <ShopeeProductCardMobile
                  key={index}
                  product={product}
                  onClick={() =>
                    navigate(`/san-pham/chi-tiet?Id=${product.Id}`, {
                      state: product,
                    })
                  }
                />
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                Chưa có sản phẩm nào
              </div>
            )}
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default AllProductContentMobile2;
