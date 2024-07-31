import React from 'react'
import { Loading } from '../LoadingComponent/Loading'
import { Button, Checkbox, Form, Input, Radio, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import './index.css'
const DrawerUser = (props) => {
    const { isLoading,form, typeModal,handleChangeImg, onSubmitUpdate, onFinishFailed,onFinish,avatar } = props
    console.log("avatar111",avatar)
    return (
        <div>
            <Loading isLoading={isLoading} >
                <Form
                    form={form}
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
                    onFinish={ typeModal === "ADD_USER" ? onFinish : onSubmitUpdate}
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
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        // hidden={typeModal !== "ADD_USER"}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item  
                        label="Quyền Admin"
                        name="isAdmin"
                        rules={[
                            {
                                required: true,
                                message: 'Please check rule Admin!',
                            },
                        ]}> 
                        <Radio.Group>
                            <Radio value={true}>Có</Radio>
                            <Radio value={false}>Không</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ảnh tài khoản"
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your image!',
                            },
                        ]}
                    >
                        <div class="box_upload-img">
                        <Upload onChange={handleChangeImg} maxCount={1} >
                            <Button icon={<UploadOutlined />}>Tải ảnh</Button>
                        </Upload>
                        {avatar && (<img src={avatar} style={{ height: "50px", width: "50px", borderRadius: "99px", objectFit: "cover", marginLeft: "20px" }} alt='avatar' />)}
                        </div>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            {
                                typeModal === "ADD_USER" ? "Thêm" : "Sửa"
                            }
                            
                        </Button>
                    </Form.Item>
                </Form>
            </Loading>
        </div>
    )
}

export default DrawerUser
