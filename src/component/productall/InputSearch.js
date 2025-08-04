import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './InputSearch.css'; // 👈 Thêm file CSS riêng

const AnimatedSearch = () => {
  const [placeholder, setPlaceholder] = useState('');
  const fullText = 'Tìm kiếm sản phẩm';
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleSearch = () => {
    if (textSearch.trim()) {
      navigate(
        `/san-pham/tim-kiem?key=${encodeURIComponent(textSearch.trim())}`
      );
    }
  };

  return (
    <div className="shopee-search-bar">
      <Input
        placeholder={placeholder || ' '}
        size="large"
        value={textSearch}
        onChange={(e) => setTextSearch(e.target.value)}
        onPressEnter={handleSearch}
        className="shopee-search-input"
      />
      <Button
        type="primary"
        icon={<SearchOutlined />}
        size="large"
        className="shopee-search-btn"
        onClick={handleSearch}
      />
    </div>
  );
};

export default AnimatedSearch;
