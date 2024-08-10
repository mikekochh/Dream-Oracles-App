import React from 'react';
import { Text as RNText } from 'react-native';
import { getFontFamily } from '../utils/fontFamily';

const Text = ({ style, isGrand = false, weight = 'normal', ...props }) => {
  return (
    <RNText
      {...props}
      style={[{ fontFamily: getFontFamily(isGrand, weight) }, style]}
    />
  );
};

export default Text;
