import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, SafeAreaView, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalSelector from 'react-native-modal-selector'; // Importando a biblioteca

import Card from "../../components/CardsHome";
import AtividadesRender from "../../components/AtividadesProgamadas";

const { width } = Dimensions.get('window');

export default function Home() {
    const [cards, setCards] = useState([
        { id: '1', title: 'Temperatura', value: 'Carregando...', valueColor: '#27a348', percentage: '4.6%', percentageColor: '#27a348', info: 'Entre 18:00 e 00:00' },
        { id: '2', title: 'RPM', value: '50998 RPM', valueColor: '#f02b2b', percentage: '8.8%', percentageColor: '#F02B2B', info: 'Entre 17:00 e 8:00' },
        { id: '3', title: 'Vibração', value: 'Normal', valueColor: '#27a348', percentage: '4.6%', percentageColor: '#27a348', info: 'Entre 18:00 e 00:00' },
    ]);

    const [atividades, setAtividades] = useState([
        { id: '1', titulo: 'Revisão Mensal', local: 'Ala 29', horario: '17:30' },
        { id: '2', titulo: 'Manutenção Preventiva', local: 'Ala 10', horario: '14:00' },
        { id: '3', titulo: 'Manutenção Corretiva', local: 'Ala 02', horario: '18:00' }
    ]);

    const [selectedDate, setSelectedDate] = useState("Hoje");

    // Opções para o Modal Selector
    const data = [
        { key: 'Hoje', label: 'Hoje' },
        { key: 'Amanhã', label: 'Amanhã' },
        { key: 'Esta Semana', label: 'Esta Semana' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.headerProfile}>
                    <Image
                        source={require('../Home/assets/image.png')}
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
                        renderItem={({ item }) => <Card data={item} />}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View style={styles.opcoesGerais}>
                    <Text style={styles.title}>Opções gerais</Text>
                    <View style={styles.iconRow}>
                        <TouchableOpacity style={styles.iconContainer}>
                            <View style={[styles.iconBackground, { backgroundColor: '#FF8743' }]}>
                                <Icon name="wrench" size={24} color="#fff" />
                            </View>
                            <Text style={styles.iconText}>Revisões Agendadas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconContainer}>
                            <View style={[styles.iconBackground, { backgroundColor: '#2ECC71' }]}>
                                <Icon name="gears" size={24} color="#fff" />
                            </View>
                            <Text style={styles.iconText}>Manutenções Realizadas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconContainer}>
                            <View style={[styles.iconBackground, { backgroundColor: '#F4D03F' }]}>
                                <Icon name="bell" size={24} color="#FFF" />
                            </View>
                            <Text style={styles.iconText}>Notificar Setor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconContainer}>
                            <View style={[styles.iconBackground, { backgroundColor: '#5DADE2' }]}>
                                <Icon name="ellipsis-h" size={24} color="#fff" />
                            </View>
                            <Text style={styles.iconText}>Mais Opções</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.atividadesContainer}>
                    <View style={styles.atividadesHeader}>
                        <Text style={[styles.title, { fontSize: 18 }]}>Atividades Progamadas</Text>
                        <ModalSelector
                            data={data}
                            initValue={selectedDate}
                            onChange={(option) => {
                                setSelectedDate(option.key);
                            }}
                            style={styles.modalSelector}
                            selectTextStyle={styles.selectText}
                            overlayStyle={styles.overlay}
                            cancelText="Cancelar"
                            cancelStyle={styles.cancelButton}
                            cancelTextStyle={styles.cancelText}
                            optionTextStyle={styles.optionText}
                        >
                            <View style={styles.selectContainer}>
                                <Text style={styles.selectText} numberOfLines={1}>{selectedDate} </Text>
                                <Icon name="caret-down" size={16} color="#fff" style={styles.caretIcon} />
                            </View>
                        </ModalSelector>
                    </View>

                    <FlatList
                        data={atividades}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <AtividadesRender data={item} />}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#050512',
        flex: 1
    },
    scrollContainer: {
        paddingTop: 20,
        paddingHorizontal: 10
    },
    headerProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    welcomeText: {
        color: '#828282',
        fontSize: 14,
        fontWeight: 'bold',
    },
    subText: {
        color: '#fff',
        fontSize: 20,
    },
    cards: {
        marginTop: 30
    },
    opcoesGerais: {
        marginTop: 40,
    },
    title: {
        color: '#fff',
        fontSize: 22,
        marginBottom: 25,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
    },
    iconContainer: {
        alignItems: 'center',
        width: width / 5,
    },
    iconBackground: {
        width: 60,
        height: 60,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    iconText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 10,
    },
    atividadesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    atividadesContainer: {
        marginTop: 40,
    },
    modalSelector: {
        width: 110,
    },
    selectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#3E3E3E',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    selectText: {
        color: '#fff',
        fontSize: 14,
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    cancelButton: {
        backgroundColor: '#f00',
    },
    cancelText: {
        color: '#fff',
    },
    optionText: {
        color: '#000',
    },
});
