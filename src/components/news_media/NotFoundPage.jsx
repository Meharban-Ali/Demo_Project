import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.5,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Shooting Stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="shooting-star" style={{
          top: '15%',
          left: '-100px',
          animationDelay: '0s'
        }}></div>
        <div className="shooting-star" style={{
          top: '25%',
          left: '-100px',
          animationDelay: '1.5s'
        }}></div>
        <div className="shooting-star" style={{
          top: '35%',
          left: '-100px',
          animationDelay: '3s'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-md mx-auto">
        {/* 404 Number with Planet */}
        <div className="flex items-center justify-center mb-8">
          <span className="text-9xl font-bold text-blue-400">4</span>
          
          {/* Planet */}
          <div className="relative mx-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-600 shadow-lg relative overflow-hidden">
              {/* Planet Surface Details */}
              <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-red-700/70"></div>
              <div className="absolute bottom-1/4 right-1/4 w-6 h-6 rounded-full bg-orange-500/70"></div>
              <div className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full bg-yellow-400/70"></div>
              
              {/* Ring */}
              <div className="absolute -inset-4 border-2 border-gray-400/30 rounded-full rotate-45"></div>
            </div>
          </div>
          
          <span className="text-9xl font-bold text-blue-400">4</span>
        </div>

        {/* Title and Message */}
        <h1 className="text-4xl font-bold mb-4 text-blue-300">Oops! Page Not Found</h1>
        <p className="text-lg text-gray-300 mb-8">
          The page you're looking for seems to have wandered off into space...
        </p>

        {/* Astronaut */}
        <div className="relative h-40 mb-8 flex justify-center">
          <div className="astronaut absolute">
            {/* Helmet */}
            <div className="w-16 h-16 bg-white rounded-full absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="w-12 h-12 bg-gray-900 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-4 bg-blue-300 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
            
            {/* Body */}
            <div className="w-14 h-20 bg-white rounded-t-full absolute top-8 left-1/2 transform -translate-x-1/2">
              <div className="w-4 h-6 bg-blue-400 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2"></div>
            </div>
            
            {/* Arms */}
            <div className="w-6 h-16 bg-white rounded-full absolute top-10 -left-2 transform rotate-45 origin-top"></div>
            <div className="w-6 h-16 bg-white rounded-full absolute top-10 -right-2 transform -rotate-45 origin-top"></div>
            
            {/* Legs */}
            <div className="w-5 h-12 bg-white rounded-full absolute bottom-0 left-3 transform rotate-12 origin-top"></div>
            <div className="w-5 h-12 bg-white rounded-full absolute bottom-0 right-3 transform -rotate-12 origin-top"></div>
            
            {/* Backpack */}
            <div className="w-8 h-10 bg-red-500 rounded-lg absolute top-10 -right-4 z-0"></div>
          </div>
        </div>

        {/* Home Button */}
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-medium transition-colors duration-300"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          Return Home
        </Link>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .shooting-star {
          position: absolute;
          width: 100px;
          height: 2px;
          background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.8));
          border-radius: 50%;
          animation: shooting 3s infinite;
        }
        
        @keyframes shooting {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(100vw) translateY(100px);
            opacity: 0;
          }
        }
        
        .astronaut {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};
