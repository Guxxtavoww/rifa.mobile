import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { HStack, Pressable, VStack } from 'native-base';

import { Loader, Text } from '@/components';
import { THEME } from '@/styles/theme.styles';
import { useRedux } from '@/hooks';

interface iRaffleDetailsProps {
  data: {
    raffle_title: string | undefined;
    raffle_description: string | undefined;
    owner_name: string | undefined;
    owner_photo_url: Maybe<string>;
    owner_id: string | undefined;
  };
  isRaffleFavorited?: boolean;
  handleFavoriteIconPress: (value: boolean) => Promise<void>;
  isLoading: boolean;
}

const RaffleDetails: React.FC<iRaffleDetailsProps> = ({
  data,
  isRaffleFavorited,
  handleFavoriteIconPress,
  isLoading,
}) => {
  const isFavoriteOptionShowing = useRedux().useAppSelector(
    (state) => state.auth.user_data!.user_id !== data.owner_id
  );

  return (
    <VStack
      w="full"
      borderRadius="2xl"
      justifyContent="center"
      alignItems="flex-start"
      px="3"
      py="3"
      backgroundColor="#fff"
      space={3}
    >
      <VStack
        w="full"
        space={3}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Text
          content={data.raffle_title || ''}
          fontSize="large"
          color={THEME.colors.orange_color}
          fontWeight="bold"
        />
        <Text
          content={data.raffle_description || ''}
          color={THEME.colors.dark_text_color}
          fontSize="normal"
          fontWeight="regular"
          style={{
            textAlign: 'justify',
          }}
        />
      </VStack>
      {isFavoriteOptionShowing ? (
        <HStack w="full" justifyContent="flex-end" px="2">
          <Pressable
            w="9"
            h="9"
            borderRadius="full"
            justifyContent="center"
            alignItems="center"
            _pressed={{
              bg: 'gray.200',
            }}
            onPress={(e) => {
              if (isLoading) {
                return e.preventDefault();
              }

              handleFavoriteIconPress(!!isRaffleFavorited);
            }}
          >
            {isLoading ? (
              <Loader size={25} color={THEME.colors.dark_text_color} />
            ) : (
              <MaterialIcons
                name={isRaffleFavorited ? 'star' : 'star-border'}
                size={25}
                color={THEME.colors.dark_text_color}
              />
            )}
          </Pressable>
        </HStack>
      ) : null}
    </VStack>
  );
};

export default RaffleDetails;
