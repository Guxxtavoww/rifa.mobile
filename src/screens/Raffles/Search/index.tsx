import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'native-base';

import { THEME } from '@/styles/theme.styles';
import { commonStyles } from '@/styles/common.styles';
import { Loader, SearchInput, Text } from '@/components';

import RaffleWidget from './components/RaffleWidget';
import { useSearchRaffles } from './hook/search-raffles.hook';

const SearchRaffles: React.FC<ScreenProps> = ({ navigation }) => {
  const { isLoading, searchMutation, searchRafflesResult } = useSearchRaffles();

  return (
    <View style={[commonStyles.screen_container_light]}>
      <SearchInput
        placeholder="Pesquise rifas..."
        onPressSearchIcon={searchMutation}
        onSubmitKeyboard={searchMutation}
        isLoading={isLoading}
        mb="4"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          flex={1}
          data={searchRafflesResult?.data}
          bg="transparent"
          renderItem={({ item, index }) => (
            <RaffleWidget data={item} push={navigation.push} key={index} />
          )}
          scrollEnabled
          w="full"
          px="0.5"
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text
              content="Não há rifas!"
              color={THEME.colors.dark_text_color}
            />
          }
        />
      )}
    </View>
  );
};

export default SearchRaffles;
