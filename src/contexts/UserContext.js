import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null); // Inicialmente nulo

  useEffect(() => {
    const loadUserData = async () => {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    };

    loadUserData();
  }, []);

  const saveUserData = async (data) => {
    setUserData(data);
    await AsyncStorage.setItem('userData', JSON.stringify(data));
  };

  const clearUserData = async () => {
    setUserData(null);
    await AsyncStorage.removeItem('userData');
  };

  return (
    <UserContext.Provider value={{ userData, saveUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
