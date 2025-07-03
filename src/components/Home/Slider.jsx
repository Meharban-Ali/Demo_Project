import React, { useState, useEffect, useRef } from 'react';
import { FiPlay, FiPause, FiMaximize, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ReactPlayer from 'react-player';

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  const autoplayTimer = useRef(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL + '/api/content?type=video';
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
        const data = await response.json();
        const videosData = Array.isArray(data.data) ? data.data : [];
        if (!videosData.length) throw new Error('No video data found');

        setVideos(videosData.map(video => ({
          id: video.id || video._id || Math.random().toString(36).substr(2, 9),
          title: video.title || 'Untitled Video',
          description: video.description || '',
          url: video.url || video.videoUrl || video.source || '',
          thumbnail: video.thumbnail || video.image || '',
          duration: video.duration || '0:00'
        })).filter(video => video.url));

      } catch (err) {
        console.error('Video fetch error:', err);
        setError(`Failed to load videos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    if (videos.length > 1 && isPlaying && !isAnimating.current) {
      clearTimeout(autoplayTimer.current);
      autoplayTimer.current = setTimeout(() => {
        isAnimating.current = true;
        nextSlide();
        setTimeout(() => isAnimating.current = false, 1000);
      }, 8000);
    }
    return () => clearTimeout(autoplayTimer.current);
  }, [currentIndex, videos.length, isPlaying]);

  const getMediaUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${url}`;
  };

  const nextSlide = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setCurrentIndex(prev => (prev === videos.length - 1 ? 0 : prev + 1));
    setTimeout(() => isAnimating.current = false, 1000);
  };

  const prevSlide = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setCurrentIndex(prev => (prev === 0 ? videos.length - 1 : prev - 1));
    setTimeout(() => isAnimating.current = false, 1000);
  };

  const goToSlide = (index) => {
    if (isAnimating.current || index === currentIndex) return;
    isAnimating.current = true;
    clearTimeout(autoplayTimer.current);
    setCurrentIndex(index);
    setTimeout(() => isAnimating.current = false, 1000);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) clearTimeout(autoplayTimer.current);
  };

  const openFullscreen = (url) => {
    setPlayingVideo(url);
    setIsPlaying(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 md:h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          <div className="mt-4 w-32 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500 rounded-xl">
        <div className="flex items-center">
          <div className="text-red-500 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Error loading content</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
        <div className="mx-auto h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">No videos available</h3>
        <p className="mt-1 text-gray-600">Please check back later for new content.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      {/* Fullscreen Modal */}
      {playingVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setPlayingVideo(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl z-10"
          >
            &times;
          </button>
          <div className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden">
            <ReactPlayer
              url={getMediaUrl(playingVideo)}
              width="100%"
              height="100%"
              controls
              playing={isPlaying}
              style={{ aspectRatio: '16/9' }}
            />
          </div>
        </div>
      )}

      {/* Carousel Container */}
      <div className="relative group" ref={carouselRef}>
        {/* Slides */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
          <div
            className="flex h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {videos.map((video) => (
              <div key={video.id} className="w-full flex-shrink-0 relative">
                <div className="absolute inset-0 bg-gray-900">
                  <ReactPlayer
                    url={getMediaUrl(video.url)}
                    width="100%"
                    height="100%"
                    playing={currentIndex === videos.findIndex(v => v.id === video.id) && isPlaying}
                    muted
                    loop
                    playsinline
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Overlay without blur */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl md:text-2xl font-bold text-white line-clamp-1">{video.title}</h3>
                        <span className="bg-black/40 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </span>
                      </div>
                      <p className="text-white/80 text-sm md:text-base mb-4 line-clamp-2">{video.description}</p>
                      <div className="flex space-x-3">
                        <button
                          onClick={togglePlayback}
                          className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium transition-all hover:scale-105"
                        >
                          {isPlaying ? (
                            <>
                              <FiPause className="mr-2" />
                              Pause
                            </>
                          ) : (
                            <>
                              <FiPlay className="mr-2" />
                              Play
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => openFullscreen(video.url)}
                          className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-medium transition-all hover:scale-105"
                        >
                          <FiMaximize className="mr-2" />
                          Fullscreen
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        {videos.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg z-10 transition-all ${
                isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              } hover:scale-110`}
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg z-10 transition-all ${
                isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              } hover:scale-110`}
            >
              <FiChevronRight size={24} />
            </button>
          </>
        )}

        {/* Dots */}
        {videos.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {videos.length > 1 && (
        <div className="mt-6 flex overflow-x-auto pb-2 scrollbar-hide space-x-3 px-2">
          {videos.map((video, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative flex-shrink-0 w-20 h-12 md:w-24 md:h-16 rounded-lg overflow-hidden transition-all ${
                currentIndex === index ? 'ring-2 ring-blue-500 scale-105' : 'opacity-80 hover:opacity-100 hover:scale-105'
              }`}
            >
              <img
                src={video.thumbnail || 'https://via.placeholder.com/150'}
                alt={video.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className={`absolute inset-0 flex items-center justify-center ${
                currentIndex === index ? 'bg-black/30' : 'bg-black/40'
              }`}>
                {currentIndex === index && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    {isPlaying ? (
                      <FiPause className="text-white text-xs" />
                    ) : (
                      <FiPlay className="text-white text-xs" />
                    )}
                  </div>
                )}
              </div>
              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                {video.duration}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
