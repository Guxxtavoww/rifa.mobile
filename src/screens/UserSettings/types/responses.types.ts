export interface iUpdateUserResponse {
  user_id: string;
  user_email: string;
  user_name: string | null;
  created_at: Date;
  updated_at: Date | string;
  user_photo_url: string | null;
  funds: number | null;
}
