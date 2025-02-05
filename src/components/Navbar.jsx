import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import SearchView from "../pages/SearchView";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [fullscreenView, setFullscreenView] = useState(null); // State for fullscreen view
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Handle search navigation
  const handleSearch = () => {
    setFullscreenView("search");
  };

  const openPremiumModal = () => {
    setIsPremiumModalOpen(true);
  };

  const closePremiumModal = () => {
    setIsPremiumModalOpen(false);
  };

  // Close fullscreen view
  const closeFullscreen = () => {
    setFullscreenView(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex justify-between items-center font-semibold">
      {/* Navigation Buttons */}
      <div className="flex items-center gap-2">
        <img
          className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
          src={assets.arrow_left}
          alt="Back"
          onClick={() => navigate(-1)}
        />
        <img
          className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
          src={assets.arrow_right}
          alt="Forward"
          onClick={() => navigate(+1)}
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <p
          className="bg-white text-black text-[15px] px-4 py-3 rounded-2xl hidden md:block cursor-pointer"
          onClick={openPremiumModal}
        >
          Explore Premium
        </p>
        <p
          className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer"
          onClick={closePremiumModal}
        >
          Install App
        </p>
        {/* Search in Mobile */}
        <div className="md:hidden" onClick={handleSearch}>
          <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-5 h-5 inline-block mr-1 cursor-pointer"
          >
            <path
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="currentColor"
            ></path>
          </svg>
          Search
        </div>
        {/* Profile Icon */}
        <div className="relative" ref={dropdownRef}>
          <p
            className="bg-white text-black w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
            onClick={toggleDropdown}
          >
            K
          </p>

          {/* Dropdown Card */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="card2 absolute bg-black px-3 py-2 rounded-lg z-50"
                style={{
                  width: "200px",
                  top: "30px", // Adjust this value based on your navbar height
                  right: "0", // Adjust this value to align with the "K" icon
                }}
              >
                <ul className="list">
                  <li className="element flex items-center gap-3 py-3 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#7e8590"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-pencil"
                    >
                      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                      <path d="m15 5 4 4"></path>
                    </svg>
                    <p className="label">Rename</p>
                  </li>
                </ul>
                <div className="separator"></div>
                <ul className="list">
                  <li className="element flex items-center gap-3 py-3">
                    <svg
                      className="lucide lucide-settings"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="#7e8590"
                      fill="none"
                      viewBox="0 0 24 24"
                      height="24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                      <circle r="3" cy="12" cx="12"></circle>
                    </svg>
                    <p className="label">Settings</p>
                  </li>
                  <li className="element delete flex items-center gap-3 py-3">
                    <svg
                      className="lucide lucide-trash-2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="#7e8590"
                      fill="none"
                      viewBox="0 0 24 24"
                      height="24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line y2="17" y1="11" x2="10" x1="10"></line>
                      <line y2="17" y1="11" x2="14" x1="14"></line>
                    </svg>
                    <p className="label">Delete</p>
                  </li>
                </ul>
                <div className="separator"></div>
                <ul className="list">
                  <li className="element flex items-center gap-3 py-3">
                    <svg
                      className="lucide lucide-users-round"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="#7e8590"
                      fill="none"
                      viewBox="0 0 24 24"
                      height="24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18 21a8 8 0 0 0-16 0"></path>
                      <circle r="5" cy="8" cx="10"></circle>
                      <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
                    </svg>
                    <p className="label">Team Access</p>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Premium Modal */}
      <AnimatePresence>
        {isPremiumModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closePremiumModal} // Close modal when clicking outside
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 p-6 rounded-lg shadow-lg w-[600px]"
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
            >
              <div className="flex justify-center gap-4">
                {/* Monthly Card */}
                <div className="card">
                  <div className="content">
                    <div className="title">Monthly Edition</div>
                    <div className="price">₹9.99</div>
                    <div className="description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                  </div>
                  <button
                    className="Btn"
                    onClick={() => alert("Monthly Plan Selected")}
                  >
                    Pay
                    <svg
                      className="svgIcon"
                      viewBox="0 0 576 512"
                    >
                      <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
                    </svg>
                  </button>
                </div>

                {/* Quarterly Card */}
                <div className="card">
                  <div className="content">
                    <div className="title">Quarterly Edition</div>
                    <div className="price">₹24.99</div>
                    <div className="description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                  </div>
                  <button
                    className="Btn"
                    onClick={() => alert("Quarterly Plan Selected")}
                  >
                    Pay
                    <svg
                      className="svgIcon"
                      viewBox="0 0 576 512"
                    >
                      <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Search View */}
      <AnimatePresence>
        {fullscreenView === "search" && (
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
              <SearchView closeFullscreen={closeFullscreen} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;