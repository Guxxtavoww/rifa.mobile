import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import * as Updates from 'expo-updates';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { getApps, initializeApp } from 'firebase/app';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Routes from '@/routes';
import { THEME } from '@/styles/theme.styles';
import { firebaseConfig } from '@/lib/firebase.lib';
import { fetchFonts } from '@/utils/fetch-fonts.util';
import { persistedStore, store } from '@/redux/store.redux';
import { Loader } from '@/components';

export const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }

  useEffect(() => {
    (async () => {
      try {
        await fetchFonts().then(() => setDataLoaded(true));

        if (process.env.NODE_ENV === 'development') return;

        const { isAvailable } = await Updates.checkForUpdateAsync();

        if (isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setDataLoaded(true);
        await SplashScreen.hideAsync();
      }
    })();
  }, []);

  if (!dataLoaded) {
    return <ActivityIndicator color="#0d0d0d" size={30} />;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <QueryClientProvider client={queryClient}>
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
