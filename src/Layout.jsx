import React from 'react'
import Header from './Components/Header/Header'
import { Outlet } from 'react-router-dom'
import { LoadingVideo } from './Components/LoadingPage/LoadingComponents'
import SideBar from './Components/Sidebar/SideBar'
function Layout() {
  return (
    <div className="w-max h-max">
    <Header/> 
    <div className='flex flex-row'>
      <SideBar/>
      <Outlet />
    </div>

    </div>
  )
}

export default Layout