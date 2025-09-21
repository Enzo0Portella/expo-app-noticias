import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFavorites } from '../contexts/FavoritesContext';
import NewsCard from '../components/NewsCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>; // Temporário, será ajustado com o TabNavigator

const FavoritesScreen = ({ navigation }: Props) => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Você ainda não tem notícias favoritas.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      renderItem={({ item }) => (
        <NewsCard
          article={item}
          onPress={() => navigation.navigate('Details', { article: item })}
        />
      )}
      keyExtractor={(item) => item.url}
      style={styles.list}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    backgroundColor: '#f0f0f0',
  },
  listContent: {
    padding: 16,
  },
});

export default FavoritesScreen;
