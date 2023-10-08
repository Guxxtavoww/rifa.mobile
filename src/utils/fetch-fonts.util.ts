import * as Font from 'expo-font';

import { THEME } from '@/styles/theme';

export const fetchFonts = () =>
  Font.loadAsync({
    [THEME.fonts.regular]: require('../assets/fonts/Poppins-Regular.ttf'),
    [THEME.fonts.medium]: require('../assets/fonts/Poppins-Medium.ttf'),
    [THEME.fonts.bold]: require('../assets/fonts/Poppins-Bold.ttf'),
    [THEME.fonts.extraBold]: require('../assets/fonts/Poppins-ExtraBold.ttf'),
  });
