import { StyleSheet } from 'react-native';

import { THEME } from '@/styles/theme.styles';

export const textStyles = StyleSheet.create({
  textStyle: {
    fontFamily: THEME.fonts.medium,
    fontSize: THEME.fontsSizes.large,
  },
  titleStyles: {
    fontFamily: THEME.fonts.bold,
    fontSize: THEME.fontsSizes.extraLarge,
  },
});
