import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AtividadesRender = ({ data }) => {
  if (!data) {
    return <Text style={styles.loadingText}>Carregando...</Text>;
  }

  // Ícone condicional baseado no status da atividade
  const iconName = data.status === "Agendada" ? "clock-o" : "check-circle";
  const iconColor = data.status === "Agendada" ? "#FF8743" : "#2ECC71";

  return (
    <View style={styles.card}>
      <View style={[styles.cardIconContainer, { backgroundColor: iconColor }]}>
        <Icon name={iconName} size={24} color="#FFF" />
      </View>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{data.titulo}</Text>
        <Text style={styles.cardSubtitle}>{data.descricao}</Text>
      </View>
      <Text style={styles.cardTime}>{data.data || 'Data não disponível'}</Text>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e2e',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  cardIconContainer: {
    borderRadius: 10,
    padding: 10,
  },
  cardTextContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  cardTime: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  loadingText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default AtividadesRender;
