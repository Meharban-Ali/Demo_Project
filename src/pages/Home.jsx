import React from 'react'
import { Slider } from '../components/Home/Slider'
import { NewsSlider } from '../components/Home/NewsSlider'
import { HomeContent } from '../components/Home/HomeContent'




export const Home = () => {
  return (
    <div>
      
        <Slider/>
        <NewsSlider/>
        <HomeContent/>        
    </div>
  )
}
