import React from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { THEME } from '@/styles/theme.styles';
import { commonStyles } from '@/styles/common.styles';
import { Loader, SearchInput, Text } from '@/components';

import RaffleWidget from './components/RaffleWidget';
import { useSearchRaffles } from './hook/search-raffles.hook';

const SearchRaffles: React.FC<ScreenProps> = ({ navigation }) => {
  const {
    isLoading,
    searchRafflesResult,
    handleSearchQuery,
    isFetchingNextPage,
    onEndReached,
    searchQuery,
    total,
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
      {isLoading ? null : (
        <Text
          content={
            total > 1
              ? `${total} resultados encontrados`
              : total === 0
              ? 'Nenhum resultado encontrado'
              : `${total} resultado encontrado`
          }
          color={THEME.colors.dark_text_color}
          style={{
            marginBottom: 8,
            textAlign: 'left',
            marginLeft: 4,
          }}
          fontWeight="medium"
        />
      )}
      {searchQuery !== '' ? (
        <Text
          content={`Resultados para: ${searchQuery}`}
          color={THEME.colors.dark_text_color}
          fontWeight="bold"
          style={{
            marginBottom: 8,
            textAlign: 'left',
            marginLeft: 4,
          }}
          fontSize="normalLarge"
        />
      ) : null}
      {isLoading ? (
        <Loader
          size={30}
          textProps={{
            content: 'Carregando Rifas...',
            color: THEME.colors.dark_text_color,
          }}
        />
      ) : (
        <>
          <FlashList
            data={searchRafflesResult}
            renderItem={({ index: wrapperIndex, item }) => (
              <View key={wrapperIndex}>
                {item.data.map((raffle, index) => (
                  <RaffleWidget
                    data={raffle}
                    push={navigation.push}
                    key={index}
                  />
                ))}
              </View>
            )}
            scrollEnabled
            showsVerticalScrollIndicator={true}
            estimatedItemSize={1000}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
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
