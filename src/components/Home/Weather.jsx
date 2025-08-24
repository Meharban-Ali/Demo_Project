// Weather.js - Weather component
import React, { useState, useEffect } from 'react';
import Clock from './Clock';

const Weather = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    condition: "Sunny",
    humidity: 65,
    windSpeed: 12,
    location: "New Delhi, IN",
    feelsLike: 30,
    icon: "sun"
  });
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setWeatherData({
        temperature: 28 + Math.floor(Math.random() * 4 - 2),
        condition: "Sunny",
        humidity: 65 + Math.floor(Math.random() * 10 - 5),
        windSpeed: 12 + Math.floor(Math.random() * 5 - 2),
        location: "New Delhi, IN",
        feelsLike: 30 + Math.floor(Math.random() * 4 - 2),
        icon: "sun"
      });
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [weatherData]);
  
  const getWeatherIcon = (icon) => {
    const icons = {
      sun: "fa-sun",
      cloud: "fa-cloud",
      rain: "fa-cloud-rain",
      snow: "fa-snowflake"
    };
    
    return icons[icon] || "fa-sun";
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Weather</h2>
          <p className="text-gray-600">{weatherData.location}</p>
        </div>
        <div className="text-4xl text-yellow-500">
          <i className={`fas ${getWeatherIcon(weatherData.icon)}`}></i>
        </div>
      </div>
      
      <div className="mt-6 flex items-center">
        <div className="text-5xl md:text-6xl font-bold text-gray-800">{weatherData.temperature}°C</div>
        <div className="ml-4">
          <div className="text-xl font-semibold text-gray-700">{weatherData.condition}</div>
          <div className="text-gray-600">Feels like {weatherData.feelsLike}°C</div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <i className="fas fa-tint text-blue-500 text-xl mr-2"></i>
          <div>
            <div className="text-gray-600">Humidity</div>
            <div className="font-semibold text-gray-800">{weatherData.humidity}%</div>
          </div>
        </div>
        <div className="flex items-center">
          <i className="fas fa-wind text-gray-500 text-xl mr-2"></i>
          <div>
            <div className="text-gray-600">Wind</div>
            <div className="font-semibold text-gray-800">{weatherData.windSpeed} km/h</div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-100">
        <Clock />
      </div>
    </div>
  );
};

export default Weather;