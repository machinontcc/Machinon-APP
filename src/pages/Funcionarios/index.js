import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../contexts/UserContext";
import { getFirestore, collection, query, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Funcionarios = () => {
    const navigation = useNavigation();
    const { user } = useUser();
    const [funcionarios, setFuncionarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFunc, setSelectedFunc] = useState(null); // Atividade selecionada para edição
    const [isModalVisible, setIsModalVisible] = useState(false); // Controle do modal de edição
    const [editedFunc, setEditedFunc] = useState({}); // Dados da atividade editada

    useEffect(() => {
        fetchFuncionarios();
    }, []);

    const fetchFuncionarios = async () => {
        const firestore = getFirestore();
        try {
            // Consultar a coleção de funcionários
            const q = query(collection(firestore, `empresas/${user.empresaId}/funcionarios`));
            const querySnapshot = await getDocs(q);

            // Mapeia para pegar apenas os dados do funcionário
            const funcionariosData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Agora vamos buscar os dados dos usuários para cada funcionário
            await fetchUsuariosData(funcionariosData);

        } catch (error) {
            console.error("Erro ao buscar funcionários: ", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsuariosData = async (funcionariosData) => {
        const firestore = getFirestore();
        try {
            // Para cada funcionário, buscamos os dados adicionais do usuário
            const updatedFuncionarios = [];

            for (let funcionario of funcionariosData) {
                // Verifica se userId está presente
                const userId = funcionario.userId;

                if (!userId) {
                    console.log(`Funcionário sem userId: ${funcionario.id}`);
                    updatedFuncionarios.push(funcionario);  // Adiciona o funcionário mesmo sem o userId
                    continue;
                }

                const userDocRef = doc(firestore, "users", userId);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();

                    // Atualizando os dados do funcionário com as informações do usuário
                    updatedFuncionarios.push({
                        ...funcionario,
                        nome: userData.nome || "Nome não disponível",
                        telefone: userData.telefone || "Telefone não disponível",
                        email: userData.email || "Email não disponível",
                        cargo: userData.cargo || "Cargo não disponível"
                    });
                } else {
                    console.log(`Usuário não encontrado para o id ${userId}`);
                    updatedFuncionarios.push(funcionario);  // Adiciona o funcionário mesmo sem os dados do usuário
                }
            }

            // Atualiza o estado com os dados combinados
            setFuncionarios(updatedFuncionarios);
        } catch (error) {
            console.error("Erro ao buscar dados dos usuários: ", error);
        }
    };


    const openEditModal = (funcionario) => {
        setEditedFunc(funcionario);
        setSelectedFunc(funcionario.id);
        setIsModalVisible(true);
    };

    const saveEditedFunc = async (userId) => {
        const firestore = getFirestore();
        const funcRef = doc(firestore, `users`, userId); // Aqui você usa o userId passado para atualizar o documento.

        try {
            await updateDoc(funcRef, editedFunc);
            fetchFuncionarios(); // Atualiza a lista de funcionários após a edição.
            setIsModalVisible(false); // Fecha o modal após salvar.
        } catch (error) {
            console.error("Erro ao salvar funcionário: ", error);
        }
    };


    const formatDate = (timestamp) => {
        if (!timestamp || !timestamp.seconds) return "Não especificado";
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString("pt-BR"); // Formato brasileiro (dd/mm/aaaa)
    };



    const renderFuncionario = ({ item }) => (
        <View style={styles.activityItem}>
            <Text style={styles.activityTitle}>{item.nome || "Nome não disponível"}</Text>
            <Text style={styles.activitySubText}>Data de contratação: {formatDate(item.dataContratacao)}</Text>
            <Text style={styles.activitySubText}>Telefone: {item.telefone || "Sem descrição"}</Text>
            <Text style={styles.activitySubText}>Status: {item.status || "Indisponível"}</Text>
            <Text style={styles.activitySubText}>Cargo: {item.cargo || "Não especificado"}</Text>
            <Text style={styles.activitySubText}>Email: {item.email || "Email não disponível"}</Text>

            <TouchableOpacity style={styles.editButton} onPress={() => openEditModal(item)}>
                <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
        </View>
    );


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Funcionarios</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#FFF" />
            ) : (
                <FlatList
                    data={funcionarios}
                    renderItem={renderFuncionario}
                    keyExtractor={item => item.id}
                />
            )}

            {/* Modal de edição */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Editar Funcionário</Text>

                        {/* Campo Nome */}
                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            placeholderTextColor="#999"
                            value={editedFunc.nome}
                            onChangeText={(text) => setEditedFunc({ ...editedFunc, nome: text })}
                        />

                        {/* Campo Cargo */}
                        <TextInput
                            style={styles.input}
                            placeholder="Cargo"
                            placeholderTextColor="#999"
                            value={editedFunc.cargo}
                            onChangeText={(text) => setEditedFunc({ ...editedFunc, cargo: text })}
                        />

                        {/* Campo Telefone */}
                        <TextInput
                            style={styles.input}
                            placeholder="Telefone"
                            placeholderTextColor="#999"
                            value={editedFunc.telefone}
                            onChangeText={(text) => setEditedFunc({ ...editedFunc, telefone: text })}
                        />

                        {/* Campo Status */}
                        <TextInput
                            style={styles.input}
                            placeholder="Status"
                            placeholderTextColor="#999"
                            value={editedFunc.status}
                            onChangeText={(text) => setEditedFunc({ ...editedFunc, status: text })}
                        />


                        {/* Botões para Salvar, Cancelar e Excluir */}
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.saveButton} onPress={() => saveEditedFunc(editedFunc.userId)}>
                                <Text style={styles.saveButtonText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#050512",
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 100,
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        color: "#FFF",
        fontSize: 24,
        fontWeight: "bold",
    },
    filters: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
    },
    filterButton: {
        backgroundColor: "#1e1e2e",
        padding: 10,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    activeFilterButton: {
        backgroundColor: "#3B3DBF",
    },
    filterText: {
        color: "#FFF",
        marginLeft: 8,
    },
    activityItem: {
        backgroundColor: "#1e1e2e",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    activityTitle: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    activitySubText: {
        color: "#B0B0B0",
        marginTop: 5,
    },
    editButton: {
        marginTop: 10,
        backgroundColor: "#3B3DBF",
        padding: 5,
        borderRadius: 5,
        alignItems: "center",
    },
    editButtonText: {
        color: "#FFF",
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#1e1e2e",
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#2e2e3e",
        color: "#FFF",
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    saveButton: {
        backgroundColor: "#3B3DBF",
        padding: 10,
        borderRadius: 5,
    },
    saveButtonText: {
        color: "#FFF",
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: "#FF3D3D",
        padding: 10,
        borderRadius: 5,
    },
    cancelButtonText: {
        color: "#FFF",
        fontSize: 16,
    },
    completeButton: {
        backgroundColor: '#42f563',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
    },
    completeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#f44336', // Vermelho para exclusão
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Funcionarios;
