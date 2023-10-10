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
}
