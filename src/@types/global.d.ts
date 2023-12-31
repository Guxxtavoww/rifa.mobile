import { FC, ReactNode } from 'react';
import { IToastProps } from 'native-base';

import { EnvType } from '@/config/env.config';

declare global {
  declare module '*.jpg' {
    const value: string;
    export default value;
  }

  declare module '*.png' {
    const value: string;
    export default value;
  }

  namespace NodeJS {
    export interface ProcessEnv extends EnvType {}
  }

  export type Maybe<T> = T | null | undefined;

  export type ScreenProps<T extends object = {}> = {
    navigation: {
      push(screen: string, payload?: Record<string, any>): void;
      replace(screen: string, payload?: Record<string, any>): void;
      pop(index?: number): void;
      popToTop(): void;
    };
    route: {
      name: string;
      params: Record<string, any>;
    };
  } & T;

  export type Children = {
    children: ReactNode;
  };

  export type FCWithChildren<
    ComponentProps extends object = Record<string, unknown>,
    IsChildrenRequired extends boolean = false
  > = FC<
    IsChildrenRequired extends true
      ? ComponentProps & Children
      : ComponentProps & Partial<Children>
  >;

  export type ToastStatus = 'sucess' | 'warning' | 'error' | 'info';

  export type ToastArgType = {
    status?: ToastStatus;
    placement?: IToastProps['placement'];
  };

  export type ToastFuncType = (message: string, options?: ToastArgType) => void;

  export interface iSelectOption {
    label: string;
    value: string;
  }

  export type SelectOptions = iSelectOption[];

  export type RaffleStatus = readonly 'available' | 'unavailable';

  export interface Meta {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  }
}
