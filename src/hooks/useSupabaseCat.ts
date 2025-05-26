// hooks/useSupabaseCat.ts
import { useEffect, useState } from "react";
import { supabase } from "../supabase/SupabaseClient";

export interface CatStats {
  id: string;
  health: number;
  happiness: number;
  clean: number;
}

export const useSupabaseCat = () => {
  const [catStats, setCatStats] = useState<CatStats | null>(null);

  const refetchCatStats = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("cats")
      .select("id, health, happiness, clean")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1); 

    if (error) {
      console.error("Error fetching cat stats:", error.message);
    } else if (data && data.length > 0) {
      setCatStats(data[0]);
    }
  };

  useEffect(() => {
    refetchCatStats();
  }, []);

  return { catStats, setCatStats, refetchCatStats };
};
