import { Avatar, Pressable, VStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import { Loader, Text } from '@/components';
import { THEME } from '@/styles/theme.styles';
import { useRedux } from '@/hooks';

interface iUserAvatarProps {
  isLoading: boolean;
  updateUserPhoto: () => Promise<void>;
  avatarSource: any;
}

const UserAvatar: React.FC<iUserAvatarProps> = ({
  avatarSource,
  isLoading,
  updateUserPhoto,
}) => {
  const user = useRedux().useAppSelector(
    (state) =>
      state.auth.user_data!.user_name || state.auth.user_data!.user_email
  );

  return (
    <VStack alignItems="center" space={2} mb="2">
      <Avatar source={avatarSource} size="2xl">
        <Avatar.Badge>
          <Pressable
            alignItems="center"
            justifyContent="center"
            w="full"
            h="full"
            borderRadius="full"
            onPress={updateUserPhoto}
            bg="white"
            _pressed={{
              bg: 'gray.300',
            }}
          >
            {isLoading ? (
              <Loader size={16} />
            ) : (
              <MaterialIcons
                name="edit"
                color={THEME.colors.secondary_dark_text_color}
                size={16}
              />
            )}
          </Pressable>
        </Avatar.Badge>
      </Avatar>
      <Text
        content={user}
        color={THEME.colors.secondary_dark_text_color}
        fontSize="large"
        fontWeight="bold"
        style={{
          textShadowColor: 'rgba(0, 0, 0, 0.20)',
          textShadowOffset: {
            width: 2,
            height: 2,
          },
          textAlign: 'center',
        }}
      />
    </VStack>
  );
};

export default UserAvatar;
