import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ProfilePage from '../pages/UserProfile';
import Sobre from '../pages/Sobre';
import Home from '../pages/Home';

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
            component={Home} 
            options={{
                drawerIcon: ({ color }) => (
                    <Icon name="home" size={22} color={color} />
                ),
            }}  
            />

            <Drawer.Screen 
            name="Perfil" 
            component={ProfilePage}
            options={{
                drawerIcon: ({ color }) => (
                    <Icon name="account" size={22} color={color} />
                ),
            }}  
             />
             
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
