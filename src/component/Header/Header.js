/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import './index.css'
import 'tailwindcss/tailwind.css';
import { Carousel } from 'antd';
import Icon from '@ant-design/icons';
import { Button, Navbar } from 'react-bootstrap'; 
const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);
const HeartIcon = (props) => <Icon component={HeartSvg} {...props} />;
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
    <div>
      <header class={scroll ? 'headerScroll' : 'header' }>
        <a  href="#" class="logo">Mỳ <span>Ngon</span></a>
        <a href="#" class="logo"><img src="img/logo.png" alt="logo"/></a>
        <ul class="navbar">
          <li><a className='navigation' href="#home">Home</a></li>
          <li><a className='navigation' href="#about">About</a></li>
          <li><a className='navigation' href="#menu">Menu</a></li>
          <li><a className='navigation' href="#contact">Contact</a></li>
        </ul>
      </header>
      <section class="md:grid md:grid-cols-4" id="home">
        <div class="home-text md:col-span-2 mb-5 md:mb-0 flex items-center">
          <div>
            <h1><span>Chào mừng</span> bạn đến với tiệm mỳ ngon của chúng tôi   <HeartIcon style={{ color: 'hotpink',}} /> !</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing. <br/> Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            <a href="#" class="btn">Choose a Pizza</a>
          </div>
        </div>
        <div class='md:col-span-2'>
          <Carousel autoplay speed={500} >
          <div className='wrap_img-header'>
            <img className='h-full  max-h-[750px] object-contain' src='./img/slide1.jpg'/>
          </div>
          <div className='wrap_img-header'>
            <img className='h-full  max-h-[750px] object-contain' src='./img/slide6.jpg'/>
          </div>
          <div className='wrap_img-header'>
            <img className='h-full  max-h-[750px] object-contain' src='./img/slide5.jpg'/>
          </div>
          <div className='wrap_img-header'>
            <img className='h-full  max-h-[750px] object-contain' src='./img/slide4.jpg'/>
          </div>
          </Carousel>

        </div>
      </section>
    </div>
  )
}

export default Header
