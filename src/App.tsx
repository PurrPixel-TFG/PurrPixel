// App.tsx
import { supabase } from "./supabase/SupabaseClient";
import { useRef, useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ProtectedRoute from "./components/ProtectedRoute";

// Video
import MorningMode from './assets/assets_video/MorningMode.mp4';
import EveningMode from './assets/assets_video/EveningMode.mp4';
import NightMode from './assets/assets_video/NightMode.mp4';

// Audio
import musicFile from './assets/assets_audio/music1.mp3';

// Imagen (título)
import titlePurrPixel from './assets/assets_components/PURRPIXEL_title.png';
import coinPurr from './assets/assets_games/coinPurr.png';

// src/ styles
import './styles/global.scss';
import './styles/components.scss';
import './styles/variables.scss';

// src/ pages
import Index from './pages/Index/Index';
import Instructions from './pages/Instructions/Instructions'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Terms from './pages/Terms/Terms';
import CharacterSelection from './pages/CharacterSelection/CharacterSelection';
import Profile from './pages/Profile/Profile';
import Store from './pages/Store/Store';
import Games from './pages/Games/Games';
import Jump from './pages/Games/Jump';
import Catch from './pages/Games/Catch';
import Quizz from './pages/Games/Quizz';
import Settings from './pages/Settings/Settings';
import HomePage from './pages/HomePage/HomePage';
import Stock from './pages/Stock/Stock';

// src/ context
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';
import { CoinsProvider, useCoins } from './context/CoinsContext';


const queryClient = new QueryClient();

const Header = () => {
  const location = useLocation();
  const { coins, loading } = useCoins();

  const hideCoinsDisplayRoutes = ["/", "/index", "/instructions", "/register", "/login", "/stock"];
  const showCoins = !hideCoinsDisplayRoutes.includes(location.pathname);

  const hideTitleDisplayRoutes = ["/stock"];
  const showTitle = !hideTitleDisplayRoutes.includes(location.pathname);

  return (
    <>
      {showTitle && (
        <img
          src={titlePurrPixel}
          alt="PurrPixel Title"
          className="title-purrpixel"
        />
      )}

      {showCoins && (
        <div className="coins-display">
          <img src={coinPurr} alt="purr coin" className="coin-icon" />
          <span className="coins-amount">{loading ? "..." : coins}</span>
        </div>
      )}
    </>
  );
};

const LayoutAllPages = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // const isHomePage = location.pathname === "/home-page";
  // const isProfilePage = location.pathname === "/profile";
  const isStore = location.pathname === "/store";
  const isStock = location.pathname === "/stock";
  const isTerms = location.pathname === "/terms-and-conditions";

  const noVideoPages = ["/home-page", "/profile", "/stock"];
  const hideVideo = noVideoPages.includes(location.pathname);

  {/* Routes: main-page-buttons-fixed */ }
  const navButtonsMap: Record<string, { to: string; label: string }[]> = {
    "/character-selection": [
      { to: "/settings", label: "Settings" },
      { to: "/store", label: "Store" },
      { to: "/profile", label: "Profile" },
      { to: "/games", label: "Games" },
      { to: "/home-page", label: "PRUEBAS" },
    ],
    "/settings": [
      { to: "/store", label: "Store" },
      { to: "/profile", label: "Profile" },
      { to: "/games", label: "Games" },
      { to: "/home-page", label: "PRUEBAS" },
    ],
    "/store": [
      { to: "/settings", label: "Settings" },
      { to: "/profile", label: "Profile" },
      { to: "/games", label: "Games" },
      { to: "/home-page", label: "PRUEBAS" },
    ],
    "/profile": [
      { to: "/settings", label: "Settings" },
      { to: "/store", label: "Store" },
      { to: "/games", label: "Games" },
      { to: "/home-page", label: "PRUEBAS" },
    ],
    "/games": [
      { to: "/settings", label: "Settings" },
      { to: "/profile", label: "Profile" },
      { to: "/store", label: "Store" },
      { to: "/home-page", label: "PRUEBAS" },
    ],
  };

  const { theme } = useTheme();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    document.body.style.overflow = "visible";
    document.documentElement.style.overflow = isStore || isStock || isTerms ? "auto" : "hidden";
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [isStore, isStock, isTerms]);


  useEffect(() => {
    const updateTheme = () => {
      const stored = localStorage.getItem("themeMode");
      document.body.setAttribute("data-theme", stored || "auto");
    };
    window.addEventListener("theme-changed", updateTheme);
    updateTheme();
    return () => window.removeEventListener("theme-changed", updateTheme);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {!hideVideo && (
        <video
          key={theme}
          autoPlay
          loop
          muted
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source
            src={
              theme === 'evening'
                ? EveningMode
                : theme === 'night'
                  ? NightMode
                  : MorningMode
            }
          />
        </video>
      )}

      <div className="app-layout">

        <div className="container_header">
          <Header />

          {/* Botones */}
          <div className="header-buttons">
            <div className="left-buttons">
              {
                ["/store", "/settings", "/profile", "/games", "/home-page"].includes(location.pathname) && (
                  <button className="button" onClick={() => navigate('/character-selection')}>
                    <div className="button-top">⬅ Character Selection</div>
                    <div className="button-bottom"></div>
                    <div className="button-base"></div>
                  </button>

                )}

              {
                ["/store", "/settings", "/profile", "/games", "/stock"].includes(location.pathname) && (
                  <button className="button" onClick={() => navigate('/home-page')}>
                    <div className="button-top">⬅ Home Page</div>
                    <div className="button-bottom"></div>
                    <div className="button-base"></div>
                  </button>
                )}

              {
                ["/stock"].includes(location.pathname) && (
                  <button className="button" onClick={() => navigate('/profile')}>
                    <div className="button-top">⬅ Profile</div>
                    <div className="button-bottom"></div>
                    <div className="button-base"></div>
                  </button>
                )}

              {
                ["/login", "/instructions"].includes(location.pathname) && (
                  <button className="button" onClick={() => navigate('/index')}>
                    <div className="button-top">⬅ Principal Page</div>
                    <div className="button-bottom"></div>
                    <div className="button-base"></div>
                  </button>
                )}
            </div>

            <button className="button" onClick={toggleMusic}>
              <div className="button-top">
                {isPlaying ? '🔊 Music ON' : '🔇 Music OFF'}
              </div>
              <div className="button-bottom"></div>
              <div className="button-base"></div>
              <audio ref={audioRef} src={musicFile} loop />
            </button>

          </div>
        </div>

        {/* Rutes: main-page-buttons-fixed */}
        {/* {navButtonsMap[location.pathname] && (
          <div className="main-page-buttons-fixed">
            {navButtonsMap[location.pathname].map((btn) => (
              <Link key={btn.to} to={btn.to} className="main-page-button">
                {btn.label}
              </Link>
            ))}
          </div>
        )} */}

        <main>
          <Outlet />
        </main>


        <div className="container_footer">
          <p>&copy; 2025 PURRPIXEL. All rights reserved.</p>
        </div>

        {/* LogoutButton only on character-selection */}
        {location.pathname === "/character-selection" && (
          <div className="logout-button-wrapper">
            <button
              className="button"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/index");
              }}
            >
              <div className="button-top">Logout</div>
              <div className="button-bottom"></div>
              <div className="button-base"></div>
            </button>
          </div>
        )}

      </div>
    </QueryClientProvider>
  );
};


const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CoinsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LayoutAllPages />}>
              <Route index element={<Index />} />
              <Route path="index" element={<Index />} />
              <Route path="instructions" element={<Instructions />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="terms-and-conditions" element={<Terms />} />

              <Route element={<ProtectedRoute />}>
                <Route path="character-selection" element={<CharacterSelection />} />
                <Route path="home-page" element={<HomePage />} />
                <Route path="store" element={<Store />} />
                <Route path="profile" element={<Profile />} />
                <Route path="stock" element={<Stock />} />
                <Route path="settings" element={<Settings />} />
                <Route path="games" element={<Games />}>
                  <Route path="jump" element={<Jump />} />
                  <Route path="catch" element={<Catch />} />
                  <Route path="quizz" element={<Quizz />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Router>
      </CoinsProvider>
    </ThemeProvider>
  );
};

export default App;