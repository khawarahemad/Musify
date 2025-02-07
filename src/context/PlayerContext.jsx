import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef(new Audio(songsData[0].src)); 
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({ currentTime: 0, totalTime: 0 });
  const [showFullscreen, setShowFullscreen] = useState(false);

  // Play current track
  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  // Pause current track
  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  // Play a track by its ID
  const playWithId = (id) => {
    const newTrack = songsData[id];
    setTrack(newTrack);
    audioRef.current.src = newTrack.src; // Update audio source
    audioRef.current.load(); // Reload audio to reset time
    audioRef.current.currentTime = 0; // Reset time to 0
    play(); // Start playing
    setShowFullscreen(true);
  };

  // Play the previous track
  const previous = () => {
    if (track.id > 0) {
      playWithId(track.id - 1);
    }
  };

  // Play the next track
  const next = () => {
    if (track.id < songsData.length - 1) {
      playWithId(track.id + 1);
      
    }
  };

  // Seek to a specific position
  const seekSong = (e) => {
    if (!audioRef.current.duration) return;
    const seekPosition =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
    audioRef.current.currentTime = seekPosition;
  };

  // Update current time and progress bar as audio plays
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      if (!isNaN(audio.duration)) {
        setTime({ currentTime: audio.currentTime, totalTime: audio.duration });
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    return () => audio.removeEventListener("timeupdate", updateTime);
  }, []);

  // Ensure total duration is updated when a new track loads
  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      if (!isNaN(audio.duration)) {
        setTime((prevTime) => ({ ...prevTime, totalTime: audio.duration }));
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, []);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    showFullscreen,
    setShowFullscreen,
  };

  return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>;
};

export default PlayerContextProvider;
