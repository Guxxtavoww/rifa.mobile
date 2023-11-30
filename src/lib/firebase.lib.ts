import { FirebaseOptions } from 'firebase/app';

import { ENV_VARIABLES } from '@/config/env.config';

export const firebaseConfig: FirebaseOptions = {
  apiKey: ENV_VARIABLES.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'raffles-media-database.firebaseapp.com',
  projectId: 'raffles-media-database',
  storageBucket: ENV_VARIABLES.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: '421392221232',
  appId: '1:421392221232:web:155c69a2e94a73135419f5',
};
