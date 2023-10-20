import React from 'react';
import { View } from 'react-native';

import { Form, Text } from '@/components';
import { THEME } from '@/styles/theme.styles';
import { commonStyles } from '@/styles/common.styles';
import { createRaffleFormSchema } from './types/form.types';

const CreateRaffle: React.FC = () => {
  return (
    <View style={[commonStyles.screen_container_light]}>
      <Text
        content="Crie Sua Rifa"
        fontSize="large"
        fontWeight="bold"
        color={THEME.colors.dark_text_color}
        style={{
          marginBottom: 10,
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
            name: 'due_date',
            type: 'date',
            label: 'Insira a data final',
          },
        ]}
        handleSubmit={(data) => console.log({ data })}
      />
    </View>
  );
};

export default CreateRaffle;
