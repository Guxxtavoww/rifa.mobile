import { z } from 'zod';

export const envSchema = z.object({
  EXPO_BASE_API_URL: z
    .string()
    .min(0)
    .optional()
    .default('http://192.168.1.8:5000/server'),
  EXPO_FIREBASE_API_KEY: z
    .string()
    .optional()
    .default('AIzaSyBTRvnSME9cWGNwZ2rQAz2FFoDf6QwFWeQ'),
  EXPO_FIREBASE_STORAGE_BUCKET: z
    .string()
    .optional()
    .default('rifas-photos-database.appspot.com'),
  EXPO_ENCRYPTION_KEY: z
    .string()
    .optional()
    .default( 
      'QT0datqlThEu51mc4VlV7iRWXVa1gAP85ZAu44VvvDlkpYVkFzSRRlHSOzsubDMN45OBQW6UA3RPg4TCvrTOmhQUeF5XPuSdcD0R2At6pdaLwAKnOtILg13Ha6ymIgjv8glodvem3hWLmpHIhNBiaXtf8wqpAoGADH5a8OhvKOtd8EChGXyp9LDWHRw9vbyNgi9dQXltgyoUBb1jDllgoJSRHgRFUvyvbbImR5c03JwqtiQ8siWTC9G5WGeSjcSNt9fVmG7W1L14MbrGJj8fFns7xrOlasnlPdgA5NCONtIsZY2DKZr0drhPhZBcWJlFxkCgYAn4SOPEo6hjKNhA6vER7fSxDEVsDgrDh3YgAWpvUdlaqBxqOyAqi600YugQZGHK2lv7vNYOdmrunuIx7BPuDqYbjtRR4Mc9bVQAZbXSLXMl7j2RWwKfNhLSJbk9LX4EoVtTgLjvOUE4tAdq9fFgpqdwLwzqPTO9kECP4CQKBgH6tOxcNxGuXUideluAn3H2KeyyznZMJ7oCvzf26XpTAMI243OoeftiKVMgxuZ7hjwqfnVHXABc4i5gchr9RzSb1hZIqFzq2YGmbppg5Ok2cgwalDoDBi21bRf8aDRweL62mO7aPnCQZ58j5W72PB8BAr6xg0Oro25O4os'
    ),
});

export const ENV_VARIABLES = envSchema.parse(process.env);

export type EnvType = z.infer<typeof envSchema>;
