import React from 'react';
import { View } from 'native-base';
import { FlashList } from '@shopify/flash-list';

import { Loader, Text } from '@/components';
import { THEME } from '@/styles/theme.styles';

import RaffleWidget from '../shared/components/RaffleWidget';
import { useBoughtRaffles } from './hooks/bought-raffles.hook';

const BoughtRaffles: React.FC = () => {
  const {
    boughtRafflesResult,
    handleRafflePress,
    hasData,
    isFetchingNextPage,
    isLoading,
    onEndReached,
  } = useBoughtRaffles();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : hasData ? (
        <>
          <FlashList
            data={boughtRafflesResult}
            renderItem={({ item, index }) => (
              <View w="full" key={index}>
                {item.data.map((raffle, idx) => (
                  <RaffleWidget
                    data={raffle}
                    key={idx}
                    onPressRaffle={handleRafflePress}
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
          content="Não há rifas compradas"
          color={THEME.colors.dark_text_color}
        />
      )}
    </>
  );
};

export default BoughtRaffles;
