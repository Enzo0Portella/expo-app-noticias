import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Article } from '../types';
import { useFavorites } from '../contexts/FavoritesContext';

type Props = {
  article: Article;
  onPress: () => void;
};

const NewsCard = ({ article, onPress }: Props) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(article.url);

  const handleFavoritePress = () => {
    if (favorite) {
      removeFavorite(article.url);
    } else {
      addFavorite(article);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={styles.image}
        source={{
          uri: article.urlToImage || 'https://via.placeholder.com/150',
        }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>
        <View style={styles.footer}>
            <Text style={styles.source}>{article.source.name}</Text>
            <Pressable onPress={handleFavoritePress} style={styles.favoriteButton}>
                <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={24} color={favorite ? 'red' : 'gray'} />
            </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    // As propriedades de sombra abaixo são para iOS e não funcionam na web, causando um aviso.
    // Para uma solução completa, usaríamos Platform.select, mas para simplicidade vamos remover por agora.
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  source: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  favoriteButton: {
    padding: 4,
  }
});

export default NewsCard;
