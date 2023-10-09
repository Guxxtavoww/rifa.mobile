import { View } from 'react-native';

import { Text } from '@/components';
import { THEME } from '@/styles/theme';
import { commonStyles } from '@/styles/common.styles';

const Login: React.FC = () => {
  return (
    <View style={commonStyles.screen_container_dark}>
      <Text
        content="Login"
        type="title"
        style={{ color: THEME.colors.orange_color }}
      />
    </View>
  );
};

export default Login;
