import React, { useState, useEffect } from 'react';
import './App.css'
import { Footer } from './components/footer/Footer'
import { Navbar } from './components/navbar/Navbar'
import { Contact } from './pages/Contact'
import {Routes,Route} from "react-router-dom"
import { Home } from './pages/Home';
import { Sampadkiye } from './pages/Sampadkiye';
import { Podcast } from './pages/Podcast';
import { Documentary } from './pages/Documentary';
function App() {

  return (
    <>
    <Navbar/>
    <div className='mt-10'>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/contact/ContactForm' element={<Contact/>} />
      <Route path='/sampadkiye' element={<Sampadkiye/>}/>
      <Route path='/podcast'  element={<Podcast/>}/>
      <Route path='/documentary' element={<Documentary/>}/>
      </Routes>
    </div>
    <Footer/>
    
    </>
  )
}

export default App
