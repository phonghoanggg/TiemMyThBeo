import React, { useState } from 'react'
import { Loading } from '../LoadingComponent/Loading'
import { Button, Form, Input, TreeSelect, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import './index.css'
const DrawerProduct = (props) => {
    const { isLoading, avatar,form, typeModal,handleChangeImg, onSubmitUpdate, onFinishFailed,onFinish } = props
    const [value, setValue] = useState();
    const [nameType, setNameType] = useState();

    const treeData = [
        {
            value: 'spaghetti',
            title: 'Mỳ',
            children: [
                {
                    value: 'spaghettiSpicy',
                    title: 'Mỳ cay',
                },
                {
                    value: 'spaghettiNotSpicy',
                    title: 'Mỳ không cay',
                },
            ],
        },
        {
            value: 'pizza',
            title: 'Pizza',
            children: [
                {
                    value: 'pizzaSeaFood',
                    title: 'Pizza Hải sản',
                },
                {
                    value: 'pizzaClassic',
                    title: 'Pizza Truyền thống',
                },
            ],
        },
        {
            value: 'chicken',
            title: 'Gà',
            children: [
                {
                    value: 'chickenSpicy',
                    title: 'Gà Cay',
                },
                {
                    value: 'chickenNotSpicy',
                    title: 'Gà Không cay',
                },
            ],
        },
    ];
    const onChange = (newValue) => {
        setValue(newValue?.value);
        setNameType(newValue.label)
        console.log("newValue",newValue)
    };
    const onPopupScroll = (e) => {
        console.log('onPopupScroll', e);
    };
    console.log("form",form)
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
                        label=""
                        name="nameType"
                        hidden
                    >
                        <Input  value={nameType}/>
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
                        <TreeSelect
                        showSearch
                        style={{
                            width: '100%',
                        }}
                        value={value}
                        dropdownStyle={{
                            maxHeight: 800,
                            overflow: 'auto',
                        }}
                        placeholder="Chọn kiểu sản phẩm"
                        allowClear
                        treeDefaultExpandAll
                        onChange={(e) => onChange(e)}
                        treeData={treeData}
                        onPopupScroll={onPopupScroll}
                        labelInValue={true}
                    />
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
