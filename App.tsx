import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';

import Routes from '@/routes';
import { THEME } from '@/styles/theme';
import { fetchFonts } from '@/utils/fetch-fonts.util';
import { commonStyles } from '@/styles/common.styles';

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
    <SafeAreaView style={commonStyles.container}>
      <StatusBar
        animated
        backgroundColor={THEME.colors.screen_white_background}
      />
      <Routes />
    </SafeAreaView>
  );
}
