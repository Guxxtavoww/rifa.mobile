import { IToastProps } from 'native-base';

export type ToastStatus = 'sucess' | 'warning' | 'error' | 'info';

export type ToastArgType = {
  status?: ToastStatus;
  placement?: IToastProps['placement'];
};

export type ToastFuncType = (message: string, options?: ToastArgType) => void;

export type CustomToastContextProps = {
  toast: ToastFuncType;
};
