import React, { useCallback } from 'react';
import { Select } from 'native-base';
import { Feather } from '@expo/vector-icons';

import { Loader } from '@/components';
import { THEME } from '@/styles/theme.styles';

interface iSelectCategoryProps {
  isLoading: boolean;
  categoriesOptions: SelectOptions | undefined;
  onSelectCategory: (category_id: string) => void;
}

const SelectCategory: React.FC<iSelectCategoryProps> = ({
  isLoading,
  categoriesOptions,
  onSelectCategory,
}) => {
  const onValueChange = useCallback(
    (itemValue: string) => {
      onSelectCategory(itemValue);
    },
    [onSelectCategory]
  );

  return (
    <Select
      onValueChange={onValueChange}
      borderRadius="full"
      w="full"
      h="full"
      fontFamily={THEME.fonts.medium}
      bg="#fff"
      fontSize="md"
      borderColor="black"
      focusable={false}
      isFocusVisible={false}
      isFocused={false}
      placeholder="Selecione Categorias"
      _item={{
        borderRadius: 'lg',
        _important: {
          fontFamily: THEME.fonts.bold,
          fontSize: 'md',
        },
      }}
      dropdownIcon={
        isLoading ? (
          <Loader size={24} />
        ) : (
          <Feather
            name="chevron-down"
            size={24}
            color="#d0cfcf"
            style={{ marginRight: 10 }}
          />
        )
      }
      collapsable={true}
      pl="5"
      _selectedItem={{
        fontSize: 'md',
        bg: THEME.colors.orange_color,
        borderRadius: 'lg',
        _important: {
          color: '#fff',
        },
      }}
    >
      <Select.Item label="Selecione Categorias" value="" isDisabled />
      {categoriesOptions?.map((option, index) => (
        <Select.Item {...option} fontFamily={THEME.fonts.bold} key={index} />
      ))}
    </Select>
  );
};

export default SelectCategory;
