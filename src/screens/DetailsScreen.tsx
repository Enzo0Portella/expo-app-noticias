import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  Linking,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen = ({ route }: Props) => {
  const { article } = route.params;

  const openArticleUrl = () => {
    Linking.openURL(article.url);
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: article.urlToImage || 'https://via.placeholder.com/400x200' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.source}>{article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}</Text>
        <Text style={styles.description}>{article.description}</Text>
        <Text style={styles.body}>{article.content}</Text>
        <Button title="Ler notícia completa" onPress={openArticleUrl} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  source: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
});

export default DetailsScreen;
