import { Article } from "../types";
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Details: { article: Article };
};

export type RootTabParamList = {
  HomeStack: NavigatorScreenParams<RootStackParamList>;
  Favorites: undefined;
};
