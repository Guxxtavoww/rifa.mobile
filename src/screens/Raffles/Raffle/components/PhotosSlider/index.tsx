import React from 'react';
import { Dimensions } from 'react-native';
import { FlatList, Image } from 'native-base';

interface iPhotosSliderProps {
  photos_urls: string[] | undefined;
}

const windowDimensions = Dimensions.get('screen');

const imageWidth = windowDimensions.width - 32; // minus horizontal padding
const imageHeight = 250;

const PhotosSlider: React.FC<iPhotosSliderProps> = ({ photos_urls }) => (
  <FlatList
    data={photos_urls}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    overflow="hidden"
    keyExtractor={(_, index) => index.toString()}
    renderItem={({ item: uri, index }) => (
      <Image
        source={{ uri }}
        key={index}
        style={{
          width: imageWidth,
          height: imageHeight,
        }}
        alt={`Image Slider Photo: ${index}`}
        borderRadius="2xl"
      />
    )}
    w="full"
    h="250px"
    snapToStart
    borderRadius="lg"
  />
);

export default PhotosSlider;
