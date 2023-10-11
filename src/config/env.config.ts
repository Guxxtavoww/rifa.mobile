import { z } from 'zod';

export const envSchema = z.object({
  EXPO_BASE_API_URL: z.string().min(0),
  EXPO_MMKV_ENCRYPT_KEY: z.string(),
});

export const ENV_VARIABLES = envSchema.parse(process.env);

export type EnvType = z.infer<typeof envSchema>;
