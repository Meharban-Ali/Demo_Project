import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlay, FaPause, FaNewspaper, FaRedo } from 'react-icons/fa';
import { FiFileText, FiVideo, FiMusic, FiImage } from 'react-icons/fi';

// Using environment variable from .env file
const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const NewsPage = () => {
  const [newsData, setNewsData] = useState({
    featured: null,
    articles: [],
    loading: true,
    error: null
  });
  const [playingVideo, setPlayingVideo] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const videoRefs = useRef({});
  const navigate = useNavigate();

  // Format media URL
  const formatMediaUrl = (url) => {
    if (!url) return '/default-news.jpg';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  };

  // Check if content is video
  const isVideo = (url) => {
    if (!url) return false;
    return url.match(/\.(mp4|webm|ogg)$/i) || 
           url.includes('youtube.com') || 
           url.includes('youtu.be');
  };

  // Extract YouTube ID
  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Get icon based on content type
  const getIcon = (type) => {
    switch (type) {
      case 'blog': return <FiFileText className="text-blue-600 mr-2" />;
      case 'news': return <FaNewspaper className="text-red-600 mr-2" />;
      case 'video': return <FiVideo className="text-green-600 mr-2" />;
      case 'audio': return <FiMusic className="text-purple-600 mr-2" />;
      case 'image': return <FiImage className="text-yellow-600 mr-2" />;
      default: return <FiFileText className="mr-2" />;
    }
  };

  // Enhanced fetch function with retry logic
  const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('News data not found');
          } else if (response.status >= 500) {
            throw new Error('Server error, please try again later');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        return await response.json();
      } catch (err) {
        if (i === retries - 1) throw err;
        await new Promise(res => setTimeout(res, delay));
      }
    }
  };

  // Fetch news data with improved error handling
  const fetchNewsData = async () => {
    try {
      setNewsData(prev => ({ ...prev, loading: true, error: null }));
      
      const allNews = await fetchWithRetry(`${API_BASE_URL}/api/content?type=news`);
      
      const featured = allNews.length > 0 ? allNews[0] : null;
      const articles = allNews.slice(1);

      setNewsData({
        featured: featured ? {
          ...featured,
          mediaUrl: formatMediaUrl(featured.image || featured.url),
          isVideo: isVideo(featured.url),
          youtubeId: getYoutubeId(featured.url),
          content: featured.description.split('\n').filter(p => p.trim() !== '')
        } : null,
        articles: articles.map(article => ({
          ...article,
          mediaUrl: formatMediaUrl(article.image || article.url),
          isVideo: isVideo(article.url),
          youtubeId: getYoutubeId(article.url)
        })),
        loading: false,
        error: null
      });

    } catch (err) {
      console.error('Fetch error:', err);
      setNewsData(prev => ({
        ...prev,
        loading: false,
        error: err.message || 'Failed to fetch news data. Please check your connection and try again.'
      }));
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  // Handle video play/pause
  const handlePlayVideo = (e, id) => {
    e.stopPropagation();
    if (playingVideo === id) {
      videoRefs.current[id]?.pause();
      setPlayingVideo(null);
    } else {
      videoRefs.current[id]?.play();
      setPlayingVideo(id);
    }
  };

  // Handle video hover for preview
  const handleVideoHover = (id, isHovering) => {
    if (isHovering) {
      setHoveredVideo(id);
      if (!playingVideo) {
        videoRefs.current[id]?.play();
      }
    } else {
      setHoveredVideo(null);
      if (!playingVideo) {
        videoRefs.current[id]?.pause();
        if (videoRefs.current[id]) {
          videoRefs.current[id].currentTime = 0;
        }
      }
    }
  };

  // Navigate to detail page
  const handleItemClick = (id) => {
    navigate(`/content/${id}`);
  };

  // Render media content with fixed image display
  const renderMedia = (item) => {
    if (item.isVideo) {
      if (item.youtubeId) {
        return (
          <div className="relative pb-[56.25%] h-0 overflow-hidden">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=0&controls=0&mute=1&loop=1&playlist=${item.youtubeId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={item.title}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div className="bg-white bg-opacity-80 rounded-full p-4">
                <FaPlay className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div 
            className="relative"
            onMouseEnter={() => handleVideoHover(item._id, true)}
            onMouseLeave={() => handleVideoHover(item._id, false)}
          >
            <video
              ref={el => videoRefs.current[item._id] = el}
              className="w-full h-48 object-cover"
              poster={item.image ? formatMediaUrl(item.image) : '/default-video.jpg'}
              muted
              loop
              playsInline
            >
              <source src={item.mediaUrl} type={`video/${item.mediaUrl.split('.').pop()}`} />
              Your browser does not support the video tag.
            </video>
            <button 
              onClick={(e) => handlePlayVideo(e, item._id)}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all"
            >
              <div className="bg-white bg-opacity-80 rounded-full p-3 hover:bg-opacity-100 hover:scale-110 transition-transform">
                {playingVideo === item._id ? (
                  <FaPause className="text-blue-600 text-lg" />
                ) : (
                  <FaPlay className="text-blue-600 text-lg" />
                )}
              </div>
            </button>
          </div>
        );
      }
    }
    
    return (
      <div className="w-full h-48 relative bg-gray-100 flex items-center justify-center">
        <img 
          src={item.mediaUrl}
          alt={item.title}
          className="max-w-full max-h-full object-contain"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          onError={(e) => {
            e.target.src = '/default-news.jpg';
            e.target.onerror = null;
          }}
        />
      </div>
    );
  };

  // Loading state
  if (newsData.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading news...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (newsData.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
            <p className="font-semibold">Error loading news</p>
            <p>{newsData.error}</p>
          </div>
          <button 
            onClick={fetchNewsData}
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mx-auto"
          >
            <FaRedo className="mr-2" />
            Try Again
          </button>
          <p className="mt-4 text-sm text-gray-500">
            If the problem persists, please check your internet connection or try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {/* Featured News */}
        {newsData.featured && (
          <section className="mb-12">
            <div 
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => handleItemClick(newsData.featured._id)}
            >
              <div className="md:flex">
                <div className="md:w-1/2 h-96 relative bg-gray-100 flex items-center justify-center">
                  {newsData.featured.isVideo ? (
                    renderMedia(newsData.featured)
                  ) : (
                    <img 
                      src={newsData.featured.mediaUrl}
                      alt={newsData.featured.title}
                      className="max-w-full max-h-full object-contain"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                      onError={(e) => {
                        e.target.src = '/default-news.jpg';
                        e.target.onerror = null;
                      }}
                    />
                  )}
                </div>
                <div className="p-6 md:w-1/2">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      News
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      {new Date(newsData.featured.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-4">{newsData.featured.title}</h1>
                  <p className="text-gray-700 mb-4 text-lg">
                    {newsData.featured.excerpt || newsData.featured.description.substring(0, 100)}...
                  </p>
                  <div className="prose max-w-none">
                    {newsData.featured.content.slice(0, 2).map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-6">
                    <button className="text-blue-600 hover:text-blue-800 font-semibold">
                      Read full story →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* News Articles Grid */}
        <section>
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="text-2xl font-bold">Latest News</h2>
            <button 
              onClick={fetchNewsData}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <FaRedo className="mr-1" />
              Refresh
            </button>
          </div>
          {newsData.articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newsData.articles.map((article) => (
                <div 
                  key={article._id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleItemClick(article._id)}
                >
                  <div>
                    {renderMedia(article)}
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                          News
                        </span>
                        <span className="text-gray-500 text-sm ml-2">
                          {new Date(article.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 hover:text-blue-600">
                        {article.title}
                      </h3>
                      <p className="text-gray-600">
                        {article.excerpt || article.description.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No news articles found. Please check back later.
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section className="mt-12 bg-blue-50 rounded-lg p-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
            <p className="mb-4">Subscribe to our newsletter for daily news updates</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};