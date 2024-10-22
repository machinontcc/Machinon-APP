import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, doc, updateDoc } from 'firebase/firestore'; // Para Firestore
import { useUser } from "../../contexts/UserContext"; // Para acessar o contexto do usuário
import Icon from 'react-native-vector-icons/FontAwesome'; // Importando o ícone

const EditProfile = () => {
  const navigation = useNavigation();
  const { user, setUser } = useUser(); // Acessa o usuário e função para atualizar o contexto
  const firestore = getFirestore();

  // Estados para armazenar as informações do perfil
  const [name, setName] = useState(user?.nome || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.telefone || "");
  const [company, setCompany] = useState(user?.empresa || ""); // Empresa será somente leitura

  const handleSave = async () => {
    try {
      // Referência ao documento do usuário no Firestore
      const userDocRef = doc(firestore, `users/${user.uid}`);

      // Atualizar o documento no Firestore
      await updateDoc(userDocRef, {
        nome: name,
        email: email,
        telefone: phone,
      });

      // Atualizar o estado global do usuário
      setUser({
        ...user,
        nome: name,
        email: email,
        telefone: phone,
      });

      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      navigation.goBack(); // Retorna à página de perfil
    } catch (error) {
      console.error("Erro ao atualizar o perfil: ", error);
      Alert.alert("Erro", "Ocorreu um erro ao atualizar os dados. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header com botão de voltar e título */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Editar Perfil</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        
        <Text style={styles.label}>Telefone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={phone}
          onChangeText={setPhone}
        />

        {/* Empresa (somente leitura) */}
        <Text style={styles.label}>Empresa: (Não Editavel)</Text>
        <TextInput
          style={styles.input}
          value={company}
          editable={false} // Torna o campo empresa não editável
          selectTextOnFocus={false} // Impede a seleção do texto
        />

        <TouchableOpacity onPress={handleSave} style={styles.button}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#050512',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    paddingRight: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#1e1e2e',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    color: '#FFF',
    borderWidth: 1,
    borderColor: '#3B3DBF',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Para Android
  },
  button: {
    backgroundColor: '#3B3DBF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Para Android
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
});

export default EditProfile;
