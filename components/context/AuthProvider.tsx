import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
import SplashScreen from 'react-native-splash-screen';

import axios from 'axios';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string;
  dreamStreak: number;
  handleLogin: (email: string) => Promise<void>;
  handleLogout: () => void;
  checkLoginStatus: () => Promise<void>;
  handleCreateAccount: (email: string, name: string) => Promise<void>;
  getDreamStreak: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [dreamStreak, setDreamStreak] = useState<number>(0);

  const storeLoginDetails = async (email: string, name: string, id: string) => {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('id', id);
    } catch (error) {
      console.log('Error storing login details: ', error);
    }
  }

  const checkLoginStatus = async () => {
    console.log("checkLoginStatus running...");
    try {
        const email = await AsyncStorage.getItem('email') || '';
        const name = await AsyncStorage.getItem('name') || '';
        const id = await AsyncStorage.getItem('id') || '';

        console.log('email: ', email);
        console.log('name', name);
        console.log('id: ', id);

        if (email) {
          await handleLoginShort(email, name, id);
        }
        SplashScreen.hide();
    } catch (error) {
        console.log('Error retrieving login details: ', error);
    }
  }

  const handleLoginShort = async (email: string, name: string, id: string) => {
    setUser({
      email,
      name,
      id
    })
  }

const getDreamStreak = async () => {
  console.log("getDreamStreak running...");

  const resUserDreamStreak = await axios.get('https://www.dreamoracles.co/api/dream/streak/', {
    params: { userID: user?.id}
  });
  setDreamStreak(resUserDreamStreak.data.dreamStreak[0].streakLength);
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
            storeLoginDetails(resUserLogin.data.email, resUserLogin.data.name, resUserLogin.data.id);
            setLoading(false);
        }
        else {
            console.log("Log in not successful");
            setLoading(false);
        }

    } catch (err: any) {
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

  const handleCreateAccount = async (email: string, name: string) => {

    setLoading(true);
    setError('')

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
      // first check if this user already exists
      const res = await fetch(`https://www.dreamoracles.co/api/user/${emailLower}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      });

      if (res.ok) {
          setError("User already exists!");
          setLoading(false);
          return;
      }

      const resNewUser = await fetch('https://www.dreamoracles.co/api/register', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              name,
              email: emailLower,
              password: 'password'
          }),
      });

      if (resNewUser.ok) {
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
            storeLoginDetails(resUserLogin.data.email, resUserLogin.data.name, resUserLogin.data.id);
            setLoading(false);
        }
        else {
            console.log("Log in not successful");
            setLoading(false);
        }
      }
    } catch (err: any) {
      console.log("error: ", err.response.status);
      if (err.response.status == 401) {
        console.log("message: ", err.response.data.message);
        setError(err.response.data.message);
      }
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error,
      dreamStreak,
      handleLogin, 
      handleLogout,
      checkLoginStatus,
      handleCreateAccount,
      getDreamStreak,
    }}>
      {children}
    </AuthContext.Provider>
  );
};