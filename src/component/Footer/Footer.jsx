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
        <img className='img_footer' src='.img/footer_img.jpg'/>
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
        </div>
        </div>
      </div>
        {/* <a  href='https://docs.google.com/forms/d/e/1FAIpQLSfCbpEFvhg3lMyeo1CaAYkTH9xo19ySoogdtUfsE10jPQ8o0g/viewform?usp=sf_link' class="scroll-top">
            <img style={{borderRadius:"99px"}} className='img_hotline h-14 w-14' src='img/cart.jpg'/>
        </a> */}
    </div>
  )
}

export default Footer
