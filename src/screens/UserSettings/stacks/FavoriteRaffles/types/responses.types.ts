export interface iFavoritesRafflesResult {
  data: iFavoriteRaffle[];
  meta: Meta;
}

export interface iFavoriteRaffle {
  favorited_by_id: string;
  favorite_raffle: {
    raffle_title: string;
    raffle_id: string;
    main_raffle_photo_url: string | null;
  };
}
