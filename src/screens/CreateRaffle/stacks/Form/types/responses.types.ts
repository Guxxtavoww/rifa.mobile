export interface iCategory {
  raffle_category_name: string;
  raffle_category_id: number;
}

export type CategoriesResponse = iCategory[];

export interface iCreateRaffleResponse {
  raffle_id: string;
}
