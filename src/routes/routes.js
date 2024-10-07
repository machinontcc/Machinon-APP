import React, {useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import SplashScreen from '../pages/SplashScreen';
import LoginScreen from '../pages/LoginScreen';

import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

export default function Routes(){
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name='Splash' component={SplashScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Main' component={DrawerNavigator} />

    </Stack.Navigator>
  )
}