/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import './index.css'
import 'tailwindcss/tailwind.css';
import { Carousel } from 'antd';
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
        <a  href="#" class="logo">Food<span>Fun</span></a>
        <a href="#" class="logo"><img src="img/logo.png" alt="logo"/></a>
        <ul class="navbar">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </header>
      <section class="md:grid md:grid-cols-4" id="home">
        <div class="home-text md:col-span-2 mb-5 md:mb-0 flex items-center">
          <div>
            <h1><span>Welcome</span> to The world of Tasty & Fresh Pizza</h1>
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
