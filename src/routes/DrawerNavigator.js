import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Detalhes from '../pages/Detalhes';
import Sobre from '../pages/Sobre';

import BottomTabNavigator from './BottomTab';
import CustomDrawer from '../components/CustomDrawer/CustomDrawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator 
            drawerContent={ (props) => <CustomDrawer {...props} /> }
            screenOptions={{
                headerShown: false,
                drawerStyle: { backgroundColor: '#121212' },
                drawerActiveBackgroundColor: '#00dae4',
                drawerActiveTintColor: '#FFF',
                drawerInactiveBackgroundColor: '#2c2c2c',
                drawerInactiveTintColor: '#fff',
            }}
        >

            <Drawer.Screen 
            name="Home" 
            component={BottomTabNavigator} 
            options={{
                drawerIcon: ({ color }) => (
                    <Icon name="home-outline" size={22} color={color} />
                ),
            }}  
            />

            <Drawer.Screen name="Sobre" component={Sobre} />
            <Drawer.Screen name="Detalhes" component={Detalhes} />

            {/* Adicione outras páginas aqui */}
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
