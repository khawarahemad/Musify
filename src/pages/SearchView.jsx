import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchView = ({ closeFullscreen }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Step 1: Fetch Search Results When Typing Stops
  useEffect(() => {
    if (!query) return;

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(async () => {
        try {
          const response = await axios.get(
            `https://music-api-uvdl.onrender.com/api/songs?title=${encodeURIComponent(query)}`
          );
          setSearchResults(response.data);
        } catch (error) {
          console.error("Error searching songs:", error);
        }
      }, 500)
    );
  }, [query]);

  return (
    <div className="fixed top-0 left-0 w-full bg-black bg-opacity-50 p-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center max-w-3xl mx-auto p-3 rounded-lg shadow-md"
      >
        <label className="sr-only" htmlFor="song-search">Search</label>
        <div className="relative flex-grow w-[70%] pr-2">
          <input
            required
            placeholder="Search for a song..."
            className="block w-full p-4 ps-12 bg-[#242424] text-white text-sm border border-black rounded-lg focus:ring-blue-500 focus:border-blue-500"
            id="song-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          className="w-[30%] px-2 py-4 bg-emerald-900 text-white rounded-lg hover:bg-emerald-700 flex items-center justify-center"
          type="submit"
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-5 h-5 inline-block mr-1"
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
        </button>
      </form>

      {/* Display Search Results with Album Titles */}
      {searchResults.length > 0 && (
        <div className="mt-4 max-w-3xl mx-auto text-white rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">Search Results</h2>
          <ul>
            {searchResults.map((song) => (
              <li key={song.id} className="flex items-center mb-3 p-2 bg-gray-900 rounded-lg">
                {song.album_cover && (
                  <img
                    src={song.album_cover}
                    alt={song.album_title}
                    className="w-16 h-16 rounded-lg mr-3"
                  />
                )}
                <div>
                  <p className="text-lg font-semibold">{song.title}</p>
                  <p className="text-sm text-gray-400">Album: {song.album}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchView;
