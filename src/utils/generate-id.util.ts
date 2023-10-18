import { randomUUID, createCipheriv, scryptSync } from 'crypto';

import { ENV_VARIABLES } from '@/config/env.config';

const secretKey = ENV_VARIABLES.EXPO_ENCRYPTION_KEY;

export const generateId = async (base?: string) => {
  if (base) {
    const iv = randomUUID().slice(0, 16);

    const key = scryptSync(secretKey, 'salt', 32);

    const cipher = createCipheriv('aes-256-cbc', key, iv);

    let encryptedValue = cipher.update(base, 'utf-8', 'hex');
    encryptedValue += cipher.final('hex');

    return `${randomUUID()}-${iv}-${encryptedValue}`;
  }

  return randomUUID();
};
