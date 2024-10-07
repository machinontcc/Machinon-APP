import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCz0O-c4Hly6BlHSmV-93oD_G6f4jjzvuE",
  authDomain: "machinon-14b72.firebaseapp.com",
  projectId: "machinon-14b72",
  storageBucket: "machinon-14b72.appspot.com",
  messagingSenderId: "566449820785",
  appId: "1:566449820785:web:40774586192f6de46bf7d0"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export { db, auth };