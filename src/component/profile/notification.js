import { FileTextOutlined, TeamOutlined } from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Card,
  Col,
  Divider,
  Layout,
  Modal,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import axiosClient from '../../api/apiConfig';
import { setUnreadCount } from '../../redux/slices/countNoticesSlice';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function HealthNewsMobile() {
  const [allNew, setAllNew] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [query] = useState('');
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({ minWidth: 992 });

  // lấy dữ liệu từ API
  const fetchNotices = async () => {
    try {
      const res = await axiosClient.get('/notice/getall');
      setAllNew(res.data || []);
    } catch (error) {
      console.log('Không thể lấy thông báo');
    }
  };

  const formatTime = (time) => {
    if (!time) return '';
    const d = dayjs(time);
    const minutes = d.minute();
    // làm tròn về bội số gần nhất của 5
    const rounded = Math.round(minutes / 5) * 5;
    return d.minute(rounded).second(0).format('DD/MM/YYYY HH:mm');
  };

  // tính toán NEWS từ allNew
  const NEWS = useMemo(() => {
    const colors = ['blue', 'red', 'green', 'orange', 'purple', 'cyan'];
    return allNew
      .sort((a, b) => new Date(b.Time) - new Date(a.Time))
      .map((item) => ({
        id: item.postid,
        title: item.Title,
        category: 'Cộng đồng',
        time: formatTime(item.Time),
        icon: <TeamOutlined />,
        color: colors[Math.floor(Math.random() * colors.length)],
        details: item.Content,
        isViewed: item?.isViewed || false,
      }));
  }, [allNew]);

  // set newsList ban đầu từ NEWS
  useEffect(() => {
    setNewsList(NEWS);
    const unread = NEWS.filter((i) => !i.isViewed).length;
    dispatch(setUnreadCount(unread));
  }, [NEWS, dispatch]);

  // filter khi có query
  const filtered = useMemo(() => {
    if (!query) return newsList;
    const q = query.toLowerCase();
    return newsList.filter(
      (n) =>
        n.title.toLowerCase().includes(q) || n.details.toLowerCase().includes(q)
    );
  }, [query, newsList]);

  // click 1 card
  const handleCardClick = async (clickedId) => {
    setNewsList((prev) => {
      const updated = prev.map((item) =>
        item.id === clickedId ? { ...item, isViewed: true } : item
      );
      const remaining = updated.filter((i) => !i.isViewed).length;
      dispatch(setUnreadCount(remaining));
      return updated;
    });

    const clickedItem = newsList.find((i) => i.id === clickedId);
    if (clickedItem) {
      openDetail(clickedItem);
    }

    try {
      await axiosClient.post('/notice/mark-viewed', { postid: clickedId });
    } catch (error) {
      console.error('Không thể cập nhật thông báo', error);
    }
  };

  const openDetail = (item) => {
    setActiveItem(item);
    setOpen(true);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <Card
      title="Thông báo"
      bordered={false}
      style={{ borderRadius: 12 }}
      bodyStyle={{ padding: 12 }}
    >
      <Layout style={{ minHeight: '100vh', background: '#f5f7fb' }}>
        <Content
          style={{
            padding: isDesktop ? 20 : 20,
            paddingBottom: 80,
            paddingTop: 20,
          }}
        >
          <Space direction="vertical" size={12} style={{ display: 'flex' }}>
            {/* <Card
            size="small"
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            }}
          >
            <Space direction="vertical" size={6}>
              <Space size={8} align="center">
                <SafetyCertificateOutlined />
                <Text strong>Thông báo quan trọng</Text>
              </Space>
              <Paragraph style={{ margin: 0 }}>
                Cập nhật thường xuyên các khuyến cáo và lịch khám. Nhấn vào mỗi
                thẻ để xem chi tiết.
              </Paragraph>
            </Space>
          </Card> */}

            {/* News list */}
            {isDesktop ? (
              <Row gutter={[16, 16]}>
                {filtered.map((item) => (
                  <Col span={24} key={item.id}>
                    <Badge.Ribbon text={item.category} color={item.color}>
                      <Card
                        hoverable
                        onClick={() => handleCardClick(item.id)}
                        style={{
                          borderRadius: 16,
                          backgroundColor: item.isViewed
                            ? 'white'
                            : '#d7deeaff',
                        }}
                        bodyStyle={{ padding: 12 }}
                      >
                        <Space
                          align="start"
                          size={12}
                          style={{ width: '100%' }}
                        >
                          <Avatar
                            size={48}
                            style={{
                              background: '#00b5f1',
                              color: 'white',
                            }}
                            icon={item.icon}
                          />
                          <div style={{ flex: 1 }}>
                            <Title
                              level={5}
                              style={{ margin: 0, lineHeight: 1.3 }}
                            >
                              {item.title}
                            </Title>
                            <Text
                              type="secondary"
                              style={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                lineHeight: '1.6em',
                                height: '3.2em',
                                marginTop: 6,
                                color: '#696868',
                                fontSize: 15,
                                fontWeight: 400,
                              }}
                            >
                              {item.details}
                            </Text>
                            <Space size={8} wrap style={{ marginTop: 8 }}>
                              <Tag icon={<FileTextOutlined />}>
                                Tin chính thức
                              </Tag>
                              <Tag>{item.time}</Tag>
                            </Space>
                          </div>
                        </Space>
                      </Card>
                    </Badge.Ribbon>
                  </Col>
                ))}
              </Row>
            ) : (
              <Space direction="vertical" size={10} style={{ width: '100%' }}>
                {filtered.map((item) => (
                  <Badge.Ribbon
                    key={item.id}
                    text={item.category}
                    color={item.color}
                  >
                    <Card
                      hoverable
                      onClick={() => handleCardClick(item.id)}
                      style={{ borderRadius: 16 }}
                      bodyStyle={{ padding: 12 }}
                    >
                      <Space align="start" size={12} style={{ width: '100%' }}>
                        <Avatar
                          size={36}
                          style={{ background: '#f6ffed', color: '#1677ff' }}
                          icon={item.icon}
                        />
                        <div style={{ flex: 1 }}>
                          <Title
                            level={5}
                            style={{ margin: 0, lineHeight: 1.3 }}
                          >
                            {item.title}
                          </Title>
                          <Text
                            type="secondary"
                            style={{
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 2,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              marginTop: 6,
                            }}
                          >
                            {item.details}
                          </Text>
                          <Space size={8} wrap style={{ marginTop: 8 }}>
                            <Tag icon={<FileTextOutlined />}>
                              Tin chính thức
                            </Tag>
                            <Tag>{item.time}</Tag>
                          </Space>
                        </div>
                      </Space>
                    </Card>
                  </Badge.Ribbon>
                ))}
              </Space>
            )}

            <Divider style={{ margin: '12px 0' }} />
            <Text
              type="secondary"
              style={{ textAlign: 'center', display: 'block' }}
            >
              Kéo xuống để xem thêm…
            </Text>
          </Space>
        </Content>

        {/* Detail Modal */}
        <Modal
          open={open}
          onCancel={() => setOpen(false)}
          onOk={() => setOpen(false)}
          okText="Đóng"
          cancelButtonProps={{ style: { display: 'none' } }}
          title={
            <Space>
              <Avatar
                size={28}
                style={{ background: '#f6ffed', color: '#1677ff' }}
              >
                {activeItem?.icon}
              </Avatar>
              <span>{activeItem?.category}</span>
            </Space>
          }
          width={isDesktop ? '50%' : '90%'}
          styles={{
            body: {
              paddingTop: 8,
              height: isDesktop ? '300px' : 'auto',
              overflowY: 'auto',
            },
          }}
        >
          <Title level={4} style={{ marginTop: 0 }}>
            {activeItem?.title}
          </Title>
          <Tag style={{ marginBottom: 12 }}>{activeItem?.time}</Tag>
          <Paragraph>{activeItem?.details}</Paragraph>
        </Modal>
      </Layout>
    </Card>
  );
}
