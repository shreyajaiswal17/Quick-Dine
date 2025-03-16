import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
const AppDownload = () => {
  return (
    <div className='app-d' id='app-d'>
      <p>For Better Experience Download <br/> QuickDine App</p>
      <div className="platform">
        <img src={assets.play_store}alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default AppDownload
