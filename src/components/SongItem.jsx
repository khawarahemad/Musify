import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const SongItem = ({ name,album_cover, title,image, desc, id, playSong }) => {
  const playerContext = useContext(PlayerContext); // Check if PlayerContext exists

  const handleClick = () => {
    if (playerContext) {
      // Hidden div player
      const { playWithId, pause, play } = playerContext;
      playWithId(id);
      pause();
      setTimeout(() => play(), 100);
    } else if (playSong) {
      // Fullscreen player (DisplayHome)
      playSong({ name, image, desc, id });
    }
  };

  return (
    <div
      
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded w-full h-48 object-cover" src={image || album_cover} alt={name} />
      <p className="font-bold mt-2 mb-1">{name} {title}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default SongItem;
