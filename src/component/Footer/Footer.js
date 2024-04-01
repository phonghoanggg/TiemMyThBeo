/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './index.css'
import { WhatsAppOutlined, FacebookOutlined} from '@ant-design/icons';
const Footer = () => {
  const iconHotline = document.querySelector(".scroll-top")

  if(iconHotline) {
    iconHotline.style.animation = 'shake 0.5s 2';
  }
  return (
    <div>
      <div class="footer" id="contact">
        <img className='img_footer' src='img/footer_img.jpg'/>
        <div class="wrap_info-footer">
          <div class="contact-content">
            <h4>Đặt hàng ngay tại</h4>
            <div className='wrap_footer'>
            <li>
              <a className='contact_footer' href="https://www.facebook.com/profile.php?id=100009209371813">
                <FacebookOutlined style={{fontSize:"30px"}} /> 
                <span className='footer_text'>NC Việt</span>
              </a>
            </li>
            <li>
                <a className='contact_footer' href="tel:0983952421">
                  <WhatsAppOutlined style={{fontSize:"30px"}} />
                  <span className='footer_text'>0979937284</span>
                </a>
            </li>
            {/* <li><a href="#contact">Toast TakeOut</a></li> */}
            </div>
          </div>
        <div class="last-text">
          <p> 
            <a href='https://www.facebook.com/phong.hoangnghia'>© Developed 2024 by @phonghoang</a> 
          </p>
        </div>
        </div>
      </div>
        <a href="tel:0983952421" class="scroll-top">
            <img className='img_hotline sm:h-14 sm:w-14 h-10 w-10' src='img/hotline.png'/>
          </a>
    </div>
  )
}

export default Footer
