import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import HomeScreen, { HomeScreenName } from '@screens/Home/HomeScreen';
import React from 'react';
import { MainNavigatorParamList } from './MainNavigator';

export type HomeNavigatorParamList = {
  [HomeScreenName]: undefined;
};

export const HomeNavigatorName = 'HomeNavigator';
const Tab = createBottomTabNavigator<HomeNavigatorParamList>();

// type HomeNavigatorProps = NativeStackNavigationProp<
//   MainNavigatorParamList,
//   typeof HomeNavigatorName
// >;

// TODO fix type
// export const HomeNavigator: React.FC<HomeNavigatorProps> = () => {
export const HomeNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={HomeScreenName} component={HomeScreen} />
    </Tab.Navigator>
  );
};
