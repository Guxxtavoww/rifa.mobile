import { View } from 'react-native';

import { Text } from '@/components';
import { commonStyles } from '@/styles/common.styles';
import { THEME } from '@/styles/theme';

const Register: React.FC = () => {
  return (
    <View style={commonStyles.screen_container_dark}>
      <Text
        content="Cadastro"
        type="title"
        style={{ color: THEME.colors.light_text_color }}
      />
    </View>
  );
};

export default Register;
