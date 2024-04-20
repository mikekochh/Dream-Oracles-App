import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { AuthContext } from '../components/context/AuthProvider';

const Login = () => {

    const [email, setEmail] = useState('');

    const { handleLogin, loading, error } = useContext(AuthContext) ?? {};

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#171717' }}>
            <View style={{ flex: 1, backgroundColor: '#171717' }}>
                <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ color: '#8E8E8E', textAlign: 'center', fontSize: 24, marginBottom: 10, fontWeight: '200' }}>
                    Welcome To Dream Oracles
                    </Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: '#626262',
                            borderRadius: 8,
                            padding: 10,
                            color: '#8E8E8E',
                            textAlignVertical: 'top',
                            fontSize: 20,
                            fontWeight: '200',
                            marginBottom: 10
                        }}
                        placeholder='Enter email'
                        placeholderTextColor={'#9E8E8E'}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize='none'
                    />
                    <Text style={{ color: '#8E8E8E', textAlign: 'center', fontSize: 20, marginTop: 10, fontWeight: '200' }}>{error}</Text>
                    {loading ? (
                        <Text style={{ color: '#8E8E8E', textAlign: 'center', fontSize: 28, marginTop: 10, fontWeight: '200' }}>Loading...</Text>
                    ) : (
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => handleLogin?.(email)}
                    >
                        <Text style={styles.buttonTextStyle}>Login</Text>
                    </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
      );
}

export default Login;


const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#535353',
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
  });