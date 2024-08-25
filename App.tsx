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
import SleepSounds from './screens/SleepSounds';
import AddInterpretations from './screens/AddInterpretations';

// Import new screens
import Meditation from './screens/Meditation';
import BreathWork from './screens/BreathWork';
import Frequencies from './screens/Frequencies';
import BedtimeStories from './screens/BedtimeStories';

import { AuthProvider, AuthContext } from './components/context/AuthProvider';
import { DreamProvider, DreamContext } from './components/context/DreamProvider';

// Import your icons
import settingsLogo from './assets/images/settingsLogo.png';
import homeLogo from './assets/images/homeLogo.png';
import journalLogo from './assets/images/journalLogo.png';
import writeLogo from './assets/images/writeLogo.png';
import sleepLogo from './assets/images/sleepLogo.png';

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
      <Stack.Screen
        name="AddInterpretations"
        component={AddInterpretations}
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
        name="ViewJournalMain"
        component={ViewJournal}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewDream"
        component={ViewDream}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddInterpretations"
        component={AddInterpretations}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function SleepSoundsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: '#000020' },
      }}
    >
      <Stack.Screen
        name="SleepSounds"
        component={SleepSounds}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Meditation"
        component={Meditation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BreathWork"
        component={BreathWork}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Frequencies"
        component={Frequencies}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BedtimeStories"
        component={BedtimeStories}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;
          switch (route.name) {
            case 'Journal':
              iconSource = writeLogo;
              break;
            case 'ViewJournalTab':
              iconSource = journalLogo;
              break;
            case 'Home':
              iconSource = homeLogo;
              break;
            case 'SleepSoundsTab':
              iconSource = sleepLogo;
              break;
            case 'Settings':
              iconSource = settingsLogo;
              break;
            default:
              iconSource = homeLogo;
          }
          return (
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: focused ? '#666699' : 'transparent' },
              ]}
            >
              <Image
                source={iconSource}
                style={[
                  styles.icon,
                  { tintColor: focused ? 'white' : 'lightgray' },
                ]}
              />
            </View>
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#333355',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Journal"
        component={JournalStack}
        options={{ title: 'Journal New Dream' }}
      />
      <Tab.Screen
        name="ViewJournalTab"
        component={ViewJournalStack}
        options={{ title: 'View Dream Journal' }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home Page' }}
      />
      <Tab.Screen
        name="SleepSoundsTab"
        component={SleepSoundsStack} // Updated to use SleepSoundsStack
        options={{ title: 'Sleep Sounds' }}
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
      <DreamProvider>
        <StatusBar barStyle="light-content" backgroundColor="#171717" />
        <View style={styles.container}>
          <RootNavigator />
        </View>
      </DreamProvider>
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
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    padding: 24,
  },
});

export default App;
