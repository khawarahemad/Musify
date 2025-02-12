import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import { albumsData, TopHit, Arijit_Singh, songsData2, sidheMot } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";

const DisplayHome = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({ currentTime: 0, totalTime: 0 });
  const [playlist, setPlaylist] = useState([]); // Store the current playlist
  const [trackIndex, setTrackIndex] = useState(0); // Track index in the playlist

  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  // Function to play a song
  const playSong = (song, list, index) => {
    setCurrentTrack(song);
    setPlaylist(list);
    setTrackIndex(index);
    setShowFullscreen(true);
    setIsPlaying(true);
  };

  // Toggle play/pause
  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Format time in MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Seek song based on click position
  const seekSong = (e) => {
    if (audioRef.current && seekBg.current) {
      const rect = seekBg.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = percent * audioRef.current.duration;
      setTime((prev) => ({ ...prev, currentTime: audioRef.current.currentTime }));
    }
  };

  // Handle previous track
  const previous = () => {
    if (trackIndex > 0) {
      const prevIndex = trackIndex - 1;
      setTrackIndex(prevIndex);
      setCurrentTrack(playlist[prevIndex]);
      setIsPlaying(true);
    }
  };

  // Handle next track
  const next = () => {
    if (trackIndex < playlist.length - 1) {
      const nextIndex = trackIndex + 1;
      setTrackIndex(nextIndex);
      setCurrentTrack(playlist[nextIndex]);
      setIsPlaying(true);
    }
  };

  // Automatically play the next song when the current one ends
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleSongEnd = () => next();

    audio.addEventListener("ended", handleSongEnd);
    return () => audio.removeEventListener("ended", handleSongEnd);
  }, [currentTrack]);

  // Update progress bar as song plays
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setTime({
        currentTime: audio.currentTime,
        totalTime: audio.duration || 0,
      });
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, [currentTrack]);

  return (
    <>
      <Navbar />
      {/* Albums Section */}
      <div className="mb-4">
        <h1 className="my-5 px-6 font-bold text-2xl">Top PlayList</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {albumsData.map((item) => (
            <AlbumItem key={item.id} {...item} />
          ))}
        </div>
      </div>
      {/* Songs Sections */}
      {[{ title: "Today’s Biggest Hits", data: TopHit },
      { title: "Arijit Singh", data: Arijit_Singh },
      { title: "A.R. Rahman", data: songsData2 },
      { title: "Seedhe Maut", data: sidheMot }].map(({ title, data }) => (
        <div key={title} className="mb-4">
          <h1 className="my-5 font-bold px-4 text-2xl">{title}</h1>
          <div className="flex overflow-x-auto space-x-2 scrollbar-hide w-full">
            {data.map((item, index) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-48 overflow-hidden cursor-pointer"
                onClick={() => playSong(item, data, index)} // Play the song when clicked
              >
                <SongItem {...item} />
              </div>
            ))}
          </div>
        </div>
      ))}
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
            <div className="relative text-center w-full max-w-lg p-8 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <motion.img
                className="w-96 h-96 rounded-lg mb-8 object-cover shadow-2xl"
                src={currentTrack.album_cover}
                alt="album-art"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              />
              <h2 className="text-5xl text-gray-300 font-bold mb-4">{currentTrack.title}</h2>
              <p className="text-xl text-gray-400 mb-8">{currentTrack.album}</p>
              <audio ref={audioRef} src={currentTrack.file_path} autoPlay />
              {/* Controls */}
              <div className="flex flex-row gap-6 items-center text-white justify-center mb-6">
                {/* Backward Button */}
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

                {/* Play/Pause Button */}
                {isPlaying ? (
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
                ) : (
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
                )}

                {/* Forward Button */}
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
              <div className="flex items-center gap-5 w-full text-white max-w-md">
                <p>{formatTime(time.currentTime)}</p>
                <div ref={seekBg} onClick={seekSong} className="w-full bg-gray-300 rounded-full h-2 relative cursor-pointer">
                  <motion.div ref={seekBar} className="h-full bg-green-800 rounded-full absolute top-0 left-0" style={{ width: `${(time.currentTime / time.totalTime) * 100}%` }} />
                </div>
                <p>{formatTime(time.totalTime)}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DisplayHome;
