import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Calendar, Video, Zap, Waves, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoPlayerCard } from './VideoPlayerCard';

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const autoplayTimer = useRef(null);
  const isAnimating = useRef(false);
  const playerRefs = useRef([]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const formattedDate = oneWeekAgo.toISOString().split('T')[0];
      
      console.log('Fetching videos from:', formattedDate);
      
      const response = await fetch(`${API_BASE_URL}/api/content?type=video&startDate=${formattedDate}&limit=10`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      let videosData = [];
      if (Array.isArray(data)) {
        videosData = data;
      } else if (data && Array.isArray(data.data)) {
        videosData = data.data;
      } else if (data && Array.isArray(data.content)) {
        videosData = data.content;
      } else {
        throw new Error('Unexpected API response format');
      }

      const oneWeekAgoDate = new Date();
      oneWeekAgoDate.setDate(oneWeekAgoDate.getDate() - 7);
      
      const videoContent = videosData.filter(item => {
        if (!item || item.type !== 'video') return false;
        const hasUrl = item.url || (item.files && item.files.length > 0);
        const videoDate = item.createdAt ? new Date(item.createdAt) : new Date();
        const isFromLastWeek = videoDate >= oneWeekAgoDate;
        return hasUrl && isFromLastWeek;
      });

      console.log('Filtered videos from last week:', videoContent.length);

      if (videoContent.length === 0) {
        throw new Error('No videos available from the last week');
      }

      const processedVideos = videoContent.map(video => {
        let videoUrl = video.url;
        let thumbnailUrl = video.thumbnail;
        
        if (video.files && video.files.length > 0) {
          videoUrl = video.files[0].url || videoUrl;
          if (!thumbnailUrl && video.files[0].url) {
            thumbnailUrl = video.files[0].url;
          }
        }

        return {
          id: video._id || video.id || Math.random().toString(36).substr(2, 9),
          title: video.title || 'Untitled Video',
          description: video.description || '',
          url: videoUrl,
          thumbnail: thumbnailUrl || getDefaultThumbnail(),
          duration: video.duration || '0:00',
          createdAt: video.createdAt || new Date().toISOString()
        };
      }).filter(video => video.url);

      processedVideos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const finalVideos = processedVideos.slice(0, 5);
      setVideos(finalVideos);

    } catch (err) {
      console.error('Video fetch error:', err);
      setError(err.message || 'Failed to load videos');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const getDefaultThumbnail = () => {
    const thumbnails = [
      'https://images.unsplash.com/photo-1574717024453-3545a22f5ea3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
      'https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80'
    ];
    return thumbnails[Math.floor(Math.random() * thumbnails.length)];
  };

  const getMediaUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    
    if (url.startsWith('/uploads/')) {
      return `${API_BASE_URL}${url}`;
    }
    if (url.startsWith('/api/uploads/')) {
      return `${API_BASE_URL}${url.replace('/api/uploads/', '/uploads/')}`;
    }
    
    return `${API_BASE_URL}/${url}`;
  };

  // Auto-slide functionality
  useEffect(() => {
    if (videos.length > 1 && isPlaying && !isAnimating.current && !isVideoPlaying) {
      clearTimeout(autoplayTimer.current);
      autoplayTimer.current = setTimeout(() => {
        if (!isVideoPlaying) {
          isAnimating.current = true;
          nextSlide();
          setTimeout(() => isAnimating.current = false, 800);
        }
      }, 5000);
    }
    return () => clearTimeout(autoplayTimer.current);
  }, [currentIndex, videos.length, isPlaying, isVideoPlaying]);

  const nextSlide = () => {
    if (isAnimating.current || videos.length <= 1) return;
    isAnimating.current = true;
    
    if (playerRefs.current[currentIndex]) {
      playerRefs.current[currentIndex].pause();
    }
    
    setCurrentIndex(prev => (prev === videos.length - 1 ? 0 : prev + 1));
    setTimeout(() => isAnimating.current = false, 800);
  };

  const prevSlide = () => {
    if (isAnimating.current || videos.length <= 1) return;
    isAnimating.current = true;
    
    if (playerRefs.current[currentIndex]) {
      playerRefs.current[currentIndex].pause();
    }
    
    setCurrentIndex(prev => (prev === 0 ? videos.length - 1 : prev - 1));
    setTimeout(() => isAnimating.current = false, 800);
  };

  const goToSlide = (index) => {
    if (isAnimating.current || index === currentIndex || videos.length <= 1) return;
    isAnimating.current = true;
    
    if (playerRefs.current[currentIndex]) {
      playerRefs.current[currentIndex].pause();
    }
    
    clearTimeout(autoplayTimer.current);
    setCurrentIndex(index);
    setTimeout(() => isAnimating.current = false, 800);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      clearTimeout(autoplayTimer.current);
    }
  };

  const openFullscreen = (url) => {
    setPlayingVideo(url);
  };

  const handleVideoPlay = (index) => {
    playerRefs.current.forEach((player, i) => {
      if (i !== index && player) {
        player.pause();
      }
    });
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12 px-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 animate-pulse"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full opacity-30 animate-pulse delay-1000"></div>
        </div>
        
        <div className="text-center relative z-10">
          <motion.div
            className="relative mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-20 h-20 border-4 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-1">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg">
                <Video className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </motion.div>
          <motion.p
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading Video Library...
          </motion.p>
        </div>
      </div>
    );
  }

  if (error && videos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12 px-4 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Video className="w-12 h-12 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Recent Videos</h3>
          <p className="text-gray-600 mb-2">{error}</p>
          <p className="text-sm text-gray-500 mb-6">
            Please upload videos in the last 7 days to see them here.
          </p>
          <button 
            onClick={fetchVideos}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:scale-105 transition-transform"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Modern Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* <div className="relative inline-block">
            <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              VIDEO LIBRARY
            </h1>
          </div> */}
          
          {/* <motion.h2 
            className="text-xl text-gray-600 flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Zap className="w-6 h-6 text-blue-500" />
            <span className="font-semibold">Latest News & Updates</span>
            <Waves className="w-6 h-6 text-purple-500" />
          </motion.h2> */}
          
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 bg-white/80 px-4 py-3 rounded-xl shadow-sm border border-gray-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                {videos.length} video{videos.length !== 1 ? 's' : ''} • Last 7 days
              </span>
            </div>
            
            {videos.length > 1 && (
              <button
                onClick={togglePlayback}
                className="flex items-center gap-2 bg-white/80 px-4 py-3 rounded-xl shadow-sm border border-gray-200 hover:bg-white transition-all duration-300 hover:scale-105"
                title={isPlaying ? 'Pause auto-slide' : 'Play auto-slide'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-gray-700" />
                ) : (
                  <Play className="w-5 h-5 text-gray-700" />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {isPlaying ? 'Pause' : 'Play'}
                </span>
              </button>
            )}

            <motion.button 
              onClick={fetchVideos}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-xl font-medium hover:scale-105 transition-transform shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw className="w-5 h-5" />
              Refresh
            </motion.button>
          </div>
        </motion.div>

        {/* Fullscreen Modal */}
        <AnimatePresence>
          {playingVideo && (
            <motion.div 
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                onClick={() => setPlayingVideo(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-white/20 text-white hover:bg-white/30 text-2xl z-10 transition-all duration-300 hover:scale-110 flex items-center justify-center rounded-full"
              >
                ×
              </button>
              <div className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <video
                  src={getMediaUrl(playingVideo)}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                  onError={(e) => console.error('Video error:', e)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Carousel */}
        <div className="relative">
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-200">
            <div
              className="flex h-full transition-all duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <AnimatePresence>
                {videos.map((video, index) => (
                  <VideoPlayerCard
                    key={video.id}
                    video={video}
                    index={index}
                    isActive={currentIndex === index}
                    playerRefs={playerRefs}
                    getMediaUrl={getMediaUrl}
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                    onFullscreen={openFullscreen}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Arrows */}
          {videos.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-white text-gray-900 rounded-full shadow-lg z-20 transition-all duration-300 hover:scale-110 border border-gray-200 flex items-center justify-center hover:bg-gray-50"
              >
                <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-white text-gray-900 rounded-full shadow-lg z-20 transition-all duration-300 hover:scale-110 border border-gray-200 flex items-center justify-center hover:bg-gray-50"
              >
                <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {videos.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-white w-8 shadow-lg' 
                      : 'bg-white/50 w-2 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {videos.length > 1 && (
          <div className="mt-8">
            <div className="flex overflow-x-auto pb-4 gap-4 px-2 scrollbar-hide">
              {videos.map((video, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative flex-shrink-0 group transition-all duration-300 ${
                    currentIndex === index 
                      ? 'scale-105' 
                      : 'opacity-80 hover:opacity-100 hover:scale-105'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`relative w-32 h-20 md:w-36 md:h-24 lg:w-40 lg:h-28 rounded-xl overflow-hidden shadow-lg border-2 transition-all duration-300 ${
                    currentIndex === index 
                      ? 'border-blue-500 shadow-blue-500/25' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <img
                      src={getMediaUrl(video.thumbnail)}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getDefaultThumbnail();
                      }}
                    />
                    
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center transition-all duration-300 ${
                      currentIndex === index ? 'bg-blue-500/20' : 'bg-black/40'
                    }`}>
                      {currentIndex === index && (
                        <motion.div
                          className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {playerRefs.current[index] && !playerRefs.current[index].paused ? (
                            <Pause className="w-5 h-5 text-gray-900" />
                          ) : (
                            <Play className="w-5 h-5 text-gray-900 ml-0.5" />
                          )}
                        </motion.div>
                      )}
                    </div>

                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-lg">
                      {video.duration}
                    </div>
                  </div>

                  <p className={`mt-2 text-sm font-medium transition-colors text-center truncate max-w-[128px] md:max-w-[144px] lg:max-w-[160px] ${
                    currentIndex === index ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'
                  }`}>
                    {video.title}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};