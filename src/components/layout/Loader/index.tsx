import { View, ActivityIndicator, ActivityIndicatorProps } from 'react-native';

import { THEME } from '@/styles/theme.styles';

import { styles } from './styles';

interface iLoaderProps extends ActivityIndicatorProps {}

const Loader: React.FC<iLoaderProps> = ({ size, ...rest }) => (
  <View style={styles.container}>
    <ActivityIndicator
      color={THEME.colors.dark_text_color}
      size={size}
      {...rest}
    />
  </View>
);

export default Loader;
