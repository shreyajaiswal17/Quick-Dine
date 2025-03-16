import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Menu from '../../components/ExploreMenu/Menu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'



function Home() {

  // UI updates dynamically, React updates UI when category changes
  const [category, setCategory] =  useState("All")
  // is used to show all menu items before any category is selected.
  return (
    <div>

      <Header/>
      <Menu  category={category}  setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      
    </div>
  )
}

export default Home

// If Menu needs to change the category, it cannot directly modify the state in App.js (because child components cannot modify parent states).
// Instead, we pass setCategory as a prop, so Menu can update the parent state when a user clicks a category