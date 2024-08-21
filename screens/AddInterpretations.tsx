import React, { useEffect, useState } from 'react';
import { View, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Text from '../components/Text';
import axios from 'axios';
import { globalStyles } from '../styles/globalStyles';
import Loading from '../components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import OracleCard from '../components/OracleCard'; // Import OracleCard component
import InterpretationModal from '../components/InterpretationModal'; // Import the InterpretationModal component

const AddInterpretations = ({ route }) => {
    const { dream } = route.params;
    console.log("dream: ", dream);
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedOracle, setSelectedOracle] = useState(null); // Track selected oracle

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const oraclesRes = await axios.get('https://www.dreamoracles.co/api/allOracles');

                const activeOracles = oraclesRes.data.filter(oracle => oracle.appActive);
                
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

    const handleOracleSelect = (oracle) => {
        setSelectedOracle(oracle); // Set selected oracle
    };

    const startInterpretation = async () => {
        try {
            setShowModal(true);
            const dreamPrompt = `${selectedOracle.prompt}\nHere is the dream:\n###\n${dream}`;
            const resInterpret = await axios.get('https://us-central1-dream-oracles.cloudfunctions.net/dreamLookup', {
                params: { dreamPrompt }
            });

            if (resInterpret.status !== 200) {
                console.log("There was an error interpreting your dream");
                return;
            }

            console.log("interpretation: ", resInterpret.data[0].message.content);

            // const resUpdateDatabase = await axios.post('https://www.dreamoracles.co/api/dream/interpret', {

            // })

        } catch (error) {
            
        }
    }

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
                <ScrollView contentContainerStyle={styles.cardContainer} style={{ flex: 1 }}>
                    {models.map((model, index) => (
                        <OracleCard 
                            key={index} 
                            oracle={model} 
                            onSelect={handleOracleSelect} // Pass the handler to OracleCard
                            isSelected={selectedOracle?.oracleName === model.oracleName} // Highlight selected oracle
                        />
                    ))}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.buttonStyle, !selectedOracle && styles.disabledButtonStyle]} // Disable button if no oracle selected
                        onPress={startInterpretation}
                        disabled={!selectedOracle} // Disable button if no oracle selected
                    >
                        <Text style={styles.buttonTextStyle}>Interpret Dream</Text>
                    </TouchableOpacity>
                </View>
                <InterpretationModal 
                    showModal={showModal} 
                    setShowModal={setShowModal}
                    selectedOracle={selectedOracle}
                />
            </SafeAreaView>
        </ImageBackground>
    );
};

export default AddInterpretations;

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        paddingVertical: 1,
        paddingHorizontal: 20,
    },
    buttonStyle: {
        backgroundColor: '#FFD700',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    disabledButtonStyle: {
        backgroundColor: '#B0B0B0', // Change the button color to gray when disabled
    },
    buttonTextStyle: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
