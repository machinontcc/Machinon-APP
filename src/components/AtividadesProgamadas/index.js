import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

const AtividadesRender = ({ data }) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardIconContainer}>
                <Icon name="wrench" size={24} color="#FFF" />
            </View>
            <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{data.titulo}</Text>
                <Text style={styles.cardSubtitle}>{data.local}</Text>
            </View>
            <Text style={styles.cardTime}>{data.horario}</Text>
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#3E3E3E',
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    cardIconContainer: {
        backgroundColor: '#696969',
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
});

export default AtividadesRender;
