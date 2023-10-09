import { EnvType } from '@/config/env.config';

declare global {
  namespace NodeJS {
    export interface ProcessEnv extends EnvType {}
  }

  export type Maybe<T> = T | null | undefined;
}
