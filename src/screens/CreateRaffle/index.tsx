import React from 'react';
import { ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Form, Text } from '@/components';
import { THEME } from '@/styles/theme.styles';
import { commonStyles } from '@/styles/common.styles';

import PickedImages from './components/PickedImages';
import { createRaffleFormSchema } from './types/form.types';
import { useCreateRaffle } from './hooks/create-raffle.hook';

const CreateRaffle: React.FC = () => {
  const {
    handleSubmit,
    removePhoto,
    handlePickRafflesPhotos,
    isLoading,
    hasPhotos,
    photosUrls,
    clearPhotos,
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
      <Form
        // @ts-ignore
        zodSchema={createRaffleFormSchema}
        themeType="light"
        bottomFormElement={
          hasPhotos ? (
            <PickedImages imagesUris={photosUrls} onImagePress={removePhoto} />
          ) : undefined
        }
        inputs={[
          {
            name: 'raffle_title',
            type: 'text',
            placeholder: 'Insira o titulo da rifa',
          },
          {
            name: 'raffle_description',
            type: 'textarea',
            placeholder: 'Insira uma pequena descrição...',
          },
          {
            name: 'raffle_subscription_price',
            type: 'decimal',
            placeholder: 'Preço da rifa',
            InputLeftElement: (
              <Text
                content="R$:"
                fontWeight="medium"
                color={THEME.colors.dark_text_color}
                style={{
                  paddingLeft: 12,
                }}
              />
            ),
          },
          {
            name: 'maximum_people_quantity',
            type: 'number',
            placeholder: 'Número máximo de pessoas',
          },
          {
            name: 'due_date',
            type: 'date',
            label: 'Insira a data final',
          },
        ]}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        submitButtonText="Criar Rifa"
        onResetForm={clearPhotos}
        resetAfterSubmit
        customAction1={
          !hasPhotos
            ? {
                content: 'Importe imagens da sua rifa',
                onPress: handlePickRafflesPhotos,
                icon: (
                  <Feather
                    name={!hasPhotos ? 'upload' : 'check'}
                    size={20}
                    color="#fff"
                  />
                ),
              }
            : undefined
        }
      />
    </ScrollView>
  );
};

export default CreateRaffle;
