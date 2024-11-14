import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const Card = ({ data }) => {
  // Se o dado ainda não estiver disponível, renderizar um fallback
  if (!data) {
    return <Text style={styles.loadingText}>Carregando...</Text>;
  }

  // Garantir que os campos corretos estejam disponíveis
  const { tipo, ultimaLeitura, unidade, localizacao, status } = data;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.content}>
        {/* Nome do sensor (tipo) */}
        <Text style={styles.title}>{tipo || 'Sensor Desconhecido'}</Text>

        {/* Valor atual e unidade */}
        <View style={styles.valueContainer}>
          <Text style={styles.value}>
            {ultimaLeitura !== undefined ? `${ultimaLeitura} ${unidade || ''}` : '--'}
          </Text>
        </View>

        {/* Localização do sensor */}
        <Text style={styles.location}>{`Sensor localizado em: ${localizacao}` || 'Localização desconhecida'}</Text>

        {/* Status do sensor */}
        <View style={styles.infoContainer}>
          <Text style={[styles.status, { color: status === 'Ativo' ? '#00D084' : '#FF4C4C' }]}>
            {status === 'Ativo' ? 'Sensor Ativo' : 'Sensor Inativo'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#1e1e2e', // Um cinza escuro
    borderRadius: 15,
    width: width * 0.9, // Ocupa quase toda a largura da tela
    padding: 20,
    marginVertical: 10,
    marginRight: 10,
    shadowColor: '#000829', // Sombra moderna e futurista
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8, // Para Android
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    color: '#ffffff', // Cor do texto branco
    fontSize: 20, // Tamanho do texto ajustado
    fontWeight: 'bold',
    marginBottom: 10,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  value: {
    fontSize: 28, // Para destacar bem
    fontWeight: 'bold',
    color: '#00D084', // Verde claro para valores numéricos
  },
  location: {
    color: '#b0b0b0', // Cinza claro para a localização
    fontSize: 16,
    marginTop: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Card;
