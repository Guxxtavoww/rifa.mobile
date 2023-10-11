import { store } from '@/redux/store.redux';
import { logOut } from '@/redux/actions.redux';

export function isNullableValue<T>(value: T) {
  switch (value) {
    case null:
    case undefined:
    case '':
      return true;
    default:
      return false;
  }
}

export const signOut = () => {
  store.dispatch(logOut());
};
