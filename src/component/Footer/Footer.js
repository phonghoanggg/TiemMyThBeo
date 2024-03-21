/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './index.css'
import { ArrowUpOutlined,InstagramOutlined ,WhatsAppOutlined, FacebookOutlined} from '@ant-design/icons';
const Footer = () => {
  return (
    <div>
      <div class="footer" id="contact">
        <img className='img_footer' src='img/footer_img.jpg'/>
        <div class="wrap_info-footer">
          <div class="contact-content">
            <h4>Follow Us</h4>
            <div className='wrap_footer'>
            <li><a href="#home"><InstagramOutlined  style={{fontSize:"30px"}} /></a></li>
            <li><a href="#about"><WhatsAppOutlined style={{fontSize:"30px"}} /></a></li>
            <li><a href="#menu"><FacebookOutlined style={{fontSize:"30px"}} /></a></li>
            {/* <li><a href="#contact">Toast TakeOut</a></li> */}
            </div>
          </div>
        <div class="last-text">
          <p>© Developed 2024 by @phonghoang</p>
        </div>
        </div>
      </div>
      
        <a href="#home" class="scroll-top">
          <ArrowUpOutlined />
        </a>
    </div>
  )
}

export default Footer
