import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

import { THEME } from '@/styles/theme.styles';

import { textStyles } from './styles';

export interface iTextProps extends TextProps {
  type?: 'text' | 'title';
  content: string;
  color?: string;
  fontSize?: keyof typeof THEME.fontsSizes;
}

const Text: React.FC<iTextProps> = ({
  type = 'text',
  content,
  style,
  color,
  fontSize,
  ...rest
}) => (
  <RNText
    style={[
      style,
      {
        color: color ?? THEME.colors.light_text_color,
        fontSize: THEME.fontsSizes[fontSize ?? 'normal'],
      },
      type === 'text' ? textStyles.textStyle : textStyles.titleStyles,
    ]}
    {...rest}
  >
    {content}
  </RNText>
);

export default Text;
