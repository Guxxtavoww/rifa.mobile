import React, { memo } from 'react';
import { Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
  Avatar,
  FlatList,
  HStack,
  Input,
  Pressable,
  VStack,
  View,
} from 'native-base';

import { Loader, Text } from '@/components';
import { THEME } from '@/styles/theme.styles';

import { useRaffleComments } from '../../../hooks/raffle-comments.hook';

interface iRaffleCommentsProps {
  raffle_id: string;
  handleClose: () => void;
}

const RaffleComments: React.FC<iRaffleCommentsProps> = ({
  raffle_id,
  handleClose,
}) => {
  const {
    createRaffleCommentMutation,
    hasComments,
    isFetchingNextPage,
    isLoading,
    onEndReached,
    raffleCommentsResult,
    getUserAvatarSource,
    animatedValue,
    commentText,
    handleCommentInputChange,
  } = useRaffleComments(raffle_id);

  return (
    <Animated.View
      style={{
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 16,
        height: '50%',
        flexDirection: 'column',
        paddingHorizontal: 8,
        paddingVertical: 10,
        zIndex: 8,
        opacity: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.75, 1],
        }),
        transform: [
          {
            translateY: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['50%', '0%'],
            }),
          },
        ],
      }}
    >
      <HStack
        w="full"
        minHeight="20"
        py="1"
        alignItems="center"
        justifyContent="space-between"
        borderBottomColor="#D9D9D9"
        borderBottomWidth="1"
      >
        <View />
        <Text
          content="Comentários"
          color={THEME.colors.dark_text_color}
          fontSize="large"
        />
        <Pressable
          p="2"
          onPress={handleClose}
          borderRadius="md"
          _pressed={{
            bg: 'gray.100',
          }}
        >
          <Feather name="x" color={THEME.colors.dark_text_color} />
        </Pressable>
      </HStack>
      <View
        w="full"
        h="full"
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        {hasComments ? (
          <>
            <FlatList
              data={raffleCommentsResult}
              renderItem={({ index: wrapperIndex, item }) => (
                <View key={wrapperIndex}>
                  {item.data.map((raffle, index) => (
                    <HStack
                      key={index}
                      space={2}
                      w="full"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Avatar
                        source={getUserAvatarSource(
                          raffle.commented_by.user_photo_url
                        )}
                        size="md"
                      />
                      <VStack alignItems="flex-start" space={2}>
                        <Text
                          content={
                            raffle.commented_by.user_name ||
                            raffle.commented_by.user_email
                          }
                          color={THEME.colors.dark_text_color}
                          fontSize="normalLarge"
                          fontWeight="bold"
                        />
                        <Text
                          content={raffle.comment_text}
                          fontSize="normal"
                          color={THEME.colors.dark_text_color}
                        />
                      </VStack>
                    </HStack>
                  ))}
                </View>
              )}
              scrollEnabled
              refreshing={isLoading}
              showsVerticalScrollIndicator={false}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.1}
              w="full"
              h="full"
              flex={1}
              mb="1"
            />
            {isFetchingNextPage ? <Loader /> : null}
          </>
        ) : (
          <Text
            content="Não comentários"
            color={THEME.colors.dark_text_color}
            fontSize="large"
          />
        )}
      </View>
      <View
        w="full"
        minHeight="20"
        borderTopColor="#D9D9D9"
        borderTopWidth="1"
        justifyContent="flex-start"
      >
        <HStack space={2} alignItems="center" flex={1}>
          <Avatar source={getUserAvatarSource(undefined, true)} size="md" />
          <Input
            flex={1}
            h="10"
            placeholderTextColor="#C9C9C9"
            fontSize="sm"
            placeholder="Adicione um comentário..."
            color={THEME.colors.dark_text_color}
            borderWidth="0"
            value={commentText}
            onChangeText={handleCommentInputChange}
            _focus={{
              borderBottomColor: THEME.colors.dark_text_color,
              borderBottomWidth: '1',
            }}
          />
          <Text
            content={`${commentText.length}/170`}
            color={THEME.colors.dark_text_color}
            fontWeight="bold"
          />
          <Pressable
            p="2"
            bg={THEME.colors.orange_color}
            borderRadius="md"
            onPress={() => createRaffleCommentMutation(commentText)}
            isDisabled={commentText.length >= 170}
            _disabled={{
              bg: 'orange.100',
            }}
          >
            {isLoading ? (
              <Loader color="#fff" size={20} />
            ) : (
              <Feather name="send" color="#fff" size={20} />
            )}
          </Pressable>
        </HStack>
      </View>
    </Animated.View>
  );
};

export default memo(RaffleComments);
