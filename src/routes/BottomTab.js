import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // ou outro ícone de sua escolha
import Home from '../pages/Home';
import Detalhes from '../pages/Detalhes';
import Sobre from '../pages/Sobre';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    elevation: 8,
                    borderTopWidth: 0,
                    backgroundColor: '#1d1d1d',
                    borderRadius: 15,
                    height: 60,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 6,
                },
                tabBarLabelStyle: {
                    display: 'none'
                },
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{
                    tabBarLabel: 'Início',
                    tabBarIcon: ({ focused }) => (
                        <Icon name="home" size={30} color={focused ? '#FFF' : '#4D4D4D'} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="Detalhes" 
                component={Detalhes} 
                options={{
                    tabBarLabel: 'Detalhes',
                    tabBarIcon: ({ focused }) => (
                        <Icon name="info" size={30} color={focused ? '#FFF' : '#4D4D4D'} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="Sobre" 
                component={Sobre} 
                options={{
                    tabBarLabel: 'Sobre',
                    tabBarIcon: ({ focused }) => (
                        <Icon name="person" size={30} color={focused ? '#FFF' : '#4D4D4D'} />
                    ),
                }} 
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
