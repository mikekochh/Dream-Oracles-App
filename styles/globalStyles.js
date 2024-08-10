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
    color: '#F0F0F0',
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
    marginBottom: 15,
    marginTop: 20,
    fontSize: 60, //goldenRatioThree 32.36
  },
  pageSmallTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 15,
    marginTop: 20,
    fontSize: 37,
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
  },
  wideButton: {
    width: '100%',
    backgroundColor: '#666699',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  button: {
    width: '80%',
    backgroundColor: '#666699',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  wideButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text color for contrast
    marginBottom: 5,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 16,
    height: 16,
    backgroundColor: '#6B7280',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});



