import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, RopaSans_400Regular } from '@expo-google-fonts/ropa-sans';
import { AppLoading } from 'expo';

import AppProvider from './hooks';
import Router from './routes';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    RopaSans_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <AppProvider>
        <StatusBar barStyle="light-content" backgroundColor="#1163ad" />
        <Router />
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
