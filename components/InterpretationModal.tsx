import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const InterpretationModal = ({ showModal, setShowModal }) => {
    return (
        <Modal
            transparent={true}
            visible={showModal}
            animationType="slide"
            onRequestClose={() => setShowModal(false)} // Handles closing the modal when back button is pressed on Android
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Interpret Dream</Text>
                        <TouchableOpacity onPress={() => setShowModal(false)}>
                            <Text style={styles.closeButton}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        <TouchableOpacity 
                            style={styles.actionButton}
                            onPress={() => {/* Add interpret functionality here */}}
                        >
                            <Text style={styles.actionButtonText}>Start Interpretation</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default InterpretationModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        fontSize: 18,
        color: 'gray',
    },
    body: {
        alignItems: 'center',
    },
    actionButton: {
        backgroundColor: '#FFD700', // Golden color
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
    },
    actionButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
