import React from 'react'
import Header from './Components/Header'
import { Outlet } from 'react-router-dom'
import { LoadingVideo } from './Components/LoadingComponents'
import SideBar from './Components/Home/Sidebar/SideBar'
function Layout() {
  return (
    <div>
    <Header/> 
     <LoadingVideo/>
    <Outlet />
    <SideBar/>

    </div>
  )
}

export default Layout