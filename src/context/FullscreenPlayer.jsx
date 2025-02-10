import React from 'react';
import { motion } from 'framer-motion';
import { useMusicPlayer } from '../context/MusicPlayerContext';

const FullscreenPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    time,
    formatTime,
    togglePlay,
    handleSeek,
  } = useMusicPlayer();

  if (!currentTrack) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-white text-center w-full max-w-2xl p-8">
        <img
          src={currentTrack.album_cover}
          alt={currentTrack.title}
          className="w-64 h-64 rounded-lg mx-auto mb-8 object-cover"
        />
        <h2 className="text-4xl font-bold mb-4">{currentTrack.title}</h2>
        <p className="text-xl text-gray-300 mb-8">{currentTrack.artist}</p>

        <div className="mb-8 w-full max-w-md mx-auto">
          <input
            type="range"
            min="0"
            max={time.totalTime || 0}
            value={time.currentTime || 0}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>{formatTime(time.currentTime)}</span>
            <span>{formatTime(time.totalTime)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button className="p-3 hover:bg-gray-800 rounded-full">⏮</button>
          <button
            onClick={togglePlay}
            className="bg-white text-black rounded-full p-6 hover:bg-gray-200 transition-colors"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button className="p-3 hover:bg-gray-800 rounded-full">⏭</button>
        </div>
      </div>
    </motion.div>
  );
};

export default FullscreenPlayer;