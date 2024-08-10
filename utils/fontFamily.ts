import { fontFamilies } from '../constants/fonts';

export const getFontFamily = (
  isGrand: boolean,
  weight: 'normal' | 'medium' | 'bold',
) => {
  const selectedFontFamily = isGrand
    ? fontFamilies.GRANDIFLORAONE['normal']
    : fontFamilies.COMFORTAABOLD[weight];
  return selectedFontFamily;
};