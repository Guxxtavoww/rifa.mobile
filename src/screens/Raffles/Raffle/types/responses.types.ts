export interface iRaffle {
  created_at: string;
  due_date: string;
  owner_id: string;
  photos: iPhoto[];
  raffle_description: string;
  raffle_id: string;
  raffle_title: string;
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
