import React from 'react';
import { FlatList, Pressable, Skeleton, VStack } from 'native-base';

import { Text } from '@/components';
import { THEME } from '@/styles/theme.styles';

import { iCategory } from '../types/responses.types';

interface iCategoriesProps {
  currentCategoryId?: number | undefined;
  onCategoryPress: (category_id: number) => void;
  categories: iCategory[] | undefined;
  isLoading?: boolean;
}

const Categories: React.FC<iCategoriesProps> = ({
  categories,
  onCategoryPress,
  isLoading,
  currentCategoryId,
}) => {
  if (isLoading) return <Skeleton w="full" h="45px" />;

  if (!categories || !categories.length) return null;

  return (
    <VStack alignItems="flex-start" space={2}>
      <Text
        content="Categorias"
        color={THEME.colors.secondary_dark_text_color}
        fontWeight="medium"
        fontSize="large"
      />
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        mb="3"
        maxHeight="10"
        w="full"
        renderItem={({ item, index }) => (
          <Pressable
            key={index}
            w="container"
            h="10"
            maxHeight="10"
            onPress={() => onCategoryPress(item.raffle_category_id)}
            bg={
              currentCategoryId === item.raffle_category_id
                ? THEME.colors.orange_color
                : THEME.colors.secondary_dark_text_color
            }
            borderRadius="2xl"
            _pressed={{
              opacity: 0.85,
            }}
            alignItems="center"
            justifyContent="center"
            mr="4"
            px="2"
          >
            <Text
              content={item.raffle_category_name}
              color="#fff"
              fontWeight="bold"
              fontSize="normal"
            />
          </Pressable>
        )}
      />
    </VStack>
  );
};

export default Categories;
