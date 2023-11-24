import React from 'react';
import { FlashList } from '@shopify/flash-list';

import { useFavoriteRaffles } from './hooks/favorite-raffles.hook';

const FavoriteRaffles: React.FC = () => {
  const {
    handleFavoriteRaffleClick,
    favoriteRafflesResult,
    isFetchingNextPage,
    isLoadingFavoriteRaffles,
    onEndReached,
  } = useFavoriteRaffles();

  return (
    <>
      <FlashList
        data={favoriteRafflesResult}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        pagingEnabled
        renderItem={({ index: wrapperIndex, item }) => <></>}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        estimatedItemSize={100000}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
      />
    </>
  );
};

export default FavoriteRaffles;
