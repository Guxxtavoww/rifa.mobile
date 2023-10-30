import React from 'react';
import { VStack } from 'native-base';
import { View, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { useRedux } from '@/hooks';
import { Loader, Text } from '@/components';
import { THEME } from '@/styles/theme.styles';
import { commonStyles } from '@/styles/common.styles';

import { useRaffle } from './hooks/raffles.hook';

const Raffle: React.FC<ScreenProps> = ({ route }) => {
  const { isLoading, raffle } = useRaffle(route.params.raffle_id);

  const user_id = useRedux().useAppSelector(
    (state) => state.auth.user_data!.user_id
  );

  return (
    <View style={[commonStyles.screen_container_light]}>
      {isLoading ? (
        <Loader size={40} />
      ) : (
        <VStack>
          <Text
            content={`Dono da Rifa: ${
              raffle?.owner_id === user_id ? 'Voce' : raffle?.owner_id!
            }`}
            color={THEME.colors.dark_text_color}
            style={{ marginBottom: 10 }}
          />
          {raffle?.photos.map(({ photo_url }, index) => (
            <Image
              source={{ uri: photo_url }}
              alt={`Rifa: ${index}`}
              key={index}
              style={{
                backgroundColor: '#000',
                width: 100,
                height: 100,
              }}
            />
          ))}
        </VStack>
      )}
    </View>
  );
};

export default Raffle;
