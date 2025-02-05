// SpotifyPlayerContext.js
import { createContext, useContext, useEffect, useState } from "react";

const SpotifyPlayerContext = createContext();

export const SpotifyPlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb("YOUR_ACCESS_TOKEN"); // Replace with your access token
        },
        volume: 0.5,
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect();
      setPlayer(player);
    };

    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, []);

  return (
    <SpotifyPlayerContext.Provider value={{ player, deviceId }}>
      {children}
    </SpotifyPlayerContext.Provider>
  );
};

export const useSpotifyPlayer = () => useContext(SpotifyPlayerContext);