import React from 'react';
import { VStack } from 'native-base';
import { ScrollView } from 'react-native';

import { GoBackButton, Loader } from '@/components';
import { commonStyles } from '@/styles/common.styles';

import { useRaffle } from './hooks/raffle.hook';
import { PhotosSlider, SelectNames, RaffleDetails } from './components';

const Raffle: React.FC<ScreenProps> = ({ route, navigation }) => {
  const { isLoading, raffle, photos_urls, owner_name, owner_photo_url } =
    useRaffle(route.params.raffle_id);

  return (
    <ScrollView
      style={[commonStyles.screen_container_light]}
      scrollEnabled
      showsVerticalScrollIndicator={false}
    >
      {isLoading ? (
        <Loader size={40} />
      ) : (
        <VStack space={4} flex={1} pb="10" alignItems="flex-start">
          <GoBackButton
            onPress={() => navigation.replace('search-raffles')}
            iconSize={14}
            color="black"
            removeMarginLeft
          />
          <PhotosSlider photos_urls={photos_urls} />
          <SelectNames
            maxAmountOfNames={raffle?.available_quantity!}
            onSelectNameAmount={(value) => console.log(value)}
          />
          <RaffleDetails
            data={{
              raffle_description: raffle?.raffle_description,
              raffle_title: raffle?.raffle_title,
              owner_name,
              owner_photo_url,
            }}
          />
        </VStack>
      )}
    </ScrollView>
  );
};

export default Raffle;
