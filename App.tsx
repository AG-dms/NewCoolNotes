import { RootNavigator } from '@navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { store } from '@store';
import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
const App = () => {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true, duration: 500 });
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
