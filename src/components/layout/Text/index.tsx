import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

import { textStyles } from './styles';

interface iTextProps extends TextProps {
  type?: 'text' | 'title';
  content: string;
}

const Text: React.FC<iTextProps> = ({ type = 'text', content, ...rest }) => (
  <RNText
    style={[
      rest.style,
      type === 'text' ? textStyles.textStyle : textStyles.titleStyles,
    ]}
    {...rest}
  >
    {content}
  </RNText>
);

export default Text;
