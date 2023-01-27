import CustomPressable from '@components/buttons/CustomPresable';
import { useAppDispatch, useAppSelector } from '@hooks/storeHook';
import { HomeNavigatorParamList } from '@navigation/HomeNavigator';
import auth from '@react-native-firebase/auth';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { actionClearStore } from '@store/globalAsycnFunc';
import React from 'react';
import { Text, View } from 'react-native';
export const HomeScreenName = 'HomeScreen' as const;
type HomeScreenProps = BottomTabScreenProps<HomeNavigatorParamList, typeof HomeScreenName>;

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(actionClearStore());
      });
  };

  return (
    <View>
      <Text>Home</Text>
      <CustomPressable text="Выйти" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
