import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../contexts/UserContext"; // Assumindo que você tenha um contexto de usuário
import Icon from "react-native-vector-icons/FontAwesome"; // Importando ícones

const UserProfile = () => {
  const navigation = useNavigation();
  const { user } = useUser(); // Pegando dados do usuário do contexto

  return (
    <View style={styles.container}>
      {/* Ícone de voltar */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={24} color="#FFF" />
      </TouchableOpacity>

      <Text style={styles.title}>Perfil do Usuário</Text>
      
      <TouchableOpacity 
        onPress={() => navigation.navigate("EditProfile")} 
        style={styles.editLink}
      >
        <Text style={styles.editText}>Editar Perfil</Text>
      </TouchableOpacity>

      <View style={styles.profileInfo}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{user?.nome || "Nome não disponível"}</Text>
        
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email || "Email não disponível"}</Text>
        
        <Text style={styles.label}>Telefone:</Text>
        <Text style={styles.value}>{user?.telefone || "Telefone não disponível"}</Text>
        
        <Text style={styles.label}>Empresa:</Text>
        <Text style={styles.value}>{user?.empresa || "Carregando..."}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050512",
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  editLink: {
    marginBottom: 20,
  },
  editText: {
    color: "#3B3DBF",
    fontSize: 18,
    textDecorationLine: "underline",
  },
  profileInfo: {
    backgroundColor: "#1e1e2e",
    borderRadius: 10,
    padding: 15,
  },
  label: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  value: {
    color: "#B0B0B0",
    fontSize: 16,
    marginBottom: 10,
  },
});

export default UserProfile;
