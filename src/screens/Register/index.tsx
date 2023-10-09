import { View } from 'react-native';

import { Text } from '@/components';

import { registerStyles } from './styles';

const Register: React.FC = () => {
  return (
    <View style={registerStyles.register_container}>
      <Text content="Cadastro" type="title" />
    </View>
  );
};

export default Register;
