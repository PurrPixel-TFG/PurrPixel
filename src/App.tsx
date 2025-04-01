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
import videoSrc from './assets/video/inicioJuego.mp4';
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

const queryClient = new QueryClient();

//Aplica en todas las páginas

const BotonRetroceder_MainPage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const isBackButtonVisible = ["/ajustes", "/perfil", "/tienda", "/juegos"].includes(location.pathname);

  if (!isBackButtonVisible) return null;

  return (
    <button className="boton-retroceder" onClick={() => navigate('/main-page')}>
      ⬅ Volver
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
  const isGamePage = location.pathname === '/juegos';
  const isTienda = location.pathname === "/tienda"; // CONSTANTE TIENDA

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
    const isColorblind = localStorage.getItem('colorblindMode') === 'true';
    if (isColorblind) {
      document.body.classList.add('colorblind-mode');
    } else {
      document.body.classList.remove('colorblind-mode');
    }
  }, []);


// BLOQUEO DE SCROLL EN TODAS LAS PÁGINAS EXCEPTO SCROLL
useEffect(() => {
  if (isTienda) {
    document.body.style.overflow = "auto"; // Permitir scroll en tienda
  } else {
    document.body.style.overflow = "hidden"; // Bloquear scroll en el resto
  }

  return () => {
    document.body.style.overflow = "auto"; // Reset al desmontar
  };
}, [isTienda]);



  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {/* Fondo: video (se oculta en main-page) */}
        {!isMainPage && (
          <video
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
            <source src={videoSrc} type="video/mp4" />
            Tu navegador no soporta vídeos.
          </video>
        )}

        {/* Cabecera */}
        <div className="container_cabecera">PURR PIXEL</div>

        {/* Botón de retroceso */}
        <BotonRetroceder_MainPage />

        {/* Botón de cerrar sesión */}
        <BotonCerrarSesion />

        {/* Botón de música */}
        <div className="button_music" onClick={toggleMusic}>
          {isPlaying ? '🔊 Música ON' : '🔇 Música OFF'}
        </div>

        {/* Audio oculto */}
        <audio ref={audioRef} src={musicFile} loop />

        {/* Página actual */}
        <Outlet />

        {/* Pie de página */}
        <div className="container_pie">
          <p>&copy; 2025 PURRPIXEL. Todos los derechos reservados.</p>
        </div>
      </div>
    </QueryClientProvider>
  );
};


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutAllPages />}>
          {/* Todas las páginas ahora estarán dentro del Layout */}
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
  );
};

export default App;
