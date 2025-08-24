import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import {Route,Routes} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer';
import Login from './components/LoginPopup/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './Pages/Verify/Verify';


const  App = ()  => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
    {showLogin? <Login setShowLogin={setShowLogin}/>: <></>}
    <div className="app">
        <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element ={<Home/>} />
        <Route path='/cart' element ={<Cart/>} />
        <Route path='/order' element ={<PlaceOrder/>} />
        <Route path='/verify' element={Verify}/>
      </Routes>   
    </div>
    <Footer/>
    <ToastContainer />
    </>

   

  );
}

export default App;

