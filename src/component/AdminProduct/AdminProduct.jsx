import { PlusSquareOutlined, UploadOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import TableComponent from '../TableComponent/TableComponent'
import { Button, Form, Input, Modal, Upload } from 'antd'
import { getBase64 } from '../../until'
import *  as ProductService from '../../services/ProductServices' 
import { useMuttionHooksCreateProduct } from '../../hook/useMutationHook';
const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatar, setAvatar] = useState()
  const [dataModal, setDataModal] = useState({
    name:"",
    image:"",
    type:"",
    price:"",
    countInStock:"",
    rating:"",
    description:""
  })
  const mutation = useMuttionHooksCreateProduct(
    (data) => ProductService.createProduct(data)
  )

  const {data, isLoading,isSuccess,isError} = mutation

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
    if(values.image && values.image.file) {
      values.image = values.image.file.preview
    }
    if(values) {
      setIsModalOpen(false);
    }
    setDataModal(values)
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleChangeImg = async({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview)
    // setDataModal(...dataModal, avatar)
  }
  console.log("dataModal",dataModal)
  return (
    <div class="wrapContent">
    <div className='flex mb-5'>
      <p class="tilePage">Quản lý sản phẩm</p>
      <PlusSquareOutlined  style={{fontSize:"24px", cursor:"pointer"}} onClick={showModal} />
    </div>
    <TableComponent/>
    <Modal title="Thêm sản phẩm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
            label="Tên tài khoản"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Kiểu"
            name="type"
            rules={[
              {
                required: true,
                message: 'Please input your type!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá sản phẩm"
            name="price"
            rules={[
              {
                required: true,
                message: 'Please input your price!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="countInStock"
            rules={[
              {
                required: true,
                message: 'Please input your countInStock!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Đánh giá"
            name="rating"
            rules={[
              {
                required: true,
                message: 'Please input your rating!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input your description!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="Ảnh sản phẩm"
            name="image"
            rules={[
              {
                required: true,
                message: 'Please input your image!',
              },
            ]}
          >
             <Upload onChange={handleChangeImg} maxCount={1} >
              <Button icon={<UploadOutlined />}>Tải ảnh</Button>
            </Upload>
            {avatar && (<img src={avatar} style={{height:"50px", width:"50px", borderRadius:"99px", objectFit:"cover", marginLeft:"20px"}} alt='avatar' /> )}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
  </div>
  )
}

export default AdminProduct
