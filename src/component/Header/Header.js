/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import 'tailwindcss/tailwind.css';
import { Avatar, Badge, Popover } from 'antd';
import ThemeContext from '../../hook/CountProvider';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import Registrantion from '../Registration/Registrantion'
import Login from "../LogInPage/LogInPage"
import { useDispatch, useSelector } from 'react-redux';
import *  as UserService from '../../services/UserServices' 
import { resetUser } from '../../redux/slides/userSlide';
import { Loading } from '../LoadingComponent/Loading';
import { useNavigate } from "react-router-dom";



const Header = () => {
  const [scroll, setScroll] = useState(false)
  const [openModalRegister, setOpenModalRegister] = useState(false)
  const [openModalLogin, setOpenModalLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  // const [, ,count] = useContext(ThemeContext)
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    localStorage.removeItem("access_token")
    navigate("/")
    setLoading(false)
  }
  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  },[user?.name, user?.avatar])

  const content = (
    <div>
      <p className='inforItem' onClick={() => navigate("/profile") }>Thông tin cá nhân</p>
      {
        user?.isAdmin && (
          <p className='inforItem' onClick={() => navigate("/admin")}>Quản lý hệ thống</p>
        )
      }
      <p className='inforItem' onClick={handleLogout}>Đăng xuất</p>
    </div>
  );
  
  return (
      <header class={scroll ? 'headerScroll' : 'header' }>
        <a style={{cursor:"pointer"}} class="logo"  onClick={() => navigate("/") }>MỲ <span className='title_logo'>NGON</span></a>
        <a style={{marginRight:"10px"}} onClick={() => navigate("/") } class="logo">
        </a>
        <ul class="navbar">
          <li><a className='navigation' href="#home">Trang chủ</a></li>
          <li><a className='navigation' href="#about">Giới thiệu</a></li>
          <li><a className='navigation' href="#menu">Danh sách</a></li>
          <li><a className='navigation' href="#contact">Liên hệ</a></li>
          <Loading isLoading={loading} > 
          {
             user?.access_token ? (
            <li>
              <Popover className='popverItem' content={content} trigger="hover">
                <span style={{display:"flex", alignItems:"center"}}> {userAvatar ? (<img style={{height:"30px", width:"30px", borderRadius:"99px", objectFit:"cover", marginRight:"5px"}} src={userAvatar} alt='avatar'/>) : (<UserOutlined style={{fontSize:"20px",marginRight:"5px"}} />)}  </span>
                <span style={{cursor:'pointer', fontFamily:"Madimi One, sans-serif", fontSize:"20px"}}>{userName?.length ? userName : user?.email}</span>
              </Popover>
            </li>) : (<li><a className='register' onClick={() => setOpenModalRegister(true)}>Đăng ký</a>/<a className='login' onClick={() => setOpenModalLogin(true)}>Đăng nhập</a></li>)
          }
          </Loading>

          {/* giỏ hàng */}
          {/* <Badge count={count} style={{backgroundColor:"#FF9100", color:"white !important"}}>
          <ShoppingCartOutlined style={{fontSize:30}} />
          </Badge> */}
        </ul>
        {openModalRegister && <Registrantion {...{openModalRegister,setOpenModalRegister}}/> }
        {openModalLogin && <Login {...{openModalLogin,setOpenModalLogin}}/> }
      </header>
  )
}

export default Header
