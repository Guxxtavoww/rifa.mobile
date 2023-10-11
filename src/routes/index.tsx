import { NavigationContainer } from '@react-navigation/native';

import { useRedux } from '@/hooks';

import StackRoutes from './stack.routes';

export default function Routes() {
  const hasUserData = useRedux().useAppSelector(
    (state) => !!state.auth.user_data && !!state.auth.access_token
  );

  return (
    <NavigationContainer>
      {hasUserData ? null : <StackRoutes />}
    </NavigationContainer>
  );
}
