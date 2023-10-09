import { View } from 'react-native';

import { Text } from '@/components';
import { THEME } from '@/styles/theme.styles';
import { commonStyles } from '@/styles/common.styles';

const Login: React.FC = () => {
  return (
    <View
      style={[
        commonStyles.screen_container_dark,
        {
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <Text
        content="Login"
        type="title"
        style={{ color: THEME.colors.orange_color }}
      />
    </View>
  );
};

export default Login;
