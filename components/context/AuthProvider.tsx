import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

import axios from 'axios';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string;
  handleLogin: (email: string) => Promise<void>;
  handleLogout: () => void;
  checkLoginStatus: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const storeLoginDetails = async (email: string) => {
    try {
      await AsyncStorage.setItem('email', email);
    } catch (error) {
      console.log('Error storing login details: ', error);
    }
  }

  const checkLoginStatus = async () => {
    console.log("checkLoginStatus running...");
    try {
        const email = await AsyncStorage.getItem('email');

        if (email) {
            await handleLogin(email);
        }
    } catch (error) {
        console.log('Error retrieving login details: ', error);
    }
  }

const handleLogin = async (email: string) => {
    setLoading(true);
    setError('');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        setError("Please enter an email address");
        setLoading(false);
        return;
    }
    else if (!emailPattern.test(email)) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
    }

    try {
        const emailLower = email.toLowerCase();
        const resUserActivated = await axios.get('https://www.dreamoracles.co/api/login/' + emailLower);

        if (resUserActivated.data == null || resUserActivated.data == undefined || resUserActivated.data == false) {
            setError("There is no account associated with this email address");
            setLoading(false);
            return;
        }

        const resUserLogin = await axios.post('https://www.dreamoracles.co/api/login/app', {
            email: emailLower,
            password: 'password'
        })

        if (resUserLogin.status === 200) {
            setUser({
                email: resUserLogin.data.email,
                name: resUserLogin.data.name,
                id: resUserLogin.data.id
            })
            storeLoginDetails(resUserLogin.data.email);
            setLoading(false);
        }
        else {
            console.log("Log in not successful");
            setLoading(false);
        }

    } catch (err: unknown) {
        console.log("error: ", err.response.status);
        if (err.response.status == 401) {
            console.log("message: ", err.response.data.message);
            setError(err.response.data.message);
        }
        setLoading(false);
    }
}

const handleLogout = async () => {
    console.log("handleLogout running...");
    try {
        setUser(null);

        await AsyncStorage.removeItem('email');
    } catch (error) {
        console.log('Error logging out: ', error);
    }
}

//   const handleCreateAccount = async (username: string, password: string, email: string, navigation: any) => {

//     setLoading(true);

//     const checkUsername = await fetch(API_BASE_URL + API_USERS_ENDPOINT + "/username/" + username)
//     const jsonUsername = await checkUsername.json();

//     if (jsonUsername.username) {
//       Alert.alert('An account with this username already exists');
//       setLoading(false);
//       return;
//     }

//     const checkEmail = await fetch(API_BASE_URL + API_USERS_ENDPOINT + "/email/" + email)
//     const jsonEmail = await checkEmail.json();

//     if (jsonEmail.email) {
//       Alert.alert('An account with this email address already exists');
//       setLoading(false);
//       return;
//     }

//     if (username.trim() === '') {
//       Alert.alert('Please enter a valid username');
//       setLoading(false);
//       return;
//     }
//     if (email.trim() === '') {
//       Alert.alert('Please enter a valid email');
//       setLoading(false);
//       return;
//     }
//     if (password.trim() === '') {
//       Alert.alert('Please enter a valid password');
//       setLoading(false);
//       return;
//     }

//     const response = await fetch(API_BASE_URL + API_USERS_ENDPOINT, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//           username: username,
//           email: email,
//           password: password,
//       }),
//     });

//     if (response.ok) {
//       handleLogin(username, password, navigation);
//     } else {
//       const errorData = await response.json();
//       Alert.alert('Account creation failed', errorData.message);
//     }

//     setLoading(false);
//   };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      handleLogin, 
      handleLogout,
      error,
      checkLoginStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};