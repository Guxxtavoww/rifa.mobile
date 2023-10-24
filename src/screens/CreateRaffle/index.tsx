import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Form, Text } from '@/components';
import { THEME } from '@/styles/theme.styles';
import { commonStyles } from '@/styles/common.styles';

import { createRaffleFormSchema } from './types/form.types';
import { useCreateRaffle } from './hooks/create-raffle.hook';

const CreateRaffle: React.FC = () => {
  const {
    handleSubmit,
    clearPhotosUrls,
    handlePickRafflesPhotos,
    isLoading,
    hasPhotos,
  } = useCreateRaffle();

  return (
    <View style={[commonStyles.screen_container_light]}>
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
        zodSchema={createRaffleFormSchema}
        themeType="light"
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
        customAction1={{
          content: 'Importe imagens da sua rifa',
          onPress: handlePickRafflesPhotos,
          icon: (
            <Feather
              name={!hasPhotos ? 'upload' : 'check'}
              size={20}
              color="#fff"
            />
          ),
        }}
        customAction2={
          hasPhotos
            ? {
                icon: <Feather name="trash" size={20} color="#fff" />,
                content: 'Limpar Fotos',
                onPress: clearPhotosUrls,
              }
            : undefined
        }
      />
    </View>
  );
};

export default CreateRaffle;
