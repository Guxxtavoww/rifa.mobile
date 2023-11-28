import api from '@/api';
import { toast } from '@/utils/app.utils';
import { transformToSelectOptions } from '@/utils/transform-to-select-options.util';
import {
  uploadMultipleImagesAsync,
  uploadImageAsync,
} from '@/utils/upload-image-async.util';

import { iCreateRaffleAPIPayload } from '../types/form.types';
import {
  CategoriesResponse,
  iCreateRaffleResponse,
} from '../types/responses.types';

export const getCategoriesAPI = async () => {
  return api.get<CategoriesResponse>('/categories').then((res) =>
    Promise.resolve(
      transformToSelectOptions(res.data, {
        label: 'raffle_category_name',
        value: 'raffle_category_id',
      })
    )
  );
};

export const createRaffleAPI = async (
  data: iCreateRaffleAPIPayload,
  photosUris: string[],
  videoUri?: Maybe<string>,
  main_raffle_photo_uri?: Maybe<string>
) => {
  const [photos, raffle_demo_video_url, main_raffle_photo_url] =
    await Promise.all([
      uploadMultipleImagesAsync(photosUris),
      uploadImageAsync(videoUri),
      uploadImageAsync(main_raffle_photo_uri),
    ]);

  return api
    .post<iCreateRaffleResponse>('/raffles', {
      raffle_title: data.raffle_title,
      raffle_description: data.raffle_description,
      maximum_people_quantity: data.maximum_people_quantity,
      raffle_subscription_price: data.raffle_subscription_price,
      photos,
      due_date: data.due_date,
      main_raffle_photo_url,
      raffle_demo_video_url,
      raffle_categories: data.selectedCategories.map((category) => ({
        category_id: +category.value,
      })),
    })
    .then(({ data }) => {
      toast('Rifa Criada com sucesso');

      return Promise.resolve(data);
    });
};
