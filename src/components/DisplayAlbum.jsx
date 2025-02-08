import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { albumsData, assets } from "../assets/assets";
import { useContext, useEffect, useState, useRef } from "react";

import { AnimatePresence, motion } from "framer-motion";

const DisplayAlbum = () => {
  const { id } = useParams();
  
  const albumName = albumsData[id]?.name;
  const [albumData, setAlbumData] = useState(null);
  const [songs, setSongs] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [time, setTime] = useState({ currentTime: 0, totalTime: 0 });
  const audioRef = useRef(new Audio());
  const seekBar = useRef(null);
  const seekBg = useRef(null);

  useEffect(() => {
    if (!albumName) return;

    const fetchAlbumData = async () => {
      try {
        const response = await fetch(`https://music-api-uvdl.onrender.com/api/search?query=${albumName}`);
        const data = await response.json();
        if (data.length > 0) {
          setAlbumData({
            name: data[0].album,
            image: data[0].album_cover,
          });
          setSongs(data);
        }
      } catch (error) {
        console.error("Error fetching album data:", error);
      }
    };

    fetchAlbumData();
  }, [albumName]);

  const previous = () => {
    if (!currentTrack) return;
    const currentIndex = songs.findIndex((song) => song.id === currentTrack.id);
    if (currentIndex > 0) {
      playSong(songs[currentIndex - 1]);
    }
  };
  
  const next = () => {
    if (!currentTrack) return;
    const currentIndex = songs.findIndex((song) => song.id === currentTrack.id);
    if (currentIndex < songs.length - 1) {
      playSong(songs[currentIndex + 1]);
    }
  };
  useEffect(() => {
    const audio = audioRef.current;
  
    const updateTime = () => {
      setTime({ currentTime: audio.currentTime, totalTime: audio.duration });
    };
  
    const handleSongEnd = () => {
      next(); // Automatically play the next song
    };
  
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleSongEnd); // Listen for song end
  
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleSongEnd); // Cleanup
    };
  }, [currentTrack]); // Re-run when track changes
  
  
  const playSong = (song) => {
    setCurrentTrack(song);
    setShowFullscreen(true);
    const audio = audioRef.current;
    audio.src = song.file_path;
    audio.load();
    audio.play().then(() => setIsPlaying(true)).catch((err) => console.error("Playback error:", err));
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const seekSong = (e) => {
    const audio = audioRef.current;
    const seekBgRect = seekBg.current.getBoundingClientRect();
    const seekPosition = (e.clientX - seekBgRect.left) / seekBgRect.width;
    audio.currentTime = seekPosition * time.totalTime;
  };

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => {
      setTime({ currentTime: audio.currentTime, totalTime: audio.duration });
    };

    audio.addEventListener("timeupdate", updateTime);
    return () => audio.removeEventListener("timeupdate", updateTime);
  }, []);

  if (!albumData) {
    return <div className="text-white text-center mt-20">Loading album...</div>;
  }

  return (
    <div className="font-sans text-white min-h-screen">
      <Navbar />

      <div className="mt-10 flex flex-col md:flex-row md:items-end px-4">
        <div className="relative mb-4 md:mb-0">
          <img className="w-32 md:w-48 rounded" src={albumData.image} alt={albumData.name} />
          <img
            className="absolute bottom-2 right-2 w-6 md:w-10 opacity-0 transition-opacity duration-200 hover:opacity-100 cursor-pointer"
            src={assets.play_icon}
            alt="Play"
            onClick={() => {
              pause();
              playWithId(songs[0]?.id);
              setTimeout(() => play(), 100);
            }}
          />
        </div>
        <div className="flex flex-col ml-0 md:ml-8">
          <p className="text-xs md:text-sm uppercase">Playlist</p>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-2">{albumData.name}</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 mt-10 mb-4 px-4 text-[#a7a7a7] text-xs sm:text-sm">
        <p><b className="mr-2">#</b>Title</p>
        <p>Album</p>
        <p className="hidden sm:block">Duration</p>
      </div>
      <hr className="border-[#ffffff2b]" />

      {songs.map((item, index) => (
        <div
          key={item.id}
          onClick={() => playSong(item)}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2 items-center text-[#a7a7a7] text-xs sm:text-sm hover:bg-[#ffffff2b] cursor-pointer px-4"
        >
          {/* Title Section */}
          <div className="flex items-center">
            <b className="mr-2 text-[#a7a7a7]">{index + 1}</b>
            <img className="w-8 md:w-10 mr-4" src={item.album_cover} alt={item.title} />
            <span className="text-xs md:text-sm text-white">{item.title.slice(0, 20)}</span>
          </div>

          {/* Album Section (Always Visible) */}
          <p>{item.album || "No Data"}</p>

          {/* Duration Section (Hidden on small screens) */}
          <p className="hidden sm:block">{item.duration || "No Data"}</p>
        </div>
      ))}


      <AnimatePresence>
        {showFullscreen && currentTrack && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { 
              setShowFullscreen(false); 
              setIsPlaying(false);
            }}
            
          >
            {/* Close Button in Upper-Right Corner */}
            <div
              className="absolute top-4 right-4 text-white hover:opacity-80 block md:hidden"
              onClick={() => { 
                setShowFullscreen(false); 
                setIsPlaying(false);
              }}
              
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            {/* Main Player Container */}
            <div
              className="relative text-center w-full max-w-lg p-8 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Album Art */}
              <motion.img
                className="w-96 h-96 rounded-lg mb-8 object-cover shadow-2xl"
                src={currentTrack.album_cover}
                alt="album-art"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              />

              {/* Track Info */}
              <h2 className="text-5xl text-gray-300 font-bold mb-4">{currentTrack.title}</h2>
              <p className="text-xl text-gray-400 mb-8">{currentTrack.album}</p>

              {/* Player Controls */}
              <div className="flex gap-6 items-center text-white justify-center mb-6">
                {/* Backward Button */}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-8 h-8 cursor-pointer hover:opacity-80"
                    onClick={() => {
                      previous();
                      setIsPlaying(false);
                      setTimeout(() => setIsPlaying(true), 100);
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </div>

                {/* Play/Pause Button */}
                {isPlaying ? (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-14 h-14 cursor-pointer hover:opacity-80"
                      onClick={() => {
                        audioRef.current.pause();
                        setIsPlaying(false);
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5h2.5v14H9V5zm5.5 0h2.5v14h-2.5V5z" />
                    </svg>
                  </div>
                ) : (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-14 h-14 cursor-pointer hover:opacity-80"
                      onClick={() => {
                        audioRef.current.play();
                        setIsPlaying(true);
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                      />
                    </svg>
                  </div>
                )}

                {/* Forward Button */}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-8 h-8 cursor-pointer hover:opacity-80"
                    onClick={() => {
                      next();
                      setIsPlaying(false);
                      setTimeout(() => setIsPlaying(true), 100);
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-5 w-full text-white max-w-md">
                <p className="text-sm">{formatTime(time.currentTime)}</p>
                <div
                  ref={seekBg}
                  onClick={(e) => seekSong(e)}
                  className="w-full bg-gray-300 rounded-full cursor-pointer relative h-2"
                >
                  <motion.hr
                    ref={seekBar}
                    className="h-full border-none bg-green-800 rounded-full absolute top-0 left-0"
                    style={{
                      width: time.totalTime > 0 ? `${(time.currentTime / time.totalTime) * 100}%` : "0%",
                    }}
                  />
                </div>
                <p className="text-sm">{formatTime(time.totalTime)}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DisplayAlbum;