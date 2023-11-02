import React from 'react';
import { VStack } from 'native-base';
import { ScrollView } from 'react-native';

import { useRedux } from '@/hooks';
import { Loader, Text } from '@/components';
import { commonStyles } from '@/styles/common.styles';

import { PhotosSlider, SelectNames } from './components';
import { useRaffle } from './hooks/raffles.hook';

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
        <VStack>
          <PhotosSlider
            photos_urls={raffle?.photos.map((item) => item.photo_url)}
          />
          <SelectNames
            maxAmountOfNames={raffle?.maximum_people_quantity!}
            onSelectNameAmount={(value) => console.log(value)}
          />
        </VStack>
      )}
    </ScrollView>
  );
};

export default Raffle;
