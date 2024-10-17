// LoginScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Linking, StatusBar } from 'react-native';
import { auth } from '../../../firebaseConfig'; // Importando a configuração do Firebase
import { useUser } from '../../contexts/UserContext';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importando a função de login

const LoginScreen = ({ navigation }) => {
    const { setUser, fetchUserData } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            // Faz login com Firebase Auth padrão
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            // Busca dados do usuário no Firestore
            const userData = await fetchUserData(userId);
            setUser(userData);
            navigation.navigate('Main');
        } catch (e) {
            // Exibe mensagem de erro
            let errorMessage;
            switch (e.code) {
                case 'auth/invalid-email':
                    errorMessage = 'O endereço de e-mail não é válido.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Senha incorreta.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'Nenhum usuário encontrado com este e-mail.';
                    break;
                default:
                    errorMessage = e.message;
                    break;
            }

            setErrorMessage(errorMessage);
        }
    };

    const handleCopyrightPress = () => {
        Linking.openURL('https://www.gov.br/bn/pt-br/atuacao/direitos-autorais-1/direitos-autorais');
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#050512' />

            <Image source={require('../../../assets/logo_white.png')} style={styles.logo} />
            
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

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={{ alignSelf: 'flex-end', marginBottom: 50 }}>
                <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
            </TouchableOpacity>

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
        position: 'absolute',
        bottom: 30,
    },
    copyrightText: {
        color: '#FFF',
    },
    errorText: {
        color: '#ff4d4d', // Cor vermelha para a mensagem de erro
        marginBottom: 10,
        fontSize: 14,
        textAlign: 'center',
    },
});

export default LoginScreen;
