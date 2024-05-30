import React, { useContext } from 'react'
import { Rate } from 'antd';
import { MinusOutlined, PlusOutlined, QuestionOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Switch, Space } from 'antd';
import ThemeContext from '../../../hook/CountProvider';

const ButtonGroup = Button.Group;
export const ProductCard = ({...props}) => {
    const {dataProduct} = props
    const [increase,decline,] = useContext(ThemeContext)

    console.log("data",dataProduct)
  return (
      <div>
          <div class="row">
              <div className='product_img'>
                  <img className='img_pasta-best' src={dataProduct.img} alt="main-product4" />
              </div>
              <div class="menu-text">
                  <div class="menu-left">
                      <h4>{dataProduct.title}</h4>
                  </div>
                  <div class="menu-right">
                      <h5>{dataProduct.price}</h5>
                  </div>
              </div>
              <p>{dataProduct.description}</p>
              <div className='wrapRate'>
                  <Rate disabled allowHalf defaultValue={4} />
                  <ButtonGroup>
                      <Button onClick={decline} icon={<MinusOutlined />} />
                      <Button onClick={increase} icon={<PlusOutlined />} />
                  </ButtonGroup>
              </div>
          </div>
      </div>
  )
}
