import { AuthNavigatorParamList } from '@navigation/AuthNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';

export const SignInScreenName = 'SignInScreen' as const;

type SignInScreenProps = NativeStackScreenProps<AuthNavigatorParamList, 'SignInScreen'>;

export const SignInScreen: React.FC<SignInScreenProps> = () => {
  return (
    <View>
      <Text>SignIn</Text>
    </View>
  );
};
