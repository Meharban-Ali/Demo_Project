import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3",
      title: "प्राकृतिक सौंदर्य",
      content: "प्रकृति की सुंदरता का अनुभव करें और ताजगी भरी हवा का आनंद लें।"
    },
    {
      image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3",
      title: "शहरी जीवन",
      content: "आधुनिक शहरी जीवन की गतिशीलता और सुविधाओं का अनुभव करें।"
    },
    {
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3",
      title: "यात्रा का आनंद",
      content: "नई जगहों की खोज करें और यादगार अनुभवों का संग्रह करें।"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto my-10 overflow-hidden rounded-xl shadow-2xl">
      {/* Slider container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full flex flex-col md:flex-row">
            {/* Image Section (Left side on desktop, top on mobile) */}
            <div className="w-full md:w-1/2 h-40 md:h-28">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            
            {/* Content Section (Right side on desktop, bottom on mobile) */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-10 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                {slide.title}
              </h2>
              <p className="text-gray-600 mb-6">
                {slide.content}
              </p>
              <button className="self-start bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-300">
                अधिक जानें
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10"
        aria-label="Next slide"
      >
        <FiChevronRight size={24} />
      </button>
      
      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-blue-600 w-6' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};