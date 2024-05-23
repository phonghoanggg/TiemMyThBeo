/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react'
import './index.css'
import { Rate } from 'antd';
import SlideHeader from '../SlideHeader/SlideHeader';
import { MinusOutlined, PlusOutlined, QuestionOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Switch, Space } from 'antd';
import ThemeContext from '../../hook/CountProvider'

const ButtonGroup = Button.Group;
const Content = () => {

  const dataProduct = [
    {
      id:1,
      img:"img/my_bo.png",
      title:"Mỳ sốt bò bằm",
      description:"Sốt thịt bò bằm đặc trưng kết hợp cùng mỳ Ý.",
      price:"$59.000",
      start:"5"
    },
    {
      id:2,
      img:"img/my_cay-xx.png",
      title:"Mỳ cay xúc xích",
      description:"Mỳ Ý rán với xúc xích cay, thảo mộc, ngò gai và húng quế Ý.",
      price:"$59.000",
      start:"5"
    },
    {
      id:3,
      img:"img/my_giam-bong.png",
      title:"Mỳ giăm bông và nấm sốt kem",
      description:"Mỳ Ý, nấm và giăm bông được nấu cùng với sốt kem trắng.",
      price:"$59.000",
      start:"5"
    },
    {
      id:4,
      img:"img/my_chay.png",
      title:"Mỳ Ý Chay Sốt Marinara",
      description:"Mỳ Ý áp chảo với sốt Marinara, nấm và cà chua đỏ.",
      price:"$49.000",
      start:"4"
    }
  ]

  const [increase,decline,] = useContext(ThemeContext)


  return (
    <div>
        <SlideHeader/>
        <section class="container">
          <div class="main-text">
            <h2>Nguyên liệu</h2>
            <p>Tinh túy cho hương vị đích thực</p>
          </div>
          <div class="container-box">
            <div class="c-mainbox">
              <div style={{height:"100%", display:"flex", alignItems:"center"}} class="container-img">
                <img style={{height:"72px", width: "auto"}} src="img/pasta.png" alt="box1"/>
              </div>
              <div class="container-text">
                <p>Mỳ ý và nui</p>
              </div>
            </div>

            <div class="c-mainbox">
              <div class="container-img">
                <img src="img/b2.png" alt="box2"/>
              </div>
              <div class="container-text">
                <p>Cà chua</p>
              </div>
            </div>

            <div class="c-mainbox">
              <div class="container-img">
                <img src="img/b3.png" alt="box3"/>
              </div>
              <div class="container-text">
                <p>Phô mai bột</p>
              </div>
            </div>

            <div class="c-mainbox">
              <div class="container-img">
                <img src="img/b4.png" alt="box4"/>
              </div>
              <div class="container-text">
                <p>Xúc xích ý</p>
              </div>
            </div>
          </div>
        </section>
        <section class="about" id="about">
          <div class="about-img">
            <div className='product_img'>
              <img className='img_pasta-best' src="img/my_tom-cachua.png" alt=""/>
            </div>
            <img className='img_best-seller' src="img/best-seller-2.png" alt=""/>
          </div>

          <div class="about-text">
            <h2>Mỳ tôm sốt kem cà chua</h2>
            <p>Sự tươi ngon của tôm kết hợp với sốt kem cà chua</p>
            <a href="#contact" class="btn">Mua ngay</a>
          </div>

        </section>
        {/* menu list */}
        <section class="menu" id="menu">
        <div class="main-text">
          <h2>Menu mỳ ý</h2>
          <p>Khám phá hương vị Ý tinh tế với mỳ pasta và sốt đậm đà </p>
        </div>

        <div class="menu-content">
          {
            dataProduct.map((item, index) => {
              return (
                  <div key={index} class="row">
                    <div  className='product_img'>
                      <img  className='img_pasta-best' src={item.img} alt="main-product4"/>
                    </div>
                    <div class="menu-text">
                      <div class="menu-left">
                        <h4>{item.title}</h4>
                      </div>
                      <div class="menu-right">
                        <h5>{item.price}</h5>
                      </div>
                    </div>
                    <p>{item.description}</p>
                    <div className='wrapRate'>
                    <Rate disabled allowHalf defaultValue={item.start} />
                      <ButtonGroup>
                        <Button onClick={decline} icon={<MinusOutlined />} />
                        <Button onClick={increase} icon={<PlusOutlined />} />
                      </ButtonGroup>
                    </div>
                  </div>
              )
            }) 
          }

        </div>

      </section>
    </div>
  )
}

export default Content
