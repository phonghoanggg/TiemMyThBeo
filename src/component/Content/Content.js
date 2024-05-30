/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react'
import './index.css'
import SlideHeader from '../SlideHeader/SlideHeader';
import * as ProductServices from '../../services/ProductServices'
import { useQuery } from 'react-query'
import { ProductCard } from './ProductCard/ProductCard';

const Content = () => {

  const fetchProductAll = async () => {
    const res = await ProductServices.getAllProduct()
    return res
  }
  const {isLoading, data:products } = useQuery(['products'], fetchProductAll, {retry: 3 , retryDelay: 1000})
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
            products?.data.map((item, index) => {
              console.log("item_ketID", item._id)
              return  <ProductCard dataProduct={item} key={item._id} />
            }) 
          }

        </div>

      </section>
    </div>
  )
}

export default Content
