import { RootNavigator } from '@navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { store } from '@store';
import { themes } from '@themes/themes';
import React from 'react';
import { Appearance, StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { Provider } from 'react-redux';
import './src/i18n/i18n';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  return (
    <StoreProvider store={store}>
      <SafeAreaProvider>
        <PaperProvider>
          <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <StatusBar
                barStyle={colorScheme === 'dark' ? 'dark-content' : 'light-content'}
                backgroundColor={themes.colors.primaryBackground}
              />
              <RootNavigator />
            </GestureHandlerRootView>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </StoreProvider>
  );
};

export default App;
