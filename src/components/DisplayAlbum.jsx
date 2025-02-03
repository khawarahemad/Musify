import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { albumsData, assets, songsData } from "../assets/assets";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = () => {
  const { id } = useParams();
  const albumData = albumsData[id];
  const { playWithId, pause, play } = useContext(PlayerContext);

  return (
    <div className="font-sans text-white min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Album Header Section */}
      <div className="mt-10 flex flex-col md:flex-row md:items-end px-4">
        <div className="relative mb-4 md:mb-0">
          <img
            className="w-32 md:w-48 rounded"
            src={albumData.image}
            alt={albumData.name}
          />
          <img
            className="absolute bottom-2 right-2 w-6 md:w-10 opacity-0 transition-opacity duration-200 hover:opacity-100 cursor-pointer"
            src={assets.play_icon}
            alt="Play"
            onClick={() => {
              pause();
              playWithId(albumData.id);
              setTimeout(() => play(), 100);
            }} // Play the entire album
          />
        </div>
        <div className="flex flex-col ml-0 md:ml-8">
          <p className="text-xs md:text-sm uppercase">Playlist</p>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-2">
            {albumData.name}
          </h2>
          <h4 className="text-sm md:text-base">{albumData.desc}</h4>
          <p className="mt-1 text-xs md:text-sm">
            <img
              className="inline-block w-4 md:w-5"
              src={assets.spotify_logo}
              alt="Spotify Logo"
            />
            <b> Spotify </b>
            <b>• 1,232,123 saves </b>
            • <b>50 songs,</b>
            <span className="text-[#a7a7a7]"> about 2hr 30 min</span>
          </p>
        </div>
      </div>

      {/* Song List Header */}
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 px-4 text-[#a7a7a7] text-xs sm:text-sm">
        <p>
          <b className="mr-2">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img
          className="m-auto w-4"
          src={assets.clock_icon}
          alt="Clock Icon"
        />
      </div>
      <hr className="border-[#ffffff2b]" />

      {/* Song List */}
      {songsData.map((item, index) => (
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
            <img
              className="w-8 md:w-10 mr-4"
              src={item.image}
              alt={item.name}
            />
            <div className="flex flex-col">
              <div className="text-xs md:text-sm">{item.name.slice(0, 20)}</div>
              <div className="text-[#a7a7a7] text-xs md:text-sm">
                {item.desc.slice(0, 20)}
              </div>
            </div>
          </div>
          <p className="text-xs md:text-sm">{albumData.name}</p>
          <p className="text-xs md:text-sm hidden sm:block">5 days ago</p>
          <p className="text-xs md:text-sm text-center">{item.duration}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayAlbum;
