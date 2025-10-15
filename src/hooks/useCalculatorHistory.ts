import { useState, useEffect, useCallback } from 'react';

interface CalculationEntry {
  id: string;
  calculatorType: string;
  input: Record<string, any>;
  result: Record<string, any>;
  timestamp: number;
}

interface FavoriteCalculator {
  id: string;
  name: string;
  path: string;
}

export const useCalculatorHistory = (calculatorType: string) => {
  const [history, setHistory] = useState<CalculationEntry[]>([]);
  const [favorites, setFavorites] = useState<FavoriteCalculator[]>([]);

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('calculator_history');
    if (savedHistory) {
      const allHistory = JSON.parse(savedHistory);
      setHistory(allHistory.filter((entry: CalculationEntry) => entry.calculatorType === calculatorType));
    }

    // Load favorites
    const savedFavorites = localStorage.getItem('calculator_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, [calculatorType]);

  const addToHistory = useCallback((input: Record<string, any>, result: Record<string, any>) => {
    const entry: CalculationEntry = {
      id: `${Date.now()}-${Math.random()}`,
      calculatorType,
      input,
      result,
      timestamp: Date.now()
    };

    const savedHistory = localStorage.getItem('calculator_history');
    const allHistory = savedHistory ? JSON.parse(savedHistory) : [];
    const newHistory = [entry, ...allHistory].slice(0, 50); // Keep last 50 entries
    
    localStorage.setItem('calculator_history', JSON.stringify(newHistory));
    setHistory(newHistory.filter((e: CalculationEntry) => e.calculatorType === calculatorType));
  }, [calculatorType]);

  const clearHistory = useCallback(() => {
    const savedHistory = localStorage.getItem('calculator_history');
    if (savedHistory) {
      const allHistory = JSON.parse(savedHistory);
      const filtered = allHistory.filter((e: CalculationEntry) => e.calculatorType !== calculatorType);
      localStorage.setItem('calculator_history', JSON.stringify(filtered));
    }
    setHistory([]);
  }, [calculatorType]);

  const toggleFavorite = useCallback((calculator: FavoriteCalculator) => {
    const isFavorite = favorites.some(fav => fav.id === calculator.id);
    
    let newFavorites: FavoriteCalculator[];
    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== calculator.id);
    } else {
      newFavorites = [...favorites, calculator];
    }
    
    localStorage.setItem('calculator_favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  }, [favorites]);

  const isFavorite = useCallback((calculatorId: string) => {
    return favorites.some(fav => fav.id === calculatorId);
  }, [favorites]);

  return {
    history,
    favorites,
    addToHistory,
    clearHistory,
    toggleFavorite,
    isFavorite
  };
};
