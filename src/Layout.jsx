import React from 'react'
import Header from './Components/Header/Header'
import { Outlet } from 'react-router-dom'
import SideBar from './Components/Sidebar/SideBar'
function Layout() {
  return (
    <div className="w-90 h-90">
    <Header/> 
    <div className='flex flex-row'>
      <SideBar/>
      <Outlet />
    </div>
    
    
     
    </div>
  )
}

export default Layout