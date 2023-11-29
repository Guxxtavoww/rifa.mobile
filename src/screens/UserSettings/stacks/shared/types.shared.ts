export interface iRafflesResponse {
  meta: Meta;
  data: iRaffle[];
}

export interface iRaffle {
  raffle_title: string;
  raffle_id: string;
  raffle_status: RaffleStatus;
  main_raffle_photo_url: string | null;
}
