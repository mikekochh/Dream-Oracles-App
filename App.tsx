import React, { useContext, useEffect } from 'react';
import { StatusBar, View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import JournalDream from './screens/JournalDream';
import Login from './screens/Login';
import DreamJournaled from './screens/DreamJournaled';
import ViewDream from './screens/ViewDream';
import ViewJournal from './screens/ViewJournal';
import HomeScreen from './screens/Home';
import Settings from './screens/Settings';

import MeditationScreen from './screens/MeditationScreen'; // Import the MeditationScreen

import { AuthProvider, AuthContext } from './components/context/AuthProvider';
import DismissKeyboard from './components/DismissKeyboard';

// Import your icons
import settingsLogo from './assets/images/trash-bin.png';
import homeLogo from './assets/images/homeLogo.png';
import journalLogo from './assets/images/journalLogo.png';
import writeLogo from './assets/images/writeLogo.png';
import meditationLogo from './assets/images/meditationLogo.png';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: '#000020' },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function JournalStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: '#000020' },
      }}
    >
      <Stack.Screen
        name="JournalDream"
        component={JournalDream}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DreamJournaled"
        component={DreamJournaled}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ViewJournalStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: '#000020' },
      }}
    >
      <Stack.Screen
        name="ViewJournal"
        component={ViewJournal}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewDream"
        component={ViewDream}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;
          switch (route.name) {
            case 'Journal':
              iconSource = journalLogo;
              break;
            case 'ViewJournal':
              iconSource = writeLogo;
              break;
            case 'Home':
              iconSource = homeLogo;
              break;
            case 'Meditation': // Updated from Filler to Meditation
              iconSource = meditationLogo; // Use the meditation logo
              break;
            case 'Settings':
              iconSource = settingsLogo;
              break;
            default:
              iconSource = homeLogo; // Fallback icon
          }
          return <Image source={iconSource} style={styles.icon} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Hide the header for tabs
      })}
    >
      <Tab.Screen
        name="Journal"
        component={JournalStack}
        options={{ title: 'Journal New Dream' }}
      />
      <Tab.Screen
        name="ViewJournal"
        component={ViewJournalStack}
        options={{ title: 'View Dream Journal' }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home Page' }}
      />
      <Tab.Screen
        name="Meditation" // Updated tab name
        component={MeditationScreen} // Use the MeditationScreen component
        options={{ title: 'Meditation' }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { user, checkLoginStatus } = useContext(AuthContext) ?? {};

  useEffect(() => {
    checkLoginStatus?.();
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor="#171717" />
      <DismissKeyboard>
        <View style={styles.container}>
          <RootNavigator />
        </View>
      </DismissKeyboard>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000020',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default App;
