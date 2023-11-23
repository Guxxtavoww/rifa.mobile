import React from 'react';
import { ScrollView } from 'react-native';
import { Pressable, VStack } from 'native-base';
import { Feather } from '@expo/vector-icons';

import { Button, Text } from '@/components';
import { THEME } from '@/styles/theme.styles';
import { commonStyles } from '@/styles/common.styles';

import { useChooseVideo } from './hooks/choose-video.hook';
import VideoPreview from './components/VideoPreview';

const ChooseVideo: React.FC<ScreenProps> = ({ navigation }) => {
  const {
    handleImportVideo,
    videoUri,
    handleNextButtonPress,
    handleClearVideoUri,
  } = useChooseVideo(navigation.replace);

  return (
    <ScrollView
      style={[commonStyles.screen_container_light]}
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
      }}
      scrollEnabled
    >
      <Text
        content="Crie Sua Rifa"
        color={THEME.colors.dark_text_color}
        fontSize="extraLarge"
        fontWeight="bold"
      />
      {!videoUri ? (
        <VStack alignItems="center" w="full" space={2.5}>
          <VStack space={1} alignItems="center">
            <Text
              content="Faça o upload do video"
              fontSize="large"
              fontWeight="bold"
              color={THEME.colors.dark_text_color}
              style={{
                textAlign: 'center',
              }}
            />
            <Text
              content="(Max 1min & 175Mb)"
              fontSize="small"
              fontWeight="medium"
              color={THEME.colors.dark_text_color}
            />
          </VStack>
          <Pressable
            onPress={handleImportVideo}
            p="4"
            borderRadius="md"
            _pressed={{
              opacity: 0.85,
            }}
          >
            <Feather name="upload" color="#C9C9C9" size={90} />
          </Pressable>
        </VStack>
      ) : (
        <VideoPreview
          videoUri={videoUri}
          onClearButtonPress={handleClearVideoUri}
        />
      )}
      <Button
        content="Próximo"
        disabled={!videoUri}
        onPress={handleNextButtonPress}
        borderRadius="full"
        textFontSize="normalLarge"
        textFontWeight="bold"
        _disabled={{
          backgroundColor: 'orange.900',
        }}
      />
    </ScrollView>
  );
};

export default ChooseVideo;
