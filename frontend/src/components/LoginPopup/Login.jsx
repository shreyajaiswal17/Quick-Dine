import React, { useState, useContext } from 'react'
import './Login.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({setShowLogin}) => {

  const {url, setToken} = useContext(StoreContext);
  
    const [currState, setCurrState] = useState("Sign Up")
    const[data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler =(event) =>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) => {
      event.preventDefault();
      let newUrl = url;
      if (currState === "Login") {
        newUrl += "/api/user/login"
      } else {
        newUrl += "/api/user/register"
      }

      try {
        const response = await axios.post(newUrl, data, {
          withCredentials: true
        });
        
        if (response.data.success) {
          setShowLogin(false);
          toast.success(currState === "Login" ? "Logged in successfully!" : "Account created successfully!");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("An error occurred. Please try again.");
      }
    }
   
    // At login time → token gets stored.
// When the page reloads or the user visits later → your useEffect reads it from localStorage and restores it into React state (setToken(...)).
// Login request → store token in localStorage → future page loads read it → automatically logged in.

    // It lets you handle all inputs with one function instead of separate functions for each (setName, setEmail, etc.).
    // It works for any number of fields because [name] is dynamic.
  return (  
    <div className='login'>
      <form className="login-container" onSubmit={onLogin}>
        <div className="login-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src ={assets.cross_icon} alt=""/>
        </div>
        <div className="login-input">
            {currState === "Login"?<></>: <input name='name' onChange={onChangeHandler} value={data.name} type ='text' placeholder='Your name' required/>}
           
            <input name='email' onChange={onChangeHandler} value={data.email}  type ='email' placeholder='Your email' required/>
            <input name='password' onChange={onChangeHandler} value={data.password}  type ='password' placeholder='Password' required/>
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condn">
            <input type ='checkbox' required/>
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        
        {currState ==='Login'?<p>Creat a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here </span></p>: <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
         }
        
      </form>
    </div>
  )
}

export default Login


// To site to ek baar load ho gaya
// Data lekin constant nahi hai
// To you can set useEffect timer at 2 sec....to wo har 2 sec pe check karega
// useEffect timer lagaega.....and useState value state update karega
// Is trh se state management hoga