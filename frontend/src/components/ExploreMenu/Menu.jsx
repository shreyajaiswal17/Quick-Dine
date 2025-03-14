import React from 'react'
import './Menu.css'
import { menu_list } from '../../assets/assets.js'; 

function Menu({category,setCategory}) {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Discover a variety of delicious dishes crafted to satisfy every craving. From sizzling appetizers to mouth-watering main courses and delightful desserts, we have something for everyone.</p>

{/* assests mai sei map krke  */}
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
            return (
                 <div onClick ={()=>setCategory(prev=>prev === item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-items'>
                    <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=''/>
                    <p>{item.menu_name}</p>
                 </div>
            )
        })}
      </div>

      <hr/>
      
    </div>
  )
}

export default Menu
