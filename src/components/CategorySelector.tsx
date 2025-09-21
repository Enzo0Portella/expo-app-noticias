import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export const categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];

type Props = {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
};

const CategorySelector = ({ selectedCategory, onSelectCategory }: Props) => {
  const allCategories = [null, ...categories]; // Add "All" option

  return (
    <View style={styles.container}>
      <FlatList
        data={allCategories}
        renderItem={({ item }) => {
          const isSelected = item === selectedCategory;
          return (
            <TouchableOpacity
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => onSelectCategory(item)}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {item || 'Todas'}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item || 'all'}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingHorizontal: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  chipSelected: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  chipText: {
    color: '#333',
  },
  chipTextSelected: {
    color: '#fff',
  },
});

export default CategorySelector;
