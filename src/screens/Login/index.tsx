import { View, TouchableOpacity } from 'react-native';
import { VStack } from 'native-base';

import { Form, Text } from '@/components';
import { THEME } from '@/styles/theme.styles';
import { commonStyles } from '@/styles/common.styles';

import { loginStyles } from './styles';
import { useLogin } from './hooks/login.hook';
import { loginFormSchema } from './types/form.types';

const Login: React.FC<ScreenProps> = ({ navigation }) => {
  const { handleSubmit, isLoading } = useLogin();

  return (
    <View
      style={[commonStyles.screen_container_dark, loginStyles.login_container]}
    >
      <Text
        content="Login"
        type="title"
        style={{
          marginBottom: 10,
        }}
        fontSize="extraLarge"
      />
      <Form
        inputs={[
          {
            name: 'user_email',
            type: 'email',
            placeholder: 'Insira um e-mail',
            autoComplete: 'email',
            autoCapitalize: 'none',
            autoFocus: true,
          },
          {
            name: 'user_password',
            type: 'password',
            placeholder: 'Insira uma senha',
          },
        ]}
        zodSchema={loginFormSchema}
        submitButtonText="Fazer Login"
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <VStack alignItems="center" w="full" px="1" mt="5">
        <Text
          content="Não tem uma conta ?"
          color={THEME.colors.light_text_color}
          fontSize="normal"
        />
        <TouchableOpacity onPress={() => navigation.push('register')}>
          <Text
            content="Crie sua conta!"
            color={THEME.colors.orange_color}
            fontSize="normal"
            fontWeight="bold"
          />
        </TouchableOpacity>
      </VStack>
    </View>
  );
};

export default Login;
