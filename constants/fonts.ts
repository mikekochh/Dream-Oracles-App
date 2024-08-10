import {isIOS} from '../utils/platformUtil';

export const fontFamilies = {
  GRANDIFLORAONE: {
    normal: isIOS() ? 'GrandifloraOne-Regular' : 'GrandifloraOneRegular',
    medium: isIOS() ? 'GrandifloraOne-Regular' : 'GrandifloraOneRegular',
    bold: isIOS() ? 'GrandifloraOne-Regular' : 'GrandifloraOneRegular',
  },
  COMFORTAABOLD: {
    normal: isIOS() ? 'Comfortaa-Regular' : 'ComfortaaRegular',
    medium: isIOS() ? 'Comfortaa-Medium' : 'ComfortaaMedium',
    bold: isIOS() ? 'Comfortaa-Bold' : 'ComfortaaBold',
  }
};