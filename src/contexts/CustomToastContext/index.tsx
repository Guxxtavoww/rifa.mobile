import { createContext, useContext, useCallback } from 'react';
import { useToast } from 'native-base';

import { THEME } from '@/styles/theme.styles';

import {
  CustomToastContextProps,
  ToastFuncType,
  ToastStatus,
} from './custom-toast.types';

const CustomToastContext = createContext<Maybe<CustomToastContextProps>>(null);

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

export const CustomToastProvider: FCWithChildren<{}, true> = ({ children }) => {
  const nbToast = useToast();

  const toast: ToastFuncType = useCallback((message, options) => {
    const { backgroundColor, color } = statusHandler(
      options?.status || 'sucess'
    );

    nbToast.show({
      description: message,
      backgroundColor,
      color,
      placement: options?.placement || 'bottom',
      _description: {
        fontFamily: THEME.fonts.medium,
      },
    });
  }, []);

  return (
    <CustomToastContext.Provider value={{ toast }}>
      {children}
    </CustomToastContext.Provider>
  );
};

export function useCustomToast(): CustomToastContextProps {
  const context = useContext(CustomToastContext);

  if (!context) {
    throw new Error('Usagem inválida');
  }

  return context;
}
