import {PixelRatio} from 'react-native';

export const fixedFont = size => {
  return size * PixelRatio.get() / PixelRatio.getFontScale();
}