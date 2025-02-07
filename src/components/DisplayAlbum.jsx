import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { albumsData, assets } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = () => {
  const { id } = useParams();
  const { playWithId, pause, play } = useContext(PlayerContext);
  const albumName = albumsData[id]?.name;
  const [albumData, setAlbumData] = useState(null);
  const [songs, setSongs] = useState([]);

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
          <p className="mt-1 text-xs md:text-sm">
            <img className="inline-block w-4 md:w-5" src={assets.Musify} alt="Spotify Logo" />
            <b> Musify </b>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 px-4 text-[#a7a7a7] text-xs sm:text-sm">
        <p><b className="mr-2">#</b>Title</p>
        <p>Album</p>
        <p className="hidden sm:block">Duration</p>
      </div>
      <hr className="border-[#ffffff2b]" />

      {songs.map((item, index) => (
        <div
          key={item.id}
          onClick={() => {
            pause();
            playWithId(item.id);
            setTimeout(() => play(), 100);
          }}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] text-xs sm:text-sm hover:bg-[#ffffff2b] cursor-pointer px-4"
        >
          <div className="flex items-center text-white">
            <b className="mr-2 text-[#a7a7a7]">{index + 1}</b>
            <img className="w-8 md:w-10 mr-4" src={item.album_cover} alt={item.title} />
            <div className="flex flex-col">
              <div className="text-xs md:text-sm">{item.title.slice(0, 20)}</div>
            </div>
          </div>
          <p className="text-xs md:text-sm">{item.album}</p>
          <p className="text-xs md:text-sm hidden sm:block">{item.file_path ? "Available" : "Unknown"}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayAlbum;
