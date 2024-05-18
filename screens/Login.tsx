import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image
} from 'react-native';
import { AuthContext } from '../components/context/AuthProvider';
import { useNavigation } from '@react-navigation/native';

const Login = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [loggingIn, setLoggingIn] = useState(true);

    const { handleCreateAccount, handleLogin, loading, error } = useContext(AuthContext) ?? {};

    const handleSignUp = () => {
        setLoggingIn(prev => !prev);
    };

    const handleButtonPress = () => {
        if (loggingIn) {
            handleLogin?.(email);
        }
        else {
            handleCreateAccount?.(email, name);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#171717' }}>
            <View style={{ flex: 1, backgroundColor: '#171717' }}>
                {/* Logo at the top */}
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={{ width: 150, height: 150 }} // Adjust width and height as needed
                        resizeMode="contain"
                    />
                </View>
                {/* Login Information */}
                <View style={{ flex: 1, paddingHorizontal: 20 }}>
                    <View style={{ flex: 1, marginTop: 30 }}>
                        <Text style={{ color: '#8E8E8E', textAlign: 'center', fontSize: 24, marginBottom: 10, fontWeight: '200' }}>
                            Welcome To Dream Oracles
                        </Text>
                        {!loggingIn && (
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
                                placeholder='Enter name'
                                placeholderTextColor={'#9E8E8E'}
                                value={name}
                                onChangeText={setName}
                                autoCapitalize='none'
                            />
                        )}
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
                            <>
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    onPress={handleButtonPress}
                                >
                                    <Text style={styles.buttonTextStyle}>{loggingIn ? 'Login' : 'Create Account'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleSignUp}
                                    style={{ marginTop: 20 }}
                                >
                                    <Text style={{ color: '#8E8E8E', textAlign: 'center', fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}>
                                        {loggingIn ? "Don't have an account?" : "Already have an account?"}
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
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