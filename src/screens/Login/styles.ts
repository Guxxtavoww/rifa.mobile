import { StyleSheet } from 'react-native';

import { THEME } from '@/styles/theme.styles';

export const loginStyles = StyleSheet.create({
  login_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link_styles: {
    backgroundColor: 'transparent',
    color: THEME.colors.orange_color,
    fontFamily: THEME.fonts.bold,
    fontSize: THEME.fontsSizes.normal,
  },
});
