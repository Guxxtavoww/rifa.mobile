import { z } from 'zod';

export const envSchema = z.object({
  EXPO_BASE_API_URL: z.string().min(0).optional().default('http://192.168.100.143:5000/server'),
  EXPO_FIREBASE_API_KEY: z.string().optional().default('AIzaSyBTRvnSME9cWGNwZ2rQAz2FFoDf6QwFWeQ'),
  EXPO_FIREBASE_STORAGE_BUCKET: z.string().optional().default('rifas-photos-database.appspot.com'),
});

export const ENV_VARIABLES = envSchema.parse(process.env);

export type EnvType = z.infer<typeof envSchema>;
