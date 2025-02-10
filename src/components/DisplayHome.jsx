import Navbar from "./Navbar";
import { albumsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import { songsData } from "../assets/assets";
import { songsData2 } from "../assets/assets";
import { Arijit_Singh } from "../assets/assets";
import { TopHit } from "../assets/assets";
import { sidheMot } from "../assets/assets";
import SongItem from "./SongItem";
import { useMusicPlayer } from '../context/MusicPlayerContext';

const MusicSection = ({ title, items }) => {
  const { playSong } = useMusicPlayer();
}
const DisplayHome = () => {
  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 px-4 font-bold text-2xl">Top PlayList</h1>
        <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {albumsData.map((item, index) => (
            <AlbumItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold px-4 text-2xl">Today&apos;s Biggest Hits</h1>
        <div className="flex overflow-x-auto space-x-3 scrollbar-hide w-full">
          {TopHit.map((item, index) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-48 overflow-hidden cursor-pointer"
              onClick={() => playSong(item, items)}
            >
              <SongItem
                name={item.title}
                desc={item.album}
                image={item.album_cover}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold px-4 text-2xl">Arijit Singh</h1>
        <div className="flex overflow-x-auto space-x-3 scrollbar-hide w-full">
          {Arijit_Singh.map((item, index) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-48 overflow-hidden cursor-pointer"
              onClick={() => playSong(item, items)}
            >
              <SongItem
                name={item.title}
                desc={item.album}
                image={item.album_cover}
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h1 className="my-5 font-bold px-4 text-2xl">A.R. Rahman</h1>
          <div className="flex overflow-x-auto space-x-3 scrollbar-hide w-full">
            {songsData2.map((item, index) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-48 overflow-hidden cursor-pointer"
              onClick={() => playSong(item, items)}
            >
              <SongItem
                name={item.title}
                desc={item.album}
                image={item.album_cover}
              />
            </div>
          ))}
          </div>
        </div>
        <div className="mb-4">
          <h1 className="my-5 font-bold px-4 text-2xl">Seedhe maut</h1>
          <div className="flex overflow-x-auto space-x-3 scrollbar-hide w-full">
            {sidheMot.map((item, index) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-48 overflow-hidden cursor-pointer"
              onClick={() => playSong(item, items)}
            >
              <SongItem
                name={item.title}
                desc={item.album}
                image={item.album_cover}
              />
            </div>
          ))}
          </div>
        </div>
        <div className="mb-4" class="hidden">
          <h1 className="my-5 font-bold px-4 text-2xl">sidheMot</h1>
          <div className="flex overflow-x-auto space-x-2 scrollbar-hide w-full">
            {songsData.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-48 overflow-hidden">
                <SongItem
                  name={item.name}
                  desc={item.desc}
                  id={item.id}
                  image={item.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
