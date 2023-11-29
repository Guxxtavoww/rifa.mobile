export interface iBoughtRafflesResponse {
  meta: Meta;
  data: iBoughtRaffle[];
}

export interface iBoughtRaffle {
  subscribed_user_id: string;
  raffle: {
    raffle_title: string;
    raffle_id: string;
    main_raffle_photo_url: string | null;
  };
}
