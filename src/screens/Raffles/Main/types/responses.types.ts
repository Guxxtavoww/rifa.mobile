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
  raffle_demo_video_url: string | null;
  owner: {
    user_name: string | null;
    user_email: string;
    user_photo_url: string | null;
    user_id: string;
  };
}

export interface iRaffleCommentsResponse {
  data: {
    comment_text: string;
    commented_by: {
      user_photo_url: string | null;
      user_name: string | null;
      user_email: string;
    };
  }[];
  meta: Meta;
}
