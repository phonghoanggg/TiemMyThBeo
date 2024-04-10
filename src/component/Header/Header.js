/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import 'tailwindcss/tailwind.css';
import { Avatar, Badge } from 'antd';
import ThemeContext from '../../hook/CountProvider';
import { ShoppingCartOutlined } from '@ant-design/icons';
const Header = () => {
  const [scroll, setScroll] = useState(false)
  const [, ,count] = useContext(ThemeContext)
  useEffect(() =>{
    const hanldeScroll = () => {
      const isScroll = window.scrollY > 100
      setScroll(isScroll)
    }
    window.addEventListener('scroll', hanldeScroll)
    return () => {
      window.addEventListener('scroll', hanldeScroll)
    }
  },[])
  console.log("count",count)
  return (
      <header class={scroll ? 'headerScroll' : 'header' }>
        <a  href="#" class="logo">MỲ <span className='title_logo'>NGON</span></a>
        <a style={{marginRight:"10px"}} href="#" class="logo">
        <Badge count={count} style={{backgroundColor:"#FF9100", color:"white !important"}}>
          <ShoppingCartOutlined style={{fontSize:30}} />
        </Badge>
        </a>
        <ul class="navbar">
          <li><a className='navigation' href="#home">Trang chủ</a></li>
          <li><a className='navigation' href="#about">Giới thiệu</a></li>
          <li><a className='navigation' href="#menu">Danh sách</a></li>
          <li><a className='navigation' href="#contact">Liên hệ</a></li>
        </ul>
      </header>
  )
}

export default Header
