import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Headphones, 
  RefreshCw,
  SkipBack,
  SkipForward,
  Zap,
  Radio,
  Waves
} from "lucide-react";
import AudioPlayerCard from './AudioPlayerCard';

export function NewsSlider() {
  const [audios, setAudios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;
  const audioRefs = useState({})[0];

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchAudios();
  }, []);

  const fetchAudios = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/content?type=audio`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      let audioData = [];
      if (data.success && data.data) {
        audioData = data.data;
      } else if (Array.isArray(data)) {
        audioData = data;
      } else if (data.content) {
        audioData = data.content;
      }
      
      console.log("Fetched audio content:", audioData);
      setAudios(audioData);
    } catch (err) {
      console.error("Error fetching audios:", err);
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAudios = audios.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < audios.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Handle play/pause for cards
  const handleTogglePlay = async (index, audioRef) => {
    if (index === null) {
      setPlayingIndex(null);
      return;
    }

    const audioEl = audioRef?.current;
    if (!audioEl) return;

    if (playingIndex === index) {
      audioEl.pause();
      setPlayingIndex(null);
    } else {
      // Pause currently playing audio
      if (playingIndex !== null && audioRefs[playingIndex]) {
        audioRefs[playingIndex].current?.pause();
      }

      try {
        await audioEl.play();
        setPlayingIndex(index);
        audioRefs[index] = audioRef;
      } catch (err) {
        console.error("Audio play error:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50 py-12 px-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-orange-500/5 to-blue-500/5 animate-pulse"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="text-center relative z-10">
          <motion.div
            className="relative mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-20 h-20 border-4 border-transparent bg-gradient-to-r from-orange-500 to-blue-500 rounded-full p-1">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg">
                <Radio className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </motion.div>
          <motion.p
            className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading Audio Library...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50 py-12 px-4 relative overflow-hidden">
      {/* Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <section className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative inline-block">
            <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-orange-600 via-blue-600 to-orange-600 bg-clip-text text-transparent">
              AUDIO LIBRARY
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 to-blue-500/10 blur-xl rounded-full"></div>
          </div>
          
          <motion.h2 
            className="text-xl text-gray-600 flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Zap className="w-6 h-6 text-orange-500" />
            <span className="font-semibold">Premium Audio Collection</span>
            <Waves className="w-6 h-6 text-blue-500" />
          </motion.h2>
          
          <p className="text-gray-500 font-medium text-sm mb-6">
            Discover and enjoy high-quality audio content
          </p>
          
          <motion.button 
            onClick={fetchAudios}
            className="group relative px-8 py-3 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            <span className="relative flex items-center gap-2">
              <RefreshCw size={18} className="group-hover:animate-spin" />
              Refresh Library
            </span>
          </motion.button>
        </motion.div>

        {/* Audio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {currentAudios.map((audio, idx) => {
              const globalIndex = indexOfFirstItem + idx;
              return (
                <AudioPlayerCard
                  key={audio._id || idx}
                  audio={audio}
                  index={globalIndex}
                  isPlaying={playingIndex === globalIndex}
                  onTogglePlay={handleTogglePlay}
                  API_BASE_URL={API_BASE_URL}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <motion.div 
          className="flex justify-center items-center gap-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="group relative px-8 py-4 bg-white/90 text-blue-600 rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 font-medium overflow-hidden shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-blue-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            <span className="relative flex items-center gap-2">
              <SkipBack className="w-5 h-5" />
              Previous
            </span>
          </motion.button>

          <div className="flex items-center gap-4">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl px-6 py-4 border border-gray-200/50 shadow-lg">
              <span className="text-orange-600 font-bold text-lg">
                {String(currentPage).padStart(2, '0')}
              </span>
              <span className="text-gray-400 mx-2">/</span>
              <span className="text-blue-600 font-bold text-lg">
                {String(Math.ceil(audios.length / itemsPerPage) || 1).padStart(2, '0')}
              </span>
            </div>

            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(audios.length / itemsPerPage) }, (_, index) => index + 1).map((page, dotIndex) => (
                <motion.button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-orange-500 to-blue-500 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
          
          <motion.button
            onClick={nextPage}
            disabled={indexOfLastItem >= audios.length}
            className="group relative px-8 py-4 bg-white/90 text-blue-600 rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 font-medium overflow-hidden shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-blue-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            <span className="relative flex items-center gap-2">
              Next
              <SkipForward className="w-5 h-5" />
            </span>
          </motion.button>
        </motion.div>

        {/* Empty State */}
        {audios.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-full flex items-center justify-center border border-gray-200/50 shadow-lg"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Headphones className="w-12 h-12 text-gray-400" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No Audio Content Found
            </h3>
            <p className="text-gray-500 font-medium text-sm">
              Check your connection and try refreshing the library
            </p>
          </motion.div>
        )}
      </section>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(229, 231, 235, 0.5);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f97316, #3b82f6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #ea580c, #2563eb);
        }

        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }

        input[type="range"]::-webkit-slider-track {
          background: transparent;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f97316, #3b82f6);
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
        }

        input[type="range"]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f97316, #3b82f6);
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
}