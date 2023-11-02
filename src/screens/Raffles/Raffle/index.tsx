import React from 'react';
import { VStack } from 'native-base';
import { ScrollView } from 'react-native';

import { useRedux } from '@/hooks';
import { Loader, Text } from '@/components';
import { commonStyles } from '@/styles/common.styles';

import { useRaffle } from './hooks/raffles.hook';
import { PhotosSlider, SelectNames, RaffleDetails } from './components';

const Raffle: React.FC<ScreenProps> = ({ route, navigation }) => {
  const { isLoading, raffle } = useRaffle(route.params.raffle_id);

  const user_id = useRedux().useAppSelector(
    (state) => state.auth.user_data!.user_id
  );

  return (
    <ScrollView style={[commonStyles.screen_container_light]}>
      {isLoading ? (
        <Loader size={40} />
      ) : (
        <VStack space={6} flex={1} pb="10">
          <PhotosSlider
            photos_urls={raffle?.photos.map((item) => item.photo_url)}
          />
          <SelectNames
            maxAmountOfNames={raffle?.maximum_people_quantity!}
            onSelectNameAmount={(value) => console.log(value)}
          />
          <RaffleDetails
            raffle_description={raffle?.raffle_description}
            raffle_title={raffle?.raffle_title}
          />
        </VStack>
      )}
    </ScrollView>
  );
};

export default Raffle;
