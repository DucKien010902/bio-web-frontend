///
import { CaretDownOutlined } from '@ant-design/icons';
import { useLoadScript } from '@react-google-maps/api';
import {
  Button,
  Calendar,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Input,
  message,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import viVN from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/apiConfig';
import './book-calender.css';
dayjs.locale('vi');

const { Title, Text } = Typography;
const { Option, OptGroup } = Select;

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
  const [email, setEmail] = useState(null);

  const [allclinics, setAllclinics] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [distanceToClinic, setDistanceToClinic] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState('Tại phòng khám');
  const [resultMethod, setResultMethod] = useState('Online');
  const [resultAddress, setResultAddress] = useState('');

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
  const handleDobChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);

    if (value.length >= 5) {
      value = value.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
    } else if (value.length >= 3) {
      value = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    }

    setDob(value);
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
    let selectedServicePrice = 0;
    for (const testType of services) {
      const foundPkg = testType.packages.find(
        (pkg) => pkg.code === selectedService
      );
      if (foundPkg) {
        selectedServiceName = foundPkg.name;
        selectedServicePrice = foundPkg.price;
        break; // kết thúc vòng lặp khi đã tìm thấy
      }
    }

    const state = {
      date: selectedDate.format('DD/MM/YYYY'),
      time: selectedTime,
      facility: selectedFacility,
      facilityID: selectedFacilityID,
      serviceCode: selectedService,
      servicePrice: selectedServicePrice,
      serviceName: selectedServiceName,
      name: fullName,
      phone: phoneNumber,
      dob: dob,
      location: address,
      email: email,
      confirmed: false,
    };
    const addFirst = async () => {
      try {
        const res = await axiosClient.post('/booking/addfirst', state);
        const res1 = await axiosClient.post('/notice/addBookingNotice', state);
        message.success('Dat lich thanh cong');
        navigate('/y-te/booking-success', {
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
              price: pkg.price,
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
          <ConfigProvider locale={viVN}>
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
          </ConfigProvider>
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
              <Input
                placeholder="Ngày sinh (Ngày/Tháng/Năm)"
                value={dob}
                onChange={handleDobChange}
                maxLength={10}
                style={{ height: 40 }}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Input
                placeholder="Email liên hệ"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginBottom: 10, height: 40 }}
              />
            </Col>
            <Col span={12}>
              {/* Bạn có thể để trống hoặc thêm 1 input khác */}
            </Col>
          </Row>
        </Space>

        <Divider />
        <Space direction="vertical" style={{ width: '100%' }}>
          <strong>Phương thức thanh toán:</strong>
          <Row gutter={16}>
            <Col span={24}>
              <Radio.Group
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <Radio value="clinic">Thanh toán tại phòng khám</Radio>
                <Radio value="online">Thanh toán online</Radio>
              </Radio.Group>
            </Col>
          </Row>
        </Space>

        <Divider />

        {/* PHẦN TRẢ KẾT QUẢ */}
        <Space direction="vertical" style={{ width: '100%' }}>
          <strong>Hình thức trả kết quả:</strong>
          <Row gutter={16}>
            <Col span={24}>
              <Radio.Group
                value={resultMethod}
                onChange={(e) => setResultMethod(e.target.value)}
              >
                <Radio value="direct">Trực tiếp</Radio>
                <Radio value="online">Online</Radio>
              </Radio.Group>
            </Col>
          </Row>

          {resultMethod === 'direct' && (
            <Row gutter={16} style={{ marginTop: 12 }}>
              <Col span={24}>
                <Input
                  placeholder="Nhập địa chỉ nhận kết quả"
                  value={resultAddress}
                  onChange={(e) => setResultAddress(e.target.value)}
                  style={{ height: 40 }}
                />
              </Col>
            </Row>
          )}
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
      </Card>
    </div>
  );
};

export default BookingPage;
