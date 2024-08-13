// components/DismissKeyboard.tsx
import React, { ReactNode, useEffect, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';

interface DismissKeyboardProps {
  children: ReactNode;
}

const DismissKeyboard: React.FC<DismissKeyboardProps> = ({ children }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    // Cleanup listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleKeyboardDismiss = () => {
    if (isKeyboardVisible) {
      console.log('handleKeyboardDismiss...');
      Keyboard.dismiss();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardDismiss} accessible={false}>
      <View style={styles.container}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DismissKeyboard;
