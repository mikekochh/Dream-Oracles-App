import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import axios from 'axios';
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

        console.log("user: ", user);

        try {
            const resJournal = await axios.post('https://www.dreamoracles.co/api/dream/journal', 
            { 
                userID: user?.id, 
                dream,
                interpretDream: false 
            });
            if (resJournal.status == 200) {
                setDream('');
                setSaving(false);
                navigation.navigate("DreamJournaled");
            }
            else {
                setError('There was an issue journaling dream');
                setSaving(false);
                return;
            }
            
        } catch (error) {
            console.log("Error while journaling dream: ", error);
            setSaving(false);
        }
    }
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#171717' }}>
            <View style={{ backgroundColor: '#171717' }}>
                <View style={{ alignItems: 'flex-end'}}>
                    <TouchableOpacity
                        style={styles.buttonStyleLogout}
                        onPress={handleLogout}
                    >
                        <Text style={styles.buttonTextStyle}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ color: '#8E8E8E', textAlign: 'center', fontSize: 30, marginBottom: 10, fontWeight: '200' }}>Journal Dream Below</Text>
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
                            fontSize: 24,
                            fontWeight: '200',
                        }}
                        multiline
                        placeholder='Enter Dream'
                        placeholderTextColor={'#9E8E8E'}
                        value={dream}
                        onChangeText={setDream}
                    />
                </View>
                <Text style={{ color: '#8E8E8E', textAlign: 'center', fontSize: 28, marginTop: 10, fontWeight: '200' }}>{error}</Text>
                <View style={{ alignItems: 'center' }}>
                    {saving ? (
                        <Text style={{ color: '#8E8E8E', textAlign: 'center', fontSize: 28, marginTop: 10, fontWeight: '200' }}>Journaling Dream...</Text>
                    ) : (
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={submitDream}
                        >
                            <Text style={styles.buttonTextStyle}>Journal Dream</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default JournalDream;

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#535353',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        margin: 10,
    },
    buttonTextStyle: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonStyleLogout: {
        backgroundColor: '#636363',
        paddingVertical: 3,
        paddingHorizontal: 5,
        borderRadius: 4,
        margin: 10,
    }
  });

//   CC5500
// 4B0000 (this is a good shade for if there is nothing inputted yet, indicate that they cannot select yet)