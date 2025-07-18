import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const AnimatedSearch = () => {
  const [placeholder, setPlaceholder] = useState('');
  const fullText = 'Tìm kiếm sản phẩm';
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const speed = isDeleting ? 80 : 150;

    const timer = setTimeout(() => {
      const updatedIndex = isDeleting ? index - 1 : index + 1;
      setPlaceholder(fullText.substring(0, updatedIndex));
      setIndex(updatedIndex);

      if (!isDeleting && updatedIndex === fullText.length) {
        setTimeout(() => setIsDeleting(true), 800); // chờ trước khi xóa
      } else if (isDeleting && updatedIndex === 0) {
        setIsDeleting(false);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [index, isDeleting]);

  return (
    <Input.Search
      placeholder={placeholder || ' '} // tránh placeholder bị nháy
      enterButton={<SearchOutlined />}
      style={{ flex: 10, border: 'none' }}
      size="large"
      onChange={(e) => console.log(e.target.value)}
    />
  );
};

export default AnimatedSearch;
