export interface iFavoriteRafflesResponse {
  data: iFavoriteRaffle[];
  meta: Meta;
}

export interface iFavoriteRaffle {
  raffle_id: string;
  raffle_title: string;
  raffle_status: RaffleStatus;
  photos: [{ photo_url: string }];
  raffle_demo_video_url: string | null;
}
