import React, { useState, useRef, useEffect } from 'react';
import {
  Avatar,
  Button,
  Tabs,
  Input,
  Card,
  Dropdown,
  Menu,
  Row,
  Col,
  Space,
  Typography,
  Divider,
  message,
  Modal,
} from 'antd';
import {
  DownOutlined,
  CameraOutlined,
  SettingOutlined,
  CaretDownFilled,
} from '@ant-design/icons';
import axiosClient from '../../api/apiConfig';
import AboutSection from './aboutsection';
const { Title, Text } = Typography;

const menu = (
  <Menu>
    <Menu.Item key="checkin">📍 Check-in</Menu.Item>
    <Menu.Item key="sport">⚽ Thể thao</Menu.Item>
    <Menu.Item key="music">🎵 Âm nhạc</Menu.Item>
    <Menu.Item key="movie">🎬 Phim</Menu.Item>
    <Menu.Item key="book">📚 Sách</Menu.Item>
  </Menu>
);

const tabItems = [
  {
    key: 'posts',
    label: 'Bài viết',
    children: <div>Bài viết sẽ hiển thị ở đây</div>,
  },
  { key: 'about', label: 'Giới thiệu', children: <AboutSection /> },
  //   { key: 'friends', label: 'Bạn bè', children: <FriendTab /> },
  { key: 'photos', label: 'Ảnh', children: <div>Ảnh của bạn</div> },
  { key: 'videos', label: 'Video', children: <div>Video của bạn</div> },
  { key: 'reels', label: 'Reels', children: <div>Reels</div> },
];

