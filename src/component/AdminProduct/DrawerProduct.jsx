import React from 'react'
import { Loading } from '../LoadingComponent/Loading'
import { Button, Form, Input, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import './index.css'
const DrawerProduct = (props) => {
    const { isLoading, avatar,form, typeModal,handleChangeImg, onSubmitUpdate, onFinishFailed,onFinish } = props
    console.log("avatar",avatar)
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
                    onFinish={ typeModal === "ADD_PRODUCT" ? onFinish : onSubmitUpdate}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên sản phẩm"
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
                                typeModal === "ADD_PRODUCT" ? "Thêm" : "Sửa"
                            }
                            
                        </Button>
                    </Form.Item>
                </Form>
            </Loading>
        </div>
    )
}

export default DrawerProduct
