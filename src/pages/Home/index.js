import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, SafeAreaView, ScrollView, StatusBar } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalSelector from 'react-native-modal-selector'; // Importando a biblioteca
import { useNavigation } from "@react-navigation/native";
import { useDrawerStatus } from "@react-navigation/drawer";
import { useUser } from "../../contexts/UserContext";

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

    const navigation = useNavigation();
    const drawerStatus = useDrawerStatus(); // Hook para saber o status do drawer

    const {userData, setUserData} = useUser();

    // UseEffect para atualizar a StatusBar quando o drawer abrir ou fechar
    useEffect(() => {
        if (drawerStatus === 'open') {
            StatusBar.setBackgroundColor('#121212');
        } else {
            StatusBar.setBackgroundColor('#050512');
        }
    }, [drawerStatus]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.headerProfile}>
                    <View style={styles.profileSection}>
                        <Image
                            source={require('../Home/assets/image.png')}
                            style={styles.profileImage}
                        />
                        <View>
                            <Text style={styles.welcomeText}>Olá {userData ? userData.nome : 'Usuário'},</Text>
                            <Text style={styles.subText}>Bem-vindo de volta!</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon name="bars" size={24} color="#fff" style={styles.burgerIcon} />
                    </TouchableOpacity>
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
                            optionContainerStyle={styles.optionContainer}
                            cancelStyle={styles.cancelButton}
                            cancelTextStyle={styles.cancelText}
                            optionTextStyle={styles.optionText}
                            optionStyle={styles.optionStyle}
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
        flex: 1,
    },
    scrollContainer: {
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    headerProfile: {
        flexDirection: 'row', // Alinha os itens na horizontal
        justifyContent: 'space-between', // Espaça o conteúdo do perfil à esquerda e o ícone à direita
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    profileSection: {
        flexDirection: 'row', // Agrupa imagem e texto
        alignItems: 'center',
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
    burgerIcon: {
        padding: 10, // Dá espaço para o ícone ser clicável
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
    },
    cancelButton: {
        backgroundColor: '#FF4C4C', // Cor de cancelamento vibrante
        borderRadius: 10,
        marginTop: 10,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    },
    cancelText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    optionText: {
        color: '#FFF', // Texto branco para contraste
        fontSize: 16,
        fontWeight: '500',
    },
    optionStyle: {
        backgroundColor: '#2E2E2E', // Fundo mais escuro nas opções individuais
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    optionContainer: {
        backgroundColor: '#1E1E1E', // Fundo escuro para as opções
        borderRadius: 10,
        marginVertical: 5,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 6, // Sombra para Android
    },
});
