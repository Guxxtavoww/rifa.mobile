import React from 'react';
import { ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FormProvider } from 'react-hook-form';
import { HStack, VStack } from 'native-base';

import { Button, Text } from '@/components';
import { THEME } from '@/styles/theme.styles';
import { commonStyles } from '@/styles/common.styles';
import { Input, TextArea, DateInput } from '@/components/tools/Form/components';

import PickedImages from './components/PickedImages';
import SelectCategory from './components/SelectCategory';
import { useCreateRaffle } from './hooks/create-raffle.hook';
import SelectedCategories from './components/SelectedCategories';

const CreateRaffle: React.FC = () => {
  const {
    removePhoto,
    handlePickRafflesPhotos,
    isLoading,
    hasPhotos,
    photosUrls,
    categoriesOptions,
    methods,
    onSubmitButtonPress,
    handleSelectCategory,
    handleDeleteCategory,
    selectedCategories,
  } = useCreateRaffle();

  return (
    <ScrollView style={[commonStyles.screen_container_light]} scrollEnabled>
      <Text
        content="Crie Sua Rifa"
        fontSize="large"
        fontWeight="bold"
        color={THEME.colors.dark_text_color}
        style={{
          marginBottom: 10,
          textAlign: 'center',
        }}
      />
      <FormProvider {...methods}>
        <VStack space={4} w="full">
          <Input
            name="raffle_title"
            type="text"
            placeholder="Insira o titulo da rifa"
            themeType="light"
          />
          <TextArea
            name="raffle_description"
            themeType="light"
            placeholder="Insira uma pequena descrição..."
          />
          <HStack alignItems="center" w="full" space="1">
            <Input
              name="raffle_subscription_price"
              type="decimal"
              placeholder="Preço da rifa"
              themeType="light"
              InputLeftElement={
                <Text
                  content="R$:"
                  fontWeight="medium"
                  color={THEME.colors.dark_text_color}
                  style={{
                    paddingLeft: 12,
                  }}
                />
              }
            />
            <Input
              name="maximum_people_quantity"
              type="number"
              placeholder="Número máximo de pessoas"
              themeType="light"
            />
          </HStack>
          <HStack alignItems="center" w="full" space="1">
            <DateInput name="due_date" label="Insira a data final" />
            <SelectCategory
              categoriesOptions={categoriesOptions}
              isLoading={isLoading}
              onSelectCategory={handleSelectCategory}
            />
          </HStack>
          {selectedCategories.length > 0 ? (
            <SelectedCategories
              onSelectedCategoryPress={handleDeleteCategory}
              selectedCategories={selectedCategories}
            />
          ) : null}
          {!hasPhotos ? (
            <Button
              content="Importe imagens da sua rifa"
              onPress={handlePickRafflesPhotos}
              icon={
                <Feather
                  name={!hasPhotos ? 'upload' : 'check'}
                  size={20}
                  color="#fff"
                />
              }
            />
          ) : (
            <PickedImages imagesUris={photosUrls} onImagePress={removePhoto} />
          )}
          <Button
            onPress={onSubmitButtonPress}
            isLoading={isLoading}
            content="Criar Rifa"
          />
        </VStack>
      </FormProvider>
    </ScrollView>
  );
};

export default CreateRaffle;
