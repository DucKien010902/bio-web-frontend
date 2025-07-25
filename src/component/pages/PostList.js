import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';

const { Title, Paragraph } = Typography;

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const sheetUrl =
      'https://docs.google.com/spreadsheets/d/1Ia20k0PhB7fDFVx1xW46MZyzs3dBUBIZwM_DsEepmLA/gviz/tq?tqx=out:csv&gid=0';

    fetch(sheetUrl)
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setPosts(results.data);
          },
        });
      });
  }, []);

  return (
    <div style={{ padding: '20px 100px ' }}>
      <Row gutter={[24, 24]}>
        {posts.map((post, index) => {
          const imageUrl = extractImageUrl(post.File);
          return (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                hoverable
                cover={
                  <img
                    alt={post.Title}
                    src={imageUrl}
                    style={{ height: 180, objectFit: 'cover' }}
                  />
                }
              >
                <small style={{ color: '#fbae17' }}>Tin y tế</small>
                <Title level={5} style={{ marginTop: 8 }}>
                  {post.Title}
                </Title>
                <Paragraph ellipsis={{ rows: 3 }}>{post.Content}</Paragraph>
                <Link to={`/post/${index}`}>Xem tiếp →</Link>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

// Hàm xử lý link Google Drive hoặc ảnh trực tiếp
function extractImageUrl(file) {
  // Nếu là ảnh VnExpress link trực tiếp, dùng luôn
  if (file.includes('vnexpress')) return file;

  // Nếu là link Google Drive kiểu /file/d/ID/view => chuyển thành link ảnh có thể nhúng
  const match = file.match(/\/d\/(.*?)\//);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }

  // fallback: dùng nguyên link
  return file;
}

export default PostList;
