import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

// Create Context
const MusicPlayerContext = createContext();

// Context Provider Component
export const MusicPlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({ currentTime: 0, totalTime: 0 });
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const audioRef = useRef(new Audio());

  // Update time as the audio plays
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setTime({
        currentTime: audio.currentTime,
        totalTime: audio.duration,
      });
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateTime);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateTime);
    };
  }, []);

  // Format time (mm:ss)
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Play a specific song
  const playSong = (song, playlist) => {
    setCurrentPlaylist(playlist);
    setCurrentTrack(song);
    audioRef.current.src = song.file_path;
    audioRef.current.play().then(() => setIsPlaying(true)).catch((error) => {
      console.error('Playback failed:', error);
    });
  };

  // Seek to a specific time in the track
  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    setTime((prev) => ({ ...prev, currentTime: seekTime }));
  };

  // Context value
  const value = {
    currentTrack,
    isPlaying,
    time,
    formatTime,
    playSong,
    togglePlay,
    handleSeek,
    currentPlaylist,
    audioRef,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

// Custom hook to use the context
export const useMusicPlayer = () => useContext(MusicPlayerContext);