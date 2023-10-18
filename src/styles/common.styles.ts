import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

import { THEME } from './theme.styles';

export const pagePaddingTop = Constants.statusBarHeight + 10;

export const commonStyles = StyleSheet.create({
  screen_container_dark: {
    flex: 1,
    backgroundColor: THEME.colors.screen_dark_background,
    paddingTop: pagePaddingTop,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  screen_container_light: {
    flex: 1,
    backgroundColor: THEME.colors.screen_white_background,
    paddingTop: 18,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
});
