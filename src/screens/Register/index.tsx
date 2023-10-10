import { View } from 'react-native';

import { Form, Text } from '@/components';
import { commonStyles } from '@/styles/common.styles';

import { registerFormSchema } from './types/form.types';
import { registerStyles } from './styles';

const Register: React.FC = () => {
  return (
    <View
      style={[
        commonStyles.screen_container_dark,
        registerStyles.register_container,
      ]}
    >
      <Text
        content="Cadastrar-se"
        style={{ marginBottom: 6 }}
        type="title"
        fontSize="large"
      />
      <Form
        inputs={[
          {
            name: 'name',
            type: 'text',
            placeholder: 'Insira um nome de usuário',
            autoFocus: true,
          },
          {
            name: 'user_email',
            type: 'text',
            placeholder: 'Insira um e-mail',
            autoComplete: 'email',
          },
          {
            name: 'user_password',
            type: 'password',
            placeholder: 'Insira uma senha',
          },
        ]}
        zodSchema={registerFormSchema}
        handleSubmit={(data) => console.log(data)}
        submitButtonText="Fazer Cadastro"
      />
    </View>
  );
};

export default Register;
