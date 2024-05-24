import React, { useEffect,  } from 'react';
import { Input, Button, Form,Modal, Alert  } from 'antd';
import './styles.css'
import *  as UserService from '../../services/UserServices' 
import { useMuttionHooksRegister } from '../../hook/useMutationHook';
import { Loading } from '../LoadingComponent/Loading';
import * as message from "../Message/Message" 
import { Navigate } from 'react-router';

const Registrantion = ({openModalRegister,setOpenModalRegister}) => {
  const mutation = useMuttionHooksRegister(
    data => UserService.registerUser(data)
  )
  const {data, isLoading, isSuccess, isError} = mutation


  console.log("isSuccess",isSuccess,"isError",isError)
  useEffect(() => {
    if(isSuccess) {
      message.success("Đăng ký thành công")
      setOpenModalRegister(false);
    } else if(isError) {
      message.error("Tài khoản đã tồn tại")
    }
  },[isSuccess, isError])
  
 
  const onFinish = (values) => {
    mutation.mutate({
      email: values.email,
      password: values.password,
      confirmPassword: values.confirm
    })
  };


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const handleCancel = () => {
    setOpenModalRegister(false);
  };
  return (
      <Modal
        title="Đăng ký"
        centered
        open={openModalRegister}
        onCancel={handleCancel}
        footer={null}
      >
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="w-80 mx-auto"
      >
         <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: data?.status === "ERR" && 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: data?.status === "ERR" && 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
      style={{minWidth:"138px"}}
        name="password"
        label="Mật khẩu"
        rules={[
          {
            required: true,
            message: data?.status === "ERR" && 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Nhập lại mật khẩu"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: data?.status === "ERR" && 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Loading isLoading={isLoading} >
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Đăng ký
        </Button>
      </Form.Item>
      </Loading>
      </Form>
      
      </Modal>
  );
};

export default Registrantion;
