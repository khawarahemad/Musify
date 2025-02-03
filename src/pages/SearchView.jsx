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
          Search
        </label>

        <div className="relative flex-grow w-[70%] pr-2">
          <input
            required
            placeholder="Search..."
            className="block w-full p-4 ps-12 bg-[#242424] text-white text-sm  border border-black rounded-lg focus:ring-blue-500 focus:border-blue-500"
            id="voice-search"
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
    </div>
  );
};

export default SearchView;
