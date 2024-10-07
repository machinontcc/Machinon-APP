import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';


const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#121212' }}>
      {/* Logo da Empresa */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../../assets/logo_white.png')}
          style={styles.logo}
        />
      </View>

      {/* Foto de perfil, Nome de Usuário e Email */}
      <View style={styles.profileContainer}>
        <Image 
          source={require('./assets/image.png')}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.userName}>Louco da faca</Text>
          <Text style={styles.userEmail}>louco@123.gmail</Text>
        </View>
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
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2c2c2c',
    marginBottom: 20,
    marginHorizontal: 10,
    flexDirection: 'row'
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#ccc',
    fontSize: 12,
  },
  drawerItemsContainer: {
    paddingTop: 10,
  },
});

export default CustomDrawer;
