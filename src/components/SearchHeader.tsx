import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSearch } from '../contexts/SearchContext';

export const SearchHeader = () => {
  const [text, setText] = useState('');
  const { executeSearch } = useSearch();

  const handleSearch = () => {
    executeSearch(text.trim());
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar notícias..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <Pressable onPress={handleSearch} style={styles.icon}>
          <Ionicons name="search" size={20} color="#666" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  icon: {
    padding: 5,
  },
});
