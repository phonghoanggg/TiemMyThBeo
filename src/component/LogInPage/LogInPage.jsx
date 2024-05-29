import React, { useEffect } from 'react';
import { Form, Input, Button ,Modal,Checkbox} from 'antd';
import { useMuttionHooksLogin } from '../../hook/useMutationHook';
import *  as UserService from '../../services/UserServices' 
import { Loading } from '../LoadingComponent/Loading';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';
import * as message from "../Message/Message"

const LoginComponent = ({openModalLogin,setOpenModalLogin}) => {
  const dispatch = useDispatch()
  const mutation = useMuttionHooksLogin(
    data => UserService.loginUser(data)
  )
  const onFinish = (values) => {
    mutation.mutate({
      email: values.email,
      password: values.password
    })
  };
  const {data, isLoading, isSuccess, isError} = mutation
  console.log("datakaka",data)
  useEffect(() => {
    if(isSuccess) {
      localStorage.setItem("access_token", JSON.stringify(data?.access_token))
      if(data?.access_token) {
        const decoded = jwtDecode(data?.access_token) 
        if(decoded?.id) {
          handleGetDetailUser(decoded?.id, data?.access_token)
        }
      }
      message.success("Đăng nhập thành công")
      setOpenModalLogin(false);
    } else if(isError) {
      message.error("Tài khoản hoặc mật khẩu không đúng")
    }
  },[isSuccess, isError])

  const handleGetDetailUser = async(id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data,access_token: token}))
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleCancel = () => {
    setOpenModalLogin(false);
  };
  return (
      <Modal
        title="Đăng nhập"
        centered
        open={openModalLogin}
        onCancel={handleCancel}
        footer={null}
      >
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
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: data?.status === "ERR" && 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Mật khẩu"
      name="password"
      rules={[
        {
          required: true,
          message: data?.status === "ERR" && 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>
    <Loading isLoading={isLoading} >
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Đăng nhập
      </Button>
    </Form.Item>
    </Loading>
  </Form>
      </Modal>
  );
};

export default LoginComponent;
