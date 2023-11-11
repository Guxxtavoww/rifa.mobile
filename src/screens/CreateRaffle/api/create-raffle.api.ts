import api from '@/api';
import { toast } from '@/utils/app.utils';
import { transformToSelectOptions } from '@/utils/transform-to-select-options.util';

import { iCreateRaffleAPIPayload } from '../types/form.types';
import { CategoriesResponse, iCreateRaffleResponse } from '../types/responses.types';

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

export const createRaffleAPI = async (data: iCreateRaffleAPIPayload) => {
  const reqData = {
    raffle_title: data.raffle_title,
    raffle_description: data.raffle_description,
    maximum_people_quantity: data.maximum_people_quantity,
    raffle_subscription_price: data.raffle_subscription_price,
    photos: data.photos,
    due_date: data.due_date,
    raffle_categories: data.selectedCategories.map((category) => ({
      category_id: +category.value,
    })),
  };

  return api
    .post<iCreateRaffleResponse>('/raffles', reqData)
    .then(({ data }) => {
      toast('Rifa Criada com sucesso');

      return Promise.resolve(data);
    });
};
