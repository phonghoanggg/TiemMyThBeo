import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import *  as ProductService from '../../../services/ProductServices'
import { Carousel } from 'antd'
import './index.css'

export const ProductDetail = () => {
  const param = useParams()
  const [inforProduct, setInforProduct] = useState()

  const fetchDataDetail = async (id) => {
    const res = await ProductService.getDetailProduct(id)
    setInforProduct(res.data)
  }
  useEffect(() => {
    fetchDataDetail(param.id)
  }, [param.id])
  console.log("inforProduct", inforProduct)
  return (
    <div className='content_detail-box-box'>
      <div className='content_detail'>
        <div className='container tcontainer-text-block content_detail-box'>
          <img className='img_detail' src={inforProduct?.image} alt="" />
          <div>
            <div className='content_detail-right'>
              <p className='detail_title'>Mỳ tôm chua cay</p>
              <p className='new_price'>59.000 <span className='unit_price'>VNĐ</span></p>
              <p className='old_price'>89.000 <span className='unit_old'>VNĐ</span></p>
              <a href="#contact" class="btn_detail">Mua ngay</a>
            </div>
          </div>
        </div>
      </div>
      <div className='menu_detail'>
        <div className='menu_detail container'>
          <div className='title_detail-menu'>
            <p className='title'>Các món ăn cùng thực đơn</p>
            <div className='menu_detail-list'>
              <div className='menu_detail-item'>
                <img className='menu_detail-item-img' src={inforProduct?.image} alt="" />
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
