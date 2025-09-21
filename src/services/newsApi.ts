import axios from 'axios';
import { NewsApiResponse } from '../types';

const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;
const API_URL = 'https://newsapi.org/v2';

const apiClient = axios.create({
  baseURL: API_URL,
  params: {
    apiKey: API_KEY,
  },
});

export const getTopHeadlines = async (page = 1, pageSize = 20, category: string | null = null) => {
  const response = await apiClient.get<NewsApiResponse>('/top-headlines', {
    params: {
      country: 'us', // Usando 'us' como padrão para garantir resultados
      page,
      pageSize,
      category: category || undefined,
    },
  });
  return response.data;
};

export const searchNews = async (query: string, page = 1, pageSize = 20) => {
  const response = await apiClient.get<NewsApiResponse>('/everything', {
    params: {
      q: query,
      page,
      pageSize,
    },
  });
  return response.data;
};

export default apiClient;
