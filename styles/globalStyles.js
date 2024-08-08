// styles/globalStyles.js
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000020',
  },
  goldenRatioOne: {
    fontSize: 12.36,
  },
  goldenRatioTwo: {
    fontSize: 20,
  },
  goldenRatioThree: {
    fontSize: 32.36,
  },
  goldenRatioFour: {
    fontSize: 52.36,
  },
  goldenRatioFive: {
    fontSize: 84.72,
  },
  pageTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 20,
    marginTop: 20,
    fontSize: 32.36, //goldenRatioThree
  },
  pageText: {
    color: '#FFFFFF',
    fontSize: 20, //goldenRatioTwo
  },
  pageLink: {
    color: '#1E90FF',
    textDecorationLine: 'underline', // Add underline to the text
  },
  centered: {
    textAlign: 'center'
  }
});
