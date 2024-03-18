/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import './index.css'
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
      <header className={scroll ? 'headerScroll' : 'header' }>
        <a  href="#" class="logo">Food<span>Fun</span></a>
        <a href="#" class="logo"><img src="img/logo.png" alt="logo"/></a>
        <ul class="navbar">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </header>
      <section class="home" id="home">
        <div class="home-text">
          <h1><span>Welcome</span> to The world of Tasty & Fresh Pizza</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing. <br/> Lorem ipsum dolor sit amet consectetur adipisicing.</p>
          <a href="#" class="btn">Choose a Pizza</a>
        </div>

        <div class="home-img">
          <img src="img/home.png" alt="home"/>
        </div>
      </section>
    </div>
  )
}

export default Header
