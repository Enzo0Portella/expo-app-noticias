import React from 'react';
import AppNavigator from './navigation';
import { SearchProvider } from './contexts/SearchContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <SearchProvider>
        <AppNavigator />
      </SearchProvider>
    </FavoritesProvider>
  );
}
