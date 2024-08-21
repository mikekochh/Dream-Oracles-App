import React, { ReactNode } from 'react';
import { Keyboard, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';

interface DismissKeyboardProps {
  children: ReactNode;
}

const DismissKeyboard: React.FC<DismissKeyboardProps> = ({ children }) => {
  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback
      onPress={handleKeyboardDismiss}
      accessible={false}
    >
      <View style={styles.container}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DismissKeyboard;
