import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../components/context/AuthProvider';

const JournalDream = ({ navigation }) => {
  const { handleLogout, user } = useContext(AuthContext) ?? {};
  const [dream, setDream] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);

  const submitDream = async () => {
    setSaving(true);
    setError('');

    if (dream.trim() == '') {
      setError('Please enter a dream');
      setSaving(false);
      return;
    }

    console.log('user: ', user);

    try {
      const resJournal = await axios.post(
        'https://www.dreamoracles.co/api/dream/journal',
        {
          userID: user?.id,
          dream,
          interpretDream: false,
        }
      );
      if (resJournal.status == 200) {
        setDream('');
        setSaving(false);
        navigation.navigate('DreamJournaled');
      } else {
        setError('There was an issue journaling dream');
        setSaving(false);
        return;
      }
    } catch (error) {
      console.log('Error while journaling dream: ', error);
      setSaving(false);
    }
  };

  const handleViewJournal = () => {
    navigation.navigate('ViewJournal');
  };

  return (
    <ImageBackground
      source={require('../assets/images/BackgroundStarsCropped.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* <LinearGradient
        colors={['#000000', '#090946', '#333399']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      > */}
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ backgroundColor: 'transparent' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={styles.buttonStyleAlt}
                onPress={handleViewJournal}
              >
                <Text style={styles.buttonTextStyleAlt}>View Journal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyleAlt}
                onPress={handleLogout}
              >
                <Text style={styles.buttonTextStyleAlt}>Logout</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 52,
                marginBottom: 10,
                fontWeight: '200',
              }}
            >
              Dream Oracles
            </Text>
            <Text
              style={{
                color: '#8E8E8E',
                textAlign: 'center',
                fontSize: 32,
                marginBottom: 10,
                fontWeight: '200',
              }}
            >
              Journal Dream Below
            </Text>
            <View style={{ height: 350 }}>
              <TextInput
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#626262',
                  borderRadius: 8,
                  padding: 10,
                  color: '#8E8E8E',
                  textAlignVertical: 'top',
                  fontSize: 20,
                  fontWeight: '200',
                  backgroundColor: '#000000',
                }}
                multiline
                placeholder="Enter Dream"
                placeholderTextColor={'#9E8E8E'}
                value={dream}
                onChangeText={setDream}
              />
            </View>
            <Text
              style={{
                color: '#8E8E8E',
                textAlign: 'center',
                fontSize: 28,
                marginTop: 10,
                fontWeight: '200',
              }}
            >
              {error}
            </Text>
            <View style={{ alignItems: 'center' }}>
              {saving ? (
                <Text
                  style={{
                    color: '#8E8E8E',
                    textAlign: 'center',
                    fontSize: 28,
                    marginTop: 10,
                    fontWeight: '200',
                  }}
                >
                  Journaling Dream...
                </Text>
              ) : (
                <TouchableOpacity style={styles.buttonStyle} onPress={submitDream}>
                  <Text style={styles.buttonTextStyle}>Journal Dream</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </SafeAreaView>
      {/* </LinearGradient> */}
    </ImageBackground>
  );
};

export default JournalDream;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
  },
  gradient: {
    ...StyleSheet.absoluteFillObject, // Fills the entire screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#00FFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    margin: 10,
  },
  buttonTextStyle: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonTextStyleAlt: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  buttonStyleAlt: {
    backgroundColor: '#00FFFF',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 4,
    margin: 10
  }
});

