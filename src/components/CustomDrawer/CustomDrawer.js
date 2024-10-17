import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import { useUser } from '../../contexts/UserContext';

const CustomDrawer = (props) => {
  const {userData, setUserData} = useUser();
  const profileImageUrl = userData?.urlProfileImg || 'default-image-url';
  const userName = userData?.nome || 'Usuário';
  const userEmail = userData?.email;

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#121212' }}>
      {/* Logo da Empresa */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../../assets/logo_white.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.drawerItemsContainer}>
        <DrawerItemList {...props} />
      </View>

    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  logo: {
    width: '60%',
    height: 50,
  },
  drawerItemsContainer: {
    paddingTop: 10,
  },
});

export default CustomDrawer;
