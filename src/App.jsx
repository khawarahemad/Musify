import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import SignupPage from "./SignupPage.jsx";
import Sidebar from "./components/Sidebar";
import Display from "./components/Display";
import Player from "./components/Player";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {
  const { audioRef, track } = useContext(PlayerContext);
  const navigate = useNavigate();

  // State to track authentication status
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => setIsAuth(!!localStorage.getItem("token"));

    // Listen for storage changes (in case of logout in another tab)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage setIsAuth={setIsAuth} />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/"
        element={
          isAuth ? (
            <div className="h-screen bg-black">
              <div className="h-[90%] flex">
                <Sidebar />
                <Display />
              </div>
              <Player />
              <audio ref={audioRef} src={track?.file} preload="auto" />
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
