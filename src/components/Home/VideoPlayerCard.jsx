import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Clock, Calendar, SkipBack, SkipForward } from 'lucide-react';
import { motion } from 'framer-motion';

export const VideoPlayerCard = ({ 
  video, 
  index, 
  isActive, 
  playerRefs, 
  getMediaUrl, 
  onPlay, 
  onPause, 
  onFullscreen 
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const player = playerRefs.current[index];

  useEffect(() => {
    const videoElement = playerRefs.current[index];
    if (!videoElement) return;

    const updateTime = () => setCurrentTime(videoElement.currentTime);
    const updateDuration = () => {
      setDuration(videoElement.duration);
      setIsLoading(false);
    };
    const handlePlay = () => {
      setIsVideoPlaying(true);
      onPlay(index);
    };
    const handlePause = () => {
      setIsVideoPlaying(false);
      onPause();
    };
    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };
    const handleLoadStart = () => setIsLoading(true);

    videoElement.addEventListener('timeupdate', updateTime);
    videoElement.addEventListener('loadedmetadata', updateDuration);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('error', handleError);
    videoElement.addEventListener('loadstart', handleLoadStart);

    return () => {
      videoElement.removeEventListener('timeupdate', updateTime);
      videoElement.removeEventListener('loadedmetadata', updateDuration);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('error', handleError);
      videoElement.removeEventListener('loadstart', handleLoadStart);
    };
  }, [index, onPlay, onPause]);

  const toggleVideoPlayback = () => {
    if (player) {
      if (player.paused) {
        player.play();
      } else {
        player.pause();
      }
    }
  };

  const toggleMute = () => {
    if (player) {
      player.muted = !player.muted;
      setIsMuted(player.muted);
    }
  };

  const handleSeek = (percentage) => {
    if (player && duration) {
      const seekTime = (percentage / 100) * duration;
      player.currentTime = seekTime;
    }
  };

  const handleVolumeChange = (newVolume) => {
    if (player) {
      player.volume = newVolume / 100;
      setVolume(newVolume);
    }
  };

  const skipTime = (seconds) => {
    if (player && duration) {
      const newTime = Math.max(0, Math.min(player.currentTime + seconds, duration));
      player.currentTime = newTime;
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full flex-shrink-0 relative group/slide">
      {/* Video Element */}
      {getMediaUrl(video.url) && !hasError ? (
        <div className="absolute inset-0">
          <video
            ref={(el) => (playerRefs.current[index] = el)}
            src={getMediaUrl(video.url)}
            poster={getMediaUrl(video.thumbnail)}
            className="w-full h-full object-cover"
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
          />
        </div>
      ) : (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500"
          style={{ 
            backgroundImage: `url(${getMediaUrl(video.thumbnail)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-16 h-16 bg-red-500/80 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-lg font-medium">Video not available</p>
            </div>
          </div>
        </div>
      )}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* Video Controls */}
      <div className="absolute top-4 left-4 flex items-center gap-3 bg-black/60 rounded-full p-2 border border-white/20">
        {/* Skip Back Button */}
        <motion.button
          onClick={() => skipTime(-15)}
          disabled={hasError || isLoading}
          className="w-8 h-8 flex items-center justify-center text-white hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <SkipBack className="w-4 h-4" />
        </motion.button>

        {/* Play/Pause Button */}
        <motion.button
          onClick={toggleVideoPlayback}
          disabled={hasError || isLoading}
          className="w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isVideoPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </motion.button>

        {/* Skip Forward Button */}
        <motion.button
          onClick={() => skipTime(15)}
          disabled={hasError || isLoading}
          className="w-8 h-8 flex items-center justify-center text-white hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <SkipForward className="w-4 h-4" />
        </motion.button>

        {/* Volume Button */}
        <motion.button
          onClick={toggleMute}
          disabled={hasError || isLoading}
          className="w-8 h-8 flex items-center justify-center text-white hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </motion.button>

        {/* Volume Slider */}
        <div className="flex items-center gap-2">
          <div className="relative w-20 h-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="absolute inset-0 bg-white rounded-full origin-left transition-all duration-200"
              style={{ width: `${volume}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolumeChange(e.target.value)}
              disabled={hasError || isLoading}
              className="absolute inset-0 w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-20 left-4 right-4">
        {/* Time Display */}
        <div className="flex justify-between items-center text-white text-xs mb-2 px-2">
          <span className="bg-black/50 px-2 py-1 rounded">
            {formatTime(currentTime)}
          </span>
          <span className="bg-black/50 px-2 py-1 rounded">
            {formatTime(duration)}
          </span>
        </div>

        {/* Progress Bar Container */}
        <div 
          className={`relative h-2 bg-white/30 rounded-full overflow-hidden cursor-pointer group ${
            hasError || isLoading ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={(e) => {
            if (hasError || isLoading) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const percentage = ((e.clientX - rect.left) / rect.width) * 100;
            handleSeek(Math.max(0, Math.min(100, percentage)));
          }}
        >
          {/* Background Track */}
          <div className="absolute inset-0 bg-white/20 rounded-full" />

          {/* Progress Fill */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.1 }}
          />

          {/* Progress Thumb */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-blue-500 transition-all duration-200"
            style={{ left: `${progress}%`, marginLeft: '-8px' }}
            animate={{
              scale: progress > 0 ? 1 : 0,
              opacity: progress > 0 ? 1 : 0
            }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Progress Percentage Display */}
        <div className="flex justify-center mt-2">
          <div className="bg-black/50 text-white text-xs px-3 py-1 rounded-full">
            {Math.round(progress)}% complete
          </div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full border border-white/30 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(video.createdAt)}
                </span>
                <span className="flex items-center gap-1 px-3 py-1 bg-black/40 text-white text-xs font-medium rounded-full border border-white/20">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                {video.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/90 text-sm md:text-base mb-6 leading-relaxed line-clamp-2">
            {video.description || "No description available"}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <motion.button
              onClick={() => onFullscreen(video.url)}
              disabled={hasError}
              className="group flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Maximize2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Watch Fullscreen
            </motion.button>

            <motion.button
              onClick={toggleVideoPlayback}
              disabled={hasError || isLoading}
              className="group flex items-center gap-2 bg-blue-500/80 hover:bg-blue-600/80 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 border border-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isVideoPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Play
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};