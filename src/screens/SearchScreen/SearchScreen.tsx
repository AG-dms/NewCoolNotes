import { HomeNavigatorParamList } from '@navigation/HomeNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { SearchBarProps } from 'react-native-screens';
import React from 'react';

export const SearchScreenName = 'SearchScreen' as const;

type SearchScreenProps = NativeStackScreenProps<HomeNavigatorParamList, typeof SearchScreenName>;

const SearchScreen: React.FC<SearchBarProps> = () => {
  return (
    <View>
      <Text>SearchScreen</Text>
    </View>
  );
};

export default SearchScreen;
