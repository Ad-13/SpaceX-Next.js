'use client';

import { useCallback, useState } from 'react';
import { Launch } from '@/features/launches/types/launch';

const STORAGE_KEY = 'spacex_favorites';

function readFromStorage(): Launch[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Launch[]) : [];
  } catch {
    return [];
  }
}

function writeToStorage(launches: Launch[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(launches));
  } catch {
    console.error('[useFavorites] Failed to persist to localStorage');
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Launch[]>(() => readFromStorage());

  const isFavorite = (id: string) => favorites.some((f) => f.id === id);

  const toggleFavorite = useCallback((launch: Launch) => {
    setFavorites((prev) => {
      const next = prev.some((f) => f.id === launch.id)
        ? prev.filter((f) => f.id !== launch.id)
        : [launch, ...prev];
      writeToStorage(next);
      return next;
    });
  }, []);

  const removeFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.filter((f) => f.id !== id);
      writeToStorage(next);
      return next;
    });
  };

  return {
    favorites,
    favoritesCount: favorites.length,
    isFavorite,
    toggleFavorite,
    removeFavorite,
  };
}
