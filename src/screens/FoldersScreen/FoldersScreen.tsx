import { HomeNavigatorParamList } from '@navigation/HomeNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';

export const FoldersScreenName = 'FoldersScreen' as const;

type FoldersScreenProps = NativeStackScreenProps<HomeNavigatorParamList, typeof FoldersScreenName>;

const FoldersScreen: React.FC<FoldersScreenProps> = () => {
  return (
    <View>
      <Text>Folders</Text>
    </View>
  );
};

export default FoldersScreen;
