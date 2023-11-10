import React from 'react';
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
    renderItem={({ index, item }) => (
      <Pressable
        alignItems="center"
        justifyContent="space-between"
        w="container"
        borderRadius="2xl"
        mr="3"
        onPress={() => onSelectedCategoryPress(item.value)}
        key={index}
        py="2"
        px="1"
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

export default SelectedCategories;
