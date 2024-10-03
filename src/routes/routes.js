import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { NavigationContainer } from '@react-navigation/native';

import Home from '../pages/Home';

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // Esconder cabeçalho por padrão (opcional)
        }}
      >
        <Tab.Screen name="Home" component={Home} />

      </Tab.Navigator>
  );
};

export default Routes;
