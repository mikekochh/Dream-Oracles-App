import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';

const oracleImages = {
    "/Jung.webp": require('../assets/images/Jung.webp'),
    "/Freud.webp": require('../assets/images/Freud.webp'),
    "/Luna.webp": require('../assets/images/Luna.webp'),
    // Add other images as necessary
};

const OracleCard = ({ oracle }) => {
    const oracleImage = oracleImages[oracle.oraclePicture];

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={oracleImage} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{oracle.oracleName}</Text>
                <Text style={styles.speciality}>{oracle.oracleSpecialty}</Text>
            </View>
        </View>
    );
};

export default OracleCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1A1A36',
        borderRadius: 10,
        marginVertical: 10,
        width: '48%',
        marginHorizontal: '1%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#FFD700',
        overflow: 'hidden',
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
    description: {
        fontSize: 14,
        color: '#444',
        textAlign: 'center',
    },
});
