import React, { useState, useEffect } from 'react';
import { 
  FaPlay, FaClock, FaEye, FaCalendarAlt, 
  FaShareAlt, FaHeart, FaSearch, FaBookmark,
  FaTimes, FaDownload, FaComment
} from 'react-icons/fa';
import { BsThreeDotsVertical, BsArrowRight } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

export const DocumentaryPage = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  
  const [documentaries, setDocumentaries] = useState([]);
  const [filteredDocumentaries, setFilteredDocumentaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [bookmarked, setBookmarked] = useState(new Set());
  const [selectedDocumentary, setSelectedDocumentary] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoThumbnails, setVideoThumbnails] = useState({});
  const itemsPerPage = 10;

  // Fetch documentaries from API
  useEffect(() => {
    const fetchDocumentaries = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/content?type=video`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        const contentData = data.data || data.content || (Array.isArray(data) ? data : []);
        
        // Filter to only include documentaries (category "Documentary")
        const documentaryContent = contentData.filter(item => 
          (item.category?.name || item.category || '').toLowerCase() === 'documentary'
        );
        
        setDocumentaries(documentaryContent);
        setFilteredDocumentaries(documentaryContent);
        
        // Generate thumbnails for videos
        generateVideoThumbnails(documentaryContent);
      } catch (err) {
        console.error('Error fetching documentaries:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocumentaries();
  }, []);

  // Function to generate video thumbnails
  const generateVideoThumbnails = (docs) => {
    const thumbnails = {};
    
    docs.forEach(doc => {
      const videoUrl = doc.files?.length > 0 
        ? getFullUrl(doc.files[0].url) 
        : getFullUrl(doc.url);
      
      if (videoUrl) {
        // Create a video element to capture thumbnails
        const video = document.createElement('video');
        video.src = videoUrl;
        video.crossOrigin = "anonymous";
        
        // When video metadata is loaded, capture thumbnails
        video.addEventListener('loadedmetadata', () => {
          // Capture multiple thumbnails from different points in the video
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = 320;
          canvas.height = 180;
          
          // Try to capture from different time points
          const timePoints = [video.duration * 0.25, video.duration * 0.5, video.duration * 0.75];
          
          timePoints.forEach((timePoint, index) => {
            video.currentTime = timePoint;
            
            video.onseeked = () => {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const thumbnailUrl = canvas.toDataURL('image/jpeg');
              
              thumbnails[doc._id] = thumbnails[doc._id] || [];
              thumbnails[doc._id][index] = thumbnailUrl;
              
              setVideoThumbnails(prev => ({
                ...prev,
                [doc._id]: [...(prev[doc._id] || []), thumbnailUrl]
              }));
            };
          });
        });
        
        video.load();
      }
    });
  };

  // Extract categories from documentaries
  useEffect(() => {
    if (documentaries.length > 0) {
      const categoryCounts = {};
      documentaries.forEach(doc => {
        const categoryName = doc.category?.name || doc.category || 'Uncategorized';
        categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1;
      });
      
      const categoryList = Object.entries(categoryCounts).map(([name, count]) => ({
        name,
        count
      }));
      
      setCategories(categoryList);
    }
  }, [documentaries]);

  // Filter documentaries based on search
  useEffect(() => {
    let results = documentaries;
    
    // Apply search filter
    if (searchQuery) {
      const term = searchQuery.toLowerCase();
      results = results.filter(doc => 
        doc.title?.toLowerCase().includes(term) ||
        doc.description?.toLowerCase().includes(term) ||
        (doc.category?.name || doc.category || '').toLowerCase().includes(term) ||
        new Date(doc.createdAt || doc.date).toLocaleDateString('hi-IN').includes(term)
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      results = results.filter(doc => {
        const categoryName = doc.category?.name || doc.category;
        return categoryName === selectedCategory;
      });
    }
    
    setFilteredDocumentaries(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedCategory, documentaries]);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDocumentaries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDocumentaries.length / itemsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Get full URL for media
  const getFullUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `${API_BASE_URL}${url.replace(/^\/api\/uploads/, '/uploads')}`;
  };

  // Handle bookmark
  const toggleBookmark = (id) => {
    const newBookmarked = new Set(bookmarked);
    if (newBookmarked.has(id)) {
      newBookmarked.delete(id);
    } else {
      newBookmarked.add(id);
    }
    setBookmarked(newBookmarked);
  };

  // Handle share documentary
  const handleShareDocumentary = async (documentary) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: documentary.title,
          text: documentary.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Sharing cancelled', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Handle play video
  const handlePlayVideo = (doc) => {
    const videoUrl = doc.files?.length > 0 
      ? getFullUrl(doc.files[0].url) 
      : getFullUrl(doc.url);
    
    if (videoUrl) {
      setCurrentVideo(videoUrl);
      setIsPlaying(true);
    }
  };

  // Handle show details
  const handleShowDetails = (doc) => {
    setSelectedDocumentary(doc);
    setShowPopup(true);
    document.body.style.overflow = 'hidden';
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedDocumentary(null);
    setIsPlaying(false);
    setCurrentVideo(null);
    document.body.style.overflow = 'auto';
  };

  // Handle "Watch Now" button - play first documentary or scroll to content
  const handleWatchNow = () => {
    if (filteredDocumentaries.length > 0) {
      // Play the first documentary
      handlePlayVideo(filteredDocumentaries[0]);
    } else {
      // Scroll to the documentaries section
      const documentariesSection = document.querySelector('.grid.grid-cols-1');
      if (documentariesSection) {
        documentariesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Handle "View All Documentaries" button - reset filters and scroll to content
  const handleViewAllDocumentaries = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    
    // Scroll to the documentaries section after a short delay
    setTimeout(() => {
      const documentariesSection = document.querySelector('.grid.grid-cols-1');
      if (documentariesSection) {
        documentariesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  // Get video thumbnail for a documentary
  const getVideoThumbnail = (docId) => {
    const thumbnails = videoThumbnails[docId];
    if (thumbnails && thumbnails.length > 0) {
      // Return a random thumbnail from the available ones
      return thumbnails[Math.floor(Math.random() * thumbnails.length)];
    }
    
    // Fallback to a video placeholder if no thumbnails are available
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjkwIiByPSIzMCIgZmlsbD0iIzhCMEU5RiIvPgo8cGF0aCBkPSJNMTQwIDgwVjEwMEwxNjAgOTBMMTQwIDgwWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+';
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 via-blue-800 to-indigo-900 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 rounded-full bg-purple-500 opacity-20"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-40 h-40 rounded-full bg-blue-500 opacity-20"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Raviopedia Documentary
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-blue-100"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              गहन शोध और विश्लेषण पर आधारित उच्च गुणवत्ता वाली डॉक्यूमेंट्रीज
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button 
                className="bg-white text-purple-800 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold flex items-center shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={handleWatchNow}
              >
                <FaPlay className="mr-3" /> अभी देखें
              </button>
              <button 
                className="border-2 border-white text-white hover:bg-white hover:text-purple-800 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1"
                onClick={handleViewAllDocumentaries}
              >
                सभी डॉक्यूमेंट्री देखें
              </button>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 md:px-6 py-8 -mt-8">
        <motion.div 
          className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FaSearch className="mr-3 text-purple-600" />
            डॉक्यूमेंट्री खोजें
          </h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="शीर्षक, विवरण, श्रेणी, या तारीख से खोजें..."
              className="w-full pl-12 pr-5 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 shadow-sm text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === 'all' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800 hover:shadow-md'
              }`}
              onClick={() => setSelectedCategory('all')}
            >
              सभी
            </button>
            {categories.map((category, index) => (
              <button 
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800 hover:shadow-md'
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Results Count */}
      <motion.div
        className="container mx-auto px-4 md:px-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
          <p className="text-gray-700 font-medium">
            {filteredDocumentaries.length} डॉक्यूमेंट्री मिले {searchQuery && <span>'<strong className="text-purple-600">{searchQuery}</strong>' के लिए</span>}
          </p>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-purple-600 hover:text-purple-800 font-medium flex items-center text-sm"
            >
              सभी डॉक्यूमेंट्री देखें <BsArrowRight className="ml-1" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Featured Documentaries */}
      <div className="container mx-auto px-4 md:px-6 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            फीचर्ड डॉक्यूमेंट्री
          </h2>
          <button 
            className="text-purple-600 hover:text-purple-800 font-medium flex items-center group"
            onClick={handleViewAllDocumentaries}
          >
            सभी देखें <BsArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
          </div>
        ) : currentItems.length === 0 ? (
          <motion.div 
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-12 text-center border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="mx-auto w-28 h-28 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
              <FaSearch className="text-purple-600 text-4xl" />
            </div>
            <h3 className="text-2xl font-medium text-gray-700 mb-3">कोई डॉक्यूमेंट्री नहीं मिली</h3>
            <p className="text-gray-500 text-lg">
              {searchQuery 
                ? `'${searchQuery}' से मेल खाने वाला कोई डॉक्यूमेंट्री नहीं मिला। कृपया अन्य शब्दों के साथ पुनः प्रयास करें।`
                : 'अभी तक कोई डॉक्यूमेंट्री उपलब्ध नहीं है।'
              }
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {currentItems.map((doc) => {
                const videoUrl = doc.files?.length > 0 
                  ? getFullUrl(doc.files[0].url) 
                  : getFullUrl(doc.url);
                
                const categoryName = doc.category?.name || doc.category || 'Uncategorized';
                const isBookmarked = bookmarked.has(doc._id);
                const thumbnail = getVideoThumbnail(doc._id);
                
                return (
                  <motion.div 
                    key={doc._id}
                    variants={itemVariants}
                    className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-white/20"
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  >
                    <div className="relative overflow-hidden">
                      {/* Video Thumbnail */}
                      <div className="w-full h-48 md:h-56 bg-gray-200 relative">
                        <img 
                          src={thumbnail}
                          alt={doc.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        
                        {/* Play Button */}
                        {videoUrl && (
                          <button 
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 text-purple-800 rounded-full p-4 hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-2xl"
                            onClick={() => handlePlayVideo(doc)}
                          >
                            <FaPlay size={20} />
                          </button>
                        )}
                        
                        <span className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm px-3 py-2 rounded-full shadow-lg">
                          {categoryName}
                        </span>
                        <span className="absolute top-4 right-4 bg-black/80 text-white text-xs px-3 py-2 rounded-full backdrop-blur-sm">
                          <FaClock className="inline mr-1" /> {doc.duration || '00:00'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-800 line-clamp-2 leading-tight">{doc.title || 'Untitled Documentary'}</h3>
                        <button 
                          className="text-gray-400 hover:text-purple-600 transition-colors p-2"
                          onClick={() => toggleBookmark(doc._id)}
                        >
                          <FaBookmark className={`text-lg ${isBookmarked ? 'text-purple-600 fill-current' : 'text-gray-400'}`} />
                        </button>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{doc.description || 'No description available'}</p>
                      
                      <div className="flex justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                          <FaCalendarAlt className="mr-2" /> {formatDate(doc.createdAt)}
                        </span>
                        <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                          <FaEye className="mr-2" /> {doc.views || '0'} views
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100/50">
                        <button 
                          className="text-purple-600 hover:text-purple-800 font-medium flex items-center group"
                          onClick={() => handleShowDetails(doc)}
                        >
                          पूरी जानकारी
                          <BsArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <div className="flex space-x-3">
                          <button 
                            className="text-gray-400 hover:text-blue-600 transition-colors p-2"
                            onClick={() => handleShareDocumentary(doc)}
                          >
                            <FaShareAlt />
                          </button>
                          <button 
                            className="text-gray-400 hover:text-red-600 transition-colors p-2"
                            onClick={() => toggleBookmark(doc._id)}
                          >
                            <FaHeart className={`text-lg ${isBookmarked ? 'text-red-600 fill-current' : 'text-gray-400'}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div 
                className="flex justify-center mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <nav className="flex items-center space-x-3 bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-5 py-3 rounded-xl bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-md border border-gray-200 flex items-center font-medium"
                  >
                    पिछला
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`px-5 py-3 rounded-xl shadow-md border font-medium transition-all ${
                          currentPage === pageNum
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-purple-500/30'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-5 py-3 rounded-xl bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-md border border-gray-200 flex items-center font-medium"
                  >
                    अगला
                  </button>
                </nav>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Video Player Popup */}
      <AnimatePresence>
        {isPlaying && currentVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50"
            onClick={() => {
              setIsPlaying(false);
              setCurrentVideo(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentVideo(null);
                }}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <FaTimes size={24} />
              </button>
              <video
                controls
                autoPlay
                className="w-full h-auto max-h-[80vh]"
                src={currentVideo}
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Documentary Details Popup */}
      <AnimatePresence>
        {showPopup && selectedDocumentary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50"
            onClick={closePopup}
          >
            <motion.div
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 border-b border-gray-200/50 flex justify-between items-center p-6">
                <h2 className="text-2xl font-bold text-gray-800">डॉक्यूमेंट्री विवरण</h2>
                <button
                  onClick={closePopup}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="relative rounded-xl overflow-hidden">
                    <img 
                      src={getVideoThumbnail(selectedDocumentary._id)}
                      alt={selectedDocumentary.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <button 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 text-purple-800 rounded-full p-4 hover:bg-white transition-all shadow-2xl"
                      onClick={() => handlePlayVideo(selectedDocumentary)}
                    >
                      <FaPlay size={24} />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {selectedDocumentary.category?.name || selectedDocumentary.category || 'Uncategorized'}
                  </span>
                  <div className="flex items-center text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                    <FaCalendarAlt className="mr-2" />
                    {formatDate(selectedDocumentary.createdAt)}
                  </div>
                  <div className="flex items-center text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                    <FaEye className="mr-2" />
                    {selectedDocumentary.views || '0'} views
                  </div>
                  <div className="flex items-center text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                    <FaClock className="mr-2" />
                    {selectedDocumentary.duration || '00:00'}
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedDocumentary.title}</h1>
                
                <div className="prose max-w-none text-gray-700 mb-6">
                  <p className="text-lg leading-relaxed">{selectedDocumentary.description}</p>
                  
                  {selectedDocumentary.content && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-3">पूरी सामग्री</h3>
                      <div className="space-y-4">
                        {selectedDocumentary.content.split('\n').map((paragraph, index) => (
                          <p key={index} className="text-gray-700 leading-relaxed">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                  <div className="flex space-x-4">
                    <button 
                      className="text-gray-500 hover:text-blue-600 transition-colors flex items-center"
                      onClick={() => handleShareDocumentary(selectedDocumentary)}
                    >
                      <FaShareAlt className="mr-2" />
                      साझा करें
                    </button>
                    <button 
                      onClick={() => toggleBookmark(selectedDocumentary._id)}
                      className={`transition-colors flex items-center ${bookmarked.has(selectedDocumentary._id) ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}
                    >
                      <FaHeart className="mr-2" />
                      {bookmarked.has(selectedDocumentary._id) ? 'सहेजा गया' : 'सहेजें'}
                    </button>
                    <button className="text-gray-500 hover:text-purple-600 transition-colors flex items-center">
                      <FaDownload className="mr-2" />
                      डाउनलोड
                    </button>
                  </div>
                  <button
                    onClick={closePopup}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                  >
                    बंद करें
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <motion.div 
        className="bg-gradient-to-r from-purple-900 via-blue-800 to-indigo-900 text-white py-20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-purple-500/20"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-blue-500/20"></div>
        
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            अपनी खुद की डॉक्यूमेंट्री बनाना चाहते हैं?
          </h2>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-blue-100">
            हमारे विशेषज्ञों से जुड़ें और सीखें कि कैसे अपनी कहानियों को प्रभावशाली डॉक्यूमेंट्री में बदलें।
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-white text-purple-800 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
              हमसे संपर्क करें
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-purple-800 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1">
              और देखें
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};