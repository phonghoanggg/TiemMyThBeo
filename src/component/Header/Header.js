/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import './index.css'
import 'tailwindcss/tailwind.css';
import { Avatar, Badge, Popover, Select } from 'antd';
import ThemeContext from '../../hook/CountProvider';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import Registrantion from '../Registration/Registrantion'
import Login from "../LogInPage/LogInPage"
import { useDispatch, useSelector } from 'react-redux';
import *  as UserService from '../../services/UserServices' 
import { resetUser } from '../../redux/slides/userSlide';
import { Loading } from '../LoadingComponent/Loading';
import { useNavigate } from "react-router-dom";
import qs from 'qs';
import *  as ProductService from '../../services/ProductServices'


const Header = ({isAdminPage}) => {
  const [scroll, setScroll] = useState(false)
  const [openModalRegister, setOpenModalRegister] = useState(false)
  const [openModalLogin, setOpenModalLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const user = useSelector((state) => state.user)
  const {valueSearch,setValueSearch,resultSearch,setResultSearch} = useContext(ThemeContext)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // logic API filter
  const [products, setProducts] = useState([]);
  const typingTimoutRef = useRef(null)
  const handleSearch = (valueChange) => {
    const newValue = valueChange
    if(typingTimoutRef.current) {
      clearTimeout(typingTimoutRef.current)
    }
    typingTimoutRef.current = setTimeout(() => {
      setValueSearch(newValue);
    },300)
  };
  const handleChange =(newValue) => {
    setResultSearch(newValue);
  }
  const fetchAPIGet = async(value) => {
    const query = qs.stringify({
      filter: ['name', value], // Đặt 'name' và giá trị của 'value' vào mảng
    }, { arrayFormat: 'repeat' }); // Đảm bảo định dạng array thành các query params riêng lẻ
    
    try {
      const response = await ProductService.getAllProduct(query)
      setProducts(response.data); 
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  }
  useEffect(() => {
    fetchAPIGet(valueSearch)
  },[valueSearch])
  const fetchTypeProduct = async(value) => {
    try {
      const response = await ProductService.getAllType()
      console.log("1111111",response)
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  }
  useEffect(() => {
    fetchTypeProduct()
  },[])





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
    <header class={scroll ? 'headerScroll' : isAdminPage ? "admin_header" : 'header'}>
      <div className='wrap_header'>
        <div>
          <a style={{ cursor: "pointer" }} class="logo" onClick={() => navigate("/")}>
            {isAdminPage ? (<Fragment>TRANG <span className='title_logo'>ADMIN</span></Fragment>) : (<Fragment>MỲ <span className='title_logo'>NGON</span></Fragment>)}
          </a>
          <a style={{ marginRight: "10px" }} onClick={() => navigate("/")} class="logo">
          </a>
        </div>
          {
            !isAdminPage && <Select
            showSearch
            value={resultSearch}
            placeholder={"Nhập tên sản phẩm"}
            style={{ width: 300 }}
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
            options={[
              ...(resultSearch ? [{ value: 'all', label: 'Tất cả' }] : []),
              ...(products || []).map((d) => ({
                value: d.name,
                label: d.name,
              })),
            ]}
            allowClear
          />
          }
      <ul class="navbar">
        {
          !isAdminPage && (
            <Fragment>
              <li><a className='navigation' href="#home">Trang chủ</a></li>
              <li><a className='navigation' href="#about">Giới thiệu</a></li>
              <li><a className='navigation' href="#menu">Danh sách</a></li>
              <li><a className='navigation' href="#contact">Liên hệ</a></li>
            </Fragment>
          )
        }
        <Loading isLoading={loading} >
          {
            user?.access_token ? (
              <li>
                <Popover className='popverItem' content={content} trigger="hover">
                  <span style={{ display: "flex", alignItems: "center" }}> {userAvatar ? (<img style={{ height: "30px", width: "30px", borderRadius: "99px", objectFit: "cover", marginRight: "5px" }} src={userAvatar} alt='avatar' />) : (<UserOutlined style={{ fontSize: "20px", marginRight: "5px" }} />)}  </span>
                  <span style={{ cursor: 'pointer', fontFamily: "Madimi One, sans-serif", fontSize: "20px" }}>{userName?.length ? userName : user?.email}</span>
                </Popover>
              </li>) : (<li><a className='register' onClick={() => setOpenModalRegister(true)}>Đăng ký</a>/<a className='login' onClick={() => setOpenModalLogin(true)}>Đăng nhập</a></li>)
          }
        </Loading>

        {/* giỏ hàng */}
        {/* <Badge count={count} style={{backgroundColor:"#FF9100", color:"white !important"}}>
          <ShoppingCartOutlined style={{fontSize:30}} />
          </Badge> */}
      </ul>
      {openModalRegister && <Registrantion {...{ openModalRegister, setOpenModalRegister }} />}
      {openModalLogin && <Login {...{ openModalLogin, setOpenModalLogin }} />}
      </div>
    </header>
  )
}

export default Header
