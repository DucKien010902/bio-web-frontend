import React from 'react';
import { UpOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <FloatButton
      icon={<UpOutlined />}
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        right: 12,
        bottom: 72,
        zIndex: 1000,
      }}
    />
  );
};

export default ScrollToTopButton;
