import React from 'react';
import { View } from 'react-native';

import { SearchInput } from '@/components';
import { commonStyles } from '@/styles/common.styles';

const Raffles: React.FC = () => {
  return (
    <View style={[commonStyles.screen_container_light]}>
      <SearchInput
        placeholder="Pesquise rifas..."
        onPressSearchIcon={(value) => console.log({ value })}
        onSubmitKeyboard={(value) => console.log({ value })}
      />
    </View>
  );
};

export default Raffles;
