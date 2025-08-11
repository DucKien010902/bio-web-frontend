import React, { useState, useEffect } from 'react';
import './book-calender.css';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Card,
  Typography,
  Button,
  Space,
  Select,
  message,
  DatePicker,
  ConfigProvider,
  Input,
} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import viVN from 'antd/locale/vi_VN';
import axiosClient from '../../api/apiConfig';

dayjs.locale('vi');

const { Title, Text } = Typography;
const { Option, OptGroup } = Select;

const BookingPageMobile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const ID = queryParams.get('ID');
  const code = queryParams.get('code');
  const user = JSON.parse(localStorage.getItem('user'));

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [address, setAddress] = useState(user?.address || '');
  const [dob, setDob] = useState(''); // ngày sinh dạng string
  const [email, setEmail] = useState('');

  const [allclinics, setAllclinics] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  const timeSlots = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
  ];

  // Xử lý auto-format ngày sinh
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

  const isValidDob = (dateStr) => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return false;
    const [d, m, y] = dateStr.split('/').map(Number);
    const dateObj = dayjs(`${y}-${m}-${d}`);
    return (
      dateObj.isValid() &&
      dateObj.isBefore(dayjs().endOf('day')) &&
      d === dateObj.date() &&
      m === dateObj.month() + 1
    );
  };

  const handleBooking = () => {
    if (
      !fullName ||
      !phoneNumber ||
      !address ||
      !dob ||
      !isValidDob(dob) ||
      !selectedDate ||
      !selectedTime ||
      !selectedFacility ||
      !selectedService
    ) {
      message.warning('Vui lòng nhập đầy đủ và đúng thông tin cá nhân!');
      return;
    }

    const selectedFacilityID = allclinics.find(
      (clinic) => clinic.name === selectedFacility
    )?.ID;

    let selectedServiceName = '';
    for (const testType of services) {
      const foundPkg = testType.packages.find(
        (pkg) => pkg.code === selectedService
      );
      if (foundPkg) {
        selectedServiceName = foundPkg.name;
        break;
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
      email: email,
      dob: dob,
      location: address,
      confirmed: false,
    };

    const addFirst = async () => {
      try {
        await axiosClient.post('/booking/addfirst', state);
        message.success('Đặt lịch thành công');
        navigate('/y-te/booking-success', { state });
      } catch (error) {
        message.error('Không thể đặt lịch');
      }
    };

    addFirst();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const res1 = await axiosClient.get('/clinic/fetchall');
        const res2 = await axiosClient.get('/testservice/fetchall');
        const datas1 = res1.data;
        const datas2 = res2.data;
        setAllclinics(datas1);

        const groupedServices = datas2.map((testType) => ({
          typeName: testType.typeName,
          packages: testType.packages.map((pkg) => ({
            code: pkg.code,
            name: pkg.name,
          })),
        }));
        setServices(groupedServices);

        if (ID) {
          const matchedClinic = datas1.find((clinic) => clinic.ID === ID);
          if (matchedClinic) setSelectedFacility(matchedClinic.name);
        }

        if (code) {
          for (const testType of datas2) {
            const foundPkg = testType.packages.find((pkg) => pkg.code === code);
            if (foundPkg) {
              setSelectedService(foundPkg.code);
              break;
            }
          }
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
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
    <ConfigProvider locale={viVN}>
      <div style={{ padding: 12, background: '#e8f4fd', minHeight: '100vh' }}>
        <Card style={{ borderRadius: 12 }}>
          <Title level={4} style={{ textAlign: 'center', color: '#00b5f1' }}>
            Đặt lịch xét nghiệm
          </Title>

          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <div>
              <strong>Cơ sở xét nghiệm</strong>
              <Select
                placeholder="Chọn cơ sở"
                onChange={(value) => setSelectedFacility(value)}
                value={selectedFacility}
                style={{ width: '100%' }}
                suffixIcon={<CaretDownOutlined />}
              >
                {filteredFacilities.map((facility) => (
                  <Option key={facility} value={facility}>
                    {facility}
                  </Option>
                ))}
              </Select>
            </div>

            <div>
              <strong>Dịch vụ xét nghiệm</strong>
              <Select
                placeholder="Chọn dịch vụ"
                onChange={(value) => setSelectedService(value)}
                value={selectedService}
                style={{ width: '100%' }}
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
            </div>

            <div>
              <strong>Chọn ngày</strong>
              <DatePicker
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                style={{ width: '100%' }}
                format="DD/MM/YYYY"
                inputReadOnly
                allowClear={false}
                disabledDate={(current) =>
                  current && current < dayjs().startOf('day')
                }
              />
              <Text type="success" style={{ display: 'block', marginTop: 8 }}>
                Đã chọn: {selectedDate ? selectedDate.format('DD/MM/YYYY') : ''}
              </Text>
            </div>

            <div>
              <strong>Chọn khung giờ</strong>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                  marginTop: 10,
                }}
              >
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    type={selectedTime === slot ? 'primary' : 'default'}
                    onClick={() => setSelectedTime(slot)}
                    style={{ borderRadius: 12 }}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <strong>Thông tin cá nhân</strong>
              <Input
                placeholder="Họ và tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ marginBottom: 10, marginTop: 10 }}
              />
              <Input
                placeholder="Số điện thoại"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{ marginBottom: 10 }}
              />
              <Input
                placeholder="Địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ marginBottom: 10 }}
              />
              <Input
                placeholder="Ngày sinh (DD/MM/YYYY)"
                value={dob}
                onChange={handleDobChange}
                maxLength={10}
                style={{ width: '100%', marginBottom: 10 }}
              />
              <Input
                placeholder="Email liên hệ"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button
              type="primary"
              block
              onClick={handleBooking}
              style={{ height: 48, borderRadius: 24, fontWeight: 500 }}
            >
              Đặt lịch ngay
            </Button>
          </Space>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default BookingPageMobile;
