import React, { useEffect, useState } from 'react';
import {
  Collapse,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
  Popconfirm,
  Typography,
  Tag,
  Divider,
  message,
  Select,
  Row,
  Col,
} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import axiosClient from '../../api/apiConfig';

const { Panel } = Collapse;
const { Text, Title } = Typography;

const ProductList = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();
  const shopInfo = JSON.parse(localStorage.getItem('shopInfo'));
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [availableClassifies, setAvailableClassifies] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCatForNewClassify, setSelectedCatForNewClassify] =
    useState('');
  const [newClassify, setNewClassify] = useState('');

  const openModal = (product) => {
    setEditingProduct(product);
    setSelectedCategory(product.pdCategory); // ⬅️ Đồng bộ để hiển thị phân loại đúng
    form.setFieldsValue({
      ...product,
      pdTypes: Array.isArray(product.pdTypes)
        ? product.pdTypes.join(', ')
        : product.pdTypes,
    });
    setIsModalOpen(true);
  };

  const fetchGroupedProducts = async () => {
    try {
      const res = await axiosClient.get(
        `/san-pham/fetchGroupedByShop?shopID=${shopInfo.shopID}`
      );
      setProductsByCategory(res.data);
      setCategories(Object.keys(res.data)); // <-- trích danh mục từ keys
    } catch (error) {
      message.error('Không thể lấy danh sách sản phẩm');
    }
  };

  const fetchAllGroupedProducts = async () => {
    try {
      const res = await axiosClient.get(`/category/getall`);
      setCategoryOptions(res.data); // data = [{ name: 'ABC', classifies: [...] }]
    } catch (error) {
      message.error('Không thể lấy danh sách danh mục');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/san-pham/delete/${id}`);
      message.success('Xoá thành công');
      fetchGroupedProducts();
    } catch (err) {
      message.error('Xoá thất bại');
    }
  };

  const handleAdd = () => {
    setEditingProduct(null);
    form.resetFields();
    form.setFieldsValue({
      pdShopID: shopInfo?.shopID,
      pdShopName: shopInfo?.shopName,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (typeof values.pdTypes === 'string') {
        values.pdTypes = values.pdTypes
          .split(',')
          .map((item) => item.trim())
          .filter((item) => item !== '');
      }
      if (editingProduct) {
        await axiosClient.put(`/san-pham/update/${editingProduct.Id}`, values);
        message.success('Cập nhật sản phẩm thành công');
      } else {
        await axiosClient.post('/san-pham/create', values);
        message.success('Thêm sản phẩm thành công');
      }
      setIsModalOpen(false);
      fetchGroupedProducts();
    } catch (err) {
      message.error('Lưu thất bại');
    }
  };
  useEffect(() => {
    const found = categoryOptions.find((cat) => cat.name === selectedCategory);
    setAvailableClassifies(found?.classifies || []);
  }, [selectedCategory, categoryOptions]);

  useEffect(() => {
    fetchGroupedProducts();
    fetchAllGroupedProducts();
  }, []);

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'pdName',
    },
    {
      title: 'Giá',
      dataIndex: 'pdPrice',
      render: (v) => `₫${v}.000`,
    },
    {
      title: 'Giảm giá',
      dataIndex: 'pdVouncher',
      render: (v) => <Tag color="red">-{v}%</Tag>,
    },
    {
      title: 'Đã bán',
      dataIndex: 'pdCountSale',
    },
    {
      title: 'Sao',
      dataIndex: 'pdStar',
    },
    {
      title: 'Thao tác',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn chắc chắn muốn xoá?"
            onConfirm={() => handleDelete(record.Id)}
          >
            <Button type="link" danger>
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const [formNewCategory] = Form.useForm();

  return (
    <div style={{ padding: 24 }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Thêm sản phẩm
      </Button>
      {Object.entries(productsByCategory).map(([category, classMap]) => (
        <Collapse key={category} style={{ marginBottom: 16 }}>
          <Panel header={`Danh mục: ${category}`} key={category}>
            {Object.entries(classMap).map(([classify, items]) => (
              <Collapse key={classify} style={{ marginBottom: 8 }}>
                <Panel header={`Phân loại: ${classify}`} key={classify}>
                  <Table
                    columns={columns}
                    dataSource={items}
                    rowKey="Id"
                    pagination={false}
                    expandable={{
                      expandedRowRender: (record) => (
                        <>
                          <Text strong>Mô tả:</Text> {record.pdDes}
                          <Collapse style={{ marginTop: 8 }}>
                            <Panel header="Chi tiết mô tả thêm" key="1">
                              <p>{record.pdMoreDescriptions}</p>
                            </Panel>
                          </Collapse>
                          <Divider />
                          <Title level={5}>Metadata:</Title>
                          <ul>
                            {record.pdDetailData?.map((item, i) => (
                              <li key={i}>
                                <strong>{item.key}</strong>: {item.value}
                              </li>
                            ))}
                          </ul>
                        </>
                      ),
                    }}
                  />
                </Panel>
              </Collapse>
            ))}
          </Panel>
        </Collapse>
      ))}

      <Modal
        title={editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
        width={700}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="pdCategory"
            label="Danh mục (Category)"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Chọn danh mục"
              onChange={(value) => {
                setSelectedCategory(value); // update để load phân loại tương ứng
                form.setFieldValue('pdClassify', null); // reset classify khi đổi danh mục
              }}
            >
              {categoryOptions.map((cat) => (
                <Select.Option key={cat.name} value={cat.name}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="pdClassify"
            label="Phân loại (Classify)"
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn phân loại">
              {availableClassifies.map((cls) => (
                <Select.Option key={cls} value={cls}>
                  {cls}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="pdTypes" label="Loại chi tiết">
            <Input />
          </Form.Item>
          <Form.Item name="Id" label="ID" rules={[{ required: true }]}>
            <Input disabled={!!editingProduct} />
          </Form.Item>

          <Form.Item
            name="pdShopID"
            label="Mã shop"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="pdShopName"
            label="Tên shop"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="pdName"
            label="Tên sản phẩm"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="pdImage" label="Ảnh URL">
            <Input />
          </Form.Item>

          <Form.Item name="pdDes" label="Mô tả ngắn">
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item name="pdMoreDescriptions" label="Mô tả thêm">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="pdPrice" label="Giá (₫ ngàn)">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="pdVouncher" label="Giảm giá (%)">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="pdCountSale" label="Số lượng bán">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="pdStar" label="Số sao">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="pdDayDelivery" label="Thời gian giao hàng">
            <Input />
          </Form.Item>

          <Form.List name="pdDetailData">
            {(fields, { add, remove }) => (
              <>
                <Title level={5}>Chi tiết sản phẩm</Title>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    align="baseline"
                    style={{ display: 'flex', marginBottom: 8 }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'key']}
                      rules={[{ required: true, message: 'Nhập tên trường' }]}
                    >
                      <Input placeholder="Tên" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      rules={[{ required: true, message: 'Nhập giá trị' }]}
                    >
                      <Input placeholder="Giá trị" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button onClick={() => add()} icon={<PlusOutlined />}>
                    Thêm dòng
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductList;
