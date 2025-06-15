// pages/Terms/Terms.tsx
import React from "react";
import "./Terms.scss";
import { useNavigate } from "react-router-dom";

const Terms: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="terms-container">
      <h1>Términos y Condiciones de PurrPixel 🐾</h1>
      <p className="intro">
        Bienvenido a <strong>PurrPixel</strong>, un mundo donde los gatos pixelados son tus mejores amigos. Al usar nuestra app, aceptas los siguientes términos:
      </p>

      <section>
        <h2>1. Propiedad del Gato</h2>
        <p>
          Cada usuario puede adoptar un gato digital. Este gato es 100% virtual y no requiere arena ni comida real (¡aunque le encanta el pescado pixelado!).
        </p>
      </section>

      <section>
        <h2>2. Cuidados y Responsabilidad</h2>
        <p>
          El usuario es responsable del bienestar de su gato. Si lo descuidas, puede desaparecer en el ciberespacio. No nos hacemos responsables de traumas emocionales por gatos evaporados.
        </p>
      </section>

      <section>
        <h2>3. Monedas y Compras</h2>
        <p>
          Las monedas en PurrPixel no tienen valor real (ni en criptos). No intentes pagar el alquiler con ellas.
        </p>
      </section>

      <section>
        <h2>4. Actualizaciones</h2>
        <p>
          Podemos cambiar las reglas del juego en cualquier momento. Tu gato será informado a través de ronroneos.
        </p>
      </section>

      <section>
        <h2>5. Seguridad y Datos</h2>
        <p>
          No vendemos tus datos ni tus gatos. Solo usamos tu correo para que puedas volver a tu felino favorito cuando quieras.
        </p>
      </section>

      <button onClick={() => navigate(-1)} className="back-button">
        ← Volver
      </button>
    </div>
  );
};

export default Terms;
