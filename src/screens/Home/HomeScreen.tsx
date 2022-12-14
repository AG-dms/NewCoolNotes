import { HomeNavigatorParamList } from '@navigation/HomeNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const HomeScreenName = 'HomeScreen' as const;
type HomeScreenProps = BottomTabScreenProps<HomeNavigatorParamList, typeof HomeScreenName>;

const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default HomeScreen;
