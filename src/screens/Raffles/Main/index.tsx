import React from 'react';
import { ScrollView } from 'react-native';

import { Button, SearchInput } from '@/components';
import { commonStyles } from '@/styles/common.styles';

import Categories from './components/Categories';
import { useMainRaffles } from './hooks/main-raffles.hook';

const MainRaffles: React.FC<ScreenProps> = ({ navigation }) => {
  const {
    handleSearchRaffle,
    handleCreateRaffleButtonPress,
    categoriesResonse,
    isLoadingCategories,
  } = useMainRaffles(navigation.replace);

  return (
    <ScrollView style={[commonStyles.screen_container_light]} scrollEnabled>
      <SearchInput
        onSubmitKeyboard={handleSearchRaffle}
        onPressSearchIcon={handleSearchRaffle}
        placeholder="Pesquise Rifas..."
        mb="6"
      />
      <Button
        content="Crie sua rifa"
        textFontWeight="bold"
        borderRadius="full"
        onPress={handleCreateRaffleButtonPress}
        mb="6"
      />
      <Categories
        categories={categoriesResonse}
        onCategoryPress={handleSearchRaffle}
        isLoading={isLoadingCategories}
      />
    </ScrollView>
  );
};

export default MainRaffles;
