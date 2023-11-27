export interface iCategory {
  raffle_category_name: string;
  raffle_category_id: number;
}

export interface iMainRafflePaginatedResult {
  data: iMainRaffle[];
  meta: Meta;
}

export interface iMainRaffle {
  raffle_title: string;
  raffle_id: string;
  due_date: string;
  main_raffle_photo_url: string | null;
  owner: {
    user_name: string | null;
    user_email: string;
    user_photo_url: string | null;
    user_id: string;
  };
}
