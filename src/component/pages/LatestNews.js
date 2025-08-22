import { Card, Col, Modal, Row, Spin } from 'antd';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const sheetUrl =
  'https://docs.google.com/spreadsheets/d/1Ia20k0PhB7fDFVx1xW46MZyzs3dBUBIZwM_DsEepmLA/gviz/tq?tqx=out:csv&gid=0';

const LatestNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 797 });

  useEffect(() => {
    fetch(sheetUrl)
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const reversed = results.data.reverse();

            // Lấy 3 bài mới nhất
            const latest3 = isMobile
              ? reversed.slice(0, 1).map((row) => ({
                  id: row.postid,
                  title: row.Title,
                  image: extractImageUrl(row.File),
                  content: row.Content,
                  voice: row.Voice,
                }))
              : reversed.slice(0, 3).map((row) => ({
                  id: row.postid,
                  title: row.Title,
                  image: extractImageUrl(row.File),
                  content: row.Content,
                  voice: row.Voice,
                }));

            setNewsList(latest3);
            setLoading(false);
          },
        });
      });
  }, []);

  const openModal = (news) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 40 }}>
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  return (
    <>
      <Row
        gutter={[32, 32]}
        style={{
          padding: isMobile ? '2% 5%' : '2% 10%',
          paddingTop: isMobile ? 20 : 40,
          paddingBottom: isMobile ? 20 : 40,
        }}
      >
        {newsList.map((news, i) => (
          <Col xs={24} sm={12} md={8} key={news.id || i}>
            <Card
              style={{ boxShadow: '4px 2px 8px rgba(0, 191, 255, 0.4)' }}
              bodyStyle={{ padding: isMobile ? 12 : 24 }}
              hoverable
              cover={
                <img
                  alt={news.title}
                  src={news.image}
                  style={{
                    height: 180,
                    objectFit: 'cover',
                  }}
                />
              }
              onClick={() => openModal(news)}
            >
              {/* Title - fix 2 dòng */}
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  marginTop: 8,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: '1.5em',
                  height: '3em', // 2 dòng
                }}
              >
                {news.title}
              </div>

              {/* Content - fix 4 dòng */}
              <div
                style={{
                  marginTop: 8,
                  color: '#555',
                  fontSize: 14,
                  display: '-webkit-box',
                  WebkitLineClamp: isMobile ? 6 : 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: '1.5em',
                  height: isMobile ? '9em' : '6em', // 4 dòng
                }}
              >
                {news.content}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal xem chi tiết */}
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        onOk={closeModal}
        footer={null}
        title={selectedNews?.title}
        width={isMobile ? '95%' : '55%'}
        bodyStyle={{
          maxHeight: '70vh',
          overflowY: 'auto',
          padding: isMobile ? 10 : 20,
        }}
      >
        {selectedNews && (
          <div>
            <img
              src={selectedNews.image}
              alt={selectedNews.title}
              style={{
                width: '100%',
                maxHeight: 400,
                objectFit: 'cover',
                marginBottom: 20,
                borderRadius: 8,
              }}
            />
            <div
              style={{ whiteSpace: 'pre-line', fontSize: 15, lineHeight: 1.6 }}
            >
              {selectedNews.content}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

function extractImageUrl(file) {
  if (!file) return '';
  if (file.includes('vnexpress')) return file;

  const match = file.match(/\/d\/(.*?)\//);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }

  return file;
}

export default LatestNews;
