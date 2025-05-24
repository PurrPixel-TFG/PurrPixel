import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface CatStats {
  health: number;
  clean: number;
  happiness: number;
}

const Cat: React.FC = () => {
  const location = useLocation();
  const { catId, initialStats } = location.state || { catId: 0, initialStats: { health: 5, clean: 5, happiness: 5 } };

  const [stats, setStats] = useState<CatStats>(initialStats);

  // Health ↓ cada 3 horas
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({ ...prev, health: Math.max(0, prev.health - 1) }));
    }, 3 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Happiness ↓ cada 1 hora
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({ ...prev, happiness: Math.max(0, prev.happiness - 1) }));
    }, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Clean ↓ cada 6 horas
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({ ...prev, clean: Math.max(0, prev.clean - 1) }));
    }, 6 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cat-stats-container">
      <h1>Tu gato {catId}</h1>
      <p>Health: {stats.health}</p>
      <p>Happiness: {stats.happiness}</p>
      <p>Clean: {stats.clean}</p>
    </div>
  );
};

export default Cat;
