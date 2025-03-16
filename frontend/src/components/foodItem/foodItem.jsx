import React, { useState } from "react";
import "./foodItem.css";
import { assets } from "../../assets/assets";

const FoodItem = ({ id, name, price, description, image }) => {
  // props ka destructure

  const [itemCount, setItemCount] = useState(0);

  return (
    <div className="food-item">
      <div className="food-item-img-cont">
        <img className="food-item-image" src={image} alt="" />
        {/* !itemCount means "if itemCount is falsy" -0 */}
        {!itemCount ? (
          <img
            className="add"
            onClick={() => setItemCount((prev) => prev + 1)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => setItemCount((prev) => prev - 1)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{itemCount}</p>
            <img
              onClick={() => setItemCount((prev) => prev + 1)}
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
