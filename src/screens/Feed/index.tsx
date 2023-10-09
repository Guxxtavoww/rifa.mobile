import { View } from 'react-native';

import { Text } from '@/components';

import { feedStyles } from './styles';

const Feed: React.FC = () => {
  return (
    <View style={feedStyles.feed_container}>
      <Text content="Fodase" type="title" />
    </View>
  );
};

export default Feed;
