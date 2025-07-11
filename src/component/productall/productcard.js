import React from 'react';
import { FaStar } from 'react-icons/fa';

const ShopeeProductCard = ({ product, onClick }) => {
  return (
    <div className="product-card-wrapper">
      <div className="product-card" onClick={onClick}>
        <div style={{ position: 'relative' }}>
          <img
            src={product.pdImage}
            alt={product.pdName}
            style={{
              width: '100%',
              height: 200,
              objectFit: 'cover',
              display: 'block',
            }}
          />
          {product.isFavorite && (
            <div
              style={{
                position: 'absolute',
                top: 8,
                left: 8,
                backgroundColor: '#ee4d2d',
                color: '#fff',
                padding: '2px 6px',
                fontSize: 12,
                borderRadius: 2,
                fontWeight: 'bold',
              }}
            >
              Yêu thích
            </div>
          )}
        </div>

        <div style={{ padding: '10px' }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              height: 40,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: '20px',
            }}
          >
            {product.pdName}
          </div>

          <div
            style={{
              marginTop: 6,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ color: '#ee4d2d', fontWeight: 600, fontSize: 16 }}>
              {Math.floor(product.pdPrice * (1 - product.pdVouncher / 100))}

              <span style={{ color: '#ee4d2d' }}>.000₫</span>
            </span>

            <span
              style={{
                backgroundColor: '#f59542',
                color: '#fff',
                height: 22,
                fontSize: 12,
                fontWeight: 600,
                padding: '2px 12px',
                position: 'relative',
                display: 'inline-block',
                clipPath: `
                  polygon(
                    10% 0%, 90% 0%,
                    95% 10%, 90% 20%, 95% 30%, 90% 40%, 95% 50%,
                    90% 60%, 95% 70%, 90% 80%, 95% 90%, 90% 100%,
                    10% 100%,
                    5% 90%, 10% 80%, 5% 70%, 10% 60%, 5% 50%,
                    10% 40%, 5% 30%, 10% 20%, 5% 10%, 10% 0%
                  )
                `,
              }}
            >
              Giảm {product.pdVouncher}%
            </span>
          </div>

          <div
            style={{
              fontSize: 12,
              color: '#767676',
              marginTop: 6,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <FaStar color="#faca51" size={12} />
              {product.pdStar}
            </span>
            <span>Đã bán {product.pdCountSale}</span>
          </div>

          <div
            style={{
              fontSize: 12,
              color: '#999',
              marginTop: 6,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <img
              style={{ width: 16, height: 10 }}
              src="https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.53/pc/76dff349290d20891fc1.svg"
              alt=""
            />
            {product.pdDayDelivery}
          </div>
        </div>
      </div>

      {/* Text "Xem chi tiết" nằm ngoài card và chỉ hiện khi hover card-wrapper */}
      <div className="view-detail">Xem chi tiết</div>

      {/* CSS nội tuyến trong JSX */}
      <style>
        {`
          .product-card-wrapper {
            width: 200px;
            position: relative;
            margin-bottom: 10px; /* chừa khoảng trống cho 'xem chi tiết' */
          }

          .product-card {
            background-color: #fff;
            border: 1px solid #f0f0f0;
            border-radius: 4px;
            overflow: hidden;
            cursor: pointer;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            transition: transform 0.2s, border 0.2s;
          }

          .product-card:hover {
            transform: scale(1.02);
            border: 1px solid #ee4d2d;
          }

          .view-detail {
            position: absolute;
            left: 0;
            right: 0;
            bottom: -30px;
            background-color: #ee4d2d;
            color: white;
            text-align: center;
            padding: 6px 0;
            font-size: 13px;
            font-weight: 500;
            border-radius: 4px;
            display: none;
            z-index: 100;
          }

          .product-card-wrapper:hover .view-detail {
            display: block;
          }
        `}
      </style>
    </div>
  );
};

export default ShopeeProductCard;
