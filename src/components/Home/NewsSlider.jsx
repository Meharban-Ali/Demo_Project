import React, { useState, useEffect } from 'react';

export const NewsSlider = () => {
  // Data configuration
  const config = {
    mainSlider: [
      {
        img: "https://res.cloudinary.com/dh3os5xi2/image/upload/v1743108285/news1_hkbyxb.jpg",
        category: "राजनीति",
        date: "जनवरी 01, 2025",
        title: "Sanctus amet sed amet ipsum lorem"
      },
      {
        img: "https://res.cloudinary.com/dh3os5xi2/image/upload/v1743108285/news1_hkbyxb.jpg",
        category: "देश",
        date: "जनवरी 01, 2045",
        title: "Dolores et erat et elitr sea sed"
      }
    ],
    tabs: {
      popular: [
        { img: "https://res.cloudinary.com/dh3os5xi2/image/upload/v1743108285/news1_hkbyxb.jpg", title: "Bitcoin price raise after fall", date: "01 जनवरी 2025" },
        { img: "https://res.cloudinary.com/dh3os5xi2/image/upload/v1743108285/news1_hkbyxb.jpg", title: "Clubhouse Crosses 1Mn Downloads", date: "01 जनवरी 2025" }
      ],
      recent: [
        { img: "/https://res.cloudinary.com/dh3os5xi2/image/upload/v1743108285/news1_hkbyxb.jpg", title: "Clubhouse breaking records", date: "01 जनवरी 2025" },
        { img: "/img/60x60.png", title: "When to start investing", date: "01 जनवरी 2025" }
      ]
    }
  };

  // State management
  const [activeTab, setActiveTab] = useState('popular');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % config.mainSlider.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        
        {/* Main Slider (Left) */}
        <div className="lg:w-2/3 relative rounded-xl shadow-md overflow-hidden">
          <div className="aspect-[16/9] relative">
            {config.mainSlider.map((slide, i) => (
              <div key={i} className={`absolute inset-0 transition-opacity ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                <img src={slide.img} alt="" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <div className="text-white/80 text-sm">
                    <span>{slide.category}</span> • <span>{slide.date}</span>
                  </div>
                  <h2 className="text-white text-xl md:text-2xl font-bold mt-1">{slide.title}</h2>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {config.mainSlider.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
              />
            ))}
          </div>
        </div>

        {/* Tabbed Content (Right) */}
        <div className="lg:w-1/3 bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="flex border-b">
            {Object.keys(config.tabs).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 font-medium ${activeTab === tab ? 'text-gray-50 border-b-2 border-blue-600 bg-blue-500' : 'text-gray-600'}`}
              >
                {tab === 'popular' ? 'नई खबर' : 'रीसेंट'}
              </button>
            ))}
          </div>
          <div className="p-3 space-y-3">
            {config.tabs[activeTab].map((item, i) => (
              <div key={i} className="flex gap-3 group">
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm flex-shrink-0">
                  <img src={item.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                </div>
                <div>
                  <h3 className="font-medium text-sm group-hover:text-blue-600">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

