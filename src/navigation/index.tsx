import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { RootStackParamList, RootTabParamList } from './types';
import { SearchHeader } from '../components/SearchHeader';
import { useFavorites } from '../contexts/FavoritesContext';
import { Pressable } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const HomeStack = () => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => <SearchHeader />,
        }}
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={({ route }) => ({
          title: 'Detalhes',
          headerRight: () => {
            const article = route.params.article;
            const favorite = isFavorite(article.url);
            return (
              <Pressable onPress={() => favorite ? removeFavorite(article.url) : addFavorite(article)}>
                <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={24} color={favorite ? 'red' : 'gray'} />
              </Pressable>
            )
          }
        })} 
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'alert-circle';

            if (route.name === 'HomeStack') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'heart' : 'heart-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Notícias' }}/>
        <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favoritos' }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
