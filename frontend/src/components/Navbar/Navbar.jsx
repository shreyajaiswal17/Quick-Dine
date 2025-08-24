import React, { useContext, useState } from 'react';
import './Navbar.css';
// import 'boxicons'
import { assets } from '../../assets/assets.js'; 
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home")

  const {getTotalCartAmount, token, setToken} = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  const handleMenuClick = () => {
    setMenu("menu");
    navigate("/");
    // Small delay to ensure navigation completes before scrolling
    setTimeout(() => {
      const element = document.getElementById('explore-menu');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleMobileAppClick = () => {
    setMenu("mobile-app");
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById('app-d');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleContactClick = () => {
    setMenu("contact-us");
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById('footer');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className='navbar'>
      <Link to ='/'><img src={assets.logo} alt="Logo" className='logo'/> </Link>
      <ul className="navbar-menu">

      {/* Use <Link> for navigating within a React app without refreshing the page. */}
      
        <Link to='/' onClick={()=>setMenu("home")} className = {menu == "home"?"active":""}>Home</Link>

        <a href="#" onClick={handleMenuClick} className = {menu =="menu"?"active":""}>Menu</a>
        

        <a href="#" onClick={handleMobileAppClick} className = {menu == "mobile-app"?"active":""}>Mobile-app</a>
        <a href="#" onClick={handleContactClick} className = {menu == "contact-us"?"active":""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img  src={assets.search_icon} alt="" />
        {/* <box-icon name='search'></box-icon> */}
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt =""/></Link>
           <div className ={getTotalCartAmount()===0 ? "" : "dot"}></div>
        </div>

        {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>:
        <div className="navbar-profile">
          <img src={assets.profile_icon} alt=''/>
          <ul className='navbar-profile-dropdown'>
            <li><img src={assets.bag_icon} alt=""/><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
        </div>

        }
          
        
      </div>
    </div>
  );
};

export default Navbar;
