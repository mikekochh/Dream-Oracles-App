import React, { useEffect, useState } from 'react';
import { View, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Text from '../components/Text';
import axios from 'axios';
import { globalStyles } from '../styles/globalStyles';
import Loading from '../components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import OracleCard from '../components/OracleCard'; // Import OracleCard component
import InterpretationModal from '../components/InterpretationModal'; // Import the InterpretationModal component

const AddInterpretations = () => {
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const oraclesRes = await axios.get('https://www.dreamoracles.co/api/allOracles');
                
                // Filter the oracles based on the 'active' field
                const activeOracles = oraclesRes.data.filter(oracle => oracle.active);
                
                // Set the filtered oracles to the models state
                setModels(activeOracles);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch models');
                setLoading(false);
            }
        };

        fetchModels();
    }, []);

    if (loading) {
        return (
            <Loading loadingText={'Loading Dream Oracles'} />
        );
    }

    if (error) {
        return (
            <View>
                <Text style={globalStyles.pageText}>{error}</Text>
            </View>
        );
    }

    return (
        <ImageBackground
            source={require('../assets/images/BackgroundStarsCropped.png')}
            style={globalStyles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={globalStyles.pageSmallTitle}>Dream Oracles</Text>
                <Text style={[globalStyles.pageText, { textAlign: 'center' }]}>Select A Dream Interpretation Model</Text>
                <ScrollView contentContainerStyle={styles.cardContainer}>
                    {models.map((model, index) => (
                        <OracleCard key={index} oracle={model} />
                    ))}
                </ScrollView>
                <TouchableOpacity 
                    style={styles.buttonStyle}
                    onPress={() => setShowModal(true)} // Open the modal on button press
                >
                    <Text style={styles.buttonTextStyle}>Interpret Dream</Text>
                </TouchableOpacity>
                <InterpretationModal 
                    showModal={showModal} 
                    setShowModal={setShowModal} // Close the modal
                />
            </SafeAreaView>
        </ImageBackground>
    );
};

export default AddInterpretations;

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allows wrapping to the next row
        justifyContent: 'space-between', // Space between the cards
        padding: 10,
    },
    buttonStyle: {
        backgroundColor: '#FFD700', // Golden color
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        margin: 20,
        alignItems: 'center',
    },
    buttonTextStyle: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
