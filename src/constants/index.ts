import { Dimensions } from 'react-native';
import * as Localization from 'expo-localization';

export const deviceLanguage = Localization.locale;

const screenHeight = Dimensions.get('screen');
const windowDimentions = Dimensions.get('window');

export const WINDOW_WIDTH = windowDimentions.width;
export const WINDOW_HEIGHT = windowDimentions.height;

export const SCREEN_WIDTH = screenHeight.width;
export const SCREEN_HEIGHT = screenHeight.height;
