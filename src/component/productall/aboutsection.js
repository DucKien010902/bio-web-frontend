import React, { useEffect, useState } from 'react';
import {
  Card,
  Menu,
  Row,
  Col,
  Typography,
  Input,
  Button,
  message,
  Divider,
  Space,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axiosClient from '../../api/apiConfig';

const { Title, Text } = Typography;

const AboutSection = () => {
  const phoneNumber = localStorage.getItem('phoneNumber');
  const [selectedMenu, setSelectedMenu] = useState('overview');
  const [editField, setEditField] = useState(null);

  const [profileInfo, setProfileInfo] = useState({
    university: '',
    address: '',
    comefrom: '',
    relation: '',
    phone: phoneNumber,
    company: '',
    highschool: '',
    birthday: '',
    gender: '',
    family: '',
    bio: '',
    national: '',
    action: [],
    email: '',
  });
  const fetchInfo = async () => {
    try {
      const profileInfo = JSON.parse(localStorage.getItem('user'));
      console.log('Lay Info thanh cong');
      setProfileInfo({
        university: profileInfo.university,
        address: profileInfo.address,
        comefrom: profileInfo.comefrom,
        relation: profileInfo.relation,
        phone: phoneNumber,
        company: profileInfo.company,
        highschool: profileInfo.highschool,
        birthday: profileInfo.birthday,
        gender: profileInfo.gender,
        family: profileInfo.family,
        bio: profileInfo.bio,
        national: profileInfo.national,
        action: profileInfo.action,
        email: profileInfo.email,
      });
    } catch (error) {
      console.log('Khong the lay Info');
    }
  };
  const updateField = (field, value) => {
    setProfileInfo((prev) => ({ ...prev, [field]: value }));
  };

  const EditableText = ({ label, field }) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text>
        {label}{' '}
        {editField === field ? (
          <Input
            value={profileInfo[field]}
            onChange={(e) => updateField(field, e.target.value)}
            onBlur={() => setEditField(null)}
            autoFocus
            size="small"
          />
        ) : (
          <b>{profileInfo[field]}</b>
        )}
      </Text>
      {editField !== field && (
        <EditOutlined
          onClick={() => setEditField(field)}
          style={{ cursor: 'pointer', marginLeft: 8 }}
        />
      )}
    </div>
  );

  const renderContent = () => {
    switch (selectedMenu) {
      case 'overview':
        return (
          <Space direction="vertical" size={25} style={{ width: '100%' }}>
            <EditableText label="🎓 Từng học tại" field="university" />
            <EditableText label="🏠 Sống tại" field="address" />
            <EditableText label="📍 Đến từ" field="comefrom" />
            <EditableText label="❤️" field="relation" />
            <EditableText label="📞" field="phone" />
          </Space>
        );
      case 'work':
        return (
          <Space direction="vertical" size={25} style={{ width: '100%' }}>
            <Text>Công việc</Text>
            <EditableText label="💼 Làm việc tại" field="company" />
            <Text>Đại học</Text>
            <EditableText label="🎓 Học tại" field="university" />
            <Text>Trung học</Text>
            <EditableText label="🎓 Học tại" field="highschool" />
          </Space>
        );
      case 'places':
        return (
          <Space direction="vertical" size={25} style={{ width: '100%' }}>
            <EditableText label="🏡 Hiện sống tại" field="address" />
            <EditableText label="🌍 Quê quán" field="comefrom" />
          </Space>
        );
      case 'contact':
        return (
          <Space direction="vertical" size={25} style={{ width: '100%' }}>
            <EditableText label="📞 Số điện thoại:" field="phone" />

            <EditableText label="📧 Email:" field="email" />

            <EditableText label="🗓️ Ngày sinh:" field="birthday" />
            <EditableText label="👩‍⚖️ Giới tính:" field="gender" />
          </Space>
        );
      case 'family':
        return (
          <Space direction="vertical" size={25} style={{ width: '100%' }}>
            <EditableText label="👨" field="family" />
            <EditableText label="💙" field="relation" />
          </Space>
        );
      case 'details':
        return (
          <Space direction="vertical" size={25} style={{ width: '100%' }}>
            <EditableText label="📝 Tiểu sử:" field="bio" />
            <EditableText label="🏳️ Quốc tịch:" field="national" />
          </Space>
        );
      case 'events':
        return (
          <Space direction="vertical" size={25} style={{ width: '100%' }}>
            {profileInfo.action.map((item, index) => (
              <Text key={index}>📍 {item}</Text>
            ))}
          </Space>
        );
      default:
        return null;
    }
  };

  const handleUpdateProfile = async () => {
    try {
      console.log(profileInfo);
      const res = await axiosClient.post('/users/updateaccount', profileInfo);
      message.success('Cap nhat thanh cong');
    } catch (err) {
      message.error('Khong the update');
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);
  return (
    <Row gutter={24} style={{ padding: 24 }}>
      <Col span={8}>
        <Card
          bordered={false}
          style={{ borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
        >
          <Title level={5}>Giới thiệu</Title>
          <Menu
            mode="inline"
            selectedKeys={[selectedMenu]}
            onClick={(e) => setSelectedMenu(e.key)}
            items={[
              { key: 'overview', label: 'Tổng quan' },
              { key: 'work', label: 'Công việc và học vấn' },
              { key: 'places', label: 'Nơi từng sống' },
              { key: 'contact', label: 'Thông tin liên hệ và cơ bản' },
              { key: 'family', label: 'Gia đình và các mối quan hệ' },
              { key: 'details', label: 'Chi tiết về bạn' },
              { key: 'events', label: 'Sự kiện trong đời' },
            ]}
          />
        </Card>
      </Col>
      <Col span={16}>
        <Card
          title={
            {
              overview: 'Tổng quan',
              work: 'Công việc và học vấn',
              places: 'Nơi từng sống',
              contact: 'Thông tin liên hệ và cơ bản',
              family: 'Gia đình và các mối quan hệ',
              details: 'Chi tiết về bạn',
              events: 'Sự kiện trong đời',
            }[selectedMenu]
          }
          bordered={false}
          style={{ borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
        >
          {renderContent()}
          <Divider />
          <Button type="primary" onClick={handleUpdateProfile}>
            Cập nhật
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default AboutSection;
