import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Essa peca que vc queria ?</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.screen_dark_background,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: THEME.fontsSizes.large,
    color: '#fff',
    fontWeight: '600',
    fontFamily: THEME.fonts.medium,
  },
});
