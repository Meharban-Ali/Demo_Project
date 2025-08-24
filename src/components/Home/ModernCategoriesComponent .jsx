import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Grid, 
  List, 
  Search, 
  Filter, 
  ArrowRight, 
  Play, 
  FileText, 
  Music, 
  Video, 
  Image,
  Calendar,
  Eye,
  Heart,
  Share2,
  RefreshCw,
  ChevronDown,
  Tag,
  TrendingUp,
  X,
  Download,
  User
} from 'lucide-react';

export const ModernCategoriesComponent = () => {
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredContent, setFilteredContent] = useState([]);
  const [viewType, setViewType] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [likedItems, setLikedItems] = useState(new Set());

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAndSortContent();
  }, [content, selectedCategory, searchQuery, sortBy]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories and content simultaneously
      const [categoriesResponse, contentResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/categories`),
        fetch(`${API_BASE_URL}/api/content`)
      ]);

      if (!categoriesResponse.ok || !contentResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const categoriesData = await categoriesResponse.json();
      const contentData = await contentResponse.json();

      // Process categories
      const processedCategories = Array.isArray(categoriesData) ? categoriesData : [];
      setCategories(processedCategories);

      // Process content - exclude audio type
      const processedContent = (contentData.data || contentData.content || 
                              (Array.isArray(contentData) ? contentData : []))
                              .filter(item => item.type !== 'audio'); // Exclude audio content
      setContent(processedContent);

    } catch (error) {
      console.error('Error fetching data:', error);
      setCategories([]);
      setContent([]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortContent = () => {
    let filtered = [...content];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => {
        const itemCategoryId = item.category?._id || item.category;
        return itemCategoryId === selectedCategory;
      });
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort content
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title':
          return (a.title || '').localeCompare(b.title || '');
        default:
          return 0;
      }
    });

    setFilteredContent(filtered);
  };

  const getCategoryStats = (categoryId) => {
    if (categoryId === 'all') {
      return content.length;
    }
    return content.filter(item => {
      const itemCategoryId = item.category?._id || item.category;
      return itemCategoryId === categoryId;
    }).length;
  };

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'news':
        return <FileText className="w-4 h-4" />;
      case 'blog':
        return <FileText className="w-4 h-4" />;
      default:
        return <Image className="w-4 h-4" />;
    }
  };

  const getMediaUrl = (item) => {
    if (item.files && item.files.length > 0) {
      const url = item.files[0].url;
      return url?.startsWith('http') ? url : `${API_BASE_URL}${url?.replace('/api/uploads', '/uploads')}`;
    }
    if (item.url) {
      return item.url.startsWith('http') ? item.url : `${API_BASE_URL}${item.url.replace('/api/uploads', '/uploads')}`;
    }
    return 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80';
  };

  const getWriterPhotoUrl = (photoUrl) => {
    if (!photoUrl) return null;
    return photoUrl.startsWith('http') ? photoUrl : `${API_BASE_URL}${photoUrl.replace('/api/uploads', '/uploads')}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Modal and interaction handlers
  const handleReadMore = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleLike = (itemId) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleShare = async (item) => {
    const shareData = {
      title: item.title || 'Check out this content',
      text: item.description || '',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.log('Share error:', error);
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownload = (item) => {
    const mediaUrl = getMediaUrl(item);
    const link = document.createElement('a');
    link.href = mediaUrl;
    link.download = `${item.title || 'content'}.${item.type === 'video' ? 'mp4' : 'jpg'}`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12 px-4 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading content...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-blue-500">
            CONTENT LIBRARY
          </h1>
          <p className="text-orange-500 text-lg font-medium">
            Explore content organized by categories
          </p>
        </motion.div>

        {/* Categories Navigation */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex flex-wrap gap-3">
              <motion.button
                key="all"
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Tag className="w-4 h-4" />
                All Categories
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                  {getCategoryStats('all')}
                </span>
              </motion.button>

              {categories.map((category) => (
                <motion.button
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category._id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {category.name}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category._id
                      ? 'bg-white/20'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {getCategoryStats(category._id)}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-gray-100 text-gray-700 px-4 py-3 pr-8 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title">By Title</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>

                {/* View Toggle */}
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewType('grid')}
                    className={`p-2 rounded-lg transition-all ${
                      viewType === 'grid'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewType('list')}
                    className={`p-2 rounded-lg transition-all ${
                      viewType === 'list'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                {/* Refresh */}
                <motion.button
                  onClick={fetchData}
                  className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filteredContent.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Content Found</h3>
              <p className="text-gray-500">
                {searchQuery 
                  ? `No results for "${searchQuery}" in ${selectedCategory === 'all' ? 'all categories' : 'this category'}`
                  : 'No content available in this category'
                }
              </p>
            </div>
          ) : (
            <div className={viewType === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'space-y-6'
            }>
              <AnimatePresence>
                {filteredContent.map((item, index) => (
                  <motion.div
                    key={item._id || index}
                    className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 ${
                      viewType === 'list' ? 'flex' : ''
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Media */}
                    <div className={`relative ${viewType === 'list' ? 'w-48 h-32' : 'h-48'} bg-gray-100 overflow-hidden`}>
                      {item.type === 'video' ? (
                        <video 
                          src={getMediaUrl(item)}
                          className="w-full h-full object-cover"
                          controls={false}
                          muted
                        />
                      ) : (
                        <img
                          src={getMediaUrl(item)}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80';
                          }}
                        />
                      )}
                      
                      {/* Type Badge */}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        {getContentTypeIcon(item.type)}
                        <span className="text-xs font-medium capitalize">{item.type}</span>
                      </div>

                      {/* Play Button for Videos */}
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-6 h-6 text-gray-700 ml-1" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className={`p-6 ${viewType === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-800 leading-tight line-clamp-2">
                          {item.title || 'Untitled'}
                        </h3>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {item.description || 'No description available'}
                      </p>

                      {/* Writers Section */}
                      {item.writers && item.writers.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 flex-wrap">
                            {item.writers.slice(0, 2).map((writer, writerIndex) => (
                              <div key={writerIndex} className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1">
                                {writer.photoUrl ? (
                                  <img
                                    src={getWriterPhotoUrl(writer.photoUrl)}
                                    alt={writer.name}
                                    className="w-6 h-6 rounded-full object-cover"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                    }}
                                  />
                                ) : (
                                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                                    <User className="w-3 h-3 text-white" />
                                  </div>
                                )}
                                <div>
                                  <span className="text-xs font-medium text-gray-700">{writer.name}</span>
                                  {writer.role && (
                                    <p className="text-xs text-gray-500">{writer.role}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                            {item.writers.length > 2 && (
                              <span className="text-xs text-gray-500">+{item.writers.length - 2} more</span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Category & Date */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
                          {typeof item.category === 'object' ? item.category.name : 'Uncategorized'}
                        </span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(item.createdAt)}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-gray-500">
                          <button 
                            onClick={() => handleLike(item._id)}
                            className={`flex items-center gap-1 transition-colors ${
                              likedItems.has(item._id) ? 'text-red-500' : 'hover:text-red-500'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${likedItems.has(item._id) ? 'fill-current' : ''}`} />
                            <span className="text-xs">{likedItems.has(item._id) ? '1' : '0'}</span>
                          </button>
                          <button 
                            onClick={() => handleShare(item)}
                            className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDownload(item)}
                            className="hover:text-green-500 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                        <button 
                          onClick={() => handleReadMore(item)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                          <span className="text-sm">Read More</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Statistics */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Library Statistics</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{content.length}</div>
                <div className="text-sm text-gray-500">Total Content</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
                <div className="text-sm text-gray-500">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{filteredContent.length}</div>
                <div className="text-sm text-gray-500">Filtered Results</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {selectedCategory === 'all' ? 'All' : categories.find(c => c._id === selectedCategory)?.name || 'Unknown'}
                </div>
                <div className="text-sm text-gray-500">Active Category</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Read More Modal */}
        <AnimatePresence>
          {showModal && selectedItem && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      {getContentTypeIcon(selectedItem.type)}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {selectedItem.title}
                      </h2>
                      <p className="text-sm text-gray-500 capitalize">
                        {selectedItem.type} • {typeof selectedItem.category === 'object' ? selectedItem.category.name : 'Uncategorized'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {/* Media Section */}
                  <div className="mb-6">
                    {selectedItem.type === 'video' ? (
                      <video
                        src={getMediaUrl(selectedItem)}
                        controls
                        className="w-full h-64 md:h-96 object-cover rounded-xl"
                      />
                    ) : (
                      <img
                        src={getMediaUrl(selectedItem)}
                        alt={selectedItem.title}
                        className="w-full h-64 md:h-96 object-cover rounded-xl"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80';
                        }}
                      />
                    )}
                  </div>

                  {/* Writers Section */}
                  {selectedItem.writers && selectedItem.writers.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Authors</h3>
                      <div className="flex flex-wrap gap-4">
                        {selectedItem.writers.map((writer, index) => (
                          <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                            {writer.photoUrl ? (
                              <img
                                src={getWriterPhotoUrl(writer.photoUrl)}
                                alt={writer.name}
                                className="w-12 h-12 rounded-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                              </div>
                            )}
                            <div>
                              <h4 className="font-medium text-gray-800">{writer.name}</h4>
                              {writer.role && (
                                <p className="text-sm text-gray-500">{writer.role}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {selectedItem.description || 'No description available.'}
                      </p>
                    </div>
                  </div>

                  {/* Meta Information */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Published:</span>
                        <p className="text-gray-600">{formatDate(selectedItem.createdAt)}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Category:</span>
                        <p className="text-gray-600">
                          {typeof selectedItem.category === 'object' ? selectedItem.category.name : 'Uncategorized'}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Type:</span>
                        <p className="text-gray-600 capitalize">{selectedItem.type}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleLike(selectedItem._id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                        likedItems.has(selectedItem._id)
                          ? 'bg-red-100 text-red-600 border border-red-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedItems.has(selectedItem._id) ? 'fill-current' : ''}`} />
                      {likedItems.has(selectedItem._id) ? 'Liked' : 'Like'}
                    </button>
                    
                    <button
                      onClick={() => handleShare(selectedItem)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                    
                    <button
                      onClick={() => handleDownload(selectedItem)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-xl transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};