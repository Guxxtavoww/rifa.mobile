import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { toast } from '@/utils/app.utils';

export async function handlePermission() {
  if (Platform.OS !== 'web') {
    const status = (await ImagePicker.requestMediaLibraryPermissionsAsync())
      .status;

    if (status !== 'granted') {
      toast('Por favor dê permissão para o aplicativo', {
        status: 'warning',
      });

      throw new Error('Por favor dê permissão para o aplicativo');
    }
  }
}
