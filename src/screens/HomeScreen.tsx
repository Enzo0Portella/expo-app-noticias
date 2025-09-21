import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getTopHeadlines, searchNews } from '../services/newsApi';
import { Article } from '../types';
import { RootStackParamList } from '../navigation/types';
import NewsCard from '../components/NewsCard';
import { useSearch } from '../contexts/SearchContext';
import CategorySelector from '../components/CategorySelector';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const { searchQuery, isSearching, setIsSearching } = useSearch();

  const CACHED_ARTICLES_KEY = '@news_app:cached_articles';

  const fetchNews = useCallback(async (query: string, category: string | null, pageNum: number) => {
    try {
      setLoading(true);
      setError(null);
      setIsOffline(false);
      
      const data = query && !category
        ? await searchNews(query, pageNum) 
        : await getTopHeadlines(pageNum, 20, category);
      
      console.log('Resposta completa da API:', JSON.stringify(data, null, 2));
      
      if (data && data.articles) {
        setTotalResults(data.totalResults);
        const articlesToSave = pageNum === 1 ? data.articles : [...articles, ...data.articles];

        if (pageNum === 1) {
          setArticles(data.articles);
        } else {
          setArticles(prev => [...prev, ...data.articles]);
        }
        
        // Cache only top headlines without search/category
        if (!query && !category) {
          await AsyncStorage.setItem(CACHED_ARTICLES_KEY, JSON.stringify(articlesToSave));
        }
      }
      
    } catch (err) {
      setError('Falha ao buscar notícias. Mostrando conteúdo offline.');
      if (pageNum === 1) { // Only load from cache on initial load fail
        try {
          const cachedArticles = await AsyncStorage.getItem(CACHED_ARTICLES_KEY);
          if (cachedArticles) {
            setArticles(JSON.parse(cachedArticles));
            setIsOffline(true);
          }
        } catch (cacheError) {
          setError('Falha ao buscar notícias e ao carregar o cache.');
        }
      }
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  }, [setIsSearching, articles]);
  
  useEffect(() => {
    if (isSearching) {
      setPage(1);
      setSelectedCategory(null); // Limpa a categoria ao pesquisar
      fetchNews(searchQuery, null, 1);
    }
  }, [isSearching, searchQuery, fetchNews]);

  useEffect(() => {
    if(!isSearching) {
        setPage(1);
        fetchNews('', selectedCategory, 1);
    }
  }, [selectedCategory]);

  const handleLoadMore = () => {
    const maxResults = 100; // Limite do plano gratuito da NewsAPI
    if (!loading && articles.length < Math.min(totalResults, maxResults)) {
        const newPage = page + 1;
        setPage(newPage);
        fetchNews(searchQuery, selectedCategory, newPage);
    }
  };

  const handlePressArticle = (article: Article) => {
    navigation.navigate('Details', { article });
  };

  if (loading && page === 1) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
        <Button title="Tentar Novamente" onPress={() => fetchNews(searchQuery, selectedCategory, 1)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isOffline && <Text style={styles.offlineText}>Você está vendo conteúdo offline</Text>}
      <CategorySelector selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <FlatList
        data={articles}
        renderItem={({ item }) => {
          return <NewsCard article={item} onPress={() => handlePressArticle(item)} />;
        }}
        keyExtractor={(item) => item.url}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && page > 1 ? <ActivityIndicator style={{ marginVertical: 20 }} /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  offlineText: {
    textAlign: 'center',
    backgroundColor: '#ffc107',
    padding: 8,
    color: '#000',
  }
});

export default HomeScreen;
