import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Components/Home/Home.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>} >
      <Route path='' element= {<Home/>}  />
      <Route path='Short' element={null} />
      <Route path='Subscriptions' element={null} />
      <Route path='YourChannel' element={null} />
      <Route path='History' element={null} />
      <Route path='YourVideo' element={null} />
      <Route path='WatchLater' element={null} />
      <Route path='Trending' element={null} />
      <Route path='Shopping' element={null} />
      <Route path='Music' element={null} />
      <Route path='Films' element={null} />
      <Route path='Live' element={null} />
      <Route path='Gaming' element={null} />
      <Route path='News' element={null} />
      <Route path='Sport' element={null} />
      <Route path='Courses' element={null} />
      <Route path='Fashion & beauty' element={null} />
      <Route path='YouTubePremium' element={null} />
      <Route path='YouTubeStudio' element={null} />
      <Route path='YouTubeMusic' element={null} />
      <Route path='YouTubeKids' element={null} />

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)