import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { store } from '@/redux/store.redux';

export async function uploadImageAsync(
  uri?: string,
  currentIndex?: number
): Promise<string | void> {
  if (!uri) return;

  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const userData = store.getState().auth.user_data!;

  const imageName = `${userData.user_email}-${Date.now()}-photo${
    currentIndex ?? 1
  }`;

  const fileRef = ref(getStorage(), `${imageName}-${Date.now()}`);

  await uploadBytes(fileRef, blob);

  return await getDownloadURL(fileRef);
}

export async function uploadMultipleImagesAsync(
  uris: string[]
): Promise<(string | void)[]> {
  return await Promise.all(uris.map(uploadImageAsync));
}
