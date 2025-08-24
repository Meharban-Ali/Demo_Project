import React, { useEffect, useState, useRef } from 'react';
import { FiMusic, FiVideo, FiFileText, FiArrowRight, FiPlay, FiPause, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaNewspaper } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ContentViewer = () => {
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [videoThumbnails, setVideoThumbnails] = useState({});
  const [imageLoadErrors, setImageLoadErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const videoRefs = useRef({});
  const navigate = useNavigate();

  // Default thumbnails with vibrant colors
  const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80';
  const VIDEO_THUMBNAIL = 'https://images.unsplash.com/photo-1574717024453-3545a22f5ea3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80';

  const getIcon = (type) => {
    const iconClass = "text-2xl mr-3 flex-shrink-0 drop-shadow-sm";
    switch (type?.toLowerCase()) {
      case 'blog': return <FiFileText className={`${iconClass} text-indigo-500`} />;
      case 'news': return <FaNewspaper className={`${iconClass} text-rose-500`} />;
      case 'video': return <FiVideo className={`${iconClass} text-emerald-500`} />;
      default: return <FiFileText className={`${iconClass} text-slate-500`} />;
    }
  };

  // Generate video thumbnail from video file
  const generateVideoThumbnail = async (videoUrl, itemId) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      video.crossOrigin = 'anonymous';
      video.muted = true;
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        // Set canvas dimensions
        canvas.width = 400;
        canvas.height = 225;
        
        // Seek to 10% of video duration for thumbnail
        const seekTime = video.duration * 0.1;
        video.currentTime = seekTime;
      };
      
      video.onseeked = () => {
        try {
          // Draw video frame to canvas
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Convert canvas to data URL
          const thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          
          setVideoThumbnails(prev => ({
            ...prev,
            [itemId]: thumbnailDataUrl
          }));
          
          resolve(thumbnailDataUrl);
        } catch (error) {
          console.error('Error generating thumbnail:', error);
          resolve(null);
        } finally {
          video.remove();
        }
      };
      
      video.onerror = () => {
        console.error('Error loading video for thumbnail');
        resolve(null);
      };
      
      video.src = videoUrl;
    });
  };

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/content`, {
        timeout: 10000,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
          'Cache-Control': 'no-cache'
        }
      });

      let contentData = [];
      if (Array.isArray(response.data)) {
        contentData = response.data;
      } else if (Array.isArray(response.data?.data)) {
        contentData = response.data.data;
      } else if (Array.isArray(response.data?.result)) {
        contentData = response.data.result;
      } else {
        throw new Error('Unexpected API response format');
      }

      // Filter content to only include news, blog, and video types
      const filteredData = contentData.filter(item => 
        item.type && ['news', 'blog', 'video'].includes(item.type.toLowerCase())
      );

      const sortedContent = filteredData.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.date || a.timestamp || 0);
        const dateB = new Date(b.createdAt || b.date || b.timestamp || 0);
        return dateB - dateA;
      });

      setContent(sortedContent);
      setFilteredContent(sortedContent);

      // Generate thumbnails for video content
      setTimeout(() => {
        sortedContent.forEach(item => {
          const { url: primaryUrl, type: mediaType } = getPrimaryMedia(item);
          const itemId = item._id || item.id;
          
          if (mediaType === 'video' && primaryUrl && itemId) {
            const videoUrl = getMediaUrl(primaryUrl, 'video');
            generateVideoThumbnail(videoUrl, itemId);
          }
        });
      }, 100);

    } catch (error) {
      console.error('Error fetching content:', error);
      setError(error.response?.data?.message || error.message || 'Failed to load content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const getMediaUrl = (url, type) => {
    if (!url) {
      return type === 'video' ? VIDEO_THUMBNAIL : DEFAULT_IMAGE;
    }

    try {
      if (/^https?:\/\//i.test(url)) {
        return url;
      }
      const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/?$/, '') || '';
      const normalizedUrl = url.startsWith('/api/uploads') ? url.replace('/api/uploads', '/uploads') : url;
      return `${baseUrl}${normalizedUrl.startsWith('/') ? '' : '/'}${normalizedUrl}`;
    } catch {
      return type === 'video' ? VIDEO_THUMBNAIL : DEFAULT_IMAGE;
    }
  };

  const getPrimaryMedia = (item) => {
    if (Array.isArray(item.files) && item.files.length > 0) {
      const validFile = item.files.find(file => file?.url && ['image', 'video'].includes(file.fileType));
      if (validFile) {
        return { url: validFile.url, type: validFile.fileType };
      }
    }
    const url = item.url || item.thumbnail || null;
    const type = url ? item.type : null;
    return { url, type };
  };

  const handleCardClick = (id) => {
    if (id) navigate(`/content/${encodeURIComponent(id)}`);
  };

  const handleVideoPlay = (id) => {
    setPlayingVideo(id);
    const video = videoRefs.current[id];
    if (video) {
      video.play().catch(e => console.log('Video play error:', e));
    }
  };

  const handleVideoPause = (id) => {
    if (playingVideo === id) setPlayingVideo(null);
    const video = videoRefs.current[id];
    if (video) video.pause();
  };

  const handleImageError = (itemId) => {
    setImageLoadErrors(prev => ({ ...prev, [itemId]: true }));
  };

  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'Date not available';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Date error';
    }
  };

  const getGradientClass = (type) => {
    switch (type?.toLowerCase()) {
      case 'blog': return 'from-indigo-500/15 to-purple-500/15';
      case 'news': return 'from-rose-500/15 to-pink-500/15';
      case 'video': return 'from-emerald-500/15 to-teal-500/15';
      default: return 'from-slate-500/15 to-gray-500/15';
    }
  };

  const getHoverGradient = (type) => {
    switch (type?.toLowerCase()) {
      case 'blog': return 'hover:from-indigo-500/25 hover:to-purple-500/25';
      case 'news': return 'hover:from-rose-500/25 hover:to-pink-500/25';
      case 'video': return 'hover:from-emerald-500/25 hover:to-teal-500/25';
      default: return 'hover:from-slate-500/25 hover:to-gray-500/25';
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContent.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-r-transparent mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading Amazing Content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-rose-200">
          <div className="text-rose-500 text-5xl mb-4">⚠️</div>
          <p className="text-xl font-semibold text-rose-700 mb-2">Oops! Something went wrong</p>
          <p className="text-rose-600">{error}</p>
        </div>
      </div>
    );
  }

  if (filteredContent.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-amber-200">
          <div className="text-amber-500 text-5xl mb-4">📭</div>
          <p className="text-2xl font-bold text-amber-700 mb-2">No Content Found</p>
          <p className="text-amber-600">Check back later for amazing content!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold  mb-4 bg-clip-text text-blue-500 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600">
            ✨ Latest Content
          </h1>
          <p className="text-xl text-orange-600 font-medium">Discover amazing stories, videos, and more!</p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-violet-500 to-pink-500 mx-auto rounded-full"></div>
        </motion.header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          <AnimatePresence>
            {currentItems.map((item, index) => {
              const itemId = item._id || item.id;
              if (!itemId) return null;
              const { url: primaryUrl, type: mediaType } = getPrimaryMedia(item);
              const thumbnailUrl = item.thumbnail || primaryUrl;

              return (
                <motion.article
                  key={itemId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -8 }}
                  className={`bg-gradient-to-br ${getGradientClass(item.type)} ${getHoverGradient(item.type)} backdrop-blur-sm bg-white/90 rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer flex flex-col h-full border border-white/60 transition-all duration-300`}
                  onClick={() => handleCardClick(itemId)}
                >
                  {/* Media Display - Improved */}
                  {mediaType === 'video' ? (
                    <div className="relative bg-gradient-to-br from-gray-900 to-black overflow-hidden group rounded-t-3xl">
                      <div className="w-full h-48 sm:h-52 lg:h-56 relative">
                        {playingVideo !== itemId && (
                          <img
                            src={videoThumbnails[itemId] || getMediaUrl(thumbnailUrl, 'video')}
                            alt="Video thumbnail"
                            className="absolute inset-0 w-full h-full object-contain bg-black"
                            onError={(e) => { 
                              e.target.onerror = null; 
                              e.target.src = VIDEO_THUMBNAIL; 
                            }}
                          />
                        )}
                        <video
                          ref={el => videoRefs.current[itemId] = el}
                          className={`absolute inset-0 w-full h-full object-contain bg-black transition-opacity duration-300 ${playingVideo === itemId ? 'opacity-100' : 'opacity-0'}`}
                          poster={videoThumbnails[itemId] || getMediaUrl(thumbnailUrl, 'video')}
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            playingVideo === itemId ? handleVideoPause(itemId) : handleVideoPlay(itemId); 
                          }}
                        >
                          <source src={getMediaUrl(primaryUrl, 'video')} type="video/mp4" />
                        </video>
                        
                        {/* Video Controls Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          {playingVideo === itemId ? (
                            <motion.button
                              className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white p-3 rounded-full z-10 hover:bg-black/80 transition-all"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => { e.stopPropagation(); handleVideoPause(itemId); }}
                            >
                              <FiPause className="w-5 h-5" />
                            </motion.button>
                          ) : (
                            <motion.div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300">
                              <motion.button
                                className="bg-white/95 backdrop-blur-sm text-emerald-600 p-5 rounded-full shadow-2xl hover:bg-white transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => { e.stopPropagation(); handleVideoPlay(itemId); }}
                              >
                                <FiPlay className="w-8 h-8 ml-1" />
                              </motion.button>
                            </motion.div>
                          )}
                        </div>
                      </div>
                      
                      {/* Video Badge */}
                      <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        VIDEO
                      </div>
                    </div>
                  ) : (
                    <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden group rounded-t-3xl">
                      <div className="w-full h-48 sm:h-52 lg:h-56 relative bg-white">
                        <motion.img
                          src={imageLoadErrors[itemId] ? DEFAULT_IMAGE : getMediaUrl(primaryUrl, 'image')}
                          alt={item.title || 'Content thumbnail'}
                          className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 bg-white"
                          onError={() => handleImageError(itemId)}
                          loading="lazy"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      {/* Content Type Badge */}
                      <div className={`absolute top-4 right-4 ${
                        item.type === 'blog' ? 'bg-indigo-500' : 
                        item.type === 'news' ? 'bg-rose-500' : 'bg-slate-500'
                      } text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg uppercase`}>
                        {item.type || 'CONTENT'}
                      </div>
                    </div>
                  )}

                  {/* Content Details - Improved */}
                  <div className="p-5 flex-grow flex flex-col backdrop-blur-sm">
                    <div className="flex items-start mb-4">
                      <motion.div 
                        className="mr-3 mt-1 flex-shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {getIcon(item.type)}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                          {item.title || 'Untitled Content'}
                        </h2>
                        <time className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
                          {formatDate(item.createdAt)}
                        </time>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm lg:text-base mb-4 line-clamp-3 flex-grow leading-relaxed">
                      {item.description || 'No description available'}
                    </p>
                    
                    {/* Writers Section */}
                    {item.writers && item.writers.length > 0 && (
                      <div className="mt-4 mb-4">
                        <p className="text-xs font-medium text-gray-500 mb-2">लेखक / Writers:</p>
                        <div className="flex flex-wrap gap-2">
                          {item.writers.slice(0, 3).map((writer, index) => (
                            <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                              {writer.photoUrl ? (
                                <img
                                  src={getMediaUrl(writer.photoUrl, 'image')}
                                  alt={writer.name}
                                  className="w-6 h-6 rounded-full object-cover mr-1"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = DEFAULT_IMAGE;
                                  }}
                                />
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-gray-300 mr-1 flex items-center justify-center text-xs text-gray-600">
                                  {writer.name ? writer.name.charAt(0).toUpperCase() : 'W'}
                                </div>
                              )}
                              <span className="text-xs font-medium text-gray-700 truncate max-w-[80px]">
                                {writer.name || 'Unknown Writer'}
                              </span>
                            </div>
                          ))}
                          {item.writers.length > 3 && (
                            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              +{item.writers.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Read More Button - Improved */}
                    <motion.div 
                      className="flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors mt-auto"
                      whileHover={{ x: 5 }}
                    >
                      <span className="mr-2 text-sm">Explore</span>
                      <FiArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => paginate(page)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentPage === page 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-white text-gray-700 shadow-md hover:bg-gray-100'
                  } transition-colors`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};