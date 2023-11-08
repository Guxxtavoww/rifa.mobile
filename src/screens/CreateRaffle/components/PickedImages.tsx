import React from 'react';
import { Image, Pressable } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { MaterialIcons } from '@expo/vector-icons';

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
    snapToEnd
    renderItem={({ index, item: uri }) => (
      <TouchableOpacity
        onPress={() => onImagePress(uri)}
        style={{ marginRight: 16, position: 'relative' }}
        key={index}
      >
        <Pressable
          position="absolute"
          top="3"
          right="2"
          onPress={() => onImagePress(uri)}
          zIndex={10}
          alignItems="center"
          justifyContent="center"
          opacity={0.8}
        >
          <MaterialIcons name="delete" color="#fff" size={20} />
        </Pressable>
        <Image
          source={{ uri }}
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
      paddingLeft: 16,
      paddingRight: 40,
    }}
  />
);

export default PickedImages;
