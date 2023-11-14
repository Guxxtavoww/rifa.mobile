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
import RaffleDemoVideo from './components/RaffleDemoVideo';

const CreateRaffle: React.FC = () => {
  const {
    removePhoto,
    handlePickRafflesPhotos,
    isLoading,
    hasPhotos,
    photosUrls,
    categoriesOptions,
    methods,
    handleSelectCategory,
    handleDeleteCategory,
    selectedCategories,
    handleHookFormSubmit,
    handleSubmit,
    handlePickRaffleVideo,
    videoUri,
    clearCurrentVideo,
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
        <VStack w="full" pb="6">
          <Input
            name="raffle_title"
            type="text"
            placeholder="Insira o titulo da rifa"
            themeType="light"
            mb="0"
          />
          <TextArea
            name="raffle_description"
            themeType="light"
            placeholder="Insira uma pequena descrição..."
            mb="0"
          />
          <HStack
            alignItems="center"
            justifyContent="center"
            w="full"
            space="2"
          >
            <Input
              name="raffle_subscription_price"
              type="decimal"
              placeholder="Preço da rifa"
              themeType="light"
              flex={1}
            />
            <Input
              name="maximum_people_quantity"
              type="number"
              placeholder="N° de Nomes"
              themeType="light"
              flex={1}
            />
          </HStack>
          <HStack
            alignItems="center"
            justifyContent="center"
            w="full"
            space="2"
            h="12"
          >
            <DateInput
              name="due_date"
              label="Insira a data final"
              formControlProps={{
                justifyContent: 'flex-end',
                flex: 1,
              }}
            />
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
          {!videoUri ? (
            <Button
              content="Importe um vídeo para sua rifa"
              onPress={handlePickRaffleVideo}
              mt="3"
              icon={<Feather name="video" size={20} color="#fff" />}
            />
          ) : (
            <RaffleDemoVideo
              onClearButtonPress={clearCurrentVideo}
              videoUri={videoUri}
            />
          )}
          {!hasPhotos ? (
            <Button
              content="Importe imagens da sua rifa"
              onPress={handlePickRafflesPhotos}
              mt="3"
              icon={<Feather name="camera" size={20} color="#fff" />}
            />
          ) : (
            <PickedImages imagesUris={photosUrls} onImagePress={removePhoto} />
          )}
          <Button
            onPress={handleHookFormSubmit(handleSubmit)}
            isLoading={isLoading}
            content="Criar Rifa"
            mt="3"
          />
        </VStack>
      </FormProvider>
    </ScrollView>
  );
};

export default CreateRaffle;
