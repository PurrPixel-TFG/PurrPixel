import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/SupabaseClient";
import './Stock.scss';

interface InventoryItem {
  quantity: number;
  store_items: {
    name: string;
    category: string;
    image_url: string;
  } | null;
}

// ======================= COMPONENTE PRINCIPAL ===========================
const Stock: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [inventory, setInventory] = useState<{ [category: string]: string[] }>({});

  const toggleCategory = (category: string) => {
    setActiveCategory(prev => (prev === category ? null : category));
  };

  useEffect(() => {
    const fetchInventory = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_inventory')
        .select('quantity, store_items(name, category, image_url)')
        .eq('user_id', user.id) as unknown as { data: InventoryItem[], error: any };

      if (error) {
        console.error("Error fetching inventory:", error.message);
        return;
      }

      const grouped: { [category: string]: string[] } = {};
      data?.forEach((entry) => {
        if (!entry.store_items) return;

        const category = entry.store_items.category;
        const image = entry.store_items.image_url;

        if (!grouped[category]) grouped[category] = [];

        for (let i = 0; i < entry.quantity; i++) {
          grouped[category].push(image);
        }
      });

      setInventory(grouped);
    };

    fetchInventory();
  }, []);

  return (
    <div className="stock-background-layer">
      <div className="stock-wrapper">
        {["Food", "Drink", "Booster", "Happiness"].map((category) => (
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
                        const items = inventory[category] || [];
                        return (
                          <td key={col} className="table-cell">
                            {items[index] ? (
                              <img src={items[index]} alt={`Item ${index}`} className="stock-item-image" />
                            ) : ''}
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
    </div>
  );
};

// ======================= COMPONENTE: Categoria ===========================
interface CategoriaProps {
  name: string;
  selected: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

const Categoria: React.FC<CategoriaProps> = ({ name, selected, toggle, children }) => (
  <div className="stock-category">
    <button
      className={`stock-item stock-${name.toLowerCase()} ${selected ? 'selected' : ''}`}
      onClick={toggle}
    >
      {name}
    </button>

    {selected && <div className="stock-content">{children}</div>}
  </div>
);

export default Stock;
