// components/Card.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Card = ({ data }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{data.title}</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.cardValue}>{data.value}</Text>
        </View>
        <View style={styles.infoContainer}>
          {/* Substitua 'icon.png' pelo caminho da sua imagem */}
          <Image
            source={require('../CardsHome/assets/icon.png')} // Imagem do ícone
            style={styles.icon}
          />
          <Text style={styles.infoText}>8.5%</Text>
          <Text style={styles.timeText}>Entre 13:00 e 15:00</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#1e1e1e', // Cor do fundo do card
    padding: 20,
    borderRadius: 10,
    margin: 10, // Espaçamento ao redor do card
    flex: 1, // Para ocupar a largura da tela
    height: 250, // Altura do card
    justifyContent: 'flex-start', // Alinhamento do conteúdo
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00ff00', // Cor verde para os valores
  },
  infoContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 12, // Ajuste conforme necessário
  },
  infoText: {
    color: '#FFA500', // Cor laranja para informações
    marginLeft: 5,
    fontSize: 16,
  },
  timeText: {
    color: '#ccc', // Cor cinza claro para o texto do tempo
    marginLeft: 10,
    fontSize: 14,
  },
});

export default Card;
