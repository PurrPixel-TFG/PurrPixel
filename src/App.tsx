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
import modoDia from './assets/video/modoDia.mp4';
import modoTarde from './assets/video/modoTarde.mp4';
import modoNoche from './assets/video/modoNoche.mp4';

import musicFile from './assets/audio/musicaFondo.mp3';
import './styles/styles.css'
import Inicio from './pages/inicio';
import Instrucciones from './pages/instrucciones'
import Login from './pages/login';
import Registrar from './pages/register';
import Terminos from './pages/terminos-condiciones';
import MainPage from './pages/main-page';
import Ajustes from './pages/ajustes';
import Perfil from './pages/perfil';
import Tienda from './pages/tienda';
import Juegos from './pages/juegos';
import PurrPoints from './pages/purrpoints';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';

const queryClient = new QueryClient();

const BotonRetroceder_MainPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isBackButtonVisible = ["/ajustes", "/perfil", "/tienda", "/juegos"].includes(location.pathname);

  if (!isBackButtonVisible) return null;

  return (
    <button className="boton-retroceder" onClick={() => navigate('/main-page')}>
      ⬅ Página Principal
    </button>
  );
};

const BotonCerrarSesion = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isBotonCerrarSesionVisible = ["/main-page"].includes(location.pathname);

  if (!isBotonCerrarSesionVisible) return null;

  return (
    <button className="boton_cerrar-sesion" onClick={() => navigate('/inicio')}>
      Cerrar sesión
    </button>
  );
}

const LayoutAllPages = () => {

  const location = useLocation();

  const isMainPage = location.pathname === '/main-page';
  const isTienda = location.pathname === "/tienda";

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
    if (isTienda) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isTienda]);

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
        {!isMainPage && (
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
              theme === 'tarde'
                ? modoTarde
                : theme === 'noche'
                  ? modoNoche
                  : modoDia
            }
            type="video/mp4"
          />
        </video>
        )}

        <div className="container_cabecera">PURR PIXEL</div>

        <BotonRetroceder_MainPage />
        <BotonCerrarSesion />

        <div className="button_music" onClick={toggleMusic}>
          {isPlaying ? '🔊 Música ON' : '🔇 Música OFF'}
        </div>

        <audio ref={audioRef} src={musicFile} loop />

        <Outlet />

        <div className="container_pie">
          <p>&copy; 2025 PURRPIXEL. Todos los derechos reservados.</p>
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
            <Route index element={<Inicio />} />
            <Route path="inicio" element={<Inicio />} />
            <Route path="instrucciones" element={<Instrucciones />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Registrar />} />
            <Route path="terminos-condiciones" element={<Terminos />} />
            <Route path="main-page" element={<MainPage />} />
            <Route path="ajustes" element={<Ajustes />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="tienda" element={<Tienda />} />
            <Route path="juegos" element={<Juegos />} />
            <Route path="purrpoints" element={<PurrPoints />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
