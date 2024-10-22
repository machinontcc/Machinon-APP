import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useUser } from '../../contexts/UserContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CalendarModal from '../../components/CalendarModal';

const CreateActivity = () => {
    const navigation = useNavigation();
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [responsavelName, setResponsavelName] = useState('');
    const { user } = useUser();
    const [modalVisible, setModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false); // Modal para o Alerta customizado

    useEffect(() => {
        setResponsavelName(user?.nome);
        setResponsavel(user?.uid);
    }, []);

    const handleSetDate = (dateSelected) => {
        setData(dateSelected);
    };

    const handleCreateActivity = async () => {
        const firestore = getFirestore();
        try {
            await addDoc(collection(firestore, `empresas/${user.empresaId}/atividades`), {
                titulo,
                descricao,
                data,
                responsavel,
                status: 'Agendada',
            });
            setAlertVisible(true); // Exibir modal de sucesso
            // Limpar campos após a criação
            setTitulo('');
            setDescricao('');
            setData('');
            setResponsavel('');
        } catch (error) {
            console.error("Erro ao criar atividade: ", error);
            setAlertVisible(true); // Exibir modal de erro
        }
    };

    return (
        <View style={styles.container}>
            {/* Header com botão de voltar e título centralizado */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Criar Atividade</Text>
                <View style={styles.iconContainer}>
                    <Icon name="calendar" size={24} color="#FFF" />
                </View>
            </View>

            {/* Inputs e Botão centralizados */}
            <View style={styles.formContainer}>
                <Text style={styles.label}>Responsável:</Text>
                <TextInput
                    style={styles.input}
                    value={responsavelName}
                    editable={false} // Define o campo como somente leitura
                    selectTextOnFocus={false} // Impede a seleção do texto
                />

                <TextInput
                    style={styles.input}
                    placeholder="Título"
                    placeholderTextColor="#888"
                    value={titulo}
                    onChangeText={setTitulo}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Descrição"
                    placeholderTextColor="#888"
                    value={descricao}
                    onChangeText={setDescricao}
                />

                <TouchableOpacity style={styles.dateButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Selecionar data</Text>
                </TouchableOpacity>

                {/* Label para o campo de data */}
                <Text style={styles.label}>Data Selecionada:</Text>
                <TextInput
                    style={styles.input}
                    value={data}
                    editable={false} // Define o campo como somente leitura
                    selectTextOnFocus={false} // Impede a seleção do texto
                />

                <TouchableOpacity style={styles.button} onPress={handleCreateActivity}>
                    <Text style={styles.buttonText}>Criar Atividade</Text>
                </TouchableOpacity>
            </View>

            {/* Modal para o seletor de calendário */}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <CalendarModal
                    setVisible={() => setModalVisible(false)}
                    handleFilter={handleSetDate}
                />
            </Modal>

            {/* Modal customizado para o alerta */}
            <Modal visible={alertVisible} animationType="fade" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.alertBox}>
                        <Icon name="check-circle" size={48} color="#28a745" />
                        <Text style={styles.alertText}>Atividade criada com sucesso!</Text>
                        <TouchableOpacity onPress={() => setAlertVisible(false)} style={styles.alertButton}>
                            <Text style={styles.alertButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        justifyContent: 'space-between', // Espaçamento entre os elementos
        backgroundColor: '#3B3DBF', // Cor de fundo mais vibrante
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        shadowColor: '#000', // Sombra suave
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // Para Android
    },
    backButton: {
        paddingRight: 20,
    },
    title: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1, // Centraliza o texto
    },
    iconContainer: {
        paddingLeft: 20,
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
    dateButton: {
        backgroundColor: '#3B3DBF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: "#000", // Sombra
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // Para Android
    },
    button: {
        backgroundColor: '#28a745', // Cor verde para o botão
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: "#000", // Sombra
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
        color: '#FFF', // Cor da label
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    // Estilos para o modal de alerta
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertBox: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    alertText: {
        fontSize: 18,
        color: '#000',
        marginVertical: 10,
        textAlign: 'center',
    },
    alertButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    alertButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
});

export default CreateActivity;
