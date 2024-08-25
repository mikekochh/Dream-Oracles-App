import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { User } from '../types';

import axios from 'axios';

export interface DreamContextType {
    loadingInterpretation: boolean;
    startInterpretation: (dreamID: string, dream: string, user: User) => Promise<void>;
}

export const DreamContext = createContext<DreamContextType | null>(null);

export const DreamProvider = ({ children }) => {
    const [loadingInterpretation, setLoadingInterpretation] = useState(false);

    const startInterpretation = async (dreamID, dream, user) => {
        try {
            setLoadingInterpretation(true);
            console.log("starting interpretation!");
            const dreamPrompt = `You are an expert AI dream interpretation model, and i want you to interpret the meaning of my dream. End the interpretation with a summary of your interpretation and begin each paragraph with a title. Here is the dream:\n###\n${dream}`;
            const resInterpret = await axios.get('https://us-central1-dream-oracles.cloudfunctions.net/dreamLookup', {
                params: { dreamPrompt }
            });
    
            console.log('resInterpet: ', resInterpret);
    
            if (resInterpret.status !== 200) {
                console.log("There was an error interpreting your dream");
                return;
            }
    
            const resUpdateDatabase = await axios.post('https://www.dreamoracles.co/api/dream/interpret', {
                dreamID,
                interpretation: resInterpret.data[0].message.content,
                oracleID: 0,
                user
            });
    
            if (resUpdateDatabase.status !== 200) {
                console.log("There was an error saving the interpretation...");
                return;
            }
            else {
                console.log("Interpretation saved successfully!");
            }
    
        } catch (error) {
            console.log("There was an error interpreting the dream: ", error);
        }
    }

  return (
    <DreamContext.Provider value={{ 
        loadingInterpretation,
        startInterpretation,
    }}>
      {children}
    </DreamContext.Provider>
  );
};