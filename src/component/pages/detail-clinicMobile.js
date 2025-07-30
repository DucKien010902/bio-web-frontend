// DetailClinicMobile.jsx (Mobile-Optimized Responsive Layout)
import React, { useEffect, useState } from 'react';
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
const { Title, Text, Paragraph } = Typography;

const DetailClinicMobile = () => {
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
              return null;
            })
            .filter(Boolean);
          setDataService(dataNameService);
          setData(formattedClinic);
        }
      } catch (error) {
        console.error('Lỗi khi đọc dữ liệu clinic từ localStorage:', error);
      }
    };
    loadClinics();
  }, [ID]);

  if (!data) return <div>Đang tải dữ liệu phòng khám...</div>;

  return (
    <div style={{ padding: '24px 16px', background: '#f0f7fc' }}>
      <Card
        bordered={false}
        style={{ borderRadius: 20, marginBottom: 24 }}
        bodyStyle={{ padding: 16 }}
      >
        <img
          src={data.mainImage}
          alt="Phòng khám"
          style={{
            width: '100%',
            height: 200,
            objectFit: 'cover',
            borderRadius: 12,
            marginBottom: 12,
          }}
        />
        <Title level={4} style={{ color: '#00b5f1', fontWeight: 700 }}>
          {data.name}
        </Title>
        <Rate
          disabled
          value={data.rating}
          allowHalf
          style={{ color: '#f7c860' }}
        />
        <Divider />
        <Text>{data.address}</Text>
        <br />
        <Text>{data.workingHours}</Text>
        <br />
        <Text>Tổng đài: {data.phone}</Text>
        <Button
          type="primary"
          block
          style={{
            marginTop: 16,
            borderRadius: 20,
            background: '#00e0ff',
            height: 40,
          }}
          onClick={() => navigate(`/y-te/dat-lich-xet-nghiem?ID=${ID}`)}
        >
          Đặt khám ngay
        </Button>
      </Card>

      <Card
        bordered={false}
        style={{ borderRadius: 20, marginBottom: 24 }}
        cover={
          <img
            alt="Cover"
            src={data.mainImage}
            style={{ borderRadius: 20, height: 250, objectFit: 'cover' }}
          />
        }
      />

      <Card bordered={false} style={{ borderRadius: 20, marginBottom: 24 }}>
        <Title level={5} style={{ color: '#00b5f1' }}>
          Dịch vụ xét nghiệm
        </Title>
        <List
          dataSource={dataService || []}
          renderItem={(item) => (
            <List.Item style={{ padding: '6px 0' }}>
              <Text style={{ fontWeight: 600, color: '#783185' }}>
                ✔ {item}
              </Text>
            </List.Item>
          )}
        />
      </Card>

      <Card bordered={false} style={{ borderRadius: 20, marginBottom: 24 }}>
        <Title level={5}>Mô tả</Title>
        <Paragraph>{data.descriptions}</Paragraph>
      </Card>

      <Card bordered={false} style={{ borderRadius: 20, marginBottom: 24 }}>
        <iframe
          title="Map"
          src={data.mapEmbedUrl}
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: 12 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </Card>

      <Card bordered={false} style={{ borderRadius: 20 }}>
        <Title level={4}>{data.introTitle}</Title>
        {Array.isArray(data.introBulletPoints) &&
        data.introBulletPoints.length > 0 ? (
          <ul style={{ paddingLeft: 20 }}>
            {data.introBulletPoints.map((point, index) => (
              <li key={index}>
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
            <div key={index} style={{ marginBottom: 12 }}>
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
      </Card>
    </div>
  );
};

export default DetailClinicMobile;
