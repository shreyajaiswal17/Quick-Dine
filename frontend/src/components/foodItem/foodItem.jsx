import React, { useContext, useState } from "react";
import "./foodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  // props ka destructure

  // const [itemCount, setItemCount] = useState(0);

  // Instead of multiple useState calls, we use one state object to store all cart items:
  const {cartItems, addToCart, removeFromCart,url}= useContext(StoreContext);


  return (
    <div className="food-item">
      <div className="food-item-img-cont">
        <img className="food-item-image" src={url+"/images/"+image} alt="" />
        {/* The DB only stores the filename or path, not the whole image itself in most cases. The <img> tag fetches it from the backend using that path. */}
        

        {/* itemCount */}
        {! cartItems[id]? (
          <img
            className="add"
            onClick={() =>addToCart(id) }
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
                        //  setItemCount(prev=prev+1)
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-des">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;


// ✅ setCartItems (Object-Based Approach) → One state object manages all items dynamically.
// ❌ setItemCount (Individual States) → Multiple states for different items, making it harder to manage.

