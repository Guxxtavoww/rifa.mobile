export interface iRaffle {
  created_at: string;
  due_date: string;
  owner: iOwner;
  photos: iPhoto[];
  raffle_description: string;
  raffle_id: string;
  raffle_title: string;
  raffle_subscription_price: number;
  available_quantity: number;
  favorite_raffles?: {
    favorited_by_id: string;
  }[];
  subscribed_users: iSubscribedUser[];
}

export interface iPhoto {
  photo_url: string;
}

export interface iSubscribedUser {
  user_id: string;
  user_email: string;
  user_name: string;
  user_photo_url: string;
}

export interface iOwner {
  user_id: string;
  user_photo_url: string | null;
  user_email: string;
  user_name: string | null;
}
