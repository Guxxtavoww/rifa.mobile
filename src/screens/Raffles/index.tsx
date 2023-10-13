import React from 'react';
import { View } from 'react-native';

import { commonStyles } from '@/styles/common.styles';
import { Button, Text } from '@/components';
import { THEME } from '@/styles/theme.styles';
import { signOut } from '@/utils/app.utils';

const Raffles: React.FC = () => {
  return (
    <View style={[commonStyles.screen_container_light]}>
      <Text content="Fodase" color={THEME.colors.dark_text_color} />
      <Button
        textProps={{ content: 'Sair' }}
        buttonProps={{ onPress: signOut }}
      />
    </View>
  );
};

export default Raffles;
