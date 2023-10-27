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
  owner_id: string;
  created_at: string;
  updated_at: string | null;
  raffle_description: string;
  raffle_title: string;
  raffle_id: string;
  due_date: string;
  raffle_subscription_price: number;
  photos: [{ photo_url: string }];
}
