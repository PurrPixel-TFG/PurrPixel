// Cat.tsx
import { useEffect, useState } from "react";

export interface CatStats {
  health: number;
  clean: number;
  happiness: number;
}

interface UseCatProps {
  initialStats?: CatStats;
}

export const useCatStats = ({ initialStats = { health: 5, clean: 5, happiness: 5 } }: UseCatProps) => {
  const [stats, setStats] = useState<CatStats>(initialStats);


  //CAMBIAR LOS TIEMPOS DE BAJADA DE LOS CORAZONES

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({ ...prev, health: Math.max(0, prev.health - 1) }));
    }, 5000); // cambiar a 60 * 60 * 1000,  1H HAMBRE
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({ ...prev, clean: Math.max(0, prev.clean - 1) }));
    }, 7000); //cambiar a 6 * 60 * 60 * 1000,  6H LIMPIEZA
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({ ...prev, happiness: Math.max(0, prev.happiness - 1) }));
    }, 3000); // cambiar 3 * 60 * 60 * 1000 ,  3H FELICIDAD
    return () => clearInterval(interval);
  }, []);


  return { stats, setStats };
};
