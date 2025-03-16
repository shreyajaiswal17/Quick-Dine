import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="left">
            <img className='logo' src={assets.logo} alt="" />
            <p>Great food, made easy. Browse, order, and enjoy—QuickDine brings the best flavors to your table</p>
            <div className="social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="center">
            <h2>Company</h2>
            <ul>
             <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 68787897</li>
                 <li>quickdine@gmail.com</li>
            </ul>
        </div>
       </div>
       <hr/>
       <p className='copyright'>Copyright 2025 QuickDine.com - All Right Reserved</p>
    </div>
  )
}

export default Footer
