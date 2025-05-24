import React, { useState, useEffect } from "react";
import './Store.scss';
import { supabase } from "../../supabase/SupabaseClient";

import fish from "../../assets/assets_store/fish.png";
import burger from "../../assets/assets_store/burger.png";
import cake from "../../assets/assets_store/cake.png";
import chicken from "../../assets/assets_store/chicken.png";

import coffe from "../../assets/assets_store/coffe.png";
import boba from "../../assets/assets_store/boba.png";
import milk from "../../assets/assets_store/milk.png";

import potion from "../../assets/assets_store/potion.png";
import sprinkles from "../../assets/assets_store/sprinkles.png";

import bowPink from "../../assets/assets_store/bowPink.png";
import bowBlue from "../../assets/assets_store/bowBlue.png";
import bowPurple from "../../assets/assets_store/bowPurple.png";

const Store: React.FC = () => {
  const [visibleCategories, setVisibleCategories] = useState<Record<string, boolean>>({
    food: true,
    drink: true,
    booster: true,
    happiness: true,
  });
  const [storeItems, setStoreItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchStoreItems = async () => {
      const { data, error } = await supabase.from("store_items").select("*");
      if (error) {
        console.error("Error fetching store items:", error.message);
      } else {
        setStoreItems(data);
      }
    };
    fetchStoreItems();
  }, []);

  const handleBuy = async (itemName: string) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error getting user:", userError.message);
      return;
    }

    if (!user) {
      console.warn("No user logged in.");
      return;
    }

    const item = storeItems.find(i => i.name === itemName);
    if (!item) {
      console.error("Item not found in storeItems:", itemName);
      return;
    }

    console.log("Buying item:", itemName, "with id:", item.id);

    const { error: insertError } = await supabase
      .from("user_inventory")
      .upsert([{
        user_id: user.id,
        item_id: item.id,
        quantity: 1
      }], {
        onConflict: 'user_id,item_id'
      });

    if (insertError) {
      console.error("Insert error:", insertError.message);
    } else {
      console.log("Item successfully added to inventory:", itemName);
    }
  };

  return (
    <main className="store">
      <Categoria name="Food" visible={visibleCategories.food} toggle={() => toggleCategory("food")}>
        <Products img={fish} title="Fish" points={12} onBuy={() => handleBuy("Fish")} />
        <Products img={burger} title="Burger" points={15} onBuy={() => handleBuy("Burger")} />
        <Products img={cake} title="Cake" points={10} onBuy={() => handleBuy("Cake")} />
        <Products img={chicken} title="Chicken" points={5} onBuy={() => handleBuy("Chicken")} />
      </Categoria>

      <Categoria name="Drink" visible={visibleCategories.drink} toggle={() => toggleCategory("drink")}>
        <Products img={coffe} title="Coffe" points={2} onBuy={() => handleBuy("Coffe")} />
        <Products img={boba} title="Boba" points={10} onBuy={() => handleBuy("Boba")} />
        <Products img={milk} title="Milk" points={5} onBuy={() => handleBuy("Milk")} />
      </Categoria>

      <Categoria name="Booster" visible={visibleCategories.booster} toggle={() => toggleCategory("booster")}>
        <Products img={potion} title="Potion" points={50} onBuy={() => handleBuy("Potion")} />
        <Products img={sprinkles} title="Sprinkles" points={30} onBuy={() => handleBuy("Sprinkles")} />
      </Categoria>

      <Categoria name="Happiness" visible={visibleCategories.happiness} toggle={() => toggleCategory("happiness")}>
        <Products img={bowPink} title="Bow Pink" points={20} onBuy={() => handleBuy("Bow Pink")} />
        <Products img={bowBlue} title="Bow Blue" points={40} onBuy={() => handleBuy("Bow Blue")} />
        <Products img={bowPurple} title="Bow Purple" points={10} onBuy={() => handleBuy("Bow Purple")} />
      </Categoria>
    </main>
  );

  function toggleCategory(category: string) {
    setVisibleCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  }
};

interface CategoriaProps {
  name: string;
  visible: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

const Categoria: React.FC<CategoriaProps> = ({ name, visible, toggle, children }) => (
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
  onBuy: () => void;
}

const Products: React.FC<ProductProps> = ({ img, title, points, onBuy }) => (
  <div className="store_product">
    <img className="store_img" src={img} alt={title} />
    <h2 className="store_h2">{title}</h2>
    <p className="store_p">{points} PurrPoints</p>
    <button className="store_button-buy" onClick={onBuy}>Add to cart</button>
  </div>
);

export default Store;
