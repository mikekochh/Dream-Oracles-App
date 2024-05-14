// components/DismissKeyboard.tsx
import React, { ReactNode } from 'react';
import { Keyboard, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';

interface DismissKeyboardProps {
  children: ReactNode;
}

const handleKeyboardDismiss = () => {
    console.log("handleKeyboardDismiss...");
    Keyboard.dismiss();
}

const DismissKeyboard: React.FC<DismissKeyboardProps> = ({ children }) => (
  <TouchableWithoutFeedback onPress={handleKeyboardDismiss} accessible={false}>
    <View style={styles.container}>
      {children}
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DismissKeyboard;
