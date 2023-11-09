import React from 'react';
import { ScrollView } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { Button, Loader, SearchInput } from '@/components';
import { commonStyles } from '@/styles/common.styles';

import Categories from './components/Categories';
import { useMainRaffles } from './hooks/main-raffles.hook';
import { THEME } from '@/styles/theme.styles';
import { VStack, View } from 'native-base';
import RaffleWidget from '../Search/components/RaffleWidget';

const MainRaffles: React.FC<ScreenProps> = ({ navigation }) => {
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
          <FlashList
            data={mainRafflesResult}
            renderItem={({ index: wrapperIndex, item }) => (
              <View key={wrapperIndex}>
                {item.data.map((raffle, index) => (
                  <RaffleWidget
                    data={raffle}
                    getOwnerWidgetContent={getOwnerWidgetContent}
                    push={navigation.push}
                    origin="main-raffles"
                    key={index}
                  />
                ))}
              </View>
            )}
            scrollEnabled
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
        </VStack>
      )}
    </ScrollView>
  );
};

export default MainRaffles;
