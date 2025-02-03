import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";
import SearchView from "../pages/SearchView";
import CreatePlaylistView from "../pages/CreatePlaylistView";
import BrowsePodcastsView from "../pages/BrowsePodcastsView";

const Sidebar = () => {
  const [fullscreenView, setFullscreenView] = useState(null); // Tracks the current fullscreen view

  // Handle search navigation
  const handleSearch = () => {
    setFullscreenView("search");
  };

  // Handle create playlist
  const handleCreatePlaylist = () => {
    setFullscreenView("create-playlist");
  };

  // Handle browse podcasts
  const handleBrowsePodcasts = () => {
    setFullscreenView("browse-podcasts");
  };

  // Close fullscreen view
  const closeFullscreen = () => {
    setFullscreenView(null);
  };

  return (
    <>
      {/* Sidebar */}
      <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
        {/* Top Section */}
        <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
          <div
            onClick={() => console.log("Navigate to Home")}
            className="flex items-center gap-3 pl-8 cursor-pointer"
          >
            <img className="w-6" src={assets.home_icon} alt="Home" />
            <p className="font-bold">Home</p>
          </div>
          <div
            onClick={handleSearch}
            className="flex items-center gap-3 pl-8 cursor-pointer"
          >
            <img className="w-6" src={assets.search_icon} alt="Search" />
            <p className="font-bold">Search</p>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="bg-[#121212] h-[85%] rounded">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img className="w-8" src={assets.stack_icon} alt="Library" />
              <p className="font-semibold">Your Library</p>
            </div>
            <div className="flex items-center gap-3">
              <img className="w-5" src={assets.plus_icon} alt="Add" />
              <img className="w-5" src={assets.arrow_icon} alt="Arrow" />
            </div>
          </div>
          {/* Playlist Suggestions */}
          <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
            <h1>Create Your First Playlist</h1>
            <p className="font-light">It's easy, we'll help you.</p>
            <button
              onClick={handleCreatePlaylist}
              className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4"
            >
              Create Playlist
            </button>
          </div>
          <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
            <h1>Let's Find Some Podcasts to Follow</h1>
            <p className="font-light">We'll keep you updated on new episodes.</p>
            <button
              onClick={handleBrowsePodcasts}
              className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4"
            >
              Browse Podcasts
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Views */}
      <AnimatePresence>
        {fullscreenView && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFullscreen}
          >
            <div
              className="text-center w-full max-w-lg p-8 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {fullscreenView === "search" && (
                <SearchView closeFullscreen={closeFullscreen} />
              )}
              {fullscreenView === "create-playlist" && (
                <CreatePlaylistView closeFullscreen={closeFullscreen} />
              )}
              {fullscreenView === "browse-podcasts" && (
                <BrowsePodcastsView closeFullscreen={closeFullscreen} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;