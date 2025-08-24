import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FiArrowLeft,
  FiCalendar,
  FiFileText,
  FiVideo,
  FiMusic,
  FiImage,
  FiLoader,
  FiPlay,
  FiPause,
  FiHeart,
  FiShare2,
  FiDownload,
  FiYoutube
} from 'react-icons/fi';
import { FaNewspaper } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const ContentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [liked, setLiked] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState({});

  const API_BASE_URL =
    window._env_?.API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    'http://localhost:5000';

  // Default images for fallback
  const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80';
  const DEFAULT_WRITER_IMAGE = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80';

  const getContentIcon = (type) => {
    const iconStyle = "text-2xl mr-3 flex-shrink-0 drop-shadow-sm";
    switch (type?.toLowerCase()) {
      case 'blog': return <FiFileText className={`${iconStyle} text-indigo-500`} />;
      case 'news': return <FaNewspaper className={`${iconStyle} text-rose-500`} />;
      case 'video': return <FiVideo className={`${iconStyle} text-emerald-500`} />;
      case 'audio': return <FiMusic className={`${iconStyle} text-violet-500`} />;
      default: return <FiFileText className={`${iconStyle} text-slate-500`} />;
    }
  };

  const getGradientClass = (type) => {
    switch (type?.toLowerCase()) {
      case 'blog': return 'from-indigo-500/15 to-purple-500/15';
      case 'news': return 'from-rose-500/15 to-pink-500/15';
      case 'video': return 'from-emerald-500/15 to-teal-500/15';
      case 'audio': return 'from-violet-500/15 to-fuchsia-500/15';
      default: return 'from-slate-500/15 to-gray-500/15';
    }
  };

  const fetchContentDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_BASE_URL}/api/content/${id}`);
      const raw = response.data?.data || response.data;

      if (!raw || typeof raw !== 'object') {
        throw new Error('Invalid content data received');
      }

      // Get all media files
      const mediaFiles = Array.isArray(raw.files) ? raw.files : [];
      
      // Get primary media
      let primaryMedia = null;
      if (mediaFiles.length > 0) {
        primaryMedia = mediaFiles[0];
      } else if (raw.url) {
        primaryMedia = { url: raw.url, fileType: raw.type };
      }

      const contentData = {
        id: raw._id || id,
        title: raw.title?.trim() || 'Untitled Content',
        description: raw.description?.trim() || 'No description available',
        type: ['blog', 'news', 'video', 'audio', 'image'].includes(raw.type)
          ? raw.type
          : 'blog',
        url: primaryMedia?.url || null,
        fileType: primaryMedia?.fileType || raw.type,
        createdAt: raw.createdAt ? new Date(raw.createdAt) : new Date(),
        category: raw.category || null,
        thumbnail: raw.thumbnail || null,
        writers: Array.isArray(raw.writers) ? raw.writers : [],
        files: mediaFiles,
        likes: raw.likes || 0,
        youtubeUrl: raw.youtubeUrl || null
      };

      setContent(contentData);
    } catch (err) {
      handleContentError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleContentError = (error) => {
    let errorMsg = 'Content load failed. Please try again.';

    if (error.response) {
      if (error.response.status === 404) {
        errorMsg = 'Requested content not found';
      } else if (error.response.data?.message) {
        errorMsg = error.response.data.message;
      }
    } else if (error.message.includes('Network Error')) {
      errorMsg = 'Network connection error';
    } else if (error.message.includes('Invalid content')) {
      errorMsg = 'Invalid content data received';
    }

    console.error('Content Error:', error);
    setError(errorMsg);
  };

  const getMediaUrl = (path) => {
    if (!path || typeof path !== 'string') return null;

    // If it's already a full URL, return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    // Handle different path formats
    if (path.startsWith('/uploads/')) {
      return `${API_BASE_URL}${path}`;
    }
    
    if (path.startsWith('uploads/')) {
      return `${API_BASE_URL}/${path}`;
    }
    
    if (path.startsWith('/api/uploads/')) {
      return `${API_BASE_URL}${path.replace('/api/uploads', '/uploads')}`;
    }
    
    if (path.startsWith('api/uploads/')) {
      return `${API_BASE_URL}/${path.replace('api/uploads/', 'uploads/')}`;
    }

    // Default case - assume it's relative to uploads
    return `${API_BASE_URL}/uploads/${path}`;
  };

  const formatContentDate = (date) => {
    if (!date || isNaN(new Date(date))) return 'Date not available';

    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleImageError = (event, type = 'content', id = 'main') => {
    console.log(`Image error for ${type}-${id}`);
    
    // Set error state
    setImageLoadErrors(prev => ({ ...prev, [`${type}-${id}`]: true }));
    
    // Set fallback image
    if (event && event.target) {
      if (type === 'writer') {
        event.target.src = DEFAULT_WRITER_IMAGE;
      } else {
        event.target.src = DEFAULT_IMAGE;
      }
    }
  };

  const handleVideoPlay = () => {
    setPlayingVideo(true);
    const video = document.getElementById('content-video');
    if (video) {
      video.play().catch(e => console.log('Video play error:', e));
    }
  };

  const handleVideoPause = () => {
    setPlayingVideo(false);
    const video = document.getElementById('content-video');
    if (video) video.pause();
  };

  const handleLike = async () => {
    try {
      // Optimistic UI update
      setLiked(!liked);
      const newLikes = liked ? content.likes - 1 : content.likes + 1;
      setContent({...content, likes: newLikes});
      
      // Send request to server
      await axios.post(`${API_BASE_URL}/api/content/${id}/like`, {
        liked: !liked
      });
    } catch (error) {
      console.error('Error updating like:', error);
      // Revert on error
      setLiked(!liked);
      setContent({...content, likes: content.likes});
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: content.title,
          text: content.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Sharing cancelled or failed', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied to clipboard!');
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    }
  };

  const handleDownload = () => {
    if (content.url) {
      const link = document.createElement('a');
      link.href = getMediaUrl(content.url);
      link.download = content.title || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleYoutubeClick = () => {
    if (content.youtubeUrl) {
      window.open(content.youtubeUrl, '_blank');
    }
  };

  useEffect(() => {
    fetchContentDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="animate-spin text-blue-500 text-4xl mb-4 mx-auto" />
          <p className="text-gray-600 text-xl">Loading content details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-rose-200 max-w-md">
          <div className="text-rose-500 text-5xl mb-4">⚠️</div>
          <p className="text-xl font-semibold text-rose-700 mb-2">Oops! Something went wrong</p>
          <p className="text-rose-600 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-amber-200">
          <div className="text-amber-500 text-5xl mb-4">📭</div>
          <p className="text-2xl font-bold text-amber-700 mb-2">No Content Found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Back to Content
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 py-8">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
        >
          <FiArrowLeft className="mr-2" />
          Back to Content
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`bg-gradient-to-br ${getGradientClass(content.type)} backdrop-blur-sm bg-white/90 rounded-3xl shadow-lg overflow-hidden border border-white/60`}
        >
          {/* Media Display */}
          <div className="w-full">
            {content.fileType === 'video' ? (
              <div className="relative bg-gradient-to-br from-gray-900 to-black overflow-hidden group">
                <div className="w-full h-96 relative">
                  <video
                    id="content-video"
                    controls
                    className="absolute inset-0 w-full h-full object-contain"
                    src={getMediaUrl(content.url)}
                    poster={content.thumbnail ? getMediaUrl(content.thumbnail) : undefined}
                    playsInline
                  />
                  
                  {/* Custom Video Controls Overlay */}
                  {!playingVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all duration-300">
                      <motion.button
                        className="bg-white/95 backdrop-blur-sm text-emerald-600 p-5 rounded-full shadow-2xl hover:bg-white transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleVideoPlay}
                      >
                        <FiPlay className="w-8 h-8 ml-1" />
                      </motion.button>
                    </div>
                  )}
                </div>
                
                {/* Video Badge */}
                <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  VIDEO
                </div>
              </div>
            ) : content.fileType === 'audio' ? (
              <div className="p-6 bg-gradient-to-br from-violet-400 to-fuchsia-500">
                <div className="w-full h-64 relative flex items-center justify-center">
                  <img
                    src={content.thumbnail ? getMediaUrl(content.thumbnail) : 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'}
                    alt={content.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                    onError={(e) => handleImageError(e, 'thumbnail', 'thumbnail')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/60 to-fuchsia-500/60 flex items-center justify-center">
                    <motion.div 
                      className="bg-white/95 p-6 rounded-full shadow-2xl"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                      <FiMusic className="text-4xl text-violet-600" />
                    </motion.div>
                  </div>
                  <audio
                    controls
                    className="absolute bottom-4 left-4 right-4"
                    src={getMediaUrl(content.url)}
                    autoPlay
                  />
                </div>
                
                {/* Audio Badge */}
                <div className="absolute top-4 right-4 bg-violet-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  AUDIO
                </div>
              </div>
            ) : content.url || content.thumbnail ? (
              <div className="flex justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4 max-h-[70vh] min-h-[400px]">
                <img
                  src={getMediaUrl(content.url || content.thumbnail)}
                  alt={content.title}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => handleImageError(e, 'content', 'main')}
                  loading="lazy"
                />
                
                {/* Content Type Badge */}
                <div className={`absolute top-4 right-4 ${
                  content.type === 'blog' ? 'bg-indigo-500' : 
                  content.type === 'news' ? 'bg-rose-500' : 'bg-slate-500'
                } text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg uppercase`}>
                  {content.type || 'CONTENT'}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-8 min-h-[400px]">
                <div className="text-center text-gray-500">
                  <FiImage className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg">No media available</p>
                </div>
                
                {/* Content Type Badge */}
                <div className={`absolute top-4 right-4 ${
                  content.type === 'blog' ? 'bg-indigo-500' : 
                  content.type === 'news' ? 'bg-rose-500' : 'bg-slate-500'
                } text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg uppercase`}>
                  {content.type || 'CONTENT'}
                </div>
              </div>
            )}
          </div>

          {/* Content Details */}
          <div className="p-6 md:p-8">
            <div className="flex items-start mb-6">
              {getContentIcon(content.type)}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {content.title}
                </h1>
                
                <div className="flex flex-wrap items-center text-gray-500 gap-4 mb-4">
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <FiCalendar className="mr-2" />
                    <span>{formatContentDate(content.createdAt)}</span>
                  </div>

                  {content.category && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-800">
                      {typeof content.category === 'object'
                        ? content.category.name
                        : content.category}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`flex items-center px-4 py-2 rounded-full ${liked ? 'bg-red-500 text-white' : 'bg-white text-gray-700'} shadow-sm border border-gray-200 transition-colors`}
              >
                <FiHeart className={`mr-2 ${liked ? 'fill-current' : ''}`} />
                <span>{content.likes || 0}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex items-center px-4 py-2 rounded-full bg-white text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <FiShare2 className="mr-2" />
                Share
              </motion.button>

              {content.url && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="flex items-center px-4 py-2 rounded-full bg-white text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <FiDownload className="mr-2" />
                  Download
                </motion.button>
              )}

              {content.youtubeUrl && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYoutubeClick}
                  className="flex items-center px-4 py-2 rounded-full bg-red-600 text-white shadow-sm border border-red-700 hover:bg-red-700 transition-colors"
                >
                  <FiYoutube className="mr-2" />
                  YouTube
                </motion.button>
              )}
            </div>

            {/* Writers Section */}
            {content.writers && content.writers.length > 0 && (
              <div className="mb-6 p-4 bg-white/50 rounded-xl border border-white/70">
                <p className="text-sm font-medium text-gray-500 mb-3">लेखक / Writers:</p>
                <div className="flex flex-wrap gap-3">
                  {content.writers.map((writer, index) => (
                    <div key={index} className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                      {writer.photoUrl ? (
                        <img
                          src={getMediaUrl(writer.photoUrl)}
                          alt={writer.name}
                          className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-300"
                          onError={(e) => handleImageError(e, 'writer', `writer-${index}`)}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center text-gray-600 text-sm font-medium">
                          {writer.name ? writer.name.charAt(0).toUpperCase() : 'W'}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {writer.name || 'अज्ञात लेखक / Unknown Writer'}
                        </p>
                        {writer.role && (
                          <p className="text-xs text-gray-500">{writer.role}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="prose max-w-none mb-6">
              <div className="text-gray-700 whitespace-pre-line leading-relaxed text-lg">
                {content.description}
              </div>
            </div>

            {/* Additional Media Files */}
            {content.files && content.files.length > 1 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Media</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {content.files.slice(1).map((file, index) => (
                    <div key={index} className="rounded-lg overflow-hidden border border-gray-200">
                      {file.fileType === 'image' ? (
                        <img
                          src={getMediaUrl(file.url)}
                          alt={`Additional media ${index + 1}`}
                          className="w-full h-32 object-cover"
                          onError={(e) => handleImageError(e, 'file', `file-${index}`)}
                        />
                      ) : file.fileType === 'video' ? (
                        <div className="relative h-32 bg-black flex items-center justify-center">
                          <FiVideo className="text-white text-2xl" />
                        </div>
                      ) : (
                        <div className="h-32 bg-gray-100 flex items-center justify-center">
                          <FiFileText className="text-gray-500 text-2xl" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};