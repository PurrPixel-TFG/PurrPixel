import { useRef, useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MorningMode from './assets/video/MorningMode.mp4';
import NightMode from './assets/video/NightMode.mp4';
import musicFile from './assets/audio/music1.mp3';
import './styles/global.scss';
import './styles/components.scss';
import Index from './pages/Index/Index';
import Instructions from './pages/Instructions/Instructions'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Terms from './pages/Terms/Terms';
import HomePage from './pages/HomePage/HomePage';
import Profile from './pages/Profile/Profile';
import Store from './pages/Store/Store';
import Games from './pages/Games/Games';
import Settings from './pages/Settings/Settings';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';

const queryClient = new QueryClient();

const BackButtonHomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isBackButtonVisible = ["/settings", "/profile", "/store", "/games", "/instructions"].includes(location.pathname);

  if (!isBackButtonVisible) return null;

  return (
    <button className="back-button" onClick={() => navigate('/home-page')}>
      ⬅ Página Principal
    </button>
  );
};

const LogoutButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogoutButtonVisible = ["/home-page"].includes(location.pathname);

  if (!isLogoutButtonVisible) return null;

  return (
    <button className="logout-button" onClick={() => navigate('/index')}>
      Logout
    </button>
  );
}

const LayoutAllPages = () => {

  const location = useLocation();

  const isHomePage = location.pathname === '/home-page';
  const isStore = location.pathname === "/store";

  const { theme } = useTheme();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isStore) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
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
      <div>
        {/* Fondo: video (se oculta en main-page) */}
        {!isHomePage && (
          <video
          key={theme} // ← esto es la clave
          autoPlay
          loop
          muted
          style={{
            position: 'fixed',
            top: '10vh',
            left: 0,
            width: '100%',
            height: '90vh',
            objectFit: 'cover',
            overflow: 'hidden',
            zIndex: -1,
          }}
        >
          <source
            src={
              theme === 'evening'
                ? MorningMode
                : theme === 'night'
                  ? NightMode
                  : MorningMode
            }
            type="video/mp4"
          />
        </video>
        )}

        <div className="container_header">PURR PIXEL</div>

        <BackButtonHomePage />
        <LogoutButton />

        <div className="button_music" onClick={toggleMusic}>
          {isPlaying ? '🔊 Music ON' : '🔇 Music OFF'}
        </div>

        <audio ref={audioRef} src={musicFile} loop />

        <Outlet />

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
            <Route path="home-page" element={<HomePage />} /> 
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="store" element={<Store />} />
            <Route path="games" element={<Games />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
