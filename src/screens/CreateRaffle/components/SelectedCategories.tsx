import React, { memo } from 'react';
import { FlatList, Pressable } from 'native-base';

import { Text } from '@/components';
import { THEME } from '@/styles/theme.styles';

interface iSelectedCategoriesProps {
  selectedCategories: SelectOptions;
  onSelectedCategoryPress: (catecory_id: string) => void;
}

const SelectedCategories: React.FC<iSelectedCategoriesProps> = ({
  onSelectedCategoryPress,
  selectedCategories,
}) => (
  <FlatList
    data={selectedCategories}
    horizontal
    w="full"
    mb="2"
    mt="3"
    renderItem={({ index, item }) => (
      <Pressable
        alignItems="center"
        justifyContent="space-between"
        w="container"
        borderRadius="2xl"
        mr="3"
        onPress={() => onSelectedCategoryPress(item.value)}
        key={index}
        p="2"
        bg="#C4C4C4"
      >
        <Text
          content={item.label}
          fontSize="normal"
          color={THEME.colors.dark_text_color}
        />
      </Pressable>
    )}
  />
);

export default memo(SelectedCategories);
