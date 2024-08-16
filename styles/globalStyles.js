// styles/globalStyles.js
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#000020',
  },
  goldenRatioOne: {
    fontSize: 12.36,
  },
  goldenRatioOnePointFive: {
    fontSize: 15,
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
  sleepSoundsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#1A1A36', // Lighter shade of #000020
    borderRadius: 8,
    overflow: 'hidden',
    paddingRight: 1
  },
  sleepSoundsImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    padding: 10,
    // borderRadius: 8
  },
  sleepSoundsTextContainer: {
    flex: 1,
    padding: 10,
  },
  sleepSoundsName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  sleepSoundsDescription: {
    fontSize: 14,
    color: 'lightgray',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1A36',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonImage: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});



