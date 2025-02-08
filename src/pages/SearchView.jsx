import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { div } from "motion/react-client";

const SearchView = ({ closeFullscreen }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({ currentTime: 0, totalTime: 0 });
  const audioRef = useRef(new Audio());
  const seekBar = useRef(null);
  const seekBg = useRef(null);

  // Fetch search results
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://music-api-uvdl.onrender.com/api/search?query=${encodeURIComponent(query)}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching songs:", error);
      }
    }, 500);
    setTypingTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [query]);

  // Play song in fullscreen
  const playSong = (song) => {
    if (currentTrack?.id === song.id && isPlaying) {
      return; // Prevent replaying the same song
    }
    setCurrentTrack(song);
    setShowFullscreen(true);

    const audio = audioRef.current;
    audio.src = song.file_path;
    audio.load();
    audio.play().then(() => setIsPlaying(true)).catch((err) => console.error("Playback error:", err));
  };

  // Toggle play/pause
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
  useEffect(() => {
    const audio = audioRef.current;
    const handleSongEnd = () => next(); // Play next song automatically
    audio.addEventListener("ended", handleSongEnd);
    return () => audio.removeEventListener("ended", handleSongEnd);
  }, [currentTrack, searchResults]);

  // Handle time updates
  useEffect(() => {
    const audio = audioRef.current;
    const handleTimeUpdate = () => {
      setTime({
        currentTime: audio.currentTime,
        totalTime: audio.duration || 0,
      });
    };
    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      audioRef.current.src = "";
    };
  }, []);

  // Format time (seconds to mm:ss)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Seek song on progress bar click
  const seekSong = (e) => {
    const rect = seekBg.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const audio = audioRef.current;
    audio.currentTime = percent * audio.duration;
    setTime((prev) => ({ ...prev, currentTime: audio.currentTime }));
  };

  // Previous track
  const previous = () => {
    const currentIndex = searchResults.findIndex((song) => song.id === currentTrack.id);
    if (currentIndex > 0) {
      playSong(searchResults[currentIndex - 1]);
    }
  };

  // Next track
  const next = () => {
    const currentIndex = searchResults.findIndex((song) => song.id === currentTrack.id);
    if (currentIndex < searchResults.length - 1) {
      playSong(searchResults[currentIndex + 1]);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-black bg-opacity-50 p-4">
      {/* Search Form */}
      <form onSubmit={(e) => e.preventDefault()} className="flex items-center max-w-3xl mx-auto p-3 rounded-lg shadow-md">
        <div className="relative flex-grow w-[70%] pr-2">
          <input
            required
            placeholder="Search for a song..."
            className="block w-full p-4 ps-12 bg-[#242424] text-white text-sm border border-black rounded-lg focus:ring-blue-500 focus:border-blue-500"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button className="w-[30%] px-2 py-4 bg-emerald-900 text-white rounded-lg hover:bg-emerald-700 flex items-center justify-center">
          Search
        </button>
      </form>

      {/* Display Search Results */}
      {searchResults.length > 0 && (
        <div className="mt-4 max-w-3xl mx-auto text-white rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">Search Results</h2>
          <ul>
            {searchResults.map((song) => (
              <li
                key={song.id}
                className="flex items-center mb-3 p-2 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-800"
                onClick={() => playSong(song)}
              >
                <img src={song.album_cover} alt={song.album} className="w-16 h-16 rounded-lg mr-3" />
                <div className="flex flex-col items-start">
                  <p className="text-lg font-semibold">{song.title}</p>
                  <p className="text-sm text-gray-400">Album: {song.album}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Fullscreen Music Player */}
      <AnimatePresence>
        {showFullscreen && currentTrack && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFullscreen(false)}
          >
            {/* Close Button in Upper-Right Corner */}
            <div
              className="absolute top-4 right-4 text-white hover:opacity-80 block md:hidden"
              onClick={() => setShowFullscreen(false)}
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
                {/* Music svg */}
                <div className="text-white hover:opacity-80 block md:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-music-3"><circle cx="12" cy="18" r="4" /><path d="M16 18V2" /></svg>
                </div>
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
                <div className="text-white hover:opacity-80 block md:hidden" onClick={() => setShowFullscreen(false)} >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minimize"><path d="M8 3v3a2 2 0 0 1-2 2H3" /><path d="M21 8h-3a2 2 0 0 1-2-2V3" /><path d="M3 16h3a2 2 0 0 1 2 2v3" /><path d="M16 21v-3a2 2 0 0 1 2-2h3" /></svg>
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

export default SearchView;