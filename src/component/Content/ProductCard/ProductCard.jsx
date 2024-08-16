import React, { useContext } from 'react'
import { Rate } from 'antd';
import {  Button } from 'antd';
import ThemeContext from '../../../hook/CountProvider';

const ButtonGroup = Button.Group;
export const ProductCard = ({...props}) => {
    const {dataProduct} = props
    const [increase,decline,] = useContext(ThemeContext)
  return (
      <div>
          <div className="row">
              <div className='product_img'>
                {
                    dataProduct.image && <img className='img_pasta-best' src={dataProduct.image} alt="main-product4" />
                }
              </div>
              <div className="menu-text">
                  <div className="menu-left">
                      <h4>{dataProduct.title}</h4>
                  </div>
                  <div className="menu-right">
                      <h5>{dataProduct.price}</h5>
                  </div>
              </div>
              <p>{dataProduct.description}</p>
              <div className='wrapRate'>
                  <Rate disabled allowHalf defaultValue={dataProduct.rating < 6 ? dataProduct.rating : 5} />
              </div>
          </div>
      </div>
  )
}
