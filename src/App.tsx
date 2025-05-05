// App.tsx
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

// src/ assets/ video
import MorningMode from './assets/video/MorningMode.mp4';
import EveningMode from './assets/video/EveningMode.mp4';
import NightMode from './assets/video/NightMode.mp4';

// src/ assets/ audio
import musicFile from './assets/audio/music1.mp3';

// src/ assets/ images
import wallpaper from './assets/images/HomePage_wallpaper.png';
import way from './assets/images/HomePage_way.png';

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

// src/ context
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';

const queryClient = new QueryClient();

const LayoutAllPages = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/home-page";
  const isStore = location.pathname === "/store";

  const noVideoPages = ["/home-page"];
  const hideVideo = noVideoPages.includes(location.pathname);

  {/* Rutes: main-page-buttons-fixed */ }
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
    document.documentElement.style.overflow = isStore ? "auto" : "hidden";
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [isStore]);

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
          <div className="title_purrpixel">PURR PIXEL</div>

          {/* Botones */}
          <div className="header-buttons">
            <div className="left-buttons">
              {["/store", "/settings", "/profile", "/games", "/home-page"].includes(location.pathname) && (
                <button className="back-button" onClick={() => navigate('/character-selection')}>
                  ⬅ Character Selection
                </button>
              )}
            </div>

            <div className="right-buttons">
              <div className="button_music" onClick={toggleMusic}>
                {isPlaying ? '🔊 Music ON' : '🔇 Music OFF'}
                <audio ref={audioRef} src={musicFile} loop />
              </div>
            </div>
          </div>
        </div>

        {/* Rutes: main-page-buttons-fixed */}
        {navButtonsMap[location.pathname] && (
          <div className="main-page-buttons-fixed">
            {navButtonsMap[location.pathname].map((btn) => (
              <Link key={btn.to} to={btn.to} className="main-page-button">
                {btn.label}
              </Link>
            ))}
          </div>
        )}

        <main
          className="main-content"
          style={
            isHomePage
              ? {
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }
              : {}
          }
        >

          <Outlet />
        </main>

        {/* LogoutButton only on character-selection */}
        {location.pathname === "/character-selection" && (
          <button className="logout-button" onClick={() => navigate('/index')}>
            Logout
          </button>
        )}

        <div className="container_footer">
          <p>&copy; 2025 PURRPIXEL. All rights reserved.</p>
        </div>
      </div>
    </QueryClientProvider>
  );
};


const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LayoutAllPages />}>
            <Route index element={<Index />} />
            <Route path="index" element={<Index />} />
            <Route path="instructions" element={<Instructions />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="terms-and-conditions" element={<Terms />} />
            <Route path="character-selection" element={<CharacterSelection />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="store" element={<Store />} />
            <Route path="games" element={<Games />} />
            <Route path="Jump" element={<Jump />} />
            <Route path="Catch" element={<Catch />} />
            <Route path="Quizz" element={<Quizz />} />
            <Route path="home-page" element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
