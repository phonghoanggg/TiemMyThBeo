import React, { useState } from 'react'
import './index.css'
import { UserAddOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import { Button, Form, Input, Modal } from 'antd'
const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    setIsModalOpen(false);
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div class="wrapContent">
      <div className='flex mb-5'>
        <p class="tilePage">Quản lý người dùng</p>
        <UserAddOutlined style={{ fontSize: "24px", cursor: "pointer" }} onClick={showModal} />
      </div>
      <TableComponent />
      <Modal title="Thêm người dùng" open={isModalOpen} onOk={onFinish} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminUser
