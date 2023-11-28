export interface iCreateRaffleContextState {
  video_uri: Maybe<string>;
  main_raffle_photo_uri: Maybe<string>;
}

export type Actions =
  | {
      type: 'add-video-uri' | 'add-main-photo-uri';
      payload: Maybe<string>;
    }
  | { type: 'reset' };

export interface iCreateRaffleContextProps {
  state: iCreateRaffleContextState;
  dispatch: (action: Actions) => void;
}

export const initialState: iCreateRaffleContextState = {
  main_raffle_photo_uri: null,
  video_uri: null,
};
