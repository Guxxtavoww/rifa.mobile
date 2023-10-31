import { z } from 'zod';

export const envSchema = z.object({
  EXPO_PUBLIC_BASE_API_URL: z.string(),
  EXPO_PUBLIC_FIREBASE_API_KEY: z.string(),
  EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string(),
  EXPO_PUBLIC_ENCRYPTION_KEY: z.string(),
});

export const ENV_VARIABLES = envSchema.parse(process.env);

export type EnvType = z.infer<typeof envSchema>;
