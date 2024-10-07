import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebaseConnection';
import { onAuthStateChanged } from 'firebase/auth';

import { useUser } from '../../contexts/UserContext';

// Certifique-se de que a imagem da logo esteja no caminho correto
const logoImage = require('../../../assets/logo_white.png'); // Altere o caminho conforme necessário

const SplashScreen = () => {
  const navigation = useNavigation();
  const { saveUserData } = useUser();

  useEffect(() => {

    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        saveUserData({uid: user.uid, email: user.email});
        navigation.navigate('Main');
      } 
      else 
      {
        navigation.navigate('Login');
      }
    })

  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#050512' }}>
      <StatusBar backgroundColor="#050512"/>
      <Image
        source={logoImage}
        style={{ width: '70%', height: 150, marginBottom: -50 }}
        resizeMode="contain"
      />
      <Text numberOfLines={1} style={{ fontSize: 12, textAlign: 'center', marginBottom: 90, fontFamily: 'Poppins-Medium', color: '#FFF', marginHorizontal: 8 }}>
        A praticidade que você merece em instantes
      </Text>
      <ActivityIndicator size="large" color="#FFF" />
    </View>
  );
};

export default SplashScreen;
