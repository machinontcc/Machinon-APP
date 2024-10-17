import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, Image, StatusBar } from 'react-native';
import { useUser } from '../../contexts/UserContext';
import { auth } from '../../../firebaseConfig';

const logoImage = require('../../../assets/logo_white.png');

const SplashScreen = ({ navigation }) => {
  const { setUser, fetchUserData } = useUser();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchUserData(user.uid); // Define o usuário no contexto
        navigation.navigate('Main'); // Navega para tela principal
      } else {
        navigation.navigate('Login'); // Redireciona para Login
      }
    });

    return unsubscribe; // Limpa o listener
  }, [navigation, setUser]); // Adicione setUser e navigation como dependências

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#050512' }}>
      <StatusBar backgroundColor="#050512" />
      <Image
        source={logoImage}
        style={{ width: '70%', height: 150, marginBottom: -50 }}
        resizeMode="contain"
      />
      <Text
        numberOfLines={1}
        style={{
          fontSize: 12,
          textAlign: 'center',
          marginBottom: 90,
          fontFamily: 'Poppins-Medium',
          color: '#FFF',
          marginHorizontal: 8,
        }}
      >
        A praticidade que você merece em instantes
      </Text>
      <ActivityIndicator size="large" color="#FFF" />
    </View>
  );
};

export default SplashScreen;
