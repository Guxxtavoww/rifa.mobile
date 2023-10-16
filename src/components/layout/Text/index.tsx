import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

import { THEME } from '@/styles/theme.styles';

export interface iTextProps extends TextProps {
  type?: 'text' | 'title';
  content: string;
  color?: string;
  fontSize?: keyof typeof THEME.fontsSizes;
  fontWeight?: keyof typeof THEME.fonts;
}

const Text: React.FC<iTextProps> = ({
  type = 'text',
  content,
  style,
  color,
  fontSize,
  fontWeight,
  ...rest
}) => (
  <RNText
    style={[
      style,
      {
        color: color ?? THEME.colors.light_text_color,
        fontSize: THEME.fontsSizes[fontSize ?? 'normal'],
        fontFamily: THEME.fonts[fontWeight ?? 'regular'],
        flexDirection: 'row',
        alignItems: 'center',
      },
    ]}
    {...rest}
  >
    {content}
  </RNText>
);

export default Text;
