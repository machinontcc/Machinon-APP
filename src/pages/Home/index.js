import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native";

import Card from "../../components/CardsHome";

export default function Home() {
    const [cards, setCards] = useState([
        { id: '1', title: 'Temperatura', value: 'Carregando...' },  // Temperatura em tempo real
        { id: '2', title: 'RPM', value: '1500 RPM' },      // RPM em tempo real
        { id: '3', title: 'Vibração', value: 'Normal' },   // Outro card com informações
    ]);


    return(
        <View style={styles.container}>
            <View style={styles.headerProfile}>
                <Image 
                    source={require('../Home/assets/image.png')} // URL da imagem de perfil
                    style={styles.profileImage}
                />
                <View>
                    <Text style={styles.welcomeText}>Olá (NOME),</Text>
                    <Text style={styles.subText}>Bem-vindo de volta!</Text>
                </View>
            </View>
            <View style={styles.cards}>
                <FlatList 
                    data={cards}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <Card data={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    snapToAlignment="center"
                    snapToInterval={300}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d1d',
        paddingTop: 20
    },
    headerProfile: {
        flexDirection: 'row', // Alinha os itens em uma linha (horizontalmente)
        alignItems: 'center', // Alinha verticalmente no centro
        paddingHorizontal: 20, // Espaçamento lateral
        paddingVertical: 10, // Espaçamento superior/inferior
      },
      profileImage: {
        width: 50, // Largura da imagem
        height: 50, // Altura da imagem
        borderRadius: 25, // Faz a imagem ser circular
        marginRight: 15, // Espaçamento entre a imagem e o texto
      },
      welcomeText: {
        color: '#828282', // Cor branca no texto
        fontSize: 14, // Tamanho da fonte
        fontWeight: 'bold', // Texto em negrito
      },
      subText: {
        color: '#fff', // Cor branca no subtítulo
        fontSize: 20,
      },
      cards: {
        marginTop: 30
      }

});