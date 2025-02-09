import { useContext, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const {
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    track,
    time,
    previous,
    next,
    seekSong,
    showFullscreen,
    setShowFullscreen,
  } = useContext(PlayerContext);

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds === null || timeInSeconds === undefined) {
      return "0:00";
    }
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const fullscreenVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <>
    <div class="hidden">
      {/* Fullscreen Player */}
      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFullscreen(false)}
          >
            <div
              className="text-center w-full max-w-lg p-8 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
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

              {/* Album Art */}
              <motion.img
                className="w-96 h-96 rounded-lg mb-8 object-cover shadow-2xl"
                src={track.image}
                alt="album-art"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              />
              {/* Track Info */}
              <h2 className="text-5xl text-gray-300 font-bold mb-4">{track.name}</h2>
              <p className="text-xl text-gray-400 mb-8">{track.desc}</p>
              {/* Player Controls */}
              <div className="flex gap-6 items-center justify-center mb-6">
                <img
                  onClick={() => {
                    previous();
                    pause();
                    setTimeout(() => play(), 100); // Ensures play triggers after pause
                  }}
                  className="w-6 cursor-pointer hover:opacity-80"
                  src={assets.prev_icon}
                  alt="Previous"
                />
                {playStatus ? (
                  <img
                    onClick={pause}
                    className="w-12 cursor-pointer hover:opacity-80"
                    src={assets.pause_icon}
                    alt="Pause"
                  />
                ) : (
                  <img
                    onClick={play}
                    className="w-12 cursor-pointer hover:opacity-80"
                    src={assets.play_icon}
                    alt="Play"
                  />
                )}
                <img
                  onClick={() => {
                    next();
                    pause();
                    setTimeout(() => play(), 100); // Ensures play triggers after pause
                  }}
                  className="w-6 cursor-pointer hover:opacity-80"
                  src={assets.next_icon}
                  alt="Next"
                />
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

      {/* Mini Player */}
      <motion.div
        className="h-[10%] bg-black flex justify-between items-center text-white px-4"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Section - Track Info */}
        <div
          className="hidden lg:flex items-center gap-4 cursor-pointer group"
          onClick={() => setShowFullscreen(true)}
        >
          <img
            className="w-12 h-12 object-cover rounded"
            src={track.image}
            alt="song_Data"
          />
          <div>
            <p className="font-semibold">{track.name}</p>
            <p className="text-sm text-gray-400">{track.desc.slice(0, 43)}</p>
          </div>
        </div>

        {/* Center Section - Controls */}
        <div className="flex flex-col items-center gap-1 m-auto">
          <motion.div className="flex gap-4 items-center">
            <img
              onClick={() => {
                previous();
                pause();
                setTimeout(() => play(), 100); // Ensures play triggers after pause
              }}
              className="w-4 cursor-pointer"
              src={assets.prev_icon}
              whileTap={{ scale: 0.9 }}
            />
            {playStatus ? (
              <img
                onClick={pause}
                className="w-8 cursor-pointer"
                src={assets.pause_icon}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
            ) : (
              <img
                onClick={play}
                className="w-8 cursor-pointer"
                src={assets.play_icon}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
            )}
            <img
              onClick={() => {
                next();
                pause();
                setTimeout(() => play(), 100); // Ensures play triggers after pause
              }}
              className="w-4 cursor-pointer"
              src={assets.next_icon}
              whileTap={{ scale: 0.9 }}
            />
          </motion.div>

          {/* Progress Bar */}
          <div className="flex items-center gap-5 w-full">
            <p className="text-sm">{formatTime(time.currentTime)}</p>
            <div
              ref={seekBg}
              onClick={(e) => seekSong(e)}
              className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer relative h-2"
            >
              <motion.hr
                ref={seekBar}
                className="h-full border-none bg-green-800 rounded-full absolute top-0 left-0"
                animate={{
                  width: time.totalTime > 0 ? `${(time.currentTime / time.totalTime) * 100}%` : "0%",
                }}

              />
            </div>
            <p className="text-sm">{formatTime(time.totalTime)}</p>
          </div>
        </div>
      </motion.div>
      </div>
    </>
  );
};

export default Player;