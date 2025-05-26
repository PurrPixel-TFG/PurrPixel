import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/SupabaseClient';

interface CoinsContextType {
  coins: number;
  addCoins: (amount: number) => Promise<void>;
  spendCoins: (amount: number) => Promise<boolean>;
  loading: boolean;
}

const CoinsContext = createContext<CoinsContextType | undefined>(undefined);

export const useCoins = () => {
  const context = useContext(CoinsContext);
  if (!context) {
    throw new Error('useCoins must be used within a CoinsProvider');
  }
  return context;
};

export const CoinsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCoins = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('coin')
            .eq('id', user.id)
            .single();

          if (error) throw error;
          setCoins(data?.coin || 0);
        }
      } catch (error) {
        console.error('Error fetching coins:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCoins();
  }, []);

  const updateCoinsInDB = async (newAmount: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({ coin: newAmount })
      .eq('id', user.id);

    if (error) throw error;
  };

  const addCoins = async (amount: number) => {
    const newAmount = coins + amount;
    setCoins(newAmount);
    await updateCoinsInDB(newAmount);
  };

  const spendCoins = async (amount: number) => {
    if (coins < amount) return false;
    
    const newAmount = coins - amount;
    setCoins(newAmount);
    await updateCoinsInDB(newAmount);
    return true;
  };

  return (
    <CoinsContext.Provider value={{ coins, addCoins, spendCoins, loading }}>
      {children}
    </CoinsContext.Provider>
  );
}; 