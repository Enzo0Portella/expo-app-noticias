import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '../types';

interface FavoritesContextData {
  favorites: Article[];
  isFavorite: (articleUrl: string) => boolean;
  addFavorite: (article: Article) => void;
  removeFavorite: (articleUrl: string) => void;
}

const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData);

const FAVORITES_STORAGE_KEY = '@news_app:favorites';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Article[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites !== null) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Failed to load favorites.', error);
    }
  };

  const saveFavorites = async (newFavorites: Article[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Failed to save favorites.', error);
    }
  };

  const addFavorite = (article: Article) => {
    const newFavorites = [...favorites, article];
    saveFavorites(newFavorites);
  };

  const removeFavorite = (articleUrl: string) => {
    const newFavorites = favorites.filter(fav => fav.url !== articleUrl);
    saveFavorites(newFavorites);
  };

  const isFavorite = (articleUrl: string) => {
    return favorites.some(fav => fav.url === articleUrl);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
