import React, { useState } from "react";
import './Tienda.scss';
import { Link } from "react-router-dom";

import pescaito from "../../assets/images/pescaito.png";
import burger from "../../assets/images/burger.png";
import cake from "../../assets/images/cake.png";
import pollo from "../../assets/images/pollo.png";

import coffe from "../../assets/images/coffe.png";
import boba from "../../assets/images/boba.png";
import milk from "../../assets/images/milk.png";

import pocion from "../../assets/images/pocion.png";
import sprinkles from "../../assets/images/sprinkles.png";

import pink from "../../assets/images/pink.png";
import blue from "../../assets/images/blue.png";
import purple from "../../assets/images/purple.png";

// ======================= COMPONENTE PRINCIPAL ===========================
const Tienda: React.FC = () => {
  const [categoriasVisibles, setCategoriasVisibles] = useState<Record<string, boolean>>({
    comida: true,
    bebida: true,
    booster: true,
    felicidad: true,
  });

  const toggleCategory = (categoria: string) => {
    setCategoriasVisibles((prev) => ({
      ...prev,
      [categoria]: !prev[categoria],
    }));
  };

  return (
    <>
      <div className="main-page-buttons-fixed">
        <Link to="/ajustes" className="main-page-button">Ajustes</Link>
        <Link to="/perfil" className="main-page-button">Perfil</Link>
        <Link to="/juegos" className="main-page-button">Juegos</Link>
      </div>

      <main className="tienda">
        <h1 className="titulo_tienda">PurrShop!</h1>

        {/* Comida */}
        <Categoria nombre="Comida" visible={categoriasVisibles.comida} toggle={() => toggleCategory("comida")}>
          <Producto img={pescaito} titulo="Pescaito" puntos={12} />
          <Producto img={burger} titulo="Hamburguesa" puntos={15} />
          <Producto img={cake} titulo="Cake" puntos={10} />
          <Producto img={pollo} titulo="Pollito" puntos={5} />
        </Categoria>

        {/* Bebida */}
        <Categoria nombre="Bebida" visible={categoriasVisibles.bebida} toggle={() => toggleCategory("bebida")}>
          <Producto img={coffe} titulo="Cafesito" puntos={2} />
          <Producto img={boba} titulo="Bubble Tea" puntos={10} />
          <Producto img={milk} titulo="Milkie" puntos={5} />
        </Categoria>

        {/* Booster */}
        <Categoria nombre="Booster" visible={categoriasVisibles.booster} toggle={() => toggleCategory("booster")}>
          <Producto img={pocion} titulo="Magic" puntos={50} />
          <Producto img={sprinkles} titulo="Sprinkles" puntos={30} />
        </Categoria>

        {/* Felicidad */}
        <Categoria nombre="Felicidad" visible={categoriasVisibles.felicidad} toggle={() => toggleCategory("felicidad")}>
          <Producto img={pink} titulo="Lazo Rosa" puntos={20} />
          <Producto img={blue} titulo="Azulito" puntos={40} />
          <Producto img={purple} titulo="Morado" puntos={10} />
        </Categoria>
      </main>
    </>
  );
};

// ======================= COMPONENTES SECUNDARIOS ===========================

interface CategoriaProps {
  nombre: string;
  visible: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

const Categoria: React.FC<CategoriaProps> = ({ nombre, visible, toggle, children }) => (
  <div className="categoria_tienda">
    <button className="categoria_tienda-titulo" onClick={toggle}>
      {nombre}
    </button>
    {visible && <div className="productos_tienda">{children}</div>}
  </div>
);

interface ProductoProps {
  img: string;
  titulo: string;
  puntos: number;
}

const Producto: React.FC<ProductoProps> = ({ img, titulo, puntos }) => (
  <div className="producto_tienda">
    <img className="img_tienda" src={img} alt={titulo} />
    <h2 className="h2_tienda">{titulo}</h2>
    <p className="p_tienda">{puntos} PurrPoints</p>
    <button className="comprar-btn_tienda">Comprar</button>
  </div>
);

export default Tienda;
