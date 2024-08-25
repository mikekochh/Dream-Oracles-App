import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import Text from '../components/Text';
import { globalStyles } from '../styles/globalStyles';

const DreamJournaled = ({ navigation, route }) => {
    const { dream, dreamID } = route.params; // Access the dream parameter

    return (
        <ImageBackground
            source={require('../assets/images/BackgroundStarsCropped.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={globalStyles.pageSmallTitle}>Dream Journaled</Text>
                    <Text style={[globalStyles.pageText, { textAlign: 'center', marginTop: 0 }]}>
                        Your dream has been journaled and is currently being interpreted
                    </Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 200 }}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => navigation.navigate("JournalDream")}
                    >
                        <Text style={styles.buttonTextStyle}>Journal Another Dream</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[globalStyles.goldenButtonStyle, { marginTop: 10 }]}
                        onPress={() => navigation.navigate("ViewDream", { dreamID })}
                    >
                        <Text style={globalStyles.goldenButtonTextStyle}>View Interpretation</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default DreamJournaled;

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#00FFFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        margin: 10
    },
    buttonTextStyle: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center', // Center content vertically
    },
});
