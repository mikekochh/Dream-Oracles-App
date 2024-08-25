import React from 'react';
import { View, Modal, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const oracleImages = {
    "/Jung.webp": require('../assets/images/Jung.webp'),
    "/Freud.webp": require('../assets/images/Freud.webp'),
    "/Luna.webp": require('../assets/images/Luna.webp'),
    "/Cassandra.webp": require('../assets/images/Cassandra.webp'),
};

const { width, height } = Dimensions.get('window');

const OracleCardInfoModal = ({ isVisible, onClose, oracle }) => {
    if (!oracle) {
        return null; // Return null if no oracle is selected
    }

    const oracleImage = oracleImages[oracle.oraclePicture];

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Image source={oracleImage} style={styles.image} />
                    <Text style={styles.name}>{oracle.oracleName}</Text>
                    <Text style={styles.description}>{oracle.oracleDescription}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default OracleCardInfoModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end'
    },
    modalContainer: {
        width: width, // Make the modal take up the full screen width
        height: height * 0.8, // Increase the height to 80% of the screen height
        backgroundColor: '#1A1A36',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    image: {
        width: 150, // Adjust the image size
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 15,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 10, // Add some padding to avoid text touching the edges
    },
    closeButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    closeButtonText: {
        color: '#1A1A36',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
