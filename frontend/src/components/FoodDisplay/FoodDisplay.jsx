import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItemSimple.jsx'

const FoodDisplay = ({ category, foods = null }) => {
  const { food_list } = useContext(StoreContext)

  const displayedFoods = foods ?? food_list

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Disher near you</h2>

      <div className='food-display-list'>
        {displayedFoods
          .filter(item => category === 'All' || category === item.category)
          .map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
      </div>
      {displayedFoods.length === 0 && (
        <p className="food-display-empty">
          No foods matched that search. Try fewer details.
        </p>
      )}
    </div>
  )
}


export default FoodDisplay
