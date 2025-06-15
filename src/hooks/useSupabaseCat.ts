// hooks/useSupabaseCat.ts
import { useEffect, useState } from "react";
import { supabase } from "../supabase/SupabaseClient";

export interface CatStats {
  id: string;
  health: number;
  happiness: number;
  clean: number;
}

export const useSupabaseCat = (catId?: string) => {
  const [catStats, setCatStats] = useState<CatStats | null>(null);

  const refetchCatStats = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (!user || userError) return null;

    const query = supabase
      .from("cats")
      .select("id, health, happiness, clean")
      .eq("user_id", user.id);

    if (catId) {
      query.eq("id", catId);
    } else {
      query.order("created_at", { ascending: true }).limit(1);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching cat stats:", error.message);
      return null;
    }

    if (data && data.length > 0) {
      setCatStats(data[0]);
      return data[0];
    } else {
      setCatStats(null);
      return null;
    }
  };

  useEffect(() => {
    refetchCatStats();
  }, [catId]);

  return { catStats, setCatStats, refetchCatStats };
};

