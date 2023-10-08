import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { THEME } from './src/styles/theme';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Essa peca que vc queria ?</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.screen_dark_background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    color: '#fff',
    fontWeight: '600',
  },
});
