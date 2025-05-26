import { useEffect, useState } from "react";

export interface CatStats {
  health: number;
  clean: number;
  happiness: number;
}

interface UseCatProps {
  initialStats?: CatStats;
}

// Hook para manejar el estado del gato y disminuirlo con el tiempo
export const useCatStats = ({ initialStats = { health: 5, clean: 5, happiness: 5 } }: UseCatProps) => {
  const [stats, setStats] = useState<CatStats>(initialStats);

  // Disminuir health
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({ ...prev, health: Math.max(0, prev.health - 1) }));
    }, 60 * 60 * 1000); // 1 hora
    return () => clearInterval(interval);
  }, []);

  // Disminuir clean
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({ ...prev, clean: Math.max(0, prev.clean - 1) }));
    }, 6 * 60 * 60 * 1000); // 6 horas
    return () => clearInterval(interval);
  }, []);

  // Disminuir happiness
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({ ...prev, happiness: Math.max(0, prev.happiness - 1) }));
    }, 3 * 60 * 60 * 1000); // 3 horas
    return () => clearInterval(interval);
  }, []);

  return { stats, setStats };
};
