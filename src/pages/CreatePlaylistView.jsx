import React, { useState } from "react";

const SearchView = ({ closeFullscreen }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-black bg-opacity-50 p-4">
      <form
        onSubmit={handleSearch}
        className="flex items-center max-w-3xl mx-auto  p-3 rounded-lg shadow-md"
      >
        <label className="sr-only" htmlFor="voice-search">
          Create
        </label>

        <div className="relative flex-grow w-[70%] pr-2">
          <input
            required
            placeholder="Create Playlist..."
            className="block w-full p-4 ps-12 bg-[#242424] text-white text-sm  border border-black rounded-lg focus:ring-blue-500 focus:border-blue-500"
            id="voice-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button
          className="w-[30%] px-2 py-4 bg-blue-800 text-white rounded-lg hover:bg-blue-900 flex items-center justify-center"
          type="submit"
        >
        Create
        </button>
      </form>
    </div>
  );
};

export default SearchView;
