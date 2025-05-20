// Stock.tsx
import React, { useState } from "react";
import './Stock.scss';

// ======================= DATOS ===========================
const sampleInventory = {
  Food: ['🍎', '🍌', '🥩', '🍕', '🍔', '🥗', '🥖', '🧀', '🍞', '🍣', '🍪', '🥚', '🍫', '🍍', '🍇', '🍒'],
  Drink: ['🥤', '🍺', '☕', '🍷', '🧃', '🍼', '🍶', '🍵', '🥛', '🥂', '🧉', '🧊', '🍸', '🍹', '🥃', '🫖'],
  Booster: ['⚡', '💊', '🧪', '🔋', '🧬', '🚀', '🔥', '🛡️', '🔮', '🧠', '🌟', '🦾', '💥', '✨', '🏋️', '💣'],
  Happiness: ['🎉', '🎈', '🎁', '🎵', '😂', '🏖️', '🎮', '📸', '🍰', '🎬', '🐶', '🐱', '🏆', '🧸', '🛍️', '💃']
};

// ======================= COMPONENTE PRINCIPAL ===========================
const Stock: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setActiveCategory(prev => (prev === category ? null : category));
  };

  return (
    <div className="stock-background-layer">
      <div className="stock-wrapper">
        {Object.entries(sampleInventory).map(([category, items]) => (
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
                        return (
                          <td key={col} className="table-cell">
                            {items[index] || ''}
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
