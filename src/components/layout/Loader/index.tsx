import { View } from 'native-base';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

import { THEME } from '@/styles/theme.styles';

import Text, { iTextProps } from '../Text';

interface iLoaderProps extends ActivityIndicatorProps {
  textProps?: iTextProps;
}

const Loader: React.FC<iLoaderProps> = ({ size, textProps, ...rest }) => (
  <View style={{ flexDirection: 'column', alignItems: 'center' }}>
    <ActivityIndicator
      color={THEME.colors.dark_text_color}
      size={size}
      style={[rest.style, { marginBottom: textProps ? 8 : undefined }]}
      {...rest}
    />
    {textProps ? <Text {...textProps} /> : null}
  </View>
);

export default Loader;
