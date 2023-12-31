import React from 'react';
import { ScrollView } from 'react-native';
import { Avatar, HStack, VStack, View } from 'native-base';

import { THEME } from '@/styles/theme.styles';
import { commonStyles } from '@/styles/common.styles';
import { GoBackButton, Loader, Text } from '@/components';

import { useRaffle } from './hooks/raffle.hook';
import {
  PhotosSlider,
  SelectNames,
  RaffleDetails,
  RaffleVideo,
} from './components';

const Raffle: React.FC<ScreenProps> = ({ route, navigation }) => {
  const {
    isLoading,
    raffle,
    photos_urls,
    owner_name,
    owner_photo_url,
    buyNamesMutation,
    isLoadingNamesBought,
    isRaffleFavorited,
    handleRaffleFavoritation,
    isMutating,
  } = useRaffle(route.params.raffle_id);

  return (
    <ScrollView
      style={[commonStyles.screen_container_light]}
      scrollEnabled
      showsVerticalScrollIndicator={false}
    >
      {isLoading || !raffle ? (
        <Loader size={40} />
      ) : (
        <VStack flex={1} pb="10">
          <HStack justifyContent="space-between" w="full">
            <GoBackButton
              onPress={() =>
                navigation.replace('main-raffles', {
                  query: route.params?.currentSearch || '',
                })
              }
              iconSize={18}
              color="black"
              removeMarginLeft
            />
            <HStack
              space={4}
              alignItems="center"
              justifyContent="center"
              backgroundColor="#fff"
              borderTopLeftRadius="2xl"
              borderTopRightRadius="2xl"
              px="4"
              py="1"
              marginRight="4"
            >
              <Avatar
                source={
                  raffle.owner.user_photo_url
                    ? { uri: raffle.owner.user_photo_url }
                    : require('@/assets/jpg/no-profile-pic.jpg')
                }
                size="sm"
              />
              <Text
                content={raffle.owner.user_name || raffle.owner.user_email}
                color={THEME.colors.dark_text_color}
                fontSize="small"
                fontWeight="bold"
              />
            </HStack>
            <VStack />
          </HStack>
          <RaffleVideo uri={raffle.raffle_demo_video_url} />
          {photos_urls?.length ? (
            <PhotosSlider photos_urls={photos_urls} />
          ) : null}
          <SelectNames
            maxAmountOfNames={raffle.available_quantity!}
            onSelectNameAmount={buyNamesMutation}
            namePrice={raffle.raffle_subscription_price}
            isLoading={isLoadingNamesBought}
            owner_id={raffle.owner.user_id || ''}
          />
          <RaffleDetails
            data={{
              raffle_description: raffle.raffle_description,
              raffle_title: raffle.raffle_title,
              owner_name,
              owner_photo_url,
              owner_id: raffle.owner.user_id,
            }}
            isRaffleFavorited={isRaffleFavorited}
            handleFavoriteIconPress={handleRaffleFavoritation}
            isLoading={isMutating}
          />
        </VStack>
      )} 
    </ScrollView>
  );
};

export default Raffle;
