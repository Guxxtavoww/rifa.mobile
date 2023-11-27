import React from 'react';
import { FlatList, Image } from 'native-base';

interface iPhotosSliderProps {
  photos_urls: string[] | undefined;
}

const PhotosSlider: React.FC<iPhotosSliderProps> = ({ photos_urls }) => (
  <FlatList
    data={photos_urls}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={true}
    overflow="hidden"
    keyExtractor={(_, index) => index.toString()}
    mt="3"
    renderItem={({ item: uri, index }) => (
      <Image
        source={{ uri }}
        key={index}
        style={{
          width: 108,
          height: 84,
        }}
        alt={`Image Slider Photo: ${index}`}
        borderRadius="3xl"
        mr="3"
      />
    )}
    w="full"
    h="84px"
    snapToStart
    borderRadius="lg"
  />
);

export default PhotosSlider;
