import { StyleSheet } from 'react-native';

import { THEME } from './theme';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },
  screen_container_dark: {
    flex: 1,
    backgroundColor: THEME.colors.screen_dark_background,
  },
  screen_container_light: {
    flex: 1,
    backgroundColor: THEME.colors.screen_white_background,
  },
});
