export interface iFavoriteRafflesResponse {
  data: iFavoriteRaffle[];
  meta: Meta;
}

export interface iFavoriteRaffle {
  raffle_id: string;
  raffle_title: string;
  raffle_status: RaffleStatus;
  main_raffle_photo_url: string | null;;
  raffle_demo_video_url: string | null;
}
