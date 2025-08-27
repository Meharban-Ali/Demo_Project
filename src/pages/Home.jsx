import React from 'react'
import { Slider } from '../components/Home/Slider'
import { NewsSlider } from '../components/Home/NewsSlider'
// import { HomeContent } from '../components/Home/HomeContent'
import { ContentViewer } from '../components/Home/ContentViewer'
import { ModernCategoriesComponent } from '../components/Home/ModernCategoriesComponent '
import LiveScoreWeatherWidget from '../components/Home/LiveScoreWeatherWidget'





export const Home = () => {
  return (
    <div>
      
        <ModernCategoriesComponent/>
        <Slider/>
        <ContentViewer/>
        <NewsSlider/>
        <LiveScoreWeatherWidget/>       
    </div>
  )
}
