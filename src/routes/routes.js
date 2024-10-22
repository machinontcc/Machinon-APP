import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import SplashScreen from '../pages/SplashScreen';
import LoginScreen from '../pages/LoginScreen';
import ForgotPasswordScreen from '../pages/ForgotPassword';
import DrawerNavigator from './DrawerNavigator';
import EditProfile from '../pages/UserProfile/editProfile';
import CreateActivity from '../pages/CreateAtivididades';

const Stack = createNativeStackNavigator();

export default function Routes(){
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Splash' component={SplashScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Main' component={DrawerNavigator} />
      <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='CriarAtividades' component={CreateActivity} />
    </Stack.Navigator>
  )
}