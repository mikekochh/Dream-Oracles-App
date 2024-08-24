import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';

const oracleImages = {
    "/Jung.webp": require('../assets/images/Jung.webp'),
    "/Freud.webp": require('../assets/images/Freud.webp'),
    "/Luna.webp": require('../assets/images/Luna.webp'),
    "/Cassandra.webp": require('../assets/images/Cassandra.webp'),
};

const OracleCard = ({ oracle, onSelect, isSelected, openCardInfoModal }) => {
    const oracleImage = oracleImages[oracle.oraclePicture];

    const handlePress = () => {
        onSelect(oracle); // Notify parent component of selection
    };

    const handleLinkPress = () => {
        openCardInfoModal(oracle);
    };

    return (
        <TouchableOpacity 
            onPress={handlePress} 
            style={[styles.cardContainer, isSelected && styles.selectedCardContainer]}
        >
            <View style={[styles.card, isSelected && styles.selectedCard]}>
                <View style={styles.imageContainer}>
                    <Image source={oracleImage} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{oracle.oracleName}</Text>
                    <Text style={styles.speciality}>{oracle.oracleSpecialty}</Text>
                    <TouchableOpacity onPress={handleLinkPress}>
                        <Text style={styles.link}>Who is {oracle.oracleShortName}?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default OracleCard;

const styles = StyleSheet.create({
    cardContainer: {
        width: '48%',
        marginHorizontal: '1%',
        marginVertical: 10,
    },
    selectedCardContainer: {
        // Optional: Add any additional styles for the container when selected
    },
    card: {
        backgroundColor: '#1A1A36',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#FFD700',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
    },
    selectedCard: {
        backgroundColor: '#2A2A56', // Lighter background color when selected
        borderWidth: 3, // Thicker border when selected
    },
    imageContainer: {
        padding: 10,
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    textContainer: {
        padding: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 5,
    },
    speciality: {
        fontSize: 14,
        color: '#aaa',
        textAlign: 'center',
        marginBottom: 10,
    },
    link: {
        fontSize: 14,
        color: '#FFD700', // Gold color for the link
        textDecorationLine: 'underline',
        textAlign: 'center',
        marginTop: 10,
    },
});
