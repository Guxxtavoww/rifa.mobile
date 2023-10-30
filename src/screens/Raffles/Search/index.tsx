import React from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { commonStyles } from '@/styles/common.styles';
import { Loader, SearchInput, Text } from '@/components';

import RaffleWidget from './components/RaffleWidget';
import { useSearchRaffles } from './hook/search-raffles.hook';

const SearchRaffles: React.FC<ScreenProps> = ({ navigation }) => {
  const { isLoading, searchRafflesResult } = useSearchRaffles();

  return (
    <View style={[commonStyles.screen_container_light]}>
      {/* <SearchInput
        placeholder="Pesquise rifas..."
        onPressSearchIcon={searchMutation}
        onSubmitKeyboard={searchMutation}
        isLoading={isLoading}
        mb="4"
      /> */}
      {isLoading ? (
        <Loader />
      ) : (
        <FlashList
          data={searchRafflesResult?.pages[0]?.data}
          renderItem={({ item, index }) => (
            <RaffleWidget data={item} push={navigation.push} key={index} />
          )}
          scrollEnabled
          showsVerticalScrollIndicator={true}
          estimatedItemSize={100}
          onEndReached={() => console.log('Chegou ao fim')}
          onEndReachedThreshold={0.2}
        />
      )}
    </View>
  );
};

export default SearchRaffles;
