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
import { NewMedia } from './pages/NewMedia';
import { Politics } from './pages/Politics';
import { Business } from './pages/Business';
import { World } from './pages/World';
import { Game } from './pages/Game';
import { Entertainment } from './pages/Entertainment';
import { LifeStyle } from './pages/LifeStyle';
import { Automobile } from './pages/Automobile';
import { Environment } from './pages/Environment';
import { Science } from './pages/Science';
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
      <Route path='/state' element={<NewMedia/>}/>
      <Route path='/politics' element={<Politics/>}/>
      <Route path='/business' element={<Business/>}/>
      <Route path='/world' element={<World/>}/>
      <Route path='/sports' element={<Game/>}/>
      <Route path='/entertainment' element={<Entertainment/>}/>
      <Route path='/lifestyle' element={<LifeStyle/>}/>
      <Route path='/automobile' element={<Automobile/>}/>
      <Route path='/environment' element={<Environment/>}/>
      <Route path='/science' element={<Science/>}/>

      </Routes>
    </div>
    <Footer/>
    
    </>
  )
}

export default App
