import React, { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiPlay, FiPause, FiMaximize } from 'react-icons/fi';
import ReactPlayer from 'react-player';

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef(null);
  const autoplayTimer = useRef(null);
  const isSliding = useRef(false);

  // Fetch videos from API
  useEffect(() => {
    const API_URL = 'http://localhost:5000/api/content?type=video';
    
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        let videosData = [];
        
        if (Array.isArray(data)) {
          videosData = data;
        } else if (data && typeof data === 'object') {
          if (Array.isArray(data.videos)) videosData = data.videos;
          else if (Array.isArray(data.results)) videosData = data.results;
          else if (Array.isArray(data.items)) videosData = data.items;
          else if (Array.isArray(data.data)) videosData = data.data;
        }

        if (!Array.isArray(videosData) || videosData.length === 0) {
          throw new Error('API response does not contain valid video data');
        }

        const processedVideos = videosData.map(video => ({
          id: video.id || video._id || Math.random().toString(36).substr(2, 9),
          title: video.title || 'Untitled Video',
          description: video.description || '',
          url: video.url || video.videoUrl || video.source || '',
          thumbnail: video.thumbnail || video.image || '',
          createdAt: video.createdAt || video.date || ''
        })).filter(video => video.url);

        setVideos(processedVideos);
      } catch (err) {
        console.error('Video fetch error:', err);
        setError(`Failed to load videos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (videos.length > 1 && isPlaying && !isSliding.current) {
      clearTimeout(autoplayTimer.current);
      autoplayTimer.current = setTimeout(() => {
        isSliding.current = true;
        nextSlide();
        setTimeout(() => {
          isSliding.current = false;
        }, 1000);
      }, 8000);
    }
    return () => clearTimeout(autoplayTimer.current);
  }, [currentSlide, videos.length, isPlaying]);

  const getMediaUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return `http://localhost:5000${url}`;
    return `http://localhost:5000/${url}`;
  };

  const nextSlide = () => {
    if (isSliding.current) return;
    isSliding.current = true;
    const nextIndex = currentSlide === videos.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(nextIndex);
    setTimeout(() => {
      isSliding.current = false;
    }, 1000);
  };

  const prevSlide = () => {
    if (isSliding.current) return;
    isSliding.current = true;
    const prevIndex = currentSlide === 0 ? videos.length - 1 : currentSlide - 1;
    setCurrentSlide(prevIndex);
    setTimeout(() => {
      isSliding.current = false;
    }, 1000);
  };

  const handleSlideChange = (index) => {
    if (isSliding.current || index === currentSlide) return;
    isSliding.current = true;
    clearTimeout(autoplayTimer.current);
    setCurrentSlide(index);
    setTimeout(() => {
      isSliding.current = false;
    }, 1000);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      clearTimeout(autoplayTimer.current);
    }
  };

  const openFullscreen = (videoUrl) => {
    setPlayingVideo(videoUrl);
    setIsPlaying(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-gray-50 rounded-xl">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-gray-500">Loading videos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border-l-4 border-red-500">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">Error loading content</h3>
            <div className="mt-2 text-sm text-gray-600">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-xl shadow-md">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No videos available</h3>
        <p className="mt-1 text-sm text-gray-500">Please check back later for new content.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto my-12">
      {/* Fullscreen Modal */}
      {playingVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <button
            onClick={() => setPlayingVideo(null)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 text-3xl z-10 transition-colors"
          >
            &times;
          </button>
          <div className="w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl">
            <ReactPlayer
              url={getMediaUrl(playingVideo)}
              width="100%"
              height="100%"
              controls
              playing={isPlaying}
              volume={0.8}
            />
          </div>
        </div>
      )}

      {/* Main Slider Container */}
      <div 
        className="relative group bg-white rounded-xl shadow-xl overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={sliderRef}
      >
        {/* Slides Wrapper */}
        <div className="relative h-[500px] w-full">
          <div
            className="flex h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {videos.map((video, index) => (
              <div key={video.id} className="w-full flex-shrink-0 h-full relative">
                {/* Video Container */}
                <div className="absolute inset-0 bg-gray-900">
                  <ReactPlayer
                    url={getMediaUrl(video.url)}
                    width="100%"
                    height="100%"
                    playing={currentSlide === index && isPlaying}
                    muted={true}
                    loop={true}
                    controls={false}
                    playsinline={true}
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Video Info */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-3">{video.title}</h2>
                    <p className="text-gray-200 mb-6">{video.description}</p>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={togglePlayPause}
                        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg"
                      >
                        {isPlaying && currentSlide === index ? (
                          <>
                            <FiPause className="mr-2" size={18} />
                            Pause
                          </>
                        ) : (
                          <>
                            <FiPlay className="mr-2" size={18} />
                            Play Video
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => openFullscreen(video.url)}
                        className="flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
                      >
                        <FiMaximize className="mr-2" size={18} />
                        Fullscreen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {videos.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              disabled={isSliding.current}
              className={`absolute left-8 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg z-10 transition-all duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              } group-hover:opacity-100 hover:scale-110`}
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              disabled={isSliding.current}
              className={`absolute right-8 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg z-10 transition-all duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              } group-hover:opacity-100 hover:scale-110`}
            >
              <FiChevronRight size={24} />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {videos.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                disabled={isSliding.current || index === currentSlide}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {videos.length > 1 && (
        <div className="mt-8 flex justify-center space-x-4">
          {videos.map((video, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              disabled={isSliding.current || index === currentSlide}
              className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden transition-all ${
                currentSlide === index
                  ? 'ring-4 ring-blue-500 scale-110'
                  : 'opacity-80 hover:opacity-100 hover:scale-105'
              }`}
            >
              <img 
                src={video.thumbnail || 'https://via.placeholder.com/150'} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 ${
                currentSlide === index ? 'bg-black/30' : 'bg-black/40 hover:bg-black/30'
              } transition-all`}></div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};