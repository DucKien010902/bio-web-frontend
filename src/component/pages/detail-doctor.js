import { RightOutlined } from '@ant-design/icons';
import { Card, Col, Divider, List, Row, Tag, Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;

const DoctorProfile = () => {
  const doctor = {
    name: 'BS.CKI. Đỗ Đăng Khoa',
    specialty: 'Tim Mạch',
    treatment:
      'BS Đỗ Đăng Khoa là Bác sĩ chuyên ngành Nội tim mạch – Tim mạch can thiệp.',
    price: '200.000đ',
    schedule: 'Hẹn khám',
    description: `BS Đỗ Đăng Khoa là Bác sĩ chuyên ngành Nội tim mạch – Tim mạch can thiệp.
    Bên cạnh đó, Bác sĩ Đỗ Đăng Khoa còn là đồng tác giả của nhiều bài báo Y khoa cũng như xuất bản các chương sách quốc tế cùng các đồng nghiệp trên thế giới.
    Ngoài ra, bác sĩ hiện đang là cố vấn chuyên môn cho một số phòng khám về tim mạch và đái tháo đường, đồng thời được mời tham gia giảng dạy tại trường đào tạo trực tuyến PIVIE luyện thi Y khoa sau đại học.`,
    training: [
      '2015 - 2021: Tốt nghiệp bác sĩ đa khoa Trường Đại học Y khoa Phạm Ngọc Thạch',
      '2021 - 2024: Tốt nghiệp bác sĩ Nội trú Nội tổng quát Trường Đại học Y khoa Phạm Ngọc Thạch',
      'Các chứng chỉ: điện tâm đồ, holter điện tâm đồ, siêu âm tim, đặt máy tạo nhịp tim, suy tim, phương pháp dạy học lâm sàng, quản lý suy tim, đái tháo đường.',
    ],
    work: [
      '2021 - 2024: Bác sĩ Nội trú tại Bệnh viện Nhân dân Gia Định',
      '2024 - nay: Bác sĩ điều trị tại Bệnh viện Quân Y 175',
    ],
    associations: [
      'Hội tim mạch học Việt Nam',
      'Liên chi Hội Đái tháo đường và Nội tiết TP.HCM',
    ],
  };

  return (
    <div
      style={{
        backgroundColor: '#e8f4fd',
        minHeight: '100vh',
        padding: '24px 13%',
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>
        Y tế
        <RightOutlined style={{ fontSize: 11, margin: '0 5px' }} />
        Bác sĩ
        <RightOutlined style={{ fontSize: 11, margin: '0 5px' }} />
        <span style={{ color: '#11a2f3' }}>BS.CKI. Đỗ Đăng Khoa</span>
      </div>

      <Row gutter={[24, 24]}>
        {/* Card thông tin bác sĩ */}
        <Col span={24}>
          <Card style={{ borderRadius: 12 }}>
            <Row gutter={16} align="middle">
              <Col xs={24} md={6}>
                <img
                  src="https://cdn.medpro.vn/prod-partner/20af7575-df2e-4224-b40d-36055b476ba6-do-dang-khoa.webp?w=1920&q=75"
                  alt="doctor"
                  style={{ width: '100%', borderRadius: 12 }}
                />
              </Col>
              <Col xs={24} md={18}>
                <Title level={3} style={{ color: '#11a2f3', marginBottom: 16 }}>
                  {doctor.name}
                </Title>

                <div style={{ lineHeight: 2.2 }}>
                  <Row align="middle">
                    <Col span={4}>
                      <Text strong style={{ fontSize: 18 }}>
                        Chuyên khoa:
                      </Text>
                    </Col>
                    <Col span={20} style={{ fontSize: 18 }}>
                      {doctor.specialty}
                    </Col>
                  </Row>

                  <Row align="middle">
                    <Col span={4}>
                      <Text strong style={{ fontSize: 18 }}>
                        Chuyên trị:
                      </Text>
                    </Col>
                    <Col span={20} style={{ fontSize: 18 }}>
                      {doctor.treatment}
                    </Col>
                  </Row>

                  <Row align="middle">
                    <Col span={4}>
                      <Text strong style={{ fontSize: 18 }}>
                        Giá khám:
                      </Text>
                    </Col>
                    <Col span={20}>
                      <Tag
                        color="blue"
                        style={{
                          fontSize: 16,
                          padding: '4px 12px',
                          height: 'auto',
                          display: 'inline-flex',
                          alignItems: 'center',
                        }}
                      >
                        {doctor.price}
                      </Tag>
                    </Col>
                  </Row>

                  <Row align="middle">
                    <Col span={4}>
                      <Text strong style={{ fontSize: 18 }}>
                        Lịch khám:
                      </Text>
                    </Col>
                    <Col span={20} style={{ fontSize: 18 }}>
                      {doctor.schedule}
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Giới thiệu */}
        <Col span={24}>
          <Card style={{ borderRadius: 12 }}>
            <Title level={4} style={{ color: '#1890ff', fontSize: 24 }}>
              Giới thiệu
            </Title>
            <Paragraph style={{ fontSize: 16, lineHeight: 2 }}>
              {doctor.description}
            </Paragraph>
          </Card>
        </Col>

        {/* Quá trình đào tạo */}
        <Col span={24}>
          <Card style={{ borderRadius: 12 }}>
            <Title level={4} style={{ fontSize: 24, color: '#11a2f3' }}>
              Quá trình Đào tạo
            </Title>
            <List
              dataSource={doctor.training}
              renderItem={(item) => (
                <List.Item style={{ fontSize: 16 }}>- {item}</List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Quá trình công tác */}
        <Col span={24}>
          <Card style={{ borderRadius: 12 }}>
            <Title level={4} style={{ fontSize: 24, color: '#11a2f3' }}>
              Quá trình Công tác
            </Title>
            <List
              dataSource={doctor.work}
              renderItem={(item) => (
                <List.Item style={{ fontSize: 16 }}>- {item}</List.Item>
              )}
            />
            <Divider />
            <Paragraph style={{ fontSize: 16 }}>
              Bác sĩ Đỗ Đăng Khoa là thành viên tích cực của cộng đồng y khoa,
              đồng thời là thành viên của các tổ chức:
            </Paragraph>
            <List
              dataSource={doctor.associations}
              renderItem={(item) => (
                <List.Item style={{ fontSize: 16 }}>- {item}</List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DoctorProfile;
