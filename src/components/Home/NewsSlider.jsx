import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import ReactPlayer from 'react-player'; // For video playback

export const NewsSlider = () => {
  // Data configuration
  const config = {
    mainVideos: [
      {
        videoThumbnail: "https://res.cloudinary.com/dh3os5xi2/image/upload/v1743108285/news1_hkbyxb.jpg",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Actual video URL
        category: "राजनीति",
        date: "जनवरी 01, 2025",
        title: "Sanctus amet sed amet ipsum lorem"
      },
      {
        videoThumbnail: "https://res.cloudinary.com/dh3os5xi2/image/upload/v1743108285/news1_hkbyxb.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", // Actual video URL
        category: "देश",
        date: "जनवरी 01, 2045",
        title: "Dolores et erat et elitr sea sed"
      }
    ],
    tabs: {
      podcast: [
        { 
          videoThumbnail: "https://res.cloudinary.com/dh3os5xi2/image/upload/v1743108285/news1_hkbyxb.jpg",
          videoUrl: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
          title: "Bitcoin price raise after fall", 
          date: "01 जनवरी 2025"
        },
        { 
          videoThumbnail: "https://res.cloudinary.com/dh3os5xi2/image/upload/v1743108285/news1_hkbyxb.jpg",
          videoUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
          title: "Clubhouse Crosses 1Mn Downloads", 
          date: "01 जनवरी 2025"
        }
      ],
      documentary: [
        { 
          videoThumbnail: "https://res.cloudinary.com/dh3os5xi2/image/upload/v1743108285/news1_hkbyxb.jpg",
          videoUrl: "https://www.youtube.com/watch?v=7wtfhZwyrcc",
          title: "Climate Change Documentary", 
          date: "01 जनवरी 2025"
        },
        { 
          videoThumbnail: "https://via.placeholder.com/60",
          videoUrl: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
          title: "Ancient Civilization Secrets", 
          date: "01 जनवरी 2025"
        }
      ],
      viewAllLinks: {
        podcast: "/podcast",
        documentary: "/documentary"
      }
    }
  };

  // State management
  const [activeTab, setActiveTab] = useState('podcast');
  const [currentVideo, setCurrentVideo] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (!playingVideo) {
        setCurrentVideo(prev => (prev + 1) % config.mainVideos.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [playingVideo]);

  const handleVideoPlay = (videoUrl) => {
    setPlayingVideo(videoUrl);
  };

  const handleCloseVideo = () => {
    setPlayingVideo(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Video Player Modal */}
      {playingVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={handleCloseVideo}
            className="absolute top-4 right-4 text-white text-2xl z-10"
          >
            &times;
          </button>
          <div className="w-full max-w-4xl aspect-video">
            <ReactPlayer
              url={playingVideo}
              width="100%"
              height="100%"
              controls={true}
              playing={true}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main Video Section (Left) */}
        <div className="lg:w-2/3 relative rounded-xl shadow-md overflow-hidden">
          <div className="aspect-[16/9] relative">
            {config.mainVideos.map((video, i) => (
              <div 
                key={i} 
                className={`absolute inset-0 transition-opacity ${i === currentVideo ? 'opacity-100' : 'opacity-0'}`}
              >
                <div 
                  className="w-full h-full bg-black cursor-pointer"
                  onClick={() => handleVideoPlay(video.videoUrl)}
                >
                  <img 
                    src={video.videoThumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover opacity-70" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-red-600 text-white rounded-full p-4 hover:bg-red-700 transition-all">
                      <FaPlay className="text-2xl" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <div className="text-white/80 text-sm">
                    <span>{video.category}</span> • <span>{video.date}</span>
                  </div>
                  <h2 className="text-white text-xl md:text-2xl font-bold mt-1">
                    {video.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {config.mainVideos.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentVideo(i)}
                className={`h-2 rounded-full transition-all ${i === currentVideo ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
              />
            ))}
          </div>
        </div>

        {/* Podcast/Documentary Tabs (Right) */}
        <div className="lg:w-1/3 bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="flex border-b">
            {Object.keys(config.tabs).filter(tab => tab !== 'viewAllLinks').map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 font-medium capitalize ${activeTab === tab ? 'text-gray-50 border-b-2 border-blue-600 bg-blue-500' : 'text-gray-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-3 space-y-3">
            {config.tabs[activeTab].map((item, i) => (
              <div 
                key={i} 
                className="flex gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer"
                onClick={() => handleVideoPlay(item.videoUrl)}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm flex-shrink-0 relative">
                  <img 
                    src={item.videoThumbnail} 
                    alt="" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <FaPlay className="text-white text-xs" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-sm group-hover:text-blue-600">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Button */}
          <div className="p-3 border-t">
            <Link 
              to={config.tabs.viewAllLinks[activeTab]}
              className="block text-center bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded-lg font-medium transition-colors"
            >
              View All {activeTab === 'podcast' ? 'Podcasts' : 'Documentaries'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};