import React, { useEffect, useState } from 'react'
import *  as UserService from '../../services/UserServices' 
import { Button, Form, Input, InputNumber, Upload } from 'antd';
import { useMuttionHooksUpdateUser } from '../../hook/useMutationHook';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../component/LoadingComponent/Loading';
import * as message from "../../component/Message/Message" 
import { updateUser } from '../../redux/slides/userSlide';
import { UploadOutlined } from '@ant-design/icons';
import {getBase64} from '../../until'
import './index.css'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */


const ProfilePage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [address, setAddress] = useState(user.address)
  const [avatar, setAvatar] = useState(user.avatar)
  const [phone, setPhone] = useState(user.phone)
  const [checkLoading, setCheckLoading] = useState(false)
  console.log("user",user)

  const handleChangeImg = async({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview)
  }

  const mutation = useMuttionHooksUpdateUser(
    (data) => UserService.updateUser(data)
  )
  useEffect(() => {
    setName( user.name)
    setEmail(user.email)
    setAddress(user.address)
    setAvatar(user.avatar)
    setPhone(user.phone)
  },[user])
  
  const {data, isLoading,isSuccess,isError} = mutation
  console.log("kekeek",data,isSuccess)

  useEffect(() => {
    if(isSuccess) {
      message.success("Cập nhật thành công")
      handleGetDetailUser(user?.id, user?.access_token)
    } else if(isError) {
      message.error("Cập nhật thất bại")
    }
  },[isSuccess,isError])

  const onFinish = async (values) => {
    await mutation.mutate(
      {
      id: user?.id,
      name,
      email,
      address,
      avatar,
      phone,
      access_token: user?.access_token
    })
  };

  const handleGetDetailUser = async(id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    console.log("ressss", res)
    dispatch(updateUser({...res?.data,access_token: token}))
  
  }


 console.log("name",name)
  return (
   <Loading isLoading={isLoading}>
     <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        width:"100%"
      }}
      initialValues={{
          name: name,
          email: email,
          phone: phone,
          address: address,
          avarta: avatar,
        }
      }
      validateMessages={validateMessages}
    >
      {/* <Form.Item
        onMetaChange={(e) => setName(e)}
        name={['name']}
        label="Tên"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        onMetaChange={(e) => setEmail(e)}
        name={'email'}
        label="Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        onMetaChange={(e) => setPhone(e)}
        name={['phone']}
        label="Số điện thoại"
        rules={[
          {
            type: 'phone',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        onMetaChange={(e) => setAddress(e)}
        name={['address']}
        label="Địa chỉ"
        rules={[
          {
            type: 'address',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['avarta']}
        label="Avarta"
        rules={[
          {
            type: 'avatar',
          },
        ]}
      >
        <div style={{display:"flex", alignItems:'center'}}>
          <Upload onChange={handleChangeImg}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          {avatar && (<img src={avatar} style={{height:"50px", width:"50px", borderRadius:"99px", objectFit:"cover", marginLeft:"20px"}}/>)}
        </div>
      </Form.Item>
  
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
   <div class="form_wrap">
   <div class="form-container">
      <div class="form-group">
          <span>Tên</span>
          <input type="text" placeholder='Nhập tên...' value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div class="form-group">
          <span>Email</span>
          <input type="text" placeholder='Nhập email...' value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div class="form-group">
          <span>Địa chỉ</span>
          <input type="text" placeholder='Nhập địa chỉ...' value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div class="form-group">
          <span>Số điện thoại</span>
          <input type="text" placeholder='Nhập số điện thoại...' value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <Form.Item
          name={['avatar']}
          label=""
          rules={[
            {
              type: 'avatar',
            },
          ]}
        >
          <div style={{display:"flex", alignItems:'center'}}>
            <Upload onChange={handleChangeImg}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {avatar && (<img src={avatar} style={{height:"50px", width:"50px", borderRadius:"99px", objectFit:"cover", marginLeft:"20px"}}/>)}
          </div>
      </Form.Item>
      {/* <Button type="primary" onClick={onFinish}>Lưu</Button> */}
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> 
    </div>
   </div>
    </Form>
   </Loading>
  )
};
export default ProfilePage