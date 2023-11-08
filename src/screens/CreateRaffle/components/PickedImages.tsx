import React from 'react';
import { Image } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';

interface iPickerImagesProps {
  imagesUris: string[];
  onImagePress: (imageUri: string) => void;
}

const PickedImages: React.FC<iPickerImagesProps> = ({
  imagesUris,
  onImagePress,
}) => (
  <FlashList
    data={imagesUris}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    estimatedItemSize={10}
    renderItem={({ index, item: uri }) => (
      <TouchableOpacity
        onPress={() => onImagePress(uri)}
        style={{ marginRight: 16 }}
      >
        <Image
          source={{ uri }}
          key={index}
          style={{
            width: 160,
            height: 118,
          }}
          borderRadius="30px"
          alt={uri}
        />
      </TouchableOpacity>
    )}
    contentContainerStyle={{
      paddingBottom: 10,
      paddingHorizontal: 16,
    }}
  />
);

export default PickedImages;
