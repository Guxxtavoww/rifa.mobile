import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { getApps, initializeApp } from 'firebase/app';
import { PersistGate } from 'redux-persist/integration/react';
import * as Updates from 'expo-updates';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Routes from '@/routes';
import { THEME } from '@/styles/theme.styles';
import { firebaseConfig } from '@/lib/firebase.lib';
import { fetchFonts } from '@/utils/fetch-fonts.util';
import { persistedStore, store } from '@/redux/store.redux';

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }

  useEffect(() => {
    async function updateApp() {
      if (process.env.NODE_ENV === 'development') {
        return;
      }

      const { isAvailable } = await Updates.checkForUpdateAsync();

      if (isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    }
    updateApp();
  }, []);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <QueryClientProvider client={new QueryClient()}>
          <NativeBaseProvider>
            <StatusBar
              animated
              backgroundColor={THEME.colors.screen_white_background}
            />
            <Routes />
          </NativeBaseProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
