import React, { useContext } from 'react';
import { 
  View,
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity 
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';

import { AuthContext } from '../components/context/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/Text';

const Settings = () => {
  const { handleLogout, user } = useContext(AuthContext) ?? {};

  return (
    <ImageBackground
      source={require('../assets/images/BackgroundStarsCropped.png')}
      style={globalStyles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={globalStyles.pageSmallTitle}>Settings</Text>
        <View style={styles.contentContainer}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, globalStyles.goldenRatioTwo]}>Profile Details</Text>
            <Text style={[styles.sectionContent, globalStyles.goldenRatioOne]}>Name: John Doe</Text>
            <Text style={[styles.sectionContent, globalStyles.goldenRatioOne]}>Email: johndoe@example.com</Text>
          </View>

          <View style={styles.logoutButtonContainer}>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={[globalStyles.goldenRatioTwo, globalStyles.pageLink]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000020',
  },
  contentContainer: {
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  section: {
    marginBottom: 20, // Spacing between sections
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  sectionContent: {
    color: '#FFFFFF',
    marginBottom: 5,
  },
  logoutButtonContainer: {
    alignItems: 'center', // Center the logout button horizontally
    marginVertical: 20, // Add vertical margin for spacing
  },
});

export default Settings;
