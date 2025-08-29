import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaSearch, FaShareAlt, FaBookmark, FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import { GiNewspaper } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';

export const Sampad_Page = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarked, setBookmarked] = useState(new Set());
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const itemsPerPage = 10;

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/content?type=blog`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        const contentData = data.data || data.content || (Array.isArray(data) ? data : []);
        
        // Filter to only include articles with category "Articles"
        const articlesOnly = contentData.filter(item => 
          (item.category?.name || item.category || '').toLowerCase() === 'articles'
        );
        
        setArticles(articlesOnly);
        setFilteredArticles(articlesOnly);
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filter articles based on search
  useEffect(() => {
    let results = articles;
    
    // Apply search filter
    if (searchQuery) {
      const term = searchQuery.toLowerCase();
      results = results.filter(article => 
        article.title?.toLowerCase().includes(term) ||
        article.description?.toLowerCase().includes(term) ||
        (article.category?.name || article.category || '').toLowerCase().includes(term) ||
        new Date(article.createdAt || article.date).toLocaleDateString('hi-IN').includes(term)
      );
    }
    
    setFilteredArticles(results);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchQuery, articles]);

  // Handle newsletter subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xblgqdkp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setSubscribeMessage('सदस्यता के लिए धन्यवाद! आपको जल्द ही अपडेट मिलने लगेंगे।');
        setEmail('');
      } else {
        setSubscribeMessage('कुछ गलत हो गया। कृपया बाद में पुनः प्रयास करें।');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setSubscribeMessage('कनेक्शन त्रुटि। कृपया बाद में पुनः प्रयास करें।');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubscribeMessage(''), 5000);
    }
  };

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredArticles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

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

  // Get full URL for images
  const getFullUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
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

  // Handle share article
  const handleShareArticle = async (article) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
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

  // Handle read full article
  const handleReadFullArticle = (article) => {
    setSelectedArticle(article);
    setShowPopup(true);
    // Prevent body from scrolling when popup is open
    document.body.style.overflow = 'hidden';
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedArticle(null);
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-orange-500 text-white px-6 py-2 rounded-full mb-4 shadow-lg">
            <GiNewspaper className="mr-2 text-xl" />
            <span className="font-medium">सम्पादकीय विशेष</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">आर्टिकल</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            विशेषज्ञ विश्लेषण, गहन शोध और मनोरंजक सामग्री
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-4 rounded-xl shadow-lg border border-white/20"
        >
          <div className="w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-3">लेख खोजें</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-all duration-300 hover:shadow-md"
                placeholder="शीर्षक, विवरण, या तारीख से खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 flex justify-between items-center"
        >
          <p className="text-gray-700">
            {filteredArticles.length} लेख मिले {searchQuery && <span>'<strong>{searchQuery}</strong>' के लिए</span>}
          </p>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              सभी लेख देखें
            </button>
          )}
        </motion.div>

        {/* Content Grid with Animation */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredArticles.length > 0 ? (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {currentItems.map((article) => {
                const imageUrl = article.files?.length > 0 
                  ? getFullUrl(article.files[0].url) 
                  : getFullUrl(article.url);
                
                const isBookmarked = bookmarked.has(article._id);
                
                return (
                  <motion.div
                    key={article._id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-white/20"
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                        src={imageUrl} 
                        alt={article.title}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        <button 
                          onClick={() => toggleBookmark(article._id)}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-orange-100 transition-all duration-300"
                          aria-label="Bookmark"
                        >
                          <FaBookmark className={`${isBookmarked ? 'text-orange-500 fill-current' : 'text-gray-400 hover:text-orange-400'}`} />
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <div className="text-white text-sm font-medium flex items-center">
                          <FaCalendarAlt className="inline mr-2" />
                          {formatDate(article.createdAt)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 cursor-pointer">
                        {article.title || 'Untitled Article'}
                      </h2>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">{article.description || 'No description available'}</p>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <button 
                          onClick={() => handleReadFullArticle(article)}
                          className="font-medium text-sm flex items-center text-blue-600 hover:text-blue-800"
                        >
                          पूरा पढ़ें
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                        <div className="flex space-x-4 text-gray-400">
                          <button 
                            className="hover:text-orange-500 transition-colors"
                            onClick={() => handleShareArticle(article)}
                          >
                            <FaShareAlt />
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
                className="flex justify-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors shadow-md border border-gray-200 flex items-center"
                  >
                    <FaArrowLeft className="mr-1" /> पिछला
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
                        className={`px-4 py-2 rounded-lg shadow-md border ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                        } transition-colors`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors shadow-md border border-gray-200 flex items-center"
                  >
                    अगला <FaArrowRight className="ml-1" />
                  </button>
                </nav>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 bg-white rounded-xl shadow-lg border border-white/20"
          >
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-blue-100 to-orange-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
              <FaSearch className="text-gray-500 text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">कोई लेख नहीं मिला</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchQuery 
                ? `'${searchQuery}' से मेल खाने वाला कोई लेख नहीं मिला। कृपया अन्य शब्दों के साथ पुनः प्रयास करें।`
                : 'अभी तक कोई लेख उपलब्ध नहीं है।'
              }
            </p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-lg hover:shadow-md transition-all duration-300 text-sm font-medium shadow-md"
              >
                सभी लेख देखें
              </button>
            )}
          </motion.div>
        )}

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl shadow-2xl overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative p-8 md:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-4">
                <GiNewspaper className="mr-2" />
                <span className="font-medium">न्यूज़लेटर</span>
              </div>
              
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                नवीनतम लेख सीधे अपने इनबॉक्स में प्राप्त करें
              </h2>
              
              <p className="text-white/90 mb-8 text-lg">
                हमारे न्यूज़लेटर की सदस्यता लें और सबसे पहले नए आर्टिकल पढ़ें
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <div className="flex-grow relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500"
                    placeholder="आपका ईमेल पता"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubmitting ? 'सब्मिट कर रहे हैं...' : 'सब्सक्राइब करें'}
                </button>
              </form>
              
              {subscribeMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-white/20 backdrop-blur-sm rounded-lg text-white"
                >
                  {subscribeMessage}
                </motion.div>
              )}
              
              <p className="text-white/70 text-sm mt-6">
                हम आपकी प्राइवेसी का सम्मान करते हैं। किसी भी समय अनसब्सक्राइब कर सकते हैं।
              </p>
            </div>
          </div>
        </motion.div>

        {/* Article Detail Popup */}
        <AnimatePresence>
          {showPopup && selectedArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={closePopup}
            >
              <motion.div
                variants={popupVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white z-10 border-b border-gray-200 flex justify-between items-center p-4">
                  <h2 className="text-xl font-bold text-gray-800">लेख विवरण</h2>
                  <button
                    onClick={closePopup}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <img 
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                      src={getFullUrl(selectedArticle.files?.[0]?.url) || getFullUrl(selectedArticle.url)} 
                      alt={selectedArticle.title}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center text-gray-500 mb-6">
                    <FaCalendarAlt className="mr-2" />
                    {formatDate(selectedArticle.createdAt)}
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedArticle.title}</h1>
                  
                  <div className="prose max-w-none text-gray-700 mb-6">
                    <p className="text-lg leading-relaxed">{selectedArticle.description}</p>
                    
                    {/* Display full content if available */}
                    {selectedArticle.content && (
                      <div className="mt-6">
                        <div className="space-y-4">
                          {selectedArticle.content.split('\n').map((paragraph, index) => (
                            <p key={index} className="text-gray-700 leading-relaxed">{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <div className="flex space-x-4">
                      <button 
                        className="text-gray-400 hover:text-blue-500 transition-colors flex items-center"
                        onClick={() => handleShareArticle(selectedArticle)}
                      >
                        <FaShareAlt className="mr-1" />
                        साझा करें
                      </button>
                      <button 
                        onClick={() => toggleBookmark(selectedArticle._id)}
                        className={`transition-colors flex items-center ${bookmarked.has(selectedArticle._id) ? 'text-orange-500' : 'text-gray-400 hover:text-orange-400'}`}
                      >
                        <FaBookmark className="mr-1" />
                        {bookmarked.has(selectedArticle._id) ? 'सहेजा गया' : 'सहेजें'}
                      </button>
                    </div>
                    <button
                      onClick={closePopup}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      बंद करें
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