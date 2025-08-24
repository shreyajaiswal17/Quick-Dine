import React, { useContext, useEffect, useState } from 'react'
import "./PlaceOrder.css";
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function PlaceOrder() {

  const{getTotalCartAmount,token, food_list,cartItems,url} = useContext(StoreContext)
  const navigate = useNavigate()

  const[data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zip:"",
    country:"",
    phone:"",
  })

  const placeOrder =async(event) =>{
    event.preventDefault();
    let orderItems =[];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
       let itemInfo = item;
       itemInfo["quantity"] = cartItems[item._id];
       orderItems.push(itemInfo);
      }
    });
    let orderData ={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()===0?0: getTotalCartAmount()+2,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  }



  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate("/cart")
    }
  },[token])


// whenever data is updated it executes just for checking
// “Side effects” = anything that happens outside React’s normal rendering, like:
// Fetching data from an API (with axios),Storing / reading values from localStorage

  // useEffect(() => {
  //   console.log(data)
  // }, [data]);

  const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData({...data,[e.target.name]:e.target.value})
  }

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>      
        <div className="mutil-field">
          <input required name='firstName' onChange={onChangeHandler} type="text" value={data.firstName} placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} type="text" value={data.lastName} placeholder='Last Name'/>

        </div>
        <input required name='email' onChange={onChangeHandler} type='email' value={data.email} placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} type='text' value={data.street} placeholder='Street'/>
         <div className="mutil-field">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State'/>

        </div>
         <div className="mutil-field">
          <input required name='zip' onChange={onChangeHandler} value={data.zip} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country'/>

        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text"placeholder='Phone' />
      </div>

      <div className="place-order-right">
         <div className="cart-total">
          <h2>Cart Total</h2>

       <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <p>Delivery</p>
            <p>${getTotalCartAmount()===0?0:2}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount()===0?0: getTotalCartAmount()+2}</b>
          </div>

          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}


export default PlaceOrder;
