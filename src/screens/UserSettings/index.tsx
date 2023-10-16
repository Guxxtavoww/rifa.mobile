import React from 'react';
import { View } from 'react-native';

import { Text } from '@/components';
import { THEME } from '@/styles/theme.styles';
import { commonStyles } from '@/styles/common.styles';

const UserSettings: React.FC = () => {
  return (
    <View style={[commonStyles.screen_container_light]}>
      <Text content="Configs" color={THEME.colors.dark_text_color} />
    </View>
  );
};

export default UserSettings;
