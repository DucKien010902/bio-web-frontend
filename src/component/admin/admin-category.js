import React, { useEffect, useState } from 'react';
import {
  Card,
  Collapse,
  Input,
  Button,
  List,
  Space,
  message,
  Typography,
  Popconfirm,
} from 'antd';
import axios from 'axios';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import axiosClient from '../../api/apiConfig';

const { Panel } = Collapse;
const { Title } = Typography;

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newClassifyMap, setNewClassifyMap] = useState({});

  const fetchCategories = async () => {
    try {
      const res = await axiosClient.get('/category/getall');
      setCategories(res.data);
    } catch (err) {
      message.error('Không thể tải danh mục');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await axiosClient.post('/category/addcategory', {
        name: newCategory,
        classifies: [],
      });
      message.success('Đã thêm danh mục');
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      message.error('Lỗi khi thêm danh mục');
    }
  };

  const deleteCategory = async (name) => {
    try {
      await axiosClient.post('/category/deletecategory', { name });
      message.success('Đã xóa danh mục');
      fetchCategories();
    } catch {
      message.error('Lỗi khi xóa danh mục');
    }
  };

  const addClassify = async (categoryName) => {
    const classify = newClassifyMap[categoryName];
    if (!classify?.trim()) return;
    try {
      await axiosClient.post('/category/addclassify', {
        name: categoryName,
        classify,
      });
      message.success('Đã thêm phân loại');
      setNewClassifyMap((prev) => ({ ...prev, [categoryName]: '' }));
      fetchCategories();
    } catch {
      message.error('Lỗi khi thêm phân loại');
    }
  };

  const removeClassify = async (categoryName, classify) => {
    try {
      await axiosClient.post('/category/deleteclassify', {
        name: categoryName,
        classify,
      });
      message.success('Đã xóa phân loại');
      fetchCategories();
    } catch {
      message.error('Lỗi khi xóa phân loại');
    }
  };

  return (
    <Card
      title={<Title level={3}>Quản lý Danh mục & Phân loại</Title>}
      bordered={false}
    >
      <Space style={{ marginBottom: 20 }}>
        <Input
          placeholder="Tên danh mục mới"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={addCategory}>
          Thêm danh mục
        </Button>
      </Space>

      <Collapse accordion>
        {categories.map((cat) => (
          <Panel
            header={<strong>{cat.name}</strong>}
            key={cat._id}
            extra={
              <Popconfirm
                title="Bạn có chắc muốn xóa danh mục này không?"
                onConfirm={() => deleteCategory(cat.name)}
                okText="Xóa"
                cancelText="Hủy"
              >
                <DeleteOutlined style={{ color: 'red' }} />
              </Popconfirm>
            }
          >
            <List
              header={<b>Phân loại</b>}
              dataSource={cat.classifies}
              renderItem={(cls) => (
                <List.Item
                  actions={[
                    <Popconfirm
                      title="Xóa phân loại này?"
                      onConfirm={() => removeClassify(cat.name, cls)}
                      okText="Xóa"
                      cancelText="Hủy"
                    >
                      <DeleteOutlined style={{ color: 'red' }} />
                    </Popconfirm>,
                  ]}
                >
                  {cls}
                </List.Item>
              )}
            />
            <Space style={{ marginTop: 10 }}>
              <Input
                placeholder="Phân loại mới"
                value={newClassifyMap[cat.name] || ''}
                onChange={(e) =>
                  setNewClassifyMap((prev) => ({
                    ...prev,
                    [cat.name]: e.target.value,
                  }))
                }
              />
              <Button type="dashed" onClick={() => addClassify(cat.name)}>
                Thêm phân loại
              </Button>
            </Space>
          </Panel>
        ))}
      </Collapse>
    </Card>
  );
};

export default CategoryManager;
