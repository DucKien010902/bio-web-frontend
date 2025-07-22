// TypingInput.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Input } from 'antd';
import './content.css';
import { SearchOutlined } from '@ant-design/icons';

const TypingInput = () => {
  const [placeholder, setPlaceholder] = useState('');
  const fullText = useRef('Tìm kiếm dịch vụ xét nghiệm');
  const indexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const type = () => {
      const text = fullText.current;
      const i = indexRef.current;
      const isDeleting = isDeletingRef.current;

      if (!isDeleting) {
        setPlaceholder(text.substring(0, i + 1));
        indexRef.current += 1;
        if (indexRef.current === text.length) {
          isDeletingRef.current = true;
          timeoutRef.current = setTimeout(type, 1500);
          return;
        }
      } else {
        setPlaceholder(text.substring(0, i - 1));
        indexRef.current -= 1;
        if (indexRef.current === 0) {
          isDeletingRef.current = false;
        }
      }

      timeoutRef.current = setTimeout(type, 100);
    };

    type();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <Input
      placeholder={placeholder}
      prefix={<SearchOutlined style={{ color: 'gray', marginRight: 8 }} />}
      size="large"
      className="search-input-custom responsive-input"
    />
  );
};

export default TypingInput;
