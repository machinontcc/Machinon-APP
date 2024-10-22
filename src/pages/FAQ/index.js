import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Para navegação
import Icon from "react-native-vector-icons/FontAwesome"; // Ícone para expandir/recolher e voltar

const FAQScreen = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const navigation = useNavigation(); // Hook para navegação

  // Dados de exemplo para o FAQ (perguntas e respostas)
  const faqData = [
    { id: 1, question: "Como posso alterar meu perfil?", answer: "Para alterar seu perfil, vá até a página de edição de perfil e modifique as informações desejadas." },
    { id: 2, question: "Como faço para redefinir minha senha?", answer: "Você pode redefinir sua senha acessando a página de recuperação de senha e seguindo as instruções." },
    { id: 3, question: "Como vejo as atividades agendadas?", answer: "As atividades agendadas estão disponíveis na aba 'Atividades' dentro do aplicativo." },
    { id: 4, question: "Como posso sair da minha conta?", answer: "Vá até o perfil e clique no botão de logout para sair da sua conta." },
  ];

  // Função para expandir/recolher a pergunta
  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id); // Se a pergunta já estiver expandida, recolhe-a
  };

  return (
    <ScrollView style={styles.container}>
      {/* Botão de Voltar */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={24} color="#FFF" />
      </TouchableOpacity>

      <Text style={styles.title}>Perguntas Frequentes (FAQ)</Text>

      {faqData.map((item) => (
        <View key={item.id} style={styles.faqItem}>
          <TouchableOpacity
            style={styles.questionContainer}
            onPress={() => toggleQuestion(item.id)}
          >
            <Text style={styles.questionText}>{item.question}</Text>
            <Icon
              name={expandedQuestion === item.id ? "chevron-up" : "chevron-down"}
              size={20}
              color="#FFF"
            />
          </TouchableOpacity>

          {expandedQuestion === item.id && (
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>{item.answer}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
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
  faqItem: {
    marginBottom: 20,
    backgroundColor: "#1e1e2e",
    borderRadius: 10,
    padding: 10,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  answerContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#2c2c3e",
    borderRadius: 5,
  },
  answerText: {
    color: "#B0B0B0",
    fontSize: 14,
  },
});

export default FAQScreen;
