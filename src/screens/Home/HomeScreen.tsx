import CustomPressable from '@components/buttons/CustomPresable';
import { HomeNavigatorParamList } from '@navigation/HomeNavigator';
import auth from '@react-native-firebase/auth';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text, View } from 'react-native';
export const HomeScreenName = 'HomeScreen' as const;
type HomeScreenProps = BottomTabScreenProps<HomeNavigatorParamList, typeof HomeScreenName>;

const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <View>
      <Text>Home</Text>
      <CustomPressable text="Выйти" onPress={() => auth().signOut()} />
    </View>
  );
};

export default HomeScreen;
