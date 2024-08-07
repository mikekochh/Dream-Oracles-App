import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ImageBackground
} from 'react-native';
import axios from 'axios';
import { AuthContext } from '../components/context/AuthProvider';

const ViewDream = ({ route, navigation }) => {
  const { user } = useContext(AuthContext) ?? {};
  const [dream, setDream] = useState(null);
  const { dreamID } = route.params;

  useEffect(() => {
    const fetchDream = async () => {
      try {
        const res = await axios.get(`https://www.dreamoracles.co/api/dream/${dreamID}`);
        console.log("res.data: ", res.data);
        setDream(res.data);
      } catch (err) {
        console.log("Error fetching dream: ", err);
      }
    };

    fetchDream();
  }, [dreamID]);

  const handleBackButton = () => {
    navigation.goBack();
  };

  if (!dream) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#171717' }}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/images/BackgroundStarsCropped.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 0 }}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={handleBackButton}
          >
            <Text style={styles.buttonTextStyle}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{user?.name}'s Dream</Text>
          <Text style={styles.dreamText}>{dream}</Text>
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
  dreamDate: {
    color: 'gray',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  dreamText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    padding: 20
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
  loadingText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
});
