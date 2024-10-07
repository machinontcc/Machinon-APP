import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Linking, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useUser } from '../../contexts/UserContext';

import Icon from 'react-native-vector-icons/FontAwesome'; // Certifique-se de instalar a biblioteca de ícones
import CheckBox from 'react-native-vector-icons/MaterialIcons'; // Para ícones de checkbox

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // Estado para a mensagem de erro

    function handleLogin() {
        signInWithEmailAndPassword(auth, email, password)
        .then((userData) => {
            navigation.navigate('Main');
        })
        .catch((err) => {
            let msgErro = "";

            switch (err.code) {
                case 'auth/invalid-email':
                    msgErro = 'O endereço de e-mail não é válido.';
                break;

                case 'auth/wrong-password':
                    msgErro = 'Senha incorreta.';
                break;
            }

            setErrorMessage(msgErro);
        })
    };

    const handleForgotPassword = () => {
        Alert.alert('Recuperação de Senha', 'Redirecionando para recuperação de senha...');
    };

    const handleCopyrightPress = () => {
        Linking.openURL('https://www.gov.br/bn/pt-br/atuacao/direitos-autorais-1/direitos-autorais');
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#050512'/>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color="#ffffff" />
                </TouchableOpacity>
                <Image source={require('../../../assets/logo_white.png')} style={styles.logo} />
            </View>
            
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#aaaaaa"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#aaaaaa"
            />

            <View style={styles.checkboxContainer}>
                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCopyrightPress} style={styles.copyright}>
                <Text style={styles.copyrightText}>© 2024 Todos os direitos reservados</Text>
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#050512',
    },
    logo: {
        width: '70%',
        height: 100,
        resizeMode: 'contain',
    },
    header: {
        position: 'absolute',
        top: 30,
        left: 40,
        flexDirection: 'row',
        gap: 35
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#444',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#1a1a2e',
        color: '#ffffff',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    rememberMeText: {
        marginLeft: 10,
        color: '#ffffff',
    },
    forgotPasswordText: {
        color: '#00dae4',
        textDecorationLine: 'underline',
        marginLeft: 20,
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#00dae4',
        paddingVertical: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    copyright: {
        marginTop: 20,
    },
    copyrightText: {
        color: '#00dae4',
    },
    errorText: {
        color: '#ff4d4d', // Cor vermelha para a mensagem de erro
        marginBottom: 10,
        fontSize: 14,
        textAlign: 'center',
    },
});

export default LoginScreen;
