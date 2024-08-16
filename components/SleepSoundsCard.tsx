import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Text from './Text'; // Adjust the import path if necessary
import { globalStyles } from '../styles/globalStyles';

const SleepSoundsCard = ({ image, title, description, isModalScreen = false }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    if (isModalScreen) {
      setModalVisible(true);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <View style={globalStyles.sleepSoundsContainer}>
          <Image source={image} style={globalStyles.sleepSoundsImage} />
          <View style={globalStyles.sleepSoundsTextContainer}>
            <Text style={globalStyles.sleepSoundsName}>{title}</Text>
            <Text style={globalStyles.sleepSoundsDescription}>{description}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => {
                // Handle play functionality here
              }}
            >
              <Text style={styles.playButtonText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  playButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#1E90FF',
    fontSize: 16,
  },
});

export default SleepSoundsCard;
