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
  FiLoader
} from 'react-icons/fi';
import { FaNewspaper } from 'react-icons/fa';

export const ContentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL =
    window._env_?.API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    'http://localhost:5000';

  const getContentIcon = (type) => {
    const iconStyle = "mr-2 flex-shrink-0";
    const icons = {
      blog: <FiFileText className={iconStyle} style={{ color: '#3B82F6' }} />,
      news: <FaNewspaper className={iconStyle} style={{ color: '#EF4444' }} />,
      video: <FiVideo className={iconStyle} style={{ color: '#10B981' }} />,
      audio: <FiMusic className={iconStyle} style={{ color: '#8B5CF6' }} />,
      image: <FiImage className={iconStyle} style={{ color: '#F59E0B' }} />
    };
    return icons[type] || <FiFileText className={iconStyle} />;
  };

  const fetchContentDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_BASE_URL}/api/content/${id}`);
      const raw = response.data?.data;

      if (!raw || typeof raw !== 'object') {
        throw new Error('Invalid content data received');
      }

      const contentData = {
        id: raw._id || id,
        title: raw.title?.trim() || 'Untitled Content',
        description: raw.description?.trim() || 'No description available',
        type: ['blog', 'news', 'video', 'audio', 'image'].includes(raw.type)
          ? raw.type
          : 'blog',
        url: typeof raw.url === 'string' ? raw.url : null,
        createdAt: raw.createdAt ? new Date(raw.createdAt) : new Date(),
        category: raw.category || null,
        thumbnail:
          typeof raw.thumbnail === 'string'
            ? raw.thumbnail
            : null
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

    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    return path.startsWith('/')
      ? `${API_BASE_URL}${path}`
      : `${API_BASE_URL}/uploads/${path}`;
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

  const handleMediaError = (event) => {
    event.target.style.display = 'none';
  };

  useEffect(() => {
    fetchContentDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <FiLoader className="animate-spin text-blue-500 text-4xl mb-4" />
        <p className="text-gray-600">Loading content details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-red-500 mb-6">
            <p className="mt-4 text-lg font-medium">{error}</p>
          </div>
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
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-lg text-gray-700">No content found</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Content
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
        <div className="w-full">
          {content.type === 'video' ? (
            <div className="relative pt-[56.25%] bg-black">
              <video
                controls
                className="absolute inset-0 w-full h-full object-contain"
                src={getMediaUrl(content.url)}
                onError={handleMediaError}
                poster={content.thumbnail ? getMediaUrl(content.thumbnail) : undefined}
                autoPlay
                playsInline
                muted
              />
            </div>
          ) : content.type === 'audio' ? (
            <div className="p-6 bg-gray-100">
              <audio
                controls
                className="w-full"
                src={getMediaUrl(content.url)}
                onError={handleMediaError}
                autoPlay
              />
            </div>
          ) : content.url ? (
            <div className="flex justify-center bg-gray-100 p-4 max-h-[70vh] min-h-[300px]">
              <img
                src={getMediaUrl(content.url)}
                alt={content.title}
                className="max-w-full max-h-full object-contain"
                onError={handleMediaError}
                loading="lazy"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center bg-gray-100 p-8 min-h-[300px]">
              <div className="text-center text-gray-500">
                <FiImage className="w-12 h-12 mx-auto mb-4" />
                <p>No media available</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center mb-4">
            {getContentIcon(content.type)}
            <h1 className="text-2xl font-bold text-gray-900">
              {content.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center text-gray-500 mb-6 gap-4">
            <div className="flex items-center">
              <FiCalendar className="mr-2" />
              <span>{formatContentDate(content.createdAt)}</span>
            </div>

            {content.category && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                {typeof content.category === 'object'
                  ? content.category.name
                  : content.category}
              </span>
            )}
          </div>

          <div className="prose max-w-none">
            <p className="whitespace-pre-line text-gray-700">
              {content.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
