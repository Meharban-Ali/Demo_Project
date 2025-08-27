import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlay, FaPause, FaClock, FaHeadphones, FaMicrophone, 
  FaShareAlt, FaHeart, FaSearch, FaDownload, FaVolumeUp,
  FaStepForward, FaStepBackward, FaRandom, FaRedoAlt
} from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';

export const PodcastPage = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [showPlayer, setShowPlayer] = useState(false);
  const [likedPodcasts, setLikedPodcasts] = useState(new Set());
  
  const audioRef = useRef(null);
  const itemsPerPage = 10;

  // Fetch podcasts from API
  useEffect(() => {
    const fetchPodcasts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/content?type=audio`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        const contentData = data.data || data.content || (Array.isArray(data) ? data : []);
        
        setPodcasts(contentData);
        setFilteredPodcasts(contentData);
      } catch (err) {
        console.error('Error fetching podcasts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  // Extract categories from podcasts
  useEffect(() => {
    if (podcasts.length > 0) {
      const categoryCounts = {};
      podcasts.forEach(podcast => {
        const categoryName = podcast.category?.name || podcast.category || 'Uncategorized';
        categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1;
      });
      
      const categoryList = Object.entries(categoryCounts).map(([name, count]) => ({
        name,
        count
      }));
      
      setCategories(categoryList);
    }
  }, [podcasts]);

  // Filter podcasts based on search and category
  useEffect(() => {
    let results = podcasts;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(podcast => 
        podcast.title?.toLowerCase().includes(term) || 
        podcast.description?.toLowerCase().includes(term) ||
        new Date(podcast.createdAt || podcast.date).toLocaleDateString('hi-IN').includes(term)
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      results = results.filter(podcast => {
        const categoryName = podcast.category?.name || podcast.category;
        return categoryName === selectedCategory;
      });
    }
    
    setFilteredPodcasts(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategory, podcasts]);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPodcasts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPodcasts.length / itemsPerPage);

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
    if (!url) return '/fallback-image.jpg';
    return url.startsWith('http') ? url : `${API_BASE_URL}${url.replace(/^\/api\/uploads/, '/uploads')}`;
  };

  // Handle play podcast
  const handlePlayPodcast = (podcast) => {
    // If the same podcast is clicked again, toggle play/pause
    if (currentPodcast && currentPodcast._id === podcast._id) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      return;
    }
    
    // Stop current audio if any
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    // Set new current podcast
    setCurrentPodcast(podcast);
    
    // Get audio URL
    const audioUrl = podcast.files?.length > 0 
      ? getFullUrl(podcast.files[0].url) 
      : getFullUrl(podcast.url);
    
    // Create new audio element
    audioRef.current = new Audio(audioUrl);
    audioRef.current.volume = volume / 100;
    
    // Set up event listeners
    audioRef.current.addEventListener('loadedmetadata', () => {
      setShowPlayer(true);
      audioRef.current.play();
      setIsPlaying(true);
    });
    
    audioRef.current.addEventListener('timeupdate', () => {
      if (audioRef.current) {
        const newProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(newProgress);
      }
    });
    
    audioRef.current.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
    });
    
    audioRef.current.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
    });
  };

  // Handle play/pause toggle
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  // Handle progress change (seeking)
  const handleProgressChange = (e) => {
    const newProgress = parseInt(e.target.value);
    setProgress(newProgress);
    
    if (audioRef.current) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
    }
  };

  // Handle like podcast
  const handleLikePodcast = (podcastId) => {
    const newLikedPodcasts = new Set(likedPodcasts);
    if (newLikedPodcasts.has(podcastId)) {
      newLikedPodcasts.delete(podcastId);
    } else {
      newLikedPodcasts.add(podcastId);
    }
    setLikedPodcasts(newLikedPodcasts);
  };

  // Handle download podcast
  const handleDownloadPodcast = (podcast) => {
    const audioUrl = podcast.files?.length > 0 
      ? getFullUrl(podcast.files[0].url) 
      : getFullUrl(podcast.url);
    
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `${podcast.title || 'podcast'}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Handle share podcast
  const handleSharePodcast = async (podcast) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: podcast.title,
          text: podcast.description,
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

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hidden audio element for playback */}
      <audio id="audio-player" className="hidden" />
      
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="sticky top-0 z-10 bg-white/95 backdrop-blur-md py-4 px-6 border-b border-gray-200 shadow-lg"
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Raviopedia Podcast
          </motion.h1>
          
          <div className="relative w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="पॉडकास्ट खोजें..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              className="bg-gray-100 border border-gray-200 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">सभी श्रेणियाँ</option>
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {selectedCategory === 'all' ? 'सभी पॉडकास्ट' : selectedCategory}
          <span className="text-gray-500 text-lg ml-2">
            ({filteredPodcasts.length} पॉडकास्ट)
          </span>
        </motion.h2>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredPodcasts.length === 0 ? (
          <motion.div 
            className="bg-white rounded-xl shadow-xl p-8 text-center border border-gray-100"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FaMicrophone className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">कोई पॉडकास्ट नहीं मिला</h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== 'all' 
                ? 'आपकी खोज से मेल खाने वाला कोई पॉडकास्ट नहीं मिला। कृपया दूसरे कीवर्ड आज़माएँ।'
                : 'अभी तक कोई पॉडकास्ट उपलब्ध नहीं है।'
              }
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {currentItems.map((podcast, index) => {
                const imageUrl = podcast.files?.length > 0 
                  ? getFullUrl(podcast.files[0].url) 
                  : getFullUrl(podcast.url);
                
                const categoryName = podcast.category?.name || podcast.category || 'Uncategorized';
                const isCurrentlyPlaying = currentPodcast && currentPodcast._id === podcast._id && isPlaying;
                const isLiked = likedPodcasts.has(podcast._id);
                
                return (
                  <motion.div 
                    key={podcast._id || index} 
                    className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100"
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={imageUrl} 
                        alt={podcast.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-80"></div>
                      
                      <div className="absolute top-3 left-3">
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow-md">
                          {categoryName}
                        </span>
                      </div>
                      
                      <button 
                        className={`absolute top-3 right-3 p-2 rounded-full shadow-md ${isLiked ? 'bg-pink-600 text-white' : 'bg-white/90 text-gray-700 hover:bg-pink-600 hover:text-white'}`}
                        onClick={() => handleLikePodcast(podcast._id)}
                      >
                        <FaHeart size={14} />
                      </button>
                      
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                        <span className="text-xs text-white bg-black/70 px-2 py-1 rounded shadow-md">
                          <FaClock className="inline mr-1" /> {podcast.duration || '00:00'}
                        </span>
                        
                        <span className="text-xs text-white bg-black/70 px-2 py-1 rounded shadow-md">
                          <FaHeadphones className="inline mr-1" /> {podcast.listens || '0'}
                        </span>
                      </div>
                      
                      <button 
                        className={`absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity ${isCurrentlyPlaying ? '!opacity-100' : ''}`}
                        onClick={() => handlePlayPodcast(podcast)}
                      >
                        <div className={`rounded-full p-4 shadow-xl ${isCurrentlyPlaying ? 'bg-red-600' : 'bg-blue-600'} transform group-hover:scale-110 transition-transform text-white`}>
                          {isCurrentlyPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                        </div>
                      </button>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-1">{podcast.title || 'Untitled Podcast'}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{podcast.description || 'No description available'}</p>
                      
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{formatDate(podcast.createdAt)}</span>
                        
                        <div className="flex space-x-2">
                          <button 
                            className="hover:text-blue-600 transition-colors"
                            onClick={() => handleDownloadPodcast(podcast)}
                            title="Download"
                          >
                            <FaDownload size={14} />
                          </button>
                          
                          <button 
                            className="hover:text-green-600 transition-colors"
                            onClick={() => handleSharePodcast(podcast)}
                            title="Share"
                          >
                            <FaShareAlt size={14} />
                          </button>
                          
                          <button className="hover:text-gray-700 transition-colors">
                            <BsThreeDotsVertical size={14} />
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
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors shadow-md"
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
                        className={`px-4 py-2 rounded-lg shadow-md ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } transition-colors`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors shadow-md"
                  >
                    अगला
                  </button>
                </nav>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Audio Player */}
      <AnimatePresence>
        {showPlayer && currentPodcast && (
          <motion.div 
            className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 shadow-2xl"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="container mx-auto flex flex-col md:flex-row items-center">
              <div className="flex items-center space-x-4 mb-4 md:mb-0 md:w-1/4">
                <img 
                  src={getFullUrl(currentPodcast.files?.[0]?.url) || getFullUrl(currentPodcast.url)} 
                  alt={currentPodcast.title}
                  className="w-16 h-16 rounded-lg object-cover shadow-md"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80';
                  }}
                />
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm truncate">{currentPodcast.title}</h4>
                  <p className="text-gray-600 text-xs truncate">
                    {currentPodcast.category?.name || currentPodcast.category}
                  </p>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col items-center space-y-2 md:px-4">
                <div className="flex items-center space-x-4">
                  <button className="text-gray-500 hover:text-gray-800">
                    <FaRandom size={14} />
                  </button>
                  
                  <button className="text-gray-500 hover:text-gray-800">
                    <FaStepBackward size={16} />
                  </button>
                  
                  <button 
                    className="bg-blue-600 rounded-full p-3 hover:bg-blue-700 shadow-md text-white"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
                  </button>
                  
                  <button className="text-gray-500 hover:text-gray-800">
                    <FaStepForward size={16} />
                  </button>
                  
                  <button className="text-gray-500 hover:text-gray-800">
                    <FaRedoAlt size={14} />
                  </button>
                </div>
                
                <div className="w-full flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {audioRef.current ? Math.floor(audioRef.current.currentTime / 60) + ':' + ('0' + Math.floor(audioRef.current.currentTime % 60)).slice(-2) : '0:00'}
                  </span>
                  
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={progress} 
                    onChange={handleProgressChange}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  
                  <span className="text-xs text-gray-500">
                    {audioRef.current ? Math.floor(audioRef.current.duration / 60) + ':' + ('0' + Math.floor(audioRef.current.duration % 60)).slice(-2) : '0:00'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <button 
                  className={`${likedPodcasts.has(currentPodcast._id) ? 'text-pink-600' : 'text-gray-500 hover:text-gray-800'}`}
                  onClick={() => handleLikePodcast(currentPodcast._id)}
                >
                  <FaHeart size={16} />
                </button>
                
                <button 
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => handleDownloadPodcast(currentPodcast)}
                >
                  <FaDownload size={16} />
                </button>
                
                <div className="flex items-center space-x-2">
                  <FaVolumeUp className="text-gray-500" size={14} />
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volume} 
                    onChange={handleVolumeChange}
                    className="w-20 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories Section */}
      {categories.length > 0 && (
        <motion.div 
          className="py-12 bg-gray-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">श्रेणियाँ</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <motion.div 
                className="bg-white rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer shadow-lg border border-gray-100"
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedCategory('all')}
              >
                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <FaMicrophone />
                </div>
                <h3 className="font-medium mb-1">सभी</h3>
                <p className="text-sm text-gray-500">{podcasts.length} एपिसोड</p>
              </motion.div>
              
              {categories.map((category, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer shadow-lg border border-gray-100"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedCategory(category.name)}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                    <FaMicrophone />
                  </div>
                  <h3 className="font-medium mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} एपिसोड</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Subscribe Section */}
      <motion.div 
        className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">पॉडकास्ट सब्सक्राइब करें</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-600">
            नए एपिसोड की सूचना सीधे अपने इनबॉक्स में प्राप्त करें। किसी भी प्लेटफॉर्म पर हमारे पॉडकास्ट सुनें।
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="आपका ईमेल पता" 
              className="flex-grow px-4 py-3 rounded-full bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 shadow-sm"
            />
            <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-colors shadow-md">
              सब्सक्राइब करें
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};