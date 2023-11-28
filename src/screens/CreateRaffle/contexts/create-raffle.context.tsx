import { useContext, createContext, useReducer } from 'react';

import {
  Actions,
  initialState,
  iCreateRaffleContextState,
  iCreateRaffleContextProps,
} from './create-raffle.context.types';

export const CreateRaffleContext =
  createContext<Maybe<iCreateRaffleContextProps>>(undefined);

const reducer = (
  state: iCreateRaffleContextState,
  action: Actions
): iCreateRaffleContextState => {
  switch (action.type) {
    case 'add-main-photo-uri':
      return { ...state, main_raffle_photo_uri: action.payload };
    case 'add-video-uri':
      return { ...state, video_uri: action.payload };
    case 'reset':
      return { main_raffle_photo_uri: null, video_uri: null };
  }
};

export const CreateRaffleProvider: FCWithChildren<{}, true> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CreateRaffleContext.Provider value={{ state, dispatch }}>
      {children}
    </CreateRaffleContext.Provider>
  );
};

export function useCreateRaffle(): iCreateRaffleContextProps {
  const context = useContext(CreateRaffleContext);

  if (!context) {
    throw new Error('Erro');
  }

  return context;
}
