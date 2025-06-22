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
import { Team } from './pages/Team';
import { News } from './pages/News';
import { About } from './pages/About';
import { Terms } from './pages/Terms';
import { NotFound } from './pages/NotFound';
import { Privacy } from './pages/Privacy';
import { Feedback } from './pages/Feedback';
import { Login } from './pages/Login';
import { ForgetPassword } from './pages/ForgetPassword';
import { AdminContact } from './pages/AdminContact';
import {PrivateRoute} from './components/PrivateRoutes/PrivateRoute'
import { Dashboard } from './pages/Dashboard';
import { ErrorPage } from './pages/ErrorPage';
import { CategoryManager } from './components/admin/adminDashboard/CategoryManager';
import { ContentManager } from './components/admin/adminDashboard/ContentManager';
import { ContentDetail } from './components/Home/ContentDetail';
import { NewsContentDetails } from './components/news_media/contentDetails/NewsContentDetails';


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
      <Route path='/team' element={<Team/>}/>
      <Route path='/news' element={<News/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/terms' element={<Terms/>}/>
      <Route path='/notfound' element={<NotFound/>}/>
      <Route path='/privacy' element={<Privacy/>}/>
      <Route path='/feedback' element={<Feedback/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='/forgetPassword' element={<ForgetPassword/>}/>
      <Route path='/contact-admin' element={<AdminContact/>}/>
      <Route path='/errorPage' element={<ErrorPage/>}/>
      <Route path='/category' element={<CategoryManager/>}/>
      <Route path='/content' element={<ContentManager/>}/>
      <Route path='/content/:id' element={<ContentDetail/>}/>
      <Route path='/content/:id' element={<NewsContentDetails/>}/>
      {/* Protected Admin Route */}
      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/adminDashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
    <Footer/>
    
    </>
  )
}

export default App
