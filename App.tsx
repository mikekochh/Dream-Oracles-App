import React, { useContext, useEffect } from 'react';
import { StatusBar, View, StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import JournalDream from './screens/JournalDream';
import Login from './screens/Login';
import DreamJournaled from './screens/DreamJournaled';
import ViewDream from './screens/ViewDream';
import ViewJournal from './screens/ViewJournal';
import { AuthProvider, AuthContext } from './components/context/AuthProvider';
import DismissKeyboard from './components/DismissKeyboard'; // Import DismissKeyboard component
import ShootingStar from './components/ShootingStar'; // Import ShootingStar component

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: '#000020' }, // Ensure screens are transparent
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

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: '#000020' }, // Ensure screens are transparent
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

function RootNavigator() {
  const { user, checkLoginStatus } = useContext(AuthContext) ?? {};

  useEffect(() => {
    checkLoginStatus?.();
  }, []);

  return (
    <NavigationContainer>
      <ImageBackground
        source={require('./assets/images/BackgroundStarsCropped.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
      {user ? <AppStack /> : <AuthStack />}
      </ImageBackground>
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
    backgroundColor: '#000020', // Set your desired background color here
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
  },
});

export default App;
