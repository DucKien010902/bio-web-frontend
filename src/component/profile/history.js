import React, { useState } from 'react';
import { Typography, Descriptions, Button, Space, Card } from 'antd';

const { Title } = Typography;

const testTypes = [
  'Xét nghiệm ADN',
  'Sinh hóa',
  'Huyết học',
  'NIPT',
  'Sàng Lọc Bệnh',
];

const sampleData = {
  'Xét nghiệm ADN': {
    name: 'Nguyễn Văn A',
    gender: 'Nam',
    dob: '01/01/2000',
    phone: '0912345678',
    idCard: '012345678901',
    relationship: 'Cha - Con',
    bioSample: 'Máu ngoại vi',
    purpose: 'Xác định quan hệ huyết thống cha - con',
    caseCode: 'ADN123456',
    sampleTime: '08:30 - 12/03/2025',
  },
  'Sinh hóa': {
    name: 'Nguyễn Văn A',
    gender: 'Nam',
    dob: '01/01/2000',
    phone: '0912345678',
    idCard: '012345678901',
    fasting: 'Có (12 tiếng)',
    medications: 'Không',
    glucose: '5.8 mmol/L',
    liverEnzyme: 'AST: 22 U/L, ALT: 25 U/L',
  },
  'Huyết học': {
    name: 'Nguyễn Văn A',
    gender: 'Nam',
    dob: '01/01/2000',
    phone: '0912345678',
    idCard: '012345678901',
    bloodGroup: 'B+',
    bloodDisease: 'Thiếu máu nhẹ',
    plateletCount: '180 x10^9/L',
    hemoglobin: '13.2 g/dL',
  },
  NIPT: {
    name: 'Nguyễn Văn A',
    gender: 'Nam',
    dob: '01/01/2000',
    phone: '0912345678',
    idCard: '012345678901',
    gestationalAge: '12 tuần',
    fetusCount: 'Đơn thai',
    ivf: 'Không',
    fetalSex: 'Nam',
    chromosomalRisk: 'Không phát hiện bất thường NST',
  },
  'Sàng Lọc Bệnh': {
    name: 'Nguyễn Văn A',
    gender: 'Nam',
    dob: '01/01/2000',
    phone: '0912345678',
    idCard: '012345678901',
    familyHistory: 'Tiền sử tiểu đường (ông nội)',
    screeningType: 'Tim mạch, Đái tháo đường',
    method: 'Xét nghiệm máu & đo huyết áp',
    riskLevel: 'Nguy cơ trung bình',
  },
};

const PatientHistoryView = () => {
  const [selectedTest, setSelectedTest] = useState('Xét nghiệm ADN');
  const currentData = sampleData[selectedTest];

  const renderDescriptions = () => (
    <Descriptions
      bordered
      column={1}
      size="middle"
      labelStyle={{ fontWeight: 'bold', width: '50%' }}
      contentStyle={{ width: '50%' }}
    >
      <Descriptions.Item label="Họ tên bệnh nhân">
        {currentData.name}
      </Descriptions.Item>
      <Descriptions.Item label="Giới tính">
        {currentData.gender}
      </Descriptions.Item>
      <Descriptions.Item label="Ngày sinh">{currentData.dob}</Descriptions.Item>
      <Descriptions.Item label="Số điện thoại">
        {currentData.phone}
      </Descriptions.Item>
      <Descriptions.Item label="Căn cước công dân">
        {currentData.idCard}
      </Descriptions.Item>

      {selectedTest === 'Xét nghiệm ADN' && (
        <>
          <Descriptions.Item label="Mã hồ sơ">
            {currentData.caseCode}
          </Descriptions.Item>
          <Descriptions.Item label="Mối quan hệ">
            {currentData.relationship}
          </Descriptions.Item>
          <Descriptions.Item label="Mẫu sinh học">
            {currentData.bioSample}
          </Descriptions.Item>
          <Descriptions.Item label="Mục đích xét nghiệm">
            {currentData.purpose}
          </Descriptions.Item>
          <Descriptions.Item label="Thời gian lấy mẫu">
            {currentData.sampleTime}
          </Descriptions.Item>
        </>
      )}
      {selectedTest === 'Sinh hóa' && (
        <>
          <Descriptions.Item label="Tình trạng nhịn ăn">
            {currentData.fasting}
          </Descriptions.Item>
          <Descriptions.Item label="Thuốc đang dùng">
            {currentData.medications}
          </Descriptions.Item>
          <Descriptions.Item label="Chỉ số đường huyết">
            {currentData.glucose}
          </Descriptions.Item>
          <Descriptions.Item label="Chỉ số men gan">
            {currentData.liverEnzyme}
          </Descriptions.Item>
        </>
      )}
      {selectedTest === 'Huyết học' && (
        <>
          <Descriptions.Item label="Nhóm máu">
            {currentData.bloodGroup}
          </Descriptions.Item>
          <Descriptions.Item label="Bệnh lý về máu">
            {currentData.bloodDisease}
          </Descriptions.Item>
          <Descriptions.Item label="Số lượng tiểu cầu">
            {currentData.plateletCount}
          </Descriptions.Item>
          <Descriptions.Item label="Chỉ số hemoglobin">
            {currentData.hemoglobin}
          </Descriptions.Item>
        </>
      )}
      {selectedTest === 'NIPT' && (
        <>
          <Descriptions.Item label="Tuổi thai">
            {currentData.gestationalAge}
          </Descriptions.Item>
          <Descriptions.Item label="Số lượng thai">
            {currentData.fetusCount}
          </Descriptions.Item>
          <Descriptions.Item label="IVF">{currentData.ivf}</Descriptions.Item>
          <Descriptions.Item label="Giới tính thai nhi">
            {currentData.fetalSex}
          </Descriptions.Item>
          <Descriptions.Item label="Tình trạng NST">
            {currentData.chromosomalRisk}
          </Descriptions.Item>
        </>
      )}
      {selectedTest === 'Sàng Lọc Bệnh' && (
        <>
          <Descriptions.Item label="Tiền sử gia đình">
            {currentData.familyHistory}
          </Descriptions.Item>
          <Descriptions.Item label="Loại bệnh cần sàng lọc">
            {currentData.screeningType}
          </Descriptions.Item>
          <Descriptions.Item label="Phương pháp sàng lọc">
            {currentData.method}
          </Descriptions.Item>
          <Descriptions.Item label="Nguy cơ phát hiện">
            {currentData.riskLevel}
          </Descriptions.Item>
        </>
      )}
    </Descriptions>
  );

  return (
    <div style={{ padding: 0, margin: '0 auto' }}>
      <Card title="Lịch sử khám bệnh">
        <Space
          wrap
          size={[12, 12]}
          style={{
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          {testTypes.map((type) => (
            <Button
              key={type}
              shape="round"
              type="default"
              onClick={() => setSelectedTest(type)}
              style={{
                width: 140,
                fontWeight: 'bold',
                borderColor: '#00b5f1',
                color: selectedTest === type ? '#fff' : '#00b5f1',
                backgroundColor: selectedTest === type ? '#00b5f1' : '#fff',
              }}
            >
              {type}
            </Button>
          ))}
        </Space>
        {renderDescriptions()}
      </Card>
    </div>
  );
};

export default PatientHistoryView;
