import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const Card = ({data}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.valueContainer}>
          <Text style={[styles.value, {color: data.valueColor}]}>{data.value}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.percentage, {color: data.percentageColor}]}>{data.percentage}</Text>
          <Text style={styles.time}>{data.info}</Text>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#1e1e2e', // Um cinza escuro, parecido com bg-gray-800
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
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  percentage: {
    color: '#FF8743', // Cor laranja para a porcentagem
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  time: {
    color: '#b0b0b0', // Cinza claro para o horário
    fontSize: 14,
  },
});

export default Card;
