import React from 'react';
import { View as RNView } from 'react-native';
import { VStack, View } from 'native-base';
import { FlashList } from '@shopify/flash-list';

import { THEME } from '@/styles/theme.styles';
import { commonStyles } from '@/styles/common.styles';
import { Button, Loader, SearchInput, Text } from '@/components';

import Categories from './components/Categories';
import RaffleWidget from './components/RaffleWidget';
import { useMainRaffles } from './hooks/main-raffles.hook';

const MainRaffles: React.FC<ScreenProps> = ({ navigation, route }) => {
  const {
    handleSearchRaffle,
    handleCreateRaffleButtonPress,
    categoriesResonse,
    isLoadingCategories,
    getOwnerWidgetContent,
    isFetchingNextPage,
    isLoadingMainRaffles,
    mainRafflesResult,
    onEndReached,
    searchQueryText,
    handleCategoryPress,
    currentCategoryId,
  } = useMainRaffles(String(route.params?.query || ''));

  return (
    <RNView style={[commonStyles.screen_container_light]}>
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
        onCategoryPress={handleCategoryPress}
        isLoading={isLoadingCategories}
        currentCategoryId={currentCategoryId}
      />
      {isLoadingMainRaffles ? (
        <Loader
          size={20}
          textProps={{
            content: 'Carregando Rifas...',
            color: THEME.colors.secondary_dark_text_color,
          }}
        />
      ) : (
        <VStack flex={1} w="full">
          <Text
            content={
              !searchQueryText
                ? 'Principais Rifas'
                : `Resultados para: ${searchQueryText}`
            }
            color={THEME.colors.secondary_dark_text_color}
            fontWeight="medium"
            fontSize="large"
            style={{
              marginBottom: 10,
            }}
          />
          {mainRafflesResult && mainRafflesResult[0]?.meta.total === 0 ? (
            <Text
              content="Não há rifas"
              color={THEME.colors.dark_text_color}
              fontWeight="medium"
            />
          ) : (
            <>
              <FlashList
                data={mainRafflesResult}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                snapToEnd
                snapToAlignment="end"
                renderItem={({ index: wrapperIndex, item }) => (
                  <View key={wrapperIndex}>
                    {item.data.map((raffle, index) => (
                      <RaffleWidget
                        data={raffle}
                        getOwnerWidgetContent={getOwnerWidgetContent}
                        push={navigation.push}
                        key={index}
                      />
                    ))}
                  </View>
                )}
                scrollEnabled
                refreshing={isLoadingCategories}
                showsVerticalScrollIndicator={false}
                estimatedItemSize={100000}
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
        </VStack>
      )}
    </RNView>
  );
};

export default MainRaffles;
