/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import './index.css'
import 'tailwindcss/tailwind.css';

const Header = () => {
  const [scroll, setScroll] = useState(false)
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
  return (
      <header class={scroll ? 'headerScroll' : 'header' }>
        <a  href="#" class="logo">MỲ <span className='title_logo'>NGON</span></a>
        <a href="#" class="logo"><img src="img/logo.png" alt="logo"/></a>
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
