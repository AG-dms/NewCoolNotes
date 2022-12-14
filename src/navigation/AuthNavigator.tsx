import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignInScreen, SignInScreenName } from '@screens/AuthScreen/SignInScreen';
import { SignUpScreen, SignUpScreenName } from '@screens/AuthScreen/SignUpScreen';
import React from 'react';

export type AuthNavigatorParamList = {
  [SignInScreenName]: undefined;
  [SignUpScreenName]: undefined;
};

const Stack = createNativeStackNavigator<AuthNavigatorParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SignInScreenName} component={SignInScreen} />
      <Stack.Screen name={SignUpScreenName} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
