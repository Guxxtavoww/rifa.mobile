import React from 'react';
import { View } from 'react-native';

import { Button, SearchInput } from '@/components';
import { commonStyles } from '@/styles/common.styles';

import { useMainRaffles } from './hooks/main-raffles.hook';

const MainRaffles: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { handleSearchRaffle, handleCreateRaffleButtonPress } = useMainRaffles(
    navigation.push
  );

  return (
    <View style={[commonStyles.screen_container_light]}>
      <SearchInput
        onSubmitKeyboard={handleSearchRaffle}
        onPressSearchIcon={handleSearchRaffle}
        placeholder="Pesquise Rifas..."
      />
      <Button
        content="Crie sua rifa"
        textFontWeight="bold"
        borderRadius="full"
        onPress={handleCreateRaffleButtonPress}
      />
    </View>
  );
};

export default MainRaffles;
