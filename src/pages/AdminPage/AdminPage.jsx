import React, { Fragment, useRef, useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Header from '../../component/Header/Header';
import AdminUser from '../../component/AdminUser/AdminUser';
import AdminProduct from '../../component/AdminProduct/AdminProduct';
import './index.css'

const items = [
  {
    key: 'manage',
    icon: <AppstoreOutlined />,
    label: 'Quản lý chức năng',
    children: [
      {
        key: 'user',
        label: 'Người dùng',
      },
      {
        key: 'product',
        label: 'Sản phẩm',
      },
    ],
  },
];
const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);

export const AdminPage = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);

  const [keyTab, setKeyTab] = useState("user")

  const handleClickMenu =({key}) => {
    setKeyTab(key)
  }
  const renderChil = (key) => {
    switch(key) {
      case "user": 
      return (<AdminUser/>)
      case "product":
        return (<AdminProduct/>)
      default: 
        return (<></>)
    }
  }
  return (
    <div class="bg-white" style={{backgroundColor:"#fff"}}>
        <Header  isAdminPage ={true} />
      <div className='ad_content' style={{ display: "flex" }}>
        <div style={{ display: 'flex', height: "100vh", boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}>
          <Menu
            mode="inline"
            style={{
              width: 256,
            }}
            items={items}
            defaultSelectedKeys={['user']}
            defaultOpenKeys={['manage']}
            onClick={handleClickMenu}
          />
        </div>
        {
          renderChil(keyTab)
        }
      </div>
    </div>
  )
}
