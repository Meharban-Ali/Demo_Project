import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Music, 
  Clock, 
  Calendar, 
  Play, 
  Pause, 
  Heart, 
  Share2, 
  Download,
  Volume2,
  VolumeX,
  AlertCircle,
  SkipBack,
  SkipForward
} from "lucide-react";

const AudioPlayerCard = ({ audio, index, isPlaying, onTogglePlay, API_BASE_URL }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const audioRef = useRef(null);

  // Get audio URL
  const getAudioUrl = (audio) => {
    if (!audio) return null;
    
    const possiblePaths = [
      audio.url, audio.fileUrl, audio.audioUrl, audio.filePath,
      audio.files?.[0]?.url, audio.files?.[0]?.path, audio.src
    ];
    
    for (const path of possiblePaths) {
      if (path && typeof path === 'string' && path.trim() !== '') {
        if (path.startsWith('http')) {
          return path.replace('/api/uploads/', '/uploads/');
        }
        const cleanPath = path.replace(/^\/+/, '');
        return cleanPath.includes('uploads/') 
          ? `${API_BASE_URL}/${cleanPath}`
          : `${API_BASE_URL}/uploads/${cleanPath}`;
      }
    }
    return null;
  };

  const audioUrl = getAudioUrl(audio);

  // Audio event handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value) => {
    if (audioRef.current && duration) {
      const seekTime = (value / 100) * duration;
      audioRef.current.currentTime = seekTime;
    }
  };

  const handleVolumeChange = (value) => {
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
      setVolume(value);
    }
  };

  const skipTime = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, 
        Math.min(audioRef.current.currentTime + seconds, duration)
      );
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  // Button handlers - FIXED
  const handleLike = () => {
    console.log('Like clicked for:', audio.title);
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    console.log('Share clicked for:', audio.title);
    
    const shareData = {
      title: audio.title || 'Audio',
      text: `Listen to: ${audio.title || 'this audio'}`,
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

  const handleDownload = () => {
    console.log('Download clicked for:', audio.title);
    
    if (!audioUrl) {
      alert('Audio file not available for download');
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `${(audio.title || 'audio').replace(/[^a-z0-9]/gi, '_')}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      window.open(audioUrl, '_blank');
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const hasError = audioError || !audioUrl;

  return (
    <motion.div
      className="group relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/60 hover:border-orange-300/60 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="relative flex items-center gap-4 mb-6">
        <motion.div 
          className="relative"
          animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-500 p-0.5 rounded-2xl shadow-lg">
            <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
              <Music className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-xl text-gray-800 truncate mb-1">
            {audio.title || "Untitled Track"}
          </h3>
          <p className="text-sm text-orange-600 truncate font-medium">
            {audio.category?.name || audio.category || "Uncategorized"}
          </p>
        </div>
      </div>

      {/* Audio Player */}
      <div className="relative bg-gradient-to-r from-gray-50/80 to-blue-50/80 rounded-xl p-6 mb-6 border border-gray-200/50 shadow-inner">
        {/* Main Controls */}
        <div className="relative flex items-center justify-center gap-4 mb-6">
          <button
            onClick={() => skipTime(-15)}
            disabled={hasError || !isPlaying}
            className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-blue-600 rounded-full hover:from-blue-100 hover:to-blue-200 hover:text-blue-700 transition-all duration-300 disabled:opacity-30 border border-gray-300/50 shadow-md"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => onTogglePlay(index, audioRef)}
            disabled={hasError}
            className={`relative w-16 h-16 flex items-center justify-center rounded-full transition-all duration-300 overflow-hidden shadow-lg ${
              hasError 
                ? 'bg-gray-400 cursor-not-allowed' 
                : isPlaying 
                  ? 'bg-gradient-to-br from-orange-500 to-red-500 shadow-orange-500/30' 
                  : 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-blue-500/30'
            }`}
          >
            <span className="relative z-10 text-white">
              {hasError ? (
                <AlertCircle className="w-6 h-6" />
              ) : isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </span>
          </button>
          
          <button
            onClick={() => skipTime(15)}
            disabled={hasError || !isPlaying}
            className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-blue-600 rounded-full hover:from-blue-100 hover:to-blue-200 hover:text-blue-700 transition-all duration-300 disabled:opacity-30 border border-gray-300/50 shadow-md"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 relative">
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full origin-left transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => handleSeek(e.target.value)}
            disabled={hasError || !duration}
            className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
          />
        </div>

        {/* Time Display */}
        <div className="flex justify-between items-center text-sm font-medium mb-4">
          <span className="text-blue-600">{formatTime(currentTime)}</span>
          <span className="text-orange-600">{formatTime(duration)}</span>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <div className="flex-1 relative h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full origin-left transition-all duration-200"
              style={{ width: `${volume}%` }}
            ></div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolumeChange(e.target.value)}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
        
        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => onTogglePlay(null)}
            onError={() => setAudioError(true)}
            className="hidden"
          />
        )}

        {hasError && (
          <div className="mt-4 text-center p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-xs font-medium">
              Audio source not available
            </p>
          </div>
        )}
      </div>

      {/* Meta Info */}
      <div className="flex justify-between items-center mb-6 text-sm font-medium">
        <span className="flex items-center gap-2 text-blue-600">
          <Clock className="w-4 h-4" />
          {formatTime(duration) || "Loading..."}
        </span>
        <span className="flex items-center gap-2 text-orange-600">
          <Calendar className="w-4 h-4" />
          {formatDate(audio.createdAt)}
        </span>
      </div>

      {/* Action Buttons - FIXED & WORKING */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200/50">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 text-sm transition-all px-4 py-2 rounded-lg font-medium cursor-pointer ${
            isLiked 
              ? 'text-red-600 bg-red-50 border border-red-200' 
              : 'text-gray-600 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200'
          }`}
        >
          <Heart size={16} className={isLiked ? "fill-current" : ""} />
          {isLiked ? 'Liked' : 'Like'}
        </button>
        
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 text-sm transition-all px-4 py-2 rounded-lg border border-transparent hover:border-blue-200 font-medium cursor-pointer"
        >
          <Share2 size={16} /> Share
        </button>
        
        <button 
          onClick={handleDownload}
          disabled={hasError}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 text-sm transition-all px-4 py-2 rounded-lg border border-transparent hover:border-orange-200 font-medium disabled:opacity-50 cursor-pointer"
        >
          <Download size={16} /> Download
        </button>
      </div>
    </motion.div>
  );
};

export default AudioPlayerCard;