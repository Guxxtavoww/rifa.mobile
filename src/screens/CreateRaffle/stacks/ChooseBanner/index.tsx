import React from 'react';
import { ScrollView } from 'react-native';

import { commonStyles } from '@/styles/common.styles';

const ChooseBanner: React.FC<ScreenProps> = ({ navigation, route }) => {
  return (
    <ScrollView
      style={[commonStyles.screen_container_light]}
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
      }}
      scrollEnabled
    >
      <></>
    </ScrollView>
  );
};

export default ChooseBanner;
