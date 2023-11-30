import React from 'react';
import { Avatar, HStack, View, VStack } from 'native-base';
import { View as RNView } from 'react-native';

import { Text } from '@/components';
import { THEME } from '@/styles/theme.styles';

import { useRaffleComments } from '../../../hooks/raffle-comments.hook';

interface iRaffleCommentsProps {
  raffle_id: string;
}

const RaffleComments: React.FC<iRaffleCommentsProps> = ({ raffle_id }) => {
  const {
    createRaffleCommentMutation,
    hasComments,
    isFetchingNextPage,
    isLoading,
    onEndReached,
    raffleCommentsResult,
    user_photo_url,
  } = useRaffleComments(raffle_id);

  return (
    <RNView
      style={{
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 16,
        height: '50%',
        flexDirection: 'column',
        paddingHorizontal: 8,
        paddingVertical: 10,
      }}
    >
      <View
        w="full"
        minHeight="20"
        py="1"
        alignItems="center"
        justifyContent="center"
        borderBottomColor="#D9D9D9"
        borderBottomWidth="1"
      >
        <Text
          content="Comentários"
          color={THEME.colors.dark_text_color}
          fontSize="large"
        />
      </View>
      <View
        w="full"
        minHeight="20"
        borderTopColor="#D9D9D9"
        borderTopWidth="1"
        justifyContent="flex-start"
      >
        <HStack space={2} alignItems="center">
          <Avatar source={user_photo_url} size="md" />
        </HStack>
      </View>
    </RNView>
  );
};

export default RaffleComments;
