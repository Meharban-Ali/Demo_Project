// App.js - Main component that uses both Weather and CricketScores
import React from 'react';
import Weather from './Weather';
import CricketScores from './CricketScores';

const LiveScoreWeatherWidget = () => {
  return (
    <div className="min-h-screen gradient-bg p-4 md:p-8">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-6">
          Weather & Cricket Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Live updates on weather conditions and cricket scores
        </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Weather Section */}
        <div>
          <Weather />
        </div>
        
        {/* Cricket Scores Section */}
        <div>
          <CricketScores />
        </div>
      </div>
      
      <footer className="text-center text-gray-500 text-sm mt-12 pb-6">
        <p>Designed by Meharban Fullstack Developer • Data updates simulated for demonstration</p>
      </footer>
    </div>
  );
};

export default LiveScoreWeatherWidget;