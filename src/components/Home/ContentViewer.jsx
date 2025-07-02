import React, { useEffect, useState, useRef } from 'react';
import { FiMusic, FiVideo, FiFileText, FiLoader, FiArrowRight } from 'react-icons/fi';
import { FaNewspaper } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const getIcon = (type) => {
  const iconProps = { className: "mr-2 flex-shrink-0" };
  
  switch (type) {
    case 'blog': return <FiFileText {...iconProps} style={{ color: '#3B82F6' }} />;
    case 'news': return <FaNewspaper {...iconProps} style={{ color: '#EF4444' }} />;
    case 'video': return <FiVideo {...iconProps} style={{ color: '#10B981' }} />;
    case 'audio': return <FiMusic {...iconProps} style={{ color: '#8B5CF6' }} />;
    default: return <FiFileText {...iconProps} style={{ color: '#6B7280' }} />;
  }
};

const DEFAULT_IMAGE = 'https://via.placeholder.com/400x225?text=No+Preview';

export const ContentViewer = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef({});
  const navigate = useNavigate();

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/content`, {
        timeout: 10000,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      let contentData = [];
      
      if (Array.isArray(res.data)) {
        contentData = res.data;
      } else if (res.data && Array.isArray(res.data.data)) {
        contentData = res.data.data;
      } else if (res.data && Array.isArray(res.data.result)) {
        contentData = res.data.result;
      } else {
        throw new Error('Invalid data format received from server');
      }

      setContent([...contentData].reverse());
      
    } catch (error) {
      console.error('Error fetching content:', error);
      
      let errorMessage = 'Failed to load content. Please try again later.';
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'Server is not responding. Please check your connection.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    // Auto-play preview for the first few seconds when video is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = entry.target.dataset.videoId;
          if (!videoId) return;

          if (entry.isIntersecting && playingVideo !== videoId) {
            // Play preview for 3 seconds
            const video = videoRefs.current[videoId];
            if (video) {
              video.currentTime = 0;
              video.muted = true;
              video.play()
                .then(() => {
                  setTimeout(() => {
                    if (video && playingVideo !== videoId) {
                      video.pause();
                    }
                  }, 3000); // 3 second preview
                })
                .catch(e => console.log('Autoplay prevented:', e));
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.keys(videoRefs.current).forEach((id) => {
      if (videoRefs.current[id]) {
        observer.observe(videoRefs.current[id]);
      }
    });

    return () => observer.disconnect();
  }, [content, playingVideo]);

  const getImageUrl = (url) => {
    if (!url) return DEFAULT_IMAGE;
    
    try {
      if (url.startsWith('http') || url.startsWith('//')) {
        return url;
      }
      
      return `${import.meta.env.VITE_API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
    } catch (e) {
      console.error('Error processing URL:', url, e);
      return DEFAULT_IMAGE;
    }
  };

  const handleCardClick = (id) => {
    if (id) {
      navigate(`/content/${id}`);
    }
  };

  const handleVideoPlay = (id) => {
    setPlayingVideo(id);
    // Pause all other videos
    Object.keys(videoRefs.current).forEach((videoId) => {
      if (videoId !== id && videoRefs.current[videoId]) {
        videoRefs.current[videoId].pause();
      }
    });
  };

  const handleVideoPause = (id) => {
    if (playingVideo === id) {
      setPlayingVideo(null);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Latest Content
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
            Explore our latest blogs, news, videos and audio content
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <FiLoader className="animate-spin text-blue-500 text-4xl mb-4" />
            <p className="text-gray-600">Loading content...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 p-6 bg-white rounded-lg shadow-sm">
            <div className="text-red-500 text-center mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="mt-2 text-lg font-medium">{error}</p>
            </div>
            <button
              onClick={fetchContent}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Retry
            </button>
          </div>
        ) : content.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 p-6 bg-white rounded-lg shadow-sm">
            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-600 text-lg mb-4">No content available</p>
            <button
              onClick={fetchContent}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {content.map((item) => (
              <div
                key={item._id || item.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-1 cursor-pointer flex flex-col h-full"
                onClick={() => handleCardClick(item._id || item.id)}
              >
                {/* Video Preview Section */}
                {item.type === 'video' && (
                  <div className="relative pt-[56.25%] overflow-hidden bg-black">
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current[item._id || item.id] = el;
                      }}
                      data-video-id={item._id || item.id}
                      className="absolute inset-0 w-full h-full object-cover"
                      poster={getImageUrl(item.thumbnail || item.url)}
                      muted
                      loop
                      playsInline
                      onClick={(e) => {
                        e.stopPropagation();
                        const video = videoRefs.current[item._id || item.id];
                        if (video.paused) {
                          video.play();
                          handleVideoPlay(item._id || item.id);
                        } else {
                          video.pause();
                          handleVideoPause(item._id || item.id);
                        }
                      }}
                      onPlay={() => handleVideoPlay(item._id || item.id)}
                      onPause={() => handleVideoPause(item._id || item.id)}
                    >
                      <source src={getImageUrl(item.url)} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Play Button Overlay */}
                    {playingVideo !== (item._id || item.id) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Image/Audio Section */}
                {item.type !== 'video' && (
                  <div className="relative pt-[56.25%] overflow-hidden bg-gray-100">
                    {item.type === 'audio' ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
                        <audio controls className="w-full px-4">
                          <source src={getImageUrl(item.url)} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={getImageUrl(item.url)}
                          alt={item.title || 'Content image'}
                          className="max-w-full max-h-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = DEFAULT_IMAGE;
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="p-4 flex-grow flex flex-col">
                  <div className="flex items-start mb-3">
                    {getIcon(item.type)}
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
                        {item.title || 'Untitled'}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">
                        {new Date(item.createdAt || Date.now()).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                    {item.description || 'No description available'}
                  </p>

                  <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {item.category
                        ? typeof item.category === 'object'
                          ? item.category.name
                          : item.category
                        : 'Uncategorized'}
                    </span>
                    <button
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(item._id || item.id);
                      }}
                    >
                      Read More
                      <FiArrowRight className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};