import React from 'react';
import { HStack, View } from 'native-base';
import { FlashList } from '@shopify/flash-list';

import { Button, Loader, Text } from '@/components';
import { THEME } from '@/styles/theme.styles';

import MyRaffle from './components/MyRaffle';
import { useMyRaffles } from './hooks/my-raffles.hook';

const MyRaffles: React.FC = () => {
  const {
    handleShowFinalizedRaffles,
    handleShowRafflesToFinalize,
    isShowingRafflesToFinalize,
    handleRafflePress,
    isFetchingNextPage,
    isLoading,
    myRafflesResult,
    onEndReached,
    hasData,
  } = useMyRaffles();

  return (
    <>
      <HStack
        space={2}
        px={1}
        justifyContent="space-between"
        alignItems="center"
        w="full"
        mb="6"
      >
        <Button
          content="Rifas a finalizar"
          flex="1"
          borderRadius="full"
          bg={
            isShowingRafflesToFinalize ? THEME.colors.orange_color : '#0d0d0d'
          }
          onPress={handleShowRafflesToFinalize}
        />
        <Button
          content="Finalizadas"
          flex="1"
          borderRadius="full"
          bg={
            isShowingRafflesToFinalize ? '#0d0d0d' : THEME.colors.orange_color
          }
          onPress={handleShowFinalizedRaffles}
        />
      </HStack>
      {isLoading ? (
        <Loader />
      ) : hasData ? (
        <>
          <FlashList
            data={myRafflesResult}
            renderItem={({ item, index }) => (
              <View w="full" key={index}>
                {item.data.map((raffle, idx) => (
                  <MyRaffle
                    data={raffle}
                    key={idx}
                    onPressRaffle={handleRafflePress}
                  />
                ))}
              </View>
            )}
            pagingEnabled
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
            contentContainerStyle={{
              paddingBottom: 10,
            }}
            estimatedItemSize={1000}
          />
          {isFetchingNextPage ? <Loader /> : null}
        </>
      ) : (
        <Text content="Não há rifas" color={THEME.colors.dark_text_color} />
      )}
    </>
  );
};

export default MyRaffles;
