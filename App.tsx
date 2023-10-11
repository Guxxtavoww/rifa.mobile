import { useState } from 'react';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Routes from '@/routes';
import { THEME } from '@/styles/theme.styles';
import { fetchFonts } from '@/utils/fetch-fonts.util';
import { persistedStore, store } from '@/redux/store.redux';

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

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
