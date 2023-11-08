import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header/header'
import Footer from './footer/footer'

import "../App.css"

const Layout = () => {
  return (
    <main className='App'>
      <Header/>
      <Outlet/>
      <Footer/>
    </main>
  )
}

export default Layout