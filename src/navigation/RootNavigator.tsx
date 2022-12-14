import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import AuthNavigator from './AuthNavigator';
import { MainNavigator } from './MainNavigator';

export const RootNavigator: React.FC = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(person) {
    setUser(person);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  if (!user) {
    return <AuthNavigator />;
  }
  return <MainNavigator />;
};
