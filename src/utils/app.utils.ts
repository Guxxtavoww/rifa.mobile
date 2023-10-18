import { Toast } from 'native-base';

import { store } from '@/redux/store.redux';
import { logOut } from '@/redux/actions.redux';
import { THEME } from '@/styles/theme.styles';

export function isNullableValue<T>(value: T) {
  switch (value) {
    case null:
    case undefined:
    case '':
      return true;
    default:
      return false;
  }
}

export const signOut = () => {
  store.dispatch(logOut());
};

const statusHandler = (status: ToastStatus) => {
  const color = THEME.colors.light_text_color;

  switch (status) {
    case 'sucess':
      return { backgroundColor: 'green.500', color };
    case 'error':
      return { backgroundColor: 'red.500', color };
    case 'info':
      return { backgroundColor: 'blue.500', color };
    case 'warning':
      return { backgroundColor: 'yellow.500', color };
  }
};

export const toast: ToastFuncType = (message, options) => {
  const { backgroundColor, color } = statusHandler(options?.status || 'sucess');

  Toast.show({
    description: message,
    backgroundColor,
    color,
    placement: options?.placement || 'bottom',
    _description: {
      fontFamily: THEME.fonts.medium,
    },
    avoidKeyboard: true,
  });
};
