export interface iRafflesResponse {
  meta: Meta;
  data: iRaffle[];
}

export interface iRaffle {
  raffle_title: string;
  raffle_id: string;
  due_date: string;
  photos: [{ photo_url: string }];
  raffle_status: 'unavailable' | 'available';
}

interface Meta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
}