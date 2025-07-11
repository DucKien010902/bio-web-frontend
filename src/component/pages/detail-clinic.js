import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  Button,
  Rate,
  Typography,
  Divider,
  List,
  Tag,
} from 'antd';
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
const { Title, Text, Paragraph } = Typography;

// const data = {
//   name: 'Trung tâm xét nghiệm GoLAB Ba Đình',
//   address: '🌏 8/24 Nguyễn Đình Khơi, Phường 4, Tân Bình, TP.HCM',
//   workingHours: '🧭 Thứ 2 - Chủ nhật (08:00 - 18:00)',
//   phone: '19002115',
//   rating: 4.5,
//   mainImage:
//     'https://res.cloudinary.com/da6f4dmql/image/upload/v1746699745/tjigguitv8ujbec9avil.jpg',
//   introTitle: 'Giới thiệu chung về Trung tâm xét nghiệm Gentis',
//   introBulletPoints: [
//     'Gentis là đơn vị uy tín trong xét nghiệm gen tại Việt Nam.',
//     'Thành lập ngày 26/10/2010, là thành viên của Eurofins toàn cầu.',
//     'Hơn 200.000 khách hàng đã sử dụng dịch vụ.',
//     'Sở hữu Lab tại TP.HCM và Hà Nội, đạt chứng chỉ ISO 9001:2015.',
//     'Gentis là đơn vị uy tín trong xét nghiệm gen tại Việt Nam.',
//     'Thành lập ngày 26/10/2010, là thành viên của Eurofins toàn cầu.',
//     'Hơn 200.000 khách hàng đã sử dụng dịch vụ.',
//     'Sở hữu Lab tại TP.HCM và Hà Nội, đạt chứng chỉ ISO 9001:2015.',
//     'Gentis là đơn vị uy tín trong xét nghiệm gen tại Việt Nam.',
//     'Thành lập ngày 26/10/2010, là thành viên của Eurofins toàn cầu.',
//     'Hơn 200.000 khách hàng đã sử dụng dịch vụ.',
//     'Sở hữu Lab tại TP.HCM và Hà Nội, đạt chứng chỉ ISO 9001:2015.',
//   ],
//   descriptions:
//     'Là đơn vị uy tín trong xét nghiệm gen tại Việt Nam có công nghệ hàng đầu trong lĩnh vực ứng dụng phân tích gen, xét nghiệm ADN.Với 2 phòng Lab lớn tại TP.HCM và Hà Nội được thực hiện bởi TS,ThS, KTV giàu kinh nghiệm.',
//   branches: [
//     {
//       city: 'Hà Nội',
//       address: '🌏 Tầng 3, TTTM V+, 505 Minh Khai, Hai Bà Trưng',
//     },
//     { city: 'TP.HCM', address: '🌏 8/24 Nguyễn Đình Khơi, Tân Bình, TP.HCM' },
//   ],
//   mapEmbedUrl:
//     'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.089557632273!2d105.79287207476929!3d21.029102287767756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab45e68f9873%3A0x7a276fdeb40e18dd!2zMjggUC4gVGjDoG5oIFRow6FpLCBE4buLY2ggVuG7jW5nLCBD4bqndSBHaeG6pXksIEjDoCBO4buZaSAxMDAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1747816136063!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
// };

