import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes/routes";
import { UserProvider } from './src/contexts/UserContext';

export default function App() {
  return(
    <UserProvider>
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    </UserProvider>
  );

}