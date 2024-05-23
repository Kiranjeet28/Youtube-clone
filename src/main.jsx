import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Search from './Components/Search/Search.jsx'
import Watch from './Components/Watch/Watch.jsx'
import { SocketProvider } from './Components/Videoconfrig/Context/SocketProvider.jsx'
import Lobby from './Components/Videoconfrig/Screen/Lobby.jsx'
import Room from './Components/Videoconfrig/Screen/Room.jsx'
import PrivateRoute from './PrivateRouter/PrivateRoute.jsx'
import { AuthProvider } from './PrivateRouter/AuthContext.jsx'
import Login from './Components/RegistorSign/Auth/Login.jsx'
import Register from './Components/RegistorSign/Auth/Register.jsx'
import MainRL from './Components/RegistorSign/MainRL.jsx'
import Sub from './Components/SubList/Sub.jsx'
import HistoryUI from './Components/History/HistroyUI.jsx'
import ListOfFav from './Components/Favourite/ListOfFav.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<Layout/>} >
      <Route path='' element= {<Home/>}  />
      <Route path='/Search/:urlQuery' element={<Search/>}/>
      <Route
        path='/Watch/:id'
        element={<Watch/>}
      />
      <Route path='/register' element={<Register/>}/>
      <Route path='/Sign' element={<Login/>} />
      <Route element={<PrivateRoute/>}>
      <Route path='/Subscriptions' element={<Sub/>}/>
      <Route path='/History' element={<HistoryUI/>}/>
      <Route path='/Favourite' element={<ListOfFav/>}/>
      <Route path='/Lobby' element={<Lobby/>} />
      <Route path='/room/:roomId' element={<Room/>} />
      </Route>
      <Route path='/MainRL' element={<MainRL/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <SocketProvider>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    </SocketProvider>
    
)