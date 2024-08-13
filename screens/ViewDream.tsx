import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import { AuthContext } from '../components/context/AuthProvider';
import { globalStyles } from '../styles/globalStyles';
import Text from '../components/Text';
import Loading from '../components/Loading'; // Import the Loading component

const ViewDream = ({ route, navigation }) => {
  const { user } = useContext(AuthContext) ?? {};
  const [dream, setDream] = useState(null);
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

    fetchDream();
  }, [dreamID]);

  const handleBackButton = () => {
    navigation.goBack();
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
        <Text style={globalStyles.pageSmallTitle}>{new Date(dreamDate).toLocaleDateString()}</Text>
        <Text style={styles.dreamText}>{dream}</Text>
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
});
