import React from 'react';
import { View } from 'react-native';

import { Loader, SearchInput, Text } from '@/components';
import { commonStyles } from '@/styles/common.styles';

import { useRaffles } from './hook/raffles.hook';

const Raffles: React.FC = () => {
  const { isLoading, searchMutation, searchRafflesResult } = useRaffles();

  return (
    <View style={[commonStyles.screen_container_light]}>
      <SearchInput
        placeholder="Pesquise rifas..."
        onPressSearchIcon={searchMutation}
        onSubmitKeyboard={searchMutation}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <Text content={JSON.stringify(searchRafflesResult, null, 2)} />
      )}
    </View>
  );
};

export default Raffles;
