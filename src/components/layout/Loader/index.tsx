import { View } from 'native-base';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

import { THEME } from '@/styles/theme.styles';

interface iLoaderProps extends ActivityIndicatorProps {}

const Loader: React.FC<iLoaderProps> = ({ size, ...rest }) => (
  <View>
    <ActivityIndicator
      color={THEME.colors.dark_text_color}
      size={size}
      {...rest}
    />
  </View>
);

export default Loader;
