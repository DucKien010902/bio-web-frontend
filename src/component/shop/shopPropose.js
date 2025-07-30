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

const ShopPropose = () => {
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

  const [formNewCategory] = Form.useForm();

  return (
    <div style={{ padding: 24 }}>
      <Title level={5}>Đề xuất</Title>

      <div style={{ maxWidth: '80%', margin: '0 0%' }}>
        <Row gutter={16}>
          {/* Cột 1: Thêm danh mục mới cùng phân loại */}
          <Col span={12}>
            <Form layout="vertical" form={formNewCategory}>
              <Form.Item
                label="Tên danh mục mới"
                name="name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Nhập tên danh mục" />
              </Form.Item>

              <Form.List name="classifies">
                {(fields, { add, remove }) => (
                  <>
                    <label>Phân loại</label>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: 'flex', marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={name}
                          rules={[
                            { required: true, message: 'Nhập phân loại' },
                          ]}
                          style={{ flex: 1 }}
                        >
                          <Input placeholder="Tên phân loại" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusCircleOutlined />}
                        size="small"
                      >
                        Thêm phân loại
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Button
                type="primary"
                size="small"
                onClick={async () => {
                  try {
                    const values = await formNewCategory.validateFields();
                    console.log(values);
                    await axiosClient.post('/approve/proposeCategory', {
                      name: values.name,
                      classifies: values.classifies || [],
                    });
                    message.success('Đề xuất danh mục thành công');
                    formNewCategory.resetFields();
                    fetchAllGroupedProducts();
                  } catch {
                    message.error('Đề xuất danh mục thất bại');
                  }
                }}
              >
                Đề xuất
              </Button>
            </Form>
          </Col>

          {/* Cột 2: Thêm phân loại vào danh mục có sẵn */}
          <Col span={12}>
            <Form layout="vertical">
              <Form.Item label="Thêm phân loại vào danh mục đã có">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Select
                    placeholder="Chọn danh mục"
                    value={selectedCatForNewClassify}
                    onChange={setSelectedCatForNewClassify}
                  >
                    {categoryOptions.map((cat) => (
                      <Select.Option key={cat.name} value={cat.name}>
                        {cat.name}
                      </Select.Option>
                    ))}
                  </Select>
                  <Input
                    placeholder="Tên phân loại mới"
                    value={newClassify}
                    onChange={(e) => setNewClassify(e.target.value)}
                  />
                </Space>
              </Form.Item>
              <Button
                type="primary"
                size="small"
                onClick={async () => {
                  if (!selectedCatForNewClassify || !newClassify) {
                    return message.error('Chọn danh mục và nhập phân loại');
                  }
                  try {
                    console.log(selectedCatForNewClassify, newClassify);
                    await axiosClient.post('/approve/proposeClassify', {
                      name: selectedCatForNewClassify,
                      classifies: [newClassify],
                    });
                    message.success('Đề xuất phân loại thành công');
                    setNewClassify('');
                    fetchAllGroupedProducts();
                  } catch {
                    message.error('Đề xuất phân loại thất bại');
                  }
                }}
              >
                Đề xuất
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ShopPropose;
