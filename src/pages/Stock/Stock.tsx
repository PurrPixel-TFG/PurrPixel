import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/SupabaseClient";
import { useSupabaseCat } from "../../hooks/useSupabaseCat";
import "./Stock.scss";

interface InventoryItem {
  quantity: number;
  store_items: {
    name: string;
    category: string;
    image_url: string;
  };
}

const itemEffects: {
  [name: string]: { stat: "health" | "happiness" | "pause"; value: number; days?: number };
} = {
  Fish: { stat: "health", value: 3 },
  Burger: { stat: "health", value: 4 },
  Cake: { stat: "health", value: 2 },
  Chicken: { stat: "health", value: 1 },
  Boba: { stat: "health", value: 2 },
  Coffe: { stat: "health", value: 0.5 },
  Milk: { stat: "health", value: 1 },
  Sprinkles: { stat: "pause", value: 1, days: 1 },
  Potion: { stat: "pause", value: 1, days: 3 },
  "Bow Pink": { stat: "happiness", value: 2 },
  "Bow Blue": { stat: "happiness", value: 4 },
  "Bow Purple": { stat: "happiness", value: 1 },
};

const Stock: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { catStats, setCatStats, refetchCatStats } = useSupabaseCat();

  const toggleCategory = (category: string) => {
    setActiveCategory(prev => (prev === category ? null : category));
  };

  useEffect(() => {
    const fetchInventory = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("user_inventory")
        .select("quantity, store_items(name, category, image_url)")
        .eq("user_id", user.id);

      if (!error && data) {
        const formatted = data.map((entry: any) => ({
          quantity: entry.quantity,
          store_items: entry.store_items,
        })) as InventoryItem[];
        setInventory(formatted);
      }
    };

    fetchInventory();
    refetchCatStats();
  }, []);

  const handleItemClick = async (item: InventoryItem) => {
    console.log("Click item:", item);
    await refetchCatStats();
    setSelectedItem(item);
    setShowModal(true);
  };

  const applyItem = async () => {
    if (!selectedItem || !selectedItem.store_items || !catStats) return;

    const itemName = selectedItem.store_items.name;
    const effect = itemEffects[itemName];
    if (!effect) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (effect.stat === "pause") {
      const pauseUntil = new Date(Date.now() + effect.days! * 86400000).toISOString();
      localStorage.setItem("pause_until", pauseUntil);
      alert(`Pausa activada por ${effect.days} día(s).`);
    } else {
      const stat = effect.stat;
      const newValue = Math.min(5, (catStats[stat] ?? 0) + effect.value);
      await supabase.from("cats").update({ [stat]: newValue }).eq("id", catStats.id);
      setCatStats(prev => prev ? { ...prev, [stat]: newValue } : prev);
    }

    const { data: itemData } = await supabase
      .from("store_items")
      .select("id")
      .eq("name", itemName)
      .single();

    if (!itemData) return;

    const { data: inventoryItem } = await supabase
      .from("user_inventory")
      .select("id, quantity")
      .eq("user_id", user.id)
      .eq("item_id", itemData.id)
      .single();

    if (inventoryItem) {
      if (inventoryItem.quantity > 1) {
        await supabase
          .from("user_inventory")
          .update({ quantity: inventoryItem.quantity - 1 })
          .eq("id", inventoryItem.id);
      } else {
        await supabase
          .from("user_inventory")
          .delete()
          .eq("id", inventoryItem.id);
      }
    }

    if (
      (catStats.health ?? 0) === 0 &&
      (catStats.happiness ?? 0) === 0 &&
      (catStats.clean ?? 0) === 0
    ) {
      await supabase.from("cats").delete().eq("id", catStats.id);
      alert("Tu gato ha desaparecido...");
    }

    setShowModal(false);
    setSelectedItem(null);
    await refetchCatStats();
  };

  return (
    <div className="stock-background-layer">
      <div className="stock-wrapper">
        {["Food", "Drink", "Booster", "Happiness"].map(category => (
          <Categoria
            key={category}
            name={category}
            selected={activeCategory === category}
            toggle={() => toggleCategory(category)}
          >
            <div className="stock-table">
              <table>
                <tbody>
                  {[0, 1, 2, 3].map(row => (
                    <tr key={row}>
                      {[0, 1, 2, 3].map(col => {
                        const index = row * 4 + col;
                        const items = inventory.filter(i => i.store_items?.category === category);
                        const item = items[index];
                        return (
                          <td key={col} className="table-cell">
                            {item?.store_items?.image_url && (
                              <div className="stock-item-wrapper" onClick={() => handleItemClick(item)}>
                                <img
                                  src={item.store_items.image_url}
                                  alt={item.store_items.name}
                                  className="stock-item-image"
                                />
                                <span className="item-quantity">{item.quantity}</span>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Categoria>
        ))}
      </div>

      {showModal && selectedItem && selectedItem.store_items && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>¿Usar {selectedItem.store_items.name}?</h2>
            {catStats ? (
              <>
                <p>Health: {catStats.health} ❤️</p>
                <p>Happiness: {catStats.happiness} 😊</p>
                <p>Clean: {catStats.clean} ✨</p>
                <button onClick={applyItem}>Usar</button>
              </>
            ) : (
              <p>Cargando estado del gato...</p>
            )}
            <button onClick={() => {
              setShowModal(false);
              setSelectedItem(null);
            }}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

interface CategoriaProps {
  name: string;
  selected: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

const Categoria: React.FC<CategoriaProps> = ({ name, selected, toggle, children }) => (
  <div className="stock-category">
    <button
      className={`stock-item stock-${name.toLowerCase()} ${selected ? "selected" : ""}`}
      onClick={toggle}
    >
      {name}
    </button>
    {selected && <div className="stock-content">{children}</div>}
  </div>
);

export default Stock;
