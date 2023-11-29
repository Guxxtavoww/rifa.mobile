import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '@/constants';

const VIDEO_WIDTH = WINDOW_WIDTH - 32;

export const raffleVideoStyles = StyleSheet.create({
  videoContainer: {
    width: VIDEO_WIDTH,
    height: 290,
    marginBottom: 20,
    borderRadius: 10,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  videoStyles: {
    width: VIDEO_WIDTH,
    height: 290,
    zIndex: 5,
    borderRadius: 14,
  },
});
