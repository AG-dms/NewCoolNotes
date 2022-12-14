import { NavigatorScreenParams } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HomeNavigator, HomeNavigatorName, HomeNavigatorParamList } from './HomeNavigator';

export type MainNavigatorParamList = {
  [HomeNavigatorName]: NavigatorScreenParams<HomeNavigatorParamList>;
};

const Stack = createStackNavigator<MainNavigatorParamList>();

export const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={HomeNavigatorName} component={HomeNavigator} />
    </Stack.Navigator>
  );
};
