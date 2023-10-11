import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from '@/redux/store.redux';

type DispatchFunc = () => AppDispatch;

function useRedux() {
  const useAppDispatch: DispatchFunc = useDispatch;
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  return { useAppDispatch, useAppSelector };
}

export default useRedux;
