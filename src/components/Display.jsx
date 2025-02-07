import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { useEffect, useRef, useState } from "react";

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  const [songsData, setSongsData] = useState([]); // State to store API data
  const [loading, setLoading] = useState(true); // Loading state for API calls
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.slice(-1) : "";

  // Fetch all songs from the API
  const fetchSongs = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/songs");
      if (!response.ok) throw new Error("Failed to fetch songs");
      const data = await response.json();
      setSongsData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching songs:", error);
      setLoading(false);
    }
  };

  // Fetch songs by album ID
  const fetchAlbumSongs = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/songs?id=${id}`);
      if (!response.ok) throw new Error("Failed to fetch album songs");
      const data = await response.json();
      setSongsData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching album songs:", error);
      setLoading(false);
    }
  };

  // Fetch data based on the current route
  useEffect(() => {
    if (isAlbum) {
      fetchAlbumSongs(albumId);
    } else {
      fetchSongs();
    }
  }, [location]);

  // Set background color dynamically
  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(#FF5733,#121212)`; // Example gradient
    } else {
      displayRef.current.style.background = "#121212";
    }
  }, [isAlbum]);

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      <Routes>
        {/* Pass songsData and loading state to DisplayHome */}
        <Route
          path="/"
          element={<DisplayHome songs={songsData} loading={loading} />}
        />
        {/* Pass songsData and loading state to DisplayAlbum */}
        <Route
          path="/album/:id"
          element={<DisplayAlbum songs={songsData} loading={loading} />}
        />
      </Routes>
    </div>
  );
};

export default Display;