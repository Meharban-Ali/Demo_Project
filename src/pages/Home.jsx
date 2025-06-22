import React from 'react'
import { Slider } from '../components/Home/Slider'
import { NewsSlider } from '../components/Home/NewsSlider'
import { HomeContent } from '../components/Home/HomeContent'
import { ContentViewer } from '../components/Home/ContentViewer'




export const Home = () => {
  return (
    <div>
      
        <Slider/>
        <ContentViewer/>
        <NewsSlider/>
        <HomeContent/>        
    </div>
  )
}