const DetailClinic = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const ID = queryParams.get('ID');
  const [data, setData] = useState([]);
  const [dataService, setDataService] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadClinics = async () => {
      try {
        const dataClinic = localStorage.getItem('allclinics');
        const dataService = localStorage.getItem('alltests');
        if (dataClinic) {
          const parsedClinic = JSON.parse(dataClinic);
          const parsedService = JSON.parse(dataService);
          const formattedClinic = parsedClinic.find(
            (clinic) => clinic.ID === ID
          );
          const dataNameService = formattedClinic.listService
            .map((code) => {
              for (const service of parsedService) {
                const found = service.packages.find((pkg) => pkg.code === code);
                if (found) return found.name;
              }
              return null; // hoặc 'Không tìm thấy'
            })
            .filter(Boolean); // lọc bỏ null nếu cần
          setDataService(dataNameService);
          setData(formattedClinic);
          // console.log(formattedClinic.rating);
        }
      } catch (error) {
        console.error('Lỗi khi đọc dữ liệu clinic từ localStorage:', error);
      }
    };

    loadClinics();
  }, [ID]);
  if (!data) {
    return <div>Đang tải dữ liệu phòng khám...</div>;
  }
  return (
    <div style={{ padding: '40px 160px', background: '#f0f7fc' }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card
            bordered={false}
            style={{ borderRadius: 20, height: '100%' }}
            bodyStyle={{ padding: 24 }}
          >
            <img
              src={data.mainImage}
              alt="Logo"
              style={{
                width: '100%',
                height: 180,
                objectFit: 'cover',
                borderRadius: 12,
                marginBottom: 16,
              }}
            />
            <Title
              level={4}
              style={{ textAlign: 'center', fontWeight: 700, color: '#00b5f1' }}
            >
              {data.name}
            </Title>
            <div style={{ textAlign: 'center' }}>
              <Rate
                disabled
                value={data.rating}
                allowHalf
                style={{ color: '#f7c860' }}
              />
            </div>

            <Divider />
            <p>{data.address}</p>
            <p>{data.workingHours}</p>
            <p>📞 Tổng đài: {data.phone}</p>
            <Button
              type="primary"
              block
              style={{
                marginTop: 12,
                borderRadius: 20,
                height: 40,
                fontSize: 16,
                fontWeight: 500,
                backgroundColor: '#00e0ff',
              }}
              onClick={() => {
                navigate(`/mainbio/dat-lich-xet-nghiem?ID=${ID}`);
              }}
            >
              Đặt khám ngay
            </Button>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card
            bordered={false}
            style={{ borderRadius: 20, height: 500 }}
            cover={
              <img
                alt="Phòng xét nghiệm"
                src={data.mainImage}
                style={{
                  borderRadius: 20,
                  height: 500,
                  objectFit: 'cover',
                }}
              />
            }
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} md={8}>
          <Card
            bordered={false}
            style={{ borderRadius: 20, height: 250 }}
            bodyStyle={{ padding: 0 }}
          >
            <img
              src={data.mainImage}
              alt="Logo"
              style={{
                width: '100%',
                height: 250,
                objectFit: 'cover',
                borderRadius: 12,
                marginBottom: 16,
              }}
            />
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card
            bordered={false}
            style={{
              borderRadius: 20,
              padding: 0,
              // background: '#f0fbff', // nhẹ nhàng nền xanh dương nhạt
              minHeight: 250,
            }}
            title={
              <h2
                style={{
                  color: '#00b5f1',
                  marginBottom: 0,
                  marginTop: 0,
                  textAlign: 'start',
                }}
              >
                Dịch vụ xét nghiệm
              </h2>
            }
          >
            <List
              dataSource={dataService || []}
              renderItem={(item) => (
                <List.Item
                  style={{
                    padding: '8px 0',
                    borderBottom: '1px dashed #e0e0e0',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'left',
                      gap: 8,
                    }}
                  >
                    <Tag color="blue" style={{ margin: 0 }}>
                      ✔
                    </Tag>
                    <span
                      style={{
                        fontSize: 16,
                        color: '#783185',
                        fontWeight: 600,
                        marginLeft: 20,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
        {/* CỘT TRÁI: 2 card tách biệt */}
        <Col xs={24} md={8}>
          {/* Card mô tả */}
          <Card
            bordered={false}
            style={{ borderRadius: 20, marginBottom: 24 }}
            bodyStyle={{ padding: 24 }}
          >
            <Title level={5}>Mô tả</Title>
            <Paragraph>{data.descriptions}</Paragraph>
          </Card>

          {/* Card bản đồ */}
          <Card
            bordered={false}
            style={{ borderRadius: 20 }}
            bodyStyle={{ padding: 0 }}
          >
            <iframe
              title="Map"
              src={data.mapEmbedUrl}
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: 12 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Card>
        </Col>

        {/* CỘT PHẢI: Card cuộn được khi nhiều nội dung */}
        <Col xs={24} md={16}>
          <Card
            bordered={false}
            style={{
              borderRadius: 20,
              maxHeight: 660,
              overflowY: 'auto',
            }}
            bodyStyle={{ padding: 24 }}
          >
            <Title level={4}>{data.introTitle}</Title>
            {Array.isArray(data.introBulletPoints) &&
            data.introBulletPoints.length > 0 ? (
              <ul style={{ paddingLeft: 20 }}>
                {data.introBulletPoints.map((point, index) => (
                  <li key={index} style={{ marginBottom: 8 }}>
                    <Text>{point}</Text>
                  </li>
                ))}
              </ul>
            ) : (
              <Text>Không có thông tin giới thiệu.</Text>
            )}

            <Divider />
            {Array.isArray(data.branches) && data.branches.length > 0 ? (
              data.branches.map((branch, index) => (
                <div key={index} style={{ marginBottom: 8 }}>
                  <Text strong>Cơ sở tại {branch.city}:</Text>
                  <p>{branch.address}</p>
                </div>
              ))
            ) : (
              <Text>Không có thông tin chi nhánh.</Text>
            )}

            <img
              src={data.mainImage}
              alt="Ảnh phòng lab"
              style={{
                width: '100%',
                height: 250,
                objectFit: 'cover',
                borderRadius: 12,
                marginTop: 16,
              }}
            />
            {/* Có thể thêm nội dung khác ở đây nếu muốn dài hơn để test scroll */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DetailClinic;
