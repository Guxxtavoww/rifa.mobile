export interface iSearchRafflesResponse {
  data: iRaffle[];
  meta: Meta;
}

export interface Meta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
}

export interface iRaffle {
  raffle_title: string;
  raffle_id: string;
  due_date: string;
  raffle_subscription_price: number;
  photos: [{ photo_url: string }];
  owner: {
    user_name: string | null;
    user_email: string;
    user_photo_url: string | null;
    user_id: string;
  };
}
