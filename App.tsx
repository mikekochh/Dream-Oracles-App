import React, { useContext, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import JournalDream from './screens/JournalDream';
import Login from './screens/Login';
import DreamJournaled from './screens/DreamJournaled';
import { AuthProvider, AuthContext } from './components/context/AuthProvider';
import DismissKeyboard from './components/DismissKeyboard'; // Import DismissKeyboard component

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

function AppStack() {
  return (
    <Stack.Navigator>
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
  )
}



function RootNavigator() {

  const { user, checkLoginStatus } = useContext(AuthContext) ?? {};

  useEffect(() => {
    checkLoginStatus?.();
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )

}

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor="#171717" />
      <DismissKeyboard>
        <RootNavigator />
      </DismissKeyboard>
    </AuthProvider>
  );
}

export default App;
