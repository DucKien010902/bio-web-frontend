import { Card, Empty } from 'antd';

const Notifications = () => (
  <Card title="Thông báo" bordered={false} style={{ borderRadius: 12 }}>
    <Empty description="Không có thông báo nào" />
  </Card>
);
export default Notifications;
