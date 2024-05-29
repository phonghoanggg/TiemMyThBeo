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
import { useNavigate } from 'react-router';

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
  
  const navigate = useNavigate()
  const mutation = useMuttionHooksUpdateUser(
    (data) => UserService.updateUser(data)
  )

  const {data, isLoading,isSuccess,isError} = mutation

  useEffect(() => {
    setName( user.name)
    setEmail(user.email)
    setAddress(user.address)
    setAvatar(user.avatar)
    setPhone(user.phone)
  },[user])

  useEffect(() => {
    if(isSuccess) {
      setCheckLoading(true)
      setTimeout(() => {
        handleGetDetailUser(user?.id, user?.access_token)
      },5000)
    } else if(isError) {
      message.error("Cập nhật thất bại")
    }
  },[isSuccess,isError])

  const handleGetDetailUser = async(id, token) => {
    try {
      const res = await UserService.getDetailsUser(id, token)
      dispatch(updateUser({...res?.data,access_token: token}))
    } finally {
      setCheckLoading(false)
      message.success("Cập nhật thành công")
    }
  }
  const handleChangeImg = async({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview)
  }
  const onFinish = async () => {
    await mutation.mutate({id: user?.id,name,email,address,avatar,phone,access_token: user?.access_token})
  };
  console.log("isLoading",isLoading)

  return (
   <Loading isLoading={isLoading || checkLoading }>
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
            <Upload onChange={handleChangeImg} maxCount={1} >
              <Button icon={<UploadOutlined />}>Tải ảnh</Button>
            </Upload>
            {avatar && (<img src={avatar} style={{height:"50px", width:"50px", borderRadius:"99px", objectFit:"cover", marginLeft:"20px"}} alt='avatar' /> )}
          </div>
      </Form.Item>
      {/* <Button type="primary" onClick={onFinish}>Lưu</Button> */}
     
        <div class="btn_footer">
          <Button class="btn_back" type="text" htmlType="submit" onClick={() => navigate("/")}>
            Trở về
          </Button>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </div>

    </div>
   </div>
    </Form>
   </Loading>
  )
};
export default ProfilePage