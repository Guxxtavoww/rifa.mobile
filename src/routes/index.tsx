import { NavigationContainer } from '@react-navigation/native';

import { useRedux } from '@/hooks';

import StackRoutes from './stack.routes';
import DrawerRoutes from './drawer.routes';

export default function Routes() {
  const hasUserData = useRedux().useAppSelector(
    (state) => state.auth.user_data !== null && state.auth.access_token !== null
  );

  return (
    <NavigationContainer>
      {hasUserData ? <DrawerRoutes /> : <StackRoutes />}
    </NavigationContainer>
  );
}
