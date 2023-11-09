import React from 'react';
import { FlatList, Pressable, Skeleton } from 'native-base';

import { Text } from '@/components';
import { THEME } from '@/styles/theme.styles';

import { iCategory } from '../types/responses.types';

interface iCategoriesProps {
  onCategoryPress: (category_name: string) => void;
  categories: iCategory[] | undefined;
  isLoading?: boolean;
}

const Categories: React.FC<iCategoriesProps> = ({
  categories,
  onCategoryPress,
  isLoading,
}) => {
  if (isLoading) return <Skeleton w="full" h="45px" />;

  if (!categories || !categories.length) return null;

  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <Pressable
          key={index}
          w="container"
          h="45px"
          onPress={() => onCategoryPress(item.raffle_category_name)}
          bg={THEME.colors.secondary_dark_text_color}
          borderRadius="2xl"
          borderColor={THEME.colors.secondary_dark_text_color}
          borderWidth="1"
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
      w="full"
    />
  );
};

export default Categories;
