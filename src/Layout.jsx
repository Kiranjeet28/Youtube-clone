import React from 'react'
import Header from './Components/Header'
import List from './Components/List'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    <Header/>
   
    <Outlet />
    </>
  )
}

export default Layout