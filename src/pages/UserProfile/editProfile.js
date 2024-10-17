import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../contexts/UserContext"; // Assumindo que você tenha um contexto de usuário
import Icon from 'react-native-vector-icons/FontAwesome'; // Importando o ícone

const EditProfile = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  
  // Estados para armazenar as informações do perfil
  const [name, setName] = useState(user?.nome || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.telefone || "");
  const [company, setCompany] = useState(user?.empresa || "");

  const handleSave = () => {
    // Aqui você pode implementar a lógica para salvar as informações do perfil
    console.log("Salvando informações:", { name, email, phone, company });
    navigation.goBack(); // Retorna à página de perfil
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Editar Perfil</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Empresa"
        value={company}
        onChangeText={setCompany}
      />

      <TouchableOpacity onPress={handleSave} style={styles.button}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050512",
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#1e1e2e",
    color: "#FFF",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#3B3DBF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
});

export default EditProfile;
