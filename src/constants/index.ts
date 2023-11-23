import { Dimensions } from 'react-native';
import * as Localization from 'expo-localization';

export const deviceLanguage = Localization.locale;

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
