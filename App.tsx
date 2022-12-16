import { RootNavigator } from '@navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { store } from '@store';
import { themes } from '@themes/themes';
import React from 'react';
import { Appearance, StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
const App = () => {
  const colorScheme = Appearance.getColorScheme();
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar
              barStyle={colorScheme === 'dark' ? 'dark-content' : 'light-content'}
              backgroundColor={themes.colors.primaryBackground}
            />
            <RootNavigator />
          </GestureHandlerRootView>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
