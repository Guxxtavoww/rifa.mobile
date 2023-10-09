import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

import Routes from '@/routes';
import { THEME } from '@/styles/theme';
import { fetchFonts } from '@/utils/fetch-fonts.util';

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
    <>
      <StatusBar
        animated
        backgroundColor={THEME.colors.screen_white_background}
      />
      <Routes />
    </>
  );
}
