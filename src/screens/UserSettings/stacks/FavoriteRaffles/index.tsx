import React from 'react';
import { View } from 'native-base';
import { FlashList } from '@shopify/flash-list';

import { Loader, Text } from '@/components';
import { THEME } from '@/styles/theme.styles';

import RaffleWidget from '../shared/components/RaffleWidget';
import { useFavoriteRaffles } from './hooks/favorite-raffles.hook';

const FavoriteRaffles: React.FC = () => {
  const {
    handleFavoriteRaffleClick,
    favoriteRafflesResult,
    isFetchingNextPage,
    isLoadingFavoriteRaffles,
    onEndReached,
    hasData,
  } = useFavoriteRaffles();

  return (
    <>
      {isLoadingFavoriteRaffles ? (
        <Loader />
      ) : hasData ? (
        <>
          <FlashList
            data={favoriteRafflesResult}
            renderItem={({ item, index }) => (
              <View w="full" key={index}>
                {item.data.map((raffle, idx) => (
                  <RaffleWidget
                    data={raffle.favorite_raffle}
                    key={idx}
                    onPressRaffle={handleFavoriteRaffleClick}
                  />
                ))}
              </View>
            )}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 10,
            }}
            estimatedItemSize={1000}
          />
          {isFetchingNextPage ? <Loader /> : null}
        </>
      ) : (
        <Text
          content="Não há rifas favoritadas"
          color={THEME.colors.dark_text_color}
        />
      )}
    </>
  );
};

export default FavoriteRaffles;
