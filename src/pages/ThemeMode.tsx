import React, { useEffect, useState } from 'react';

/** 
import videoSrc from '../assets/video/modoDia.mp4';
import videoSrc from '../assets/video/fondoDALTONICO.mp4';
import videoSrc from '../assets/video/fondoDALTONICO.mp4';
*/
const ColorblindToggle: React.FC = () => {
  const [isColorblind, setIsColorblind] = useState(
    localStorage.getItem('colorblindMode') === 'true'
  );

  useEffect(() => {
    if (isColorblind) {
      document.body.classList.add('colorblind-mode');
    } else {
      document.body.classList.remove('colorblind-mode');
    }
  }, [isColorblind]);

  const toggleColorblindMode = () => {
    const newMode = !isColorblind;
    setIsColorblind(newMode);
    localStorage.setItem('colorblindMode', newMode.toString());
  };

  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      {/* Video DALTONICO PERO NO VA >:d */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        {/* <source src={videoSrc} type="video/mp4" />
        Tu navegador no soporta vídeos. */}
      </video>

      {/* Botón */}
      <button type="button" onClick={toggleColorblindMode} style={{ position: 'relative', zIndex: 1 }}>
        {isColorblind ? 'Desactivar modo daltónico' : 'Modo daltónico'}
      </button>
    </div>
  );
};

export default ColorblindToggle;