const ProfilePage = () => {
  const [avatarUrl, setAvatarUrl] = useState();
  const [coverUrl, setCoverUrl] = useState();
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const phoneNumber = localStorage.getItem('phoneNumber');
  const [fullName, setFullName] = useState(null);
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const fetchInfo = async () => {
    try {
      const profileInfo = JSON.parse(localStorage.getItem('user'));

      setAvatarUrl(profileInfo.avatarImage);
      setCoverUrl(profileInfo.coverImage);
      setFullName(profileInfo.fullName);
    } catch (error) {
      console.log('Khong the lay Info');
    }
  };

  const postImage = async (type, imageUrl) => {
    try {
      await axiosClient.post('/users/updateImage', {
        phoneNumber,
        type,
        base64: imageUrl,
      });
    } catch (error) {
      message.error('Không thể cập nhật ảnh');
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'DucKien');

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/da6f4dmql/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await res.json();
      console.log(data.secure_url);
      message.success('Up len Cloud thanh cong');
      return data.secure_url; // link ảnh
    } catch (err) {
      console.error('Upload thất bại', err);
      message.error('Không thể tải ảnh lên Cloudinary');
      return null;
    }
  };

  const confirmImageChange = (file, type, setImageUrl) => {
    const previewURL = URL.createObjectURL(file);

    Modal.confirm({
      title: 'Xác nhận thay đổi ảnh',
      content: 'Bạn có chắc muốn thay ảnh này không?',
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const cloudUrl = await uploadToCloudinary(file);
          if (cloudUrl) {
            setImageUrl(cloudUrl);
            await postImage(type, cloudUrl);
            message.success('Ảnh đã được cập nhật');
          }
        } catch (error) {
          message.error('Không thể cập nhật ảnh');
        }
      },
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      confirmImageChange(file, 'avatarImage', setAvatarUrl);
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      confirmImageChange(file, 'coverImage', setCoverUrl);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div style={{ backgroundColor: '#f0f2f5', padding: '5px 0' }}>
      {/* Ảnh bìa */}
      <div
        style={{
          width: '90%',
          position: 'relative',
          height: 400,
          // width: ,
          margin: '0 auto 0',
          borderRadius: 8,
          overflow: 'hidden',
          backgroundImage: `url("${coverUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={coverInputRef}
          onChange={handleCoverChange}
        />
        <Button
          shape="round"
          icon={<CameraOutlined />}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 120,
            backgroundColor: '#fff',
            borderColor: '#ccc',
            fontWeight: 600,
          }}
          onClick={() => coverInputRef.current.click()}
        >
          Thêm ảnh bìa
        </Button>
      </div>

      {/* Nội dung chính */}
      <div style={{ width: '80%', maxWidth: 1100, margin: 'auto' }}>
        {/* Thông tin cá nhân */}
        <Card
          style={{
            marginBottom: 16,
            borderRadius: 10,
            background: '#fff',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          <Row gutter={24} align="middle">
            <Col span={4} style={{ position: 'relative' }}>
              <Avatar
                size={180}
                src={avatarUrl}
                style={{
                  marginTop: -80,
                  border: '4px solid white',
                  backgroundColor: '#ccc',
                }}
              />
              {/* Biểu tượng camera ở góc dưới bên phải */}
              <div
                style={{
                  position: 'absolute',
                  bottom: -10,
                  left: 100,
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  border: '1px solid #ccc',
                  padding: 6,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                }}
                onClick={() => avatarInputRef.current.click()}
              >
                <CameraOutlined style={{ fontSize: 16, color: '#000' }} />
              </div>
              <input
                type="file"
                accept="image/*"
                ref={avatarInputRef}
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
            </Col>

            <Col span={11} style={{ paddingLeft: 30 }}>
              <Title
                level={3}
                style={{ marginBottom: 4, fontWeight: 700, fontSize: '27px' }}
              >
                {fullName}
              </Title>
              <Text type="secondary" style={{ fontSize: 15, fontWeight: 500 }}>
                1000 người bạn
              </Text>
            </Col>
            <Col span={9} style={{ textAlign: 'right' }}>
              <Space wrap>
                <Button type="primary" style={{ fontWeight: 600 }}>
                  + Thêm vào tin
                </Button>
                <Button icon={<SettingOutlined />} style={{ fontWeight: 600 }}>
                  Chỉnh sửa trang cá nhân
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Tabs */}
        <Card style={{ borderRadius: 10 }}>
          <Tabs
            defaultActiveKey="about"
            items={tabItems}
            tabBarExtraContent={{
              right: (
                <Dropdown overlay={menu}>
                  <div
                    onClick={(e) => e.preventDefault()}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '6px 12px',
                      borderRadius: 6,
                      backgroundColor: '#f0f2f5',
                      color: '#050505',
                      fontWeight: 500,
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                  >
                    Xem thêm{' '}
                    <CaretDownFilled style={{ marginLeft: 6, fontSize: 12 }} />
                  </div>
                </Dropdown>
              ),
            }}
          />
        </Card>

        {/* Nhập bài viết */}
        <Card style={{ marginTop: 16, borderRadius: 10 }}>
          <Row gutter={16}>
            <Col span={2} style={{ paddingLeft: 20 }}>
              <Avatar size={50} src={avatarUrl} />
            </Col>
            <Col span={22}>
              <Input.TextArea
                placeholder="Bạn đang nghĩ gì?"
                autoSize={{ minRows: 2, maxRows: 5 }}
                style={{
                  marginBottom: 12,
                  borderRadius: 20,
                  backgroundColor: '#eeedf0',
                  paddingTop: 16,
                  fontWeight: 700,
                  fontSize: 15,
                  color: '#333',
                }}
              />
              <Divider style={{ margin: '12px 0' }} />
              <Space>
                <Button>📹 Video trực tiếp</Button>
                <Button>🖼️ Ảnh/video</Button>
                <Button>🎉 Sự kiện trong đời</Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Bài viết */}
        <Card
          title="Bài viết của bạn"
          style={{ marginTop: 16, borderRadius: 10 }}
        >
          <Card type="inner" title="Bài viết 1">
            Nội dung bài viết...
          </Card>
          <Card type="inner" title="Bài viết 2" style={{ marginTop: 16 }}>
            Nội dung bài viết khác...
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
