///
import React, { useState, useEffect } from 'react';
import './book-calender.css';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Card,
  Typography,
  Button,
  Space,
  Select,
  Divider,
  message,
  Calendar,
  Input,
  DatePicker,
  Row,
  Col,
  Modal,
} from 'antd';
import { CaretDownOutlined, EnvironmentOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
} from '@react-google-maps/api';
import axiosClient from '../../api/apiConfig';
const { Title, Text } = Typography;
const { Option, OptGroup } = Select;

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 21.0285,
  lng: 105.8542,
};

const extractLatLngFromUrl = (url) => {
  const latLngMatch = url.match(/!2d(-?\d+\.\d+)!3d(-?\d+\.\d+)/);
  if (latLngMatch) {
    const lng = parseFloat(latLngMatch[1]);
    const lat = parseFloat(latLngMatch[2]);
    return { lat, lng };
  }
  return null;
};

const calculateDistanceKm = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return +(R * c).toFixed(2);
};

const BookingPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBKZU7rmuer8lvweCSt-LC5gxKHuLqbXtE',
    libraries: ['places'],
  });

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const ID = queryParams.get('ID');
  const code = queryParams.get('code');
  const user = JSON.parse(localStorage.getItem('user'));

  const [autocomplete, setAutocomplete] = useState(null);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [address, setAddress] = useState(user?.address || '');
  const [dob, setDob] = useState(null);

  const [allclinics, setAllclinics] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [distanceToClinic, setDistanceToClinic] = useState(null);

  const timeSlots = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
  ];

  const onLoadAutocomplete = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    console.log(autocomplete);
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        console.log(location);
        const newLocation = {
          lat: location.lat(),
          lng: location.lng(),
          name: place.formatted_address,
        };
        setSelectedLocation(newLocation);
        setAddress(place.formatted_address || '');
      } else {
        message.error('Không tìm thấy vị trí phù hợp.');
      }
    }
  };

  const handleBooking = () => {
    if (
      !fullName ||
      !phoneNumber ||
      !address ||
      !dob ||
      !selectedDate ||
      !selectedTime ||
      !selectedFacility ||
      !selectedService
    ) {
      message.warning('Vui lòng nhập đầy đủ thông tin cá nhân!');
      return;
    }
    const selectedFacilityID = allclinics.find(
      (clinic) => clinic.name == selectedFacility
    )?.ID;
    let selectedServiceName = '';

    for (const testType of services) {
      const foundPkg = testType.packages.find(
        (pkg) => pkg.code === selectedService
      );
      if (foundPkg) {
        selectedServiceName = foundPkg.name;
        break; // kết thúc vòng lặp khi đã tìm thấy
      }
    }

    const state = {
      date: selectedDate.format('DD/MM/YYYY'),
      time: selectedTime,
      facility: selectedFacility,
      facilityID: selectedFacilityID,
      serviceCode: selectedService,
      serviceName: selectedServiceName,
      name: fullName,
      phone: phoneNumber,
      dob: dob.format('DD/MM/YYYY'),
      location: address,
      confirmed: false,
    };
    const addFirst = async () => {
      try {
        const res = await axiosClient.post('/booking/addfirst', state);
        message.success('Dat lich thanh cong');
        navigate('/mainbio/booking-success', {
          state,
        });
      } catch (error) {
        message.error('Khong the dat lich');
      }
    };
    addFirst();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const res1 = await axiosClient.get('/clinic/fetchall');
        const res2 = await axiosClient.get('/testservice/fetchall');

        // const datas1 = localStorage.getItem('allclinics');
        // const datas2 = localStorage.getItem('alltests');
        const datas1 = res1.data;
        const datas2 = res2.data;
        console.log(datas1, datas2);
        if (datas1 && datas2) {
          const parsed1 = datas1;
          const parsed2 = datas2;
          setAllclinics(parsed1);

          const groupedServices = parsed2.map((testType) => ({
            typeName: testType.typeName,
            packages: testType.packages.map((pkg) => ({
              code: pkg.code,
              name: pkg.name,
            })),
          }));
          setServices(groupedServices);

          if (ID) {
            const matchedClinic = parsed1.find((clinic) => clinic.ID === ID);
            if (matchedClinic) {
              setSelectedFacility(matchedClinic.name);
            }
          }

          if (code) {
            for (const testType of parsed2) {
              const foundPkg = testType.packages.find(
                (pkg) => pkg.code === code
              );
              if (foundPkg) {
                setSelectedService(foundPkg.code);
                // setSelectedServiceName(foundPkg.name);
                break;
              }
            }
          }
        }
      } catch (error) {
        console.error('Lỗi khi đọc dữ liệu từ localStorage:', error);
      }
    };

    loadData();
  }, [ID, code]);

  useEffect(() => {
    if (!allclinics || !services.length) return;

    const filteredClinics = selectedService
      ? allclinics.filter((clinic) =>
          clinic.listService.includes(selectedService)
        )
      : allclinics;
    setFilteredFacilities(filteredClinics.map((clinic) => clinic.name));

    let validServiceCodes = [];
    if (selectedFacility) {
      const clinic = allclinics.find(
        (clinic) => clinic.name === selectedFacility
      );
      validServiceCodes = clinic?.listService || [];
    }

    const filtered = services
      .map((group) => ({
        typeName: group.typeName,
        packages: group.packages.filter((pkg) =>
          selectedFacility ? validServiceCodes.includes(pkg.code) : true
        ),
      }))
      .filter((group) => group.packages.length > 0);

    setFilteredServices(filtered);
  }, [selectedFacility, selectedService, allclinics, services]);

  useEffect(() => {
    if (selectedLocation && selectedFacility) {
      const clinic = allclinics.find(
        (clinic) => clinic.name === selectedFacility
      );
      if (clinic?.mapEmbedUrl) {
        const clinicCoords = extractLatLngFromUrl(clinic.mapEmbedUrl);
        if (clinicCoords) {
          const distance = calculateDistanceKm(
            selectedLocation.lat,
            selectedLocation.lng,
            clinicCoords.lat,
            clinicCoords.lng
          );
          setDistanceToClinic(distance);
        }
      }
    }
  }, [selectedLocation, selectedFacility, allclinics]);

  return (
    <div style={{ padding: 20, background: '#e8f4fd', minHeight: '100vh' }}>
      <Card style={{ maxWidth: 1000, margin: '0 auto', borderRadius: 12 }}>
        <div
          style={{
            background: 'linear-gradient(36deg, #00b5f1, #00e0ff)',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: 8,
            textAlign: 'center',
            marginBottom: 24,
          }}
        >
          <Title level={4} style={{ color: '#fff', margin: 0 }}>
            Đặt lịch xét nghiệm
          </Title>
        </div>

        {/* ... Giữ nguyên phần còn lại như cũ ... */}

        <Space direction="vertical" style={{ width: '100%' }}>
          <strong>Chọn vị trí trên bản đồ:</strong>
          <Button
            type="primary"
            icon={<EnvironmentOutlined />}
            onClick={() => setMapModalOpen(true)}
          >
            Chọn vị trí trên bản đồ
          </Button>
          {selectedLocation && (
            <Text>
              Địa điểm đã chọn:{' '}
              {/* <b>{selectedLocation.name || 'Không xác định'}</b> */}✅
              {distanceToClinic !== null && (
                <>
                  {' '}
                  – Cách cơ sở đã chọn khoảng <b>{distanceToClinic} km</b>
                </>
              )}
            </Text>
          )}
        </Space>

        <Modal
          title="Chọn vị trí trên bản đồ"
          open={mapModalOpen}
          onCancel={() => setMapModalOpen(false)}
          onOk={() => setMapModalOpen(false)}
          okText="Chọn"
          width={800}
        >
          {isLoaded ? (
            <>
              <Autocomplete
                onLoad={onLoadAutocomplete}
                onPlaceChanged={onPlaceChanged}
              >
                <Input
                  placeholder="Nhập địa điểm..."
                  style={{ marginBottom: 10, height: 40 }}
                  allowClear
                />
              </Autocomplete>

              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={selectedLocation || defaultCenter}
                onClick={(e) =>
                  setSelectedLocation({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  })
                }
              >
                {selectedLocation && <Marker position={selectedLocation} />}
              </GoogleMap>
            </>
          ) : (
            <div>Đang tải bản đồ...</div>
          )}
        </Modal>
        <Divider />
        <Row gutter={16}>
          <Col span={12}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <strong>Chọn cơ sở xét nghiệm:</strong>
              <Select
                placeholder="Chọn cơ sở"
                onChange={(value) => setSelectedFacility(value)}
                value={selectedFacility}
                style={{ width: '100%', height: 40 }}
                suffixIcon={<CaretDownOutlined />}
              >
                {filteredFacilities.map((facility) => (
                  <Option key={facility} value={facility}>
                    {facility}
                  </Option>
                ))}
              </Select>
            </Space>
          </Col>

          <Col span={12}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <strong>Chọn dịch vụ xét nghiệm:</strong>
              <Select
                placeholder="Chọn dịch vụ"
                onChange={(value) => setSelectedService(value)}
                value={selectedService}
                style={{ width: '100%', height: 40 }}
                suffixIcon={<CaretDownOutlined />}
              >
                {filteredServices.map((group) => (
                  <OptGroup key={group.typeName} label={group.typeName}>
                    {group.packages.map((pkg) => (
                      <Option key={pkg.code} value={pkg.code}>
                        {pkg.name}
                      </Option>
                    ))}
                  </OptGroup>
                ))}
              </Select>
            </Space>
          </Col>
        </Row>

        <Divider />
        <Space direction="vertical" style={{ width: '100%' }}>
          <strong>Chọn ngày:</strong>
          <Calendar
            fullscreen={false}
            value={selectedDate}
            onSelect={(date) => setSelectedDate(date)}
            disabledDate={(current) =>
              current && current < dayjs().startOf('day')
            }
            style={{ border: '1px solid #e6f7ff', borderRadius: 8 }}
            suffixIcon={<CaretDownOutlined />}
          />
          <Text type="success">
            <strong>Đã chọn: {selectedDate.format('DD/MM/YYYY')}</strong>
          </Text>
        </Space>

        <Divider />

        <Space direction="vertical" style={{ width: '100%' }}>
          <strong>Chọn khung giờ:</strong>
          <Button.Group
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              justifyContent: 'space-between',
            }}
          >
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                type={selectedTime === slot ? 'primary' : 'default'}
                onClick={() => setSelectedTime(slot)}
                style={{
                  width: 120,
                  height: 40,
                  borderRadius: 15,
                  fontWeight: 500,
                }}
              >
                {slot}
              </Button>
            ))}
          </Button.Group>
        </Space>

        <Divider />

        {/* Thông tin cá nhân */}
        <Space direction="vertical" style={{ width: '100%' }}>
          <strong>Thông tin người đặt:</strong>
          <Row gutter={16}>
            <Col span={12}>
              <Input
                placeholder="Họ và tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ height: 40 }}
              />
            </Col>
            <Col span={12}>
              <Input
                placeholder="Số điện thoại"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{ height: 40 }}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Input
                placeholder="Địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ height: 40 }}
              />
            </Col>
            <Col span={12}>
              <DatePicker
                placeholder="Ngày sinh"
                value={dob}
                onChange={(date) => setDob(date)}
                style={{ width: '100%', height: 40 }}
                disabledDate={(current) =>
                  current && current > dayjs().endOf('day')
                }
              />
            </Col>
          </Row>
        </Space>

        <Divider />

        {/* Nút đặt lịch */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="booking-button"
            type="primary"
            block
            onClick={handleBooking}
            style={{
              width: 200,
              height: 50,
              borderRadius: 30,
              fontSize: 18,
              fontWeight: 500,
              background: 'linear-gradient(36deg, #00b5f1, #00e0ff)',
            }}
          >
            Đặt lịch ngay
          </Button>
        </div>
        {/* ... Giữ nguyên phần còn lại ... */}
      </Card>
    </div>
  );
};

export default BookingPage;
