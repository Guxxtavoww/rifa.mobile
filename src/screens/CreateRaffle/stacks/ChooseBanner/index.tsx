import React from 'react';
import { VStack } from 'native-base';
import { ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Button, Text } from '@/components';
import { THEME } from '@/styles/theme.styles';
import { commonStyles } from '@/styles/common.styles';

import Banner from './components/Banner';
import { useChooseBanner } from './hooks/choose-banner.hook';

const ChooseBanner: React.FC<ScreenProps> = ({ navigation, route }) => {
  const {
    bannerUri,
    handleChooseRaffleBanner,
    handleNextButtonPress,
    onClearBannerUri,
  } = useChooseBanner(navigation.replace);

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
      <Banner
        bannerUri={bannerUri}
        handleChooseRaffleBanner={handleChooseRaffleBanner}
        onClearBanner={onClearBannerUri}
      />
      <VStack space={2} w="full">
        <Button
          content={bannerUri ? 'Trocar Banner' : 'Adicionar Banner'}
          onPress={handleChooseRaffleBanner}
          borderRadius="full"
          textFontSize="normalLarge"
          textFontWeight="bold"
          icon={
            !bannerUri ? (
              <FontAwesome name="picture-o" color="#fff" size={18} />
            ) : undefined
          }
          _disabled={{
            backgroundColor: 'orange.900',
          }}
        />
        <Button
          content="Próximo"
          disabled={!bannerUri}
          onPress={handleNextButtonPress}
          borderRadius="full"
          textFontSize="normalLarge"
          textFontWeight="bold"
          _disabled={{
            backgroundColor: 'orange.900',
          }}
        />
      </VStack>
    </ScrollView>
  );
};

export default ChooseBanner;
