import { NavigationContainer } from '@react-navigation/native';

import { useRedux } from '@/hooks';
import Contexts from '@/contexts';

import StackRoutes from './stack.routes';
import DrawerRoutes from './draw.routes';

export default function Routes() {
  const hasUserData = useRedux().useAppSelector(
    (state) => state.auth.user_data !== null && state.auth.access_token !== null
  );

  return (
    <Contexts>
      <NavigationContainer>
        {hasUserData ? <DrawerRoutes /> : <StackRoutes />}
      </NavigationContainer>
    </Contexts>
  );
}
