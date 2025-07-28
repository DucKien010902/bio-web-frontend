import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Modal, Spin, Button } from 'antd';
import Papa from 'papaparse';

const { Title, Paragraph } = Typography;

const POSTS_PER_PAGE = 9;

const PostList = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

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
            const reversed = results.data.reverse(); // Bài mới nhất nằm cuối => đảo lại
            setAllPosts(reversed);
            setVisiblePosts(reversed.slice(0, POSTS_PER_PAGE));
            setLoading(false);
          },
        });
      });
  }, []);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const nextPosts = allPosts.slice(0, nextPage * POSTS_PER_PAGE);
    setVisiblePosts(nextPosts);
    setCurrentPage(nextPage);
  };

  const openModal = (post) => setSelectedPost(post);
  const closeModal = () => setSelectedPost(null);

  return (
    <div style={{ padding: '20px 100px' }}>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <Spin size="large" tip="Đang tải dữ liệu..." />
        </div>
      ) : (
        <>
          <Row gutter={[24, 24]}>
            {visiblePosts.map((post, index) => {
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
                    onClick={() => openModal(post)}
                  >
                    <small style={{ color: '#fbae17' }}>Tin y tế</small>
                    <Title level={5} style={{ marginTop: 8 }}>
                      {post.Title}
                    </Title>
                    <Paragraph ellipsis={{ rows: 3 }}>{post.Content}</Paragraph>
                    <div style={{ color: '#1677ff', fontWeight: 500 }}>
                      Xem chi tiết →
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>

          {visiblePosts.length < allPosts.length && (
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Button onClick={handleLoadMore}>Xem thêm</Button>
            </div>
          )}
        </>
      )}

      {/* Modal hiển thị bài viết chi tiết */}
      <Modal
        open={!!selectedPost}
        onCancel={closeModal}
        footer={null}
        width={800}
        style={{ top: 40 }}
        bodyStyle={{ maxHeight: '80vh', overflowY: 'auto', padding: 24 }}
      >
        {selectedPost && (
          <>
            <img
              src={extractImageUrl(selectedPost.File)}
              alt={selectedPost.Title}
              style={{
                width: '100%',
                maxHeight: 400,
                objectFit: 'cover',
                marginBottom: 20,
                borderRadius: 8,
              }}
            />
            <Title level={3}>{selectedPost.Title}</Title>
            <Paragraph style={{ whiteSpace: 'pre-line' }}>
              {selectedPost.Content}
            </Paragraph>
          </>
        )}
      </Modal>
    </div>
  );
};

// Hàm xử lý link ảnh từ Google Drive hoặc ảnh trực tiếp
function extractImageUrl(file) {
  if (!file) return '';
  if (file.includes('vnexpress')) return file;

  const match = file.match(/\/d\/(.*?)\//);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }

  return file;
}

export default PostList;
