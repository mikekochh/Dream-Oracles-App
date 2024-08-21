import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import { globalStyles } from '../styles/globalStyles';
import Text from '../components/Text';
import Loading from '../components/Loading'; // Import the Loading component
import { ScrollView } from 'react-native-gesture-handler';

const ViewDream = ({ route, navigation }) => {
  const [dream, setDream] = useState(null);
  const [dreamDetails, setDreamDetails] = useState();
  const [dreamDate, setDreamDate] = useState<Date | null>(null);
  const { dreamID } = route.params;

  useEffect(() => {
    const fetchDream = async () => {
      try {
        const res = await axios.get(
          `https://www.dreamoracles.co/api/dream/${dreamID}`
        );
        setDream(res.data.dream);
        setDreamDate(res.data.dreamDate);
      } catch (err) {
        console.log('Error fetching dream: ', err);
      }
    };

    const getDreamDetails = async () => {
      try {
        const dreamDetailsRes = await axios.get('https://www.dreamoracles.co/api/dream/details/' + dreamID);
        setDreamDetails(dreamDetailsRes.data.dreamDetails);
        console.log("dream details: ", dreamDetailsRes.data.dreamDetails);
      } catch (error) {
        console.log("Error fetching dream details: ", error);
      }
    }


    fetchDream();
    getDreamDetails();
  }, [dreamID]);

  const handleBackButton = () => {
    navigation.goBack();
  };

  const renderText = (text) => {
    return text.split('\n').map((line, index) => {
      const isBold = line.startsWith('###');
      const cleanedLine = isBold ? line.replace('###', '').trim() : line;
      
      return (
        <View key={index}>
          <Text style={isBold ? [styles.dreamText, styles.boldText] : styles.dreamText}>
            {cleanedLine}
          </Text>
          {/* {isBold && <Text style={styles.lineBreak}>{'\n'}</Text>} */}
        </View>
      );
    });
  };
  

  if (!dream) {
    return <Loading loadingText={'Preparing Your Dream'} />;
  }

  return (
    <ImageBackground
      source={require('../assets/images/BackgroundStarsCropped.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity style={styles.buttonStyle} onPress={handleBackButton}>
          <Text style={styles.buttonTextStyle}>Back</Text>
        </TouchableOpacity>
        <Text style={[globalStyles.pageSmallTitle, {marginBottom: 15}]}>{new Date(dreamDate).toLocaleDateString()}</Text>
        <ScrollView>
          
          <Text style={[globalStyles.pageSmallTitle, { textAlign: 'left', paddingLeft: 20, marginTop: 0}]}>Dream</Text>
          <Text style={styles.dreamText}>{dream}</Text>
          <Text style={[globalStyles.pageSmallTitle, { textAlign: 'left', paddingLeft: 20, marginTop: 0}]}>Interpretation</Text>
          {dreamDetails && (
            <Text style={styles.dreamText}>{renderText(dreamDetails[0]?.interpretation)}</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ViewDream;

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  dreamText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    padding: 20,
    paddingTop: 0,
  },
  buttonStyle: {
    backgroundColor: '#00FFFF',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 4,
    marginLeft: 10,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  buttonTextStyle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  trashIcon: {
    position: 'absolute',
    top: 30,
    right: 5,
  },
  trashImage: {
    width: 20,
    height: 20,
  },
  boldText: {
    fontWeight: 'bold'
  },
  lineBreak: {
    marginBottom: 0, // Optional: Adjusts the spacing if needed
  },
});
