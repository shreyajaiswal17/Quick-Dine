import React, { useContext, useState } from 'react';
import './Navbar.css';
// import 'boxicons'
import { assets } from '../../assets/assets.js'; 
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home")

  const {getTotalCartAmount} = useContext(StoreContext);

  return (
    <div className='navbar'>
      <Link to ='/'><img src={assets.logo} alt="Logo" className='logo'/> </Link>
      <ul className="navbar-menu">

      {/* Use <Link> for navigating within a React app without refreshing the page. */}
      
        <Link to='/' onClick={()=>setMenu("home")} className = {menu == "home"?"active":""}>Home</Link>

        <a href='#explore-menu' onClick={()=>setMenu("menu")} className = {menu =="menu"?"active":""}>Menu</a>
        

        <a href='#app-d'onClick={()=>setMenu("mobile-app")} className = {menu == "mobile-app"?"active":""}>Mobile-app</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className = {menu == "contact-us"?"active":""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img  src={assets.search_icon} alt="" />
        {/* <box-icon name='search'></box-icon> */}
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt =""/></Link>
           <div className ={getTotalCartAmount()===0 ? "" : "dot"}></div>
        </div>
          <button onClick={()=>setShowLogin(true)}>Sign In</button>
        
      </div>
    </div>
  );
};

export default Navbar;
