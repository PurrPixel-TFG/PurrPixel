import React, { useState } from "react";
import './Store.scss';
import { Link } from "react-router-dom";

import fish from "../../assets/images/fish.png";
import burger from "../../assets/images/burger.png";
import cake from "../../assets/images/cake.png";
import chicken from "../../assets/images/chicken.png";

import coffe from "../../assets/images/coffe.png";
import boba from "../../assets/images/boba.png";
import milk from "../../assets/images/milk.png";

import potion from "../../assets/images/potion.png";
import sprinkles from "../../assets/images/sprinkles.png";

import bowPink from "../../assets/images/bowPink.png";
import bowBlue from "../../assets/images/bowBlue.png";
import bowPurple from "../../assets/images/bowPurple.png";

// ======================= COMPONENTE PRINCIPAL ===========================
const Store: React.FC = () => {
  const [visibleCategories, setVisibleCategories] = useState<Record<string, boolean>>({
    food: true,
    drink: true,
    booster: true,
    happiness: true,
  });

  const toggleCategory = (category: string) => {
    setVisibleCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <>
      <main className="store">

        {/* Comida */}
        <Categoria name="Food" visible={visibleCategories.food} toggle={() => toggleCategory("food")}>
          <Products img={fish} title="Fish" points={12} />
          <Products img={burger} title="Burger" points={15} />
          <Products img={cake} title="Cake" points={10} />
          <Products img={chicken} title="Chicken" points={5} />
        </Categoria>

        {/* Bebida */}
        <Categoria name="Drink" visible={visibleCategories.drink} toggle={() => toggleCategory("drink")}>
          <Products img={coffe} title="Coffe" points={2} />
          <Products img={boba} title="Boba" points={10} />
          <Products img={milk} title="Milk" points={5} />
        </Categoria>

        {/* Booster */}
        <Categoria name="Booster" visible={visibleCategories.booster} toggle={() => toggleCategory("booster")}>
          <Products img={potion} title="Potion" points={50} />
          <Products img={sprinkles} title="Sprinkles" points={30} />
        </Categoria>

        {/* Felicidad */}
        <Categoria name="Happiness" visible={visibleCategories.happiness} toggle={() => toggleCategory("happiness")}>
          <Products img={bowPink} title="Bow Pink" points={20} />
          <Products img={bowBlue} title="Bow Blue" points={40} />
          <Products img={bowPurple} title="Bow Purple" points={10} />
        </Categoria>
      </main>
    </>
  );
};

// ======================= COMPONENTES SECUNDARIOS ===========================

interface CategoriaProps {
  name: string;
  visible: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

const Categoria: React.FC<CategoriaProps> = ({ name: name, visible, toggle, children }) => (
  <div className="store_category">
    <button className="store_category-title" onClick={toggle}>
      {name}
    </button>
    {visible && <div className="store_products">{children}</div>}
  </div>
);

interface ProductProps {
  img: string;
  title: string;
  points: number;
}

const Products: React.FC<ProductProps> = ({ img, title: title, points: points }) => (
  <div className="store_product">
    <img className="store_img" src={img} alt={title} />
    <h2 className="store_h2">{title}</h2>
    <p className="store_p">{points} PurrPoints</p>
    <button className="store_button-buy">Add to cart</button>
  </div>
);

export default Store;
