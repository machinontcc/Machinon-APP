import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleResetPassword = () => {
        if (email === '') {
            setErrorMessage('Por favor, insira seu e-mail.');
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setErrorMessage('');
                setSuccessMessage('Um link de redefinição de senha foi enviado para o seu e-mail.');
            })
            .catch((err) => {
                let msgErro = '';

                switch (err.code) {
                    case 'auth/invalid-email':
                        msgErro = 'O endereço de e-mail não é válido.';
                        break;
                    case 'auth/user-not-found':
                        msgErro = 'Não encontramos um usuário com esse e-mail.';
                        break;
                    default:
                        msgErro = 'Ocorreu um erro ao enviar o e-mail. Tente novamente mais tarde.';
                        break;
                }

                setSuccessMessage(''); // Remover mensagem de sucesso se houver erro
                setErrorMessage(msgErro);
            });
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#050512'/>
            <Text style={styles.title}>Redefinir Senha</Text>

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Insira seu e-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#aaaaaa"
            />

            <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
                <Text style={styles.resetButtonText}>Enviar link de redefinição</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backToLogin}>
                <Text style={styles.backToLoginText}>Voltar para Login</Text>
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
        marginBottom: 20,
        backgroundColor: '#1a1a2e',
        color: '#ffffff',
    },
    resetButton: {
        width: '100%',
        backgroundColor: '#00dae4',
        paddingVertical: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    resetButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backToLogin: {
        marginTop: 10,
    },
    backToLoginText: {
        color: '#00dae4',
        textDecorationLine: 'underline',
    },
    errorText: {
        color: '#ff4d4d',
        marginBottom: 10,
        fontSize: 14,
        textAlign: 'center',
    },
    successText: {
        color: '#4CAF50',
        marginBottom: 10,
        fontSize: 14,
        textAlign: 'center',
    },
});

export default ForgotPasswordScreen;
