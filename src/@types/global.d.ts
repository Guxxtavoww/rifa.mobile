import { FC, ReactNode } from 'react';

import { EnvType } from '@/config/env.config';

declare global {
  namespace NodeJS {
    export interface ProcessEnv extends EnvType {}
  }

  export type Maybe<T> = T | null | undefined;

  export type ScreenProps<T extends object = {}> = {
    navigation: {
      push(screen: string, payload?: any): void;
      replace(screen: string, payload?: any): void;
      pop(index?: number): void;
      popToTop(): void;
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
}
