import React from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { commonStyles } from '@/styles/common.styles';
import { Loader, SearchInput, Text } from '@/components';

import RaffleWidget from './components/RaffleWidget';
import { useSearchRaffles } from './hook/search-raffles.hook';
import { THEME } from '@/styles/theme.styles';

const SearchRaffles: React.FC<ScreenProps> = ({ navigation }) => {
  const {
    isLoading,
    searchRafflesResult,
    handleSearchQuery,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchRaffles();

  return (
    <View style={[commonStyles.screen_container_light]}>
      <SearchInput
        placeholder="Pesquise rifas..."
        onPressSearchIcon={handleSearchQuery}
        onSubmitKeyboard={handleSearchQuery}
        isLoading={isLoading}
        mb="4"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <FlashList
            data={searchRafflesResult}
            renderItem={({ item, index }) => (
              <>
                <RaffleWidget data={item} push={navigation.push} key={index} />
                {searchRafflesResult?.length === index + 1 && !hasNextPage ? (
                  <Text
                    content="Não há mais resultados"
                    color={THEME.colors.dark_text_color}
                    fontWeight="bold"
                  />
                ) : null}
              </>
            )}
            scrollEnabled
            showsVerticalScrollIndicator={true}
            estimatedItemSize={100}
            onEndReached={() => console.log('Chegou ao fim')}
            onEndReachedThreshold={0.2}
            contentContainerStyle={{
              paddingBottom: 10,
            }}
          />
          {isFetchingNextPage ? (
            <Loader
              size={30}
              textProps={{
                content: 'Carregando mais rifas...',
                color: THEME.colors.dark_text_color,
              }}
            />
          ) : null}
        </>
      )}
    </View>
  );
};

export default SearchRaffles;
