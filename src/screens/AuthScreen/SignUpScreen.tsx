import React from 'react';
import { AuthNavigatorParamList } from '@navigation/AuthNavigator';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const SignUpScreenName = 'SignUpScreen' as const;

type SignUpScreenProps = NativeStackScreenProps<AuthNavigatorParamList, typeof SignUpScreenName>;

export const SignUpScreen: React.FC<SignUpScreenProps> = () => {
  return (
    <View>
      <Text>SignUp</Text>
    </View>
  );
};
