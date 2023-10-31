import { VStack } from 'native-base';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

import { THEME } from '@/styles/theme.styles';

import Text, { iTextProps } from '../Text';

interface iLoaderProps extends ActivityIndicatorProps {
  textProps?: iTextProps;
}

const Loader: React.FC<iLoaderProps> = ({ size, textProps, ...rest }) => (
  <VStack space={textProps ? 2 : undefined} alignItems="center">
    <ActivityIndicator
      color={THEME.colors.dark_text_color}
      size={size}
      {...rest}
    />
    {textProps ? <Text {...textProps} /> : null}
  </VStack>
);

export default Loader;
