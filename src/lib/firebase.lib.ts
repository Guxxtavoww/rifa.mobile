import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { ENV_VARIABLES } from '@/config/env.config';

export const app = initializeApp({
  apiKey: ENV_VARIABLES.EXPO_FIREBASE_API_KEY,
  authDomain: 'rifas-photos-database.firebaseapp.com',
  projectId: 'rifas-photos-database',
  storageBucket: ENV_VARIABLES.EXPO_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: '28404439482',
  appId: '1:28404439482:web:32969038a8021808002583',
  measurementId: 'G-1KXH01BT2H',
});

export const analytics = getAnalytics(app);
