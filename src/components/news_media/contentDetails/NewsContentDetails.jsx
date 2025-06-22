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
  FiYoutube
} from 'react-icons/fi';
import { FaNewspaper } from 'react-icons/fa';

export const NewsContentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to get appropriate icon based on content type
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

  // Fetch content details from API
  const fetchContentDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/content/${id}`);
      setContent(res.data);
    } catch (error) {
      console.error('Error fetching content details:', error);
      setError('Failed to load content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContentDetails();
  }, [id]);

  // Helper function to construct proper media URLs
  const getMediaUrl = (url) => {
    if (!url) return null;
    
    // If URL is already absolute, return as-is
    if (url.startsWith('http')) return url;
    
    // For blog/news content, the URL might already have /uploads prefix
    if (url.startsWith('/uploads')) {
      return `http://localhost:5000${url}`;
    }
    
    // For other cases, construct the full URL
    return `http://localhost:5000/uploads/${url}`;
  };

  // Check if URL is a YouTube video
  const isYouTubeUrl = (url) => {
    return url?.includes('youtube.com') || url?.includes('youtu.be');
  };

  // Extract YouTube video ID
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Handle image loading errors
  const handleImageError = (e) => {
    console.error('Failed to load image:', e.target.src);
    const parent = e.target.parentElement;
    if (parent) {
      parent.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-gray-500 p-4">
          <FiImage className="w-8 h-8 mb-2" />
          <span>Image not available</span>
        </div>
      `;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="text-center py-20">
        <p>Content not found</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <FiArrowLeft className="mr-2" />
        Back to Content
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Media Display Section - Enhanced with better media handling */}
        <div className="w-full">
          {content.type === 'video' ? (
            isYouTubeUrl(content.url) ? (
              <div className="relative pt-[56.25%] bg-black">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${getYouTubeId(content.url)}?autoplay=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={content.title}
                ></iframe>
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center">
                  <FiYoutube className="mr-2 text-red-500" />
                  <span>YouTube</span>
                </div>
              </div>
            ) : (
              <div className="relative pt-[56.25%] bg-black">
                <video 
                  controls 
                  className="absolute inset-0 w-full h-full"
                  autoPlay
                >
                  <source src={getMediaUrl(content.url)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )
          ) : content.type === 'audio' ? (
            <div className="p-6 bg-gray-100">
              <audio 
                controls 
                className="w-full"
                autoPlay
              >
                <source src={getMediaUrl(content.url)} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : (
            <div className="flex justify-center bg-gray-100 p-4" id="image-container">
              <img
                src={getMediaUrl(content.url)}
                alt={content.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-md"
                onError={handleImageError}
              />
            </div>
          )}
        </div>

        {/* Content Details Section - Enhanced with better layout */}
        <div className="p-6">
          <div className="flex items-center mb-4">
            {getIcon(content.type)}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{content.title}</h1>
          </div>

          <div className="flex flex-wrap items-center text-gray-500 mb-6 gap-2">
            <div className="flex items-center">
              <FiCalendar className="mr-2" />
              <span>
                {new Date(content.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            
            {content.publisher && (
              <div className="flex items-center ml-4">
                <span className="text-gray-700">By {content.publisher}</span>
              </div>
            )}

            {content.category && (
              <span className="ml-4 px-3 py-1 bg-gray-200 rounded-full text-sm">
                {typeof content.category === 'object' 
                  ? content.category.name 
                  : content.category}
              </span>
            )}
          </div>

          <div className="prose max-w-none">
            {content.description.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Additional Content Details */}
          {content.additionalDetails && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(content.additionalDetails).map(([key, value]) => (
                  <div key={key} className="mb-2">
                    <span className="font-medium text-gray-700">{key}: </span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};