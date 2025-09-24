import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  RightOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  List,
  Row,
  Tag,
  Timeline,
  Typography,
} from 'antd';
import { useEffect } from 'react';

const { Title, Paragraph, Text } = Typography;

/**
 * BloodAnalysisPage
 * - Single-file React component using Ant Design
 * - Injects CSS automatically (so you can paste this file into your project and use immediately)
 * - Recommended: ant design v5 installed in the project (npm i antd)
 * - Optional: import 'antd/dist/reset.css' in your index.js if you want AntD reset styles.
 */
export default function DetailService() {
  useEffect(() => {
    const css = `
      /* ---------- Page background & banner ---------- */
      .bp-page {
        font-family: 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial;
        min-height: 100vh;
        background-color:rgb(232, 244, 253);
        background-size: cover;
        background-position: center;
        padding: 24px 32px 80px;
      }

      .bp-inner {
        max-width: 80%;
        margin: 0 auto;
      }

      /* Banner */
      .bp-banner {
        position: relative;
        height: 360px;
        border-radius: 14px;
        overflow: hidden;
        box-shadow: 0 8px 30px rgba(12, 35, 64, 0.12);
        margin-bottom: -80px; /* lift the top card above banner */
      }

      .bp-banner::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url('https://cdn-pkh.longvan.net/prod-partner/41a44338-569d-497c-85e0-2d491d6b6fee-doctor_check_cover.png?w=1920&q=75');
        background-size: cover;
        background-position: center;
        filter: brightness(0.9) saturate(1.05);
        transform: scale(1.02);
      }

      .bp-banner .bp-banner-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, rgba(0,76,153,0.14) 0%, rgba(0,160,194,0.08) 40%, rgba(255,255,255,0.0) 100%);
      }

      .bp-banner .bp-banner-content {
        position: relative;
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        padding: 28px 36px;
      }

      .bp-title {
        color: #00a8c2;
        font-size: 34px;
        font-weight: 800;
        margin: 0;
      }

      .bp-subtitle {
        color: #0a2b4a;
        font-size: 15px;
      }

      /* Cards container (two-row look) */
      .bp-cards {
        margin-top: 28px;
        display: grid;
        grid-template-columns: 1fr 360px;
        gap: 24px;
      }

      .bp-card {
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(12, 35, 64, 0.08);
        overflow: hidden;
      }

      .bp-card .ant-card-body {
        padding: 22px !important;
        background: #fff;
      }

      .bp-top-card {
        display: block;
      }

      .bp-left-column {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .price-box {
        background: linear-gradient(180deg, #fff7f0, #fff3eb);
        border-radius: 12px;
        padding: 18px;
        text-align: center;
        font-weight: 800;
        font-size: 28px;
        color: #ff7a00;
        box-shadow: inset 0 -6px 0 rgba(255,122,0,0.06);
      }

      .cta-row {
        margin-top: 12px;
        display: flex;
        gap: 12px;
        align-items: center;
      }

      .bp-details {
        background: #fff;
        border-radius: 12px;
        padding: 18px;
      }

      .section-title {
        color: #004c99;
        font-weight: 700;
        margin-bottom: 12px;
      }

      .tests-list .ant-list-item {
        border: none;
        padding: 6px 0;
      }

      .timeline-wrap {
        padding-left: 8px;
      }

      .sidebar .app-card,
      .sidebar .consult-card {
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 16px;
      }

      .app-card img { max-width: 100%; display:block }

      .consult-button {
        width: 100%;
        margin-top: 8px;
        border-radius: 8px;
      }

      .faq-item { margin-bottom: 12px }

      /* Responsive */
      @media (max-width: 990px) {
        .bp-cards {
          grid-template-columns: 1fr;
        }

        .bp-banner { height: 200px }
        .bp-title { font-size: 26px }
      }
    `;
    const styleEl = document.createElement('style');
    styleEl.id = 'bp-styles';
    styleEl.innerHTML = css;
    document.head.appendChild(styleEl);
    return () => {
      const existing = document.getElementById('bp-styles');
      if (existing) existing.remove();
    };
  }, []);

  // sample arrays with long content
  const testsIncluded = [
    'Hemoglobin (HGB)',
    'Hematocrit (HCT)',
    'Số lượng hồng cầu (RBC)',
    'Số lượng bạch cầu (WBC) + phân bố tế bào',
    'Số lượng tiểu cầu (PLT)',
    'MCV, MCH, MCHC (chỉ số hồng cầu)',
    'RDW (độ dị tật hồng cầu)',
    'Ít gặp: tế bào bất thường (nếu có sẽ báo ngay)',
    'Phân tích tế bào máu ngoại vi tự động + đọc tay (nếu cần)',
    'Tỷ lệ bạch cầu lympho/mono/granulocyte',
  ];

  const benefits = [
    'Phát hiện sớm thiếu máu, nhiễm trùng hoặc rối loạn máu khác.',
    'Hỗ trợ phát hiện các bệnh lý ác tính máu trong giai đoạn sớm.',
    'Theo dõi đáp ứng điều trị trong các bệnh mạn tính.',
    'Xác định nguyên nhân của triệu chứng mệt mỏi, chóng mặt, chảy máu.',
  ];

  const steps = [
    'Đặt lịch: qua website, ứng dụng hoặc gọi tổng đài. Có thể chọn lấy mẫu tại nhà/đến phòng khám.',
    'Tiếp đón: đăng ký, khai báo thông tin, tư vấn tiền xét nghiệm (nếu cần).',
    'Lấy mẫu: kỹ thuật viên lấy 1 ống máu tĩnh mạch (nhanh, an toàn).',
    'Phân tích: máy phân tích tự động; mẫu bất thường được kiểm tra bằng kính hiển vi bởi kỹ thuật viên.',
    'Trả kết quả: online, in tại phòng khám hoặc tư vấn bởi bác sĩ nếu bất thường.',
  ];

  const faqs = [
    {
      q: 'Cần nhịn ăn trước khi xét nghiệm không?',
      a: 'Tổng phân tích tế bào máu thường không cần nhịn ăn. Tuy nhiên nếu kết hợp với xét nghiệm khác (mỡ máu, glucose) sẽ có yêu cầu riêng.',
    },
    {
      q: 'Kết quả trả trong bao lâu?',
      a: 'Hầu hết kết quả trả trong 4–6 tiếng; một số trường hợp có thể cần đọc tay nên trả trong 24 giờ.',
    },
    {
      q: 'Xét nghiệm có đau không?',
      a: 'Lấy máu tĩnh mạch là thủ thuật nhỏ, có thể hơi nhói trong vài giây.',
    },
  ];

  return (
    <div className="bp-page">
      <div className="bp-inner">
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>
          Y tế
          <RightOutlined style={{ fontSize: 11, margin: '0 5px' }} />
          Dịch vụ
          <RightOutlined style={{ fontSize: 11, margin: '0 5px' }} />
          <span style={{ color: '#11a2f3' }}>Tổng phân tích tế bào máu</span>
        </div>
        <div className="bp-banner">
          <div className="bp-banner-overlay" />
          <div className="bp-banner-content">
            {/* <div>
              <Title level={2} className="bp-title">
                Tổng Phân Tích Tế Bào Máu
              </Title>
              <Paragraph className="bp-subtitle">
                Dịch vụ xét nghiệm huyết học toàn diện — chẩn đoán, theo dõi và
                sàng lọc bệnh lý máu.
              </Paragraph>
            </div> */}
            {/* <div style={{ textAlign: 'right' }}>
              <div style={{ marginBottom: 8 }}>
                <Tag icon={<EnvironmentOutlined />}>
                  Doctor Check - 429 Tô Hiến Thành
                </Tag>
              </div>
              <div>
                <Tag icon={<CalendarOutlined />}>
                  Lịch khám: Thứ 2 - Chủ nhật
                </Tag>
              </div>
            </div> */}
          </div>
        </div>

        <div className="bp-cards">
          {/* LEFT: main content (two stacked cards visually) */}
          <div>
            <Card className="bp-card bp-top-card">
              <Row gutter={20} align="middle">
                <Col xs={24} md={16}>
                  <Title level={4} style={{ marginBottom: 6 }}>
                    Chi tiết gói Tổng Phân Tích Tế Bào Máu
                  </Title>
                  <Paragraph style={{ color: '#475569' }}>
                    Gói xét nghiệm <strong>Tổng phân tích tế bào máu</strong>{' '}
                    cung cấp bộ chỉ số cơ bản và nâng cao giúp bác sĩ đánh giá
                    tổng quan thể trạng, phát hiện thiếu máu, nhiễm trùng hoặc
                    các dấu hiệu bất thường của tế bào máu.
                  </Paragraph>

                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <Tag icon={<ClockCircleOutlined />}>
                      Thời gian: 4 - 24 giờ
                    </Tag>
                    <Tag icon={<SafetyCertificateOutlined />}>
                      ISO: Phòng lab đạt chuẩn
                    </Tag>
                    <Tag icon={<CheckCircleOutlined />}>Kết quả chính xác</Tag>
                  </div>

                  <div className="cta-row">
                    <Button type="primary" size="large">
                      Đặt lịch ngay
                    </Button>
                    <Button type="default" size="large">
                      Tải kết quả mẫu
                    </Button>
                  </div>
                </Col>

                <Col xs={24} md={8} style={{ textAlign: 'center' }}>
                  <div className="price-box">450.000đ</div>
                  <div style={{ marginTop: 10, color: '#6b7280' }}>
                    Bao gồm phí lấy mẫu & phân tích
                  </div>
                </Col>
              </Row>
            </Card>

            <Card className="bp-card bp-details" style={{ marginTop: 20 }}>
              <div className="bp-left-column">
                <div>
                  <div className="section-title">
                    1. Các chỉ số & test có trong gói
                  </div>
                  <List
                    dataSource={testsIncluded}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              style={{
                                background: '#e6f4ff',
                                color: '#0a56a3',
                              }}
                            >
                              🔬
                            </Avatar>
                          }
                          title={<Text strong>{item}</Text>}
                        />
                      </List.Item>
                    )}
                    className="tests-list"
                  />
                </div>

                <Divider />

                <div>
                  <div className="section-title">2. Lợi ích khi thực hiện</div>
                  <List
                    dataSource={benefits}
                    renderItem={(b) => (
                      <List.Item
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                        }}
                      >
                        <CheckCircleOutlined
                          style={{ color: '#00a8c2', marginRight: 8 }}
                        />
                        <Text>{b}</Text>
                      </List.Item>
                    )}
                  />
                </div>

                <Divider />

                <div>
                  <div className="section-title">3. Quy trình thực hiện</div>
                  <div className="timeline-wrap">
                    <Timeline mode="left">
                      {steps.map((s, i) => (
                        <Timeline.Item key={i}>{s}</Timeline.Item>
                      ))}
                    </Timeline>
                  </div>
                </div>

                <Divider />

                <div>
                  <div className="section-title">4. Thông tin thêm</div>
                  <Paragraph>
                    <strong>Chuẩn bị:</strong> Mặc thoải mái, mang theo giấy tờ
                    tùy thân, thông báo tiền sử bệnh, thuốc đang dùng.
                  </Paragraph>
                  <Paragraph>
                    <strong>Lưu ý:</strong> Nếu kết quả có bất thường, bạn sẽ
                    được tư vấn thêm và hẹn gặp bác sĩ chuyên khoa.
                  </Paragraph>
                </div>

                <Divider />

                <div>
                  <div className="section-title">
                    5. FAQ - Câu hỏi thường gặp
                  </div>
                  {faqs.map((f, idx) => (
                    <div key={idx} className="faq-item">
                      <Text strong>
                        {idx + 1}. {f.q}
                      </Text>
                      <div style={{ marginTop: 6 }}>{f.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT: sidebar */}
          <div className="sidebar">
            <Card className="bp-card app-card">
              <Title level={5} style={{ marginBottom: 6 }}>
                Tải app GenApp
              </Title>
              <Paragraph style={{ marginBottom: 12 }}>
                Đặt lịch nhanh, lưu kết quả và nhận thông báo.
              </Paragraph>
              <div className="app-stores" style={{ display: 'flex', gap: 8 }}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="google"
                  style={{ height: 40 }}
                />
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="appstore"
                  style={{ height: 40 }}
                />
              </div>
            </Card>

            <Card className="bp-card consult-card">
              <Title level={5} style={{ marginBottom: 6 }}>
                Tư vấn & Hỗ trợ
              </Title>
              <Paragraph>
                Hotline 24/7 - Nhận tư vấn bởi đội ngũ chuyên khoa huyết học.
              </Paragraph>
              <Button
                type="primary"
                icon={<PhoneOutlined />}
                className="consult-button"
              >
                Gọi ngay: 1900-1234
              </Button>
            </Card>

            <Card className="bp-card consult-card">
              <Title level={5} style={{ marginBottom: 6 }}>
                Gói liên quan
              </Title>
              <List
                dataSource={[
                  { title: 'Xét nghiệm chức năng gan:', price: '300.000đ' },
                  { title: 'Tầm soát thiếu máu và sắt:', price: '250.000đ' },
                  { title: 'Panel đánh giá viêm nhiễm:', price: '500.000đ' },
                ]}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      display: 'flex',
                      alignItems: 'center', // căn giữa dọc
                    }}
                  >
                    <Avatar
                      style={{
                        background: '#ffedd5',
                        color: '#b45309',
                        marginRight: 10,
                      }}
                    >
                      P
                    </Avatar>
                    <div
                      style={{
                        flex: 1, // title chiếm khoảng trống
                        fontSize: 13,
                        lineHeight: '20px',
                      }}
                    >
                      {item.title}
                    </div>
                    <div style={{ fontWeight: 700, marginLeft: 10 }}>
                      {item.price}
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
