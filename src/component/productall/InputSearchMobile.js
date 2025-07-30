import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const AnimatedSearchMobile = () => {
  const [placeholder, setPlaceholder] = useState('');
  const fullText = 'Tìm kiếm sản phẩm';
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy từ khóa từ URL khi component mount hoặc URL thay đổi
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const key = params.get('key') || '';
    setTextSearch(key);
  }, [location]);

  useEffect(() => {
    const speed = isDeleting ? 80 : 150;
    const timer = setTimeout(() => {
      const updatedIndex = isDeleting ? index - 1 : index + 1;
      setPlaceholder(fullText.substring(0, updatedIndex));
      setIndex(updatedIndex);

      if (!isDeleting && updatedIndex === fullText.length) {
        setTimeout(() => setIsDeleting(true), 800);
      } else if (isDeleting && updatedIndex === 0) {
        setIsDeleting(false);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [index, isDeleting]);

  const handleSearch = (value) => {
    if (value.trim()) {
      navigate(`/san-pham/search?key=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <Input.Search
      placeholder={placeholder || ' '} // tránh placeholder bị nháy
      prefix={<SearchOutlined />}
      style={{
        flex: 1,
        borderRadius: 30,
        backgroundColor: 'white',
      }}
      value={textSearch}
      onChange={(e) => setTextSearch(e.target.value)}
      onSearch={handleSearch}
    />
  );
};

export default AnimatedSearchMobile;
