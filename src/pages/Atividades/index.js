import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../contexts/UserContext";
import { getFirestore, collection, query, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Atividades = () => {
    const navigation = useNavigation();
    const { user } = useUser();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("Todas");
    const [responsaveis, setResponsaveis] = useState({});
    const [selectedActivity, setSelectedActivity] = useState(null); // Atividade selecionada para edição
    const [isModalVisible, setIsModalVisible] = useState(false); // Controle do modal de edição
    const [editedActivity, setEditedActivity] = useState({}); // Dados da atividade editada

    useEffect(() => {
        const fetchActivities = async () => {
            const firestore = getFirestore();
            try {
                const q = query(
                    collection(firestore, `empresas/${user.empresaId}/atividades`)
                );
                const querySnapshot = await getDocs(q);
                const activitiesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setActivities(activitiesData);
                await fetchResponsaveis(activitiesData);
            } catch (error) {
                console.error("Erro ao buscar atividades: ", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchResponsaveis = async (activitiesData) => {
            const firestore = getFirestore();
            const responsaveisData = {};
            for (const activity of activitiesData) {
                if (activity.responsavel) {
                    const responsavelDoc = await getDoc(doc(firestore, "users", activity.responsavel));
                    if (responsavelDoc.exists()) {
                        responsaveisData[activity.responsavel] = responsavelDoc.data().nome;
                    }
                }
            }
            setResponsaveis(responsaveisData);
        };

        if (user?.empresaId) {
            fetchActivities();
        }
    }, []);

    const openEditModal = (activity) => {
        setEditedActivity(activity);
        setSelectedActivity(activity.id);
        setIsModalVisible(true);
    };

    const saveEditedActivity = async () => {
        const firestore = getFirestore();
        const activityRef = doc(firestore, `empresas/${user.empresaId}/atividades`, selectedActivity);

        try {
            await updateDoc(activityRef, editedActivity);
            setActivities(prevActivities =>
                prevActivities.map(activity => activity.id === selectedActivity ? editedActivity : activity)
            );
            setIsModalVisible(false);
        } catch (error) {
            console.error("Erro ao salvar atividade: ", error);
        }
    };

    const markAsCompleted = async () => {
        const firestore = getFirestore();
        const activityRef = doc(firestore, `empresas/${user.empresaId}/atividades`, selectedActivity);

        try {
            // Atualiza o status da atividade para "Concluída"
            await updateDoc(activityRef, { status: 'Concluída' });

            // Atualiza o estado local
            setActivities(prevActivities =>
                prevActivities.map(activity =>
                    activity.id === selectedActivity ? { ...activity, status: 'Concluída' } : activity
                )
            );
            setIsModalVisible(false);
        } catch (error) {
            console.error("Erro ao marcar atividade como concluída: ", error);
        }
    };

    const deleteActivity = async () => {
        const firestore = getFirestore();
        const activityRef = doc(firestore, `empresas/${user.empresaId}/atividades`, selectedActivity);

        try {
            // Remove a atividade do Firestore
            await deleteDoc(activityRef);

            // Atualiza o estado local para remover a atividade
            setActivities(prevActivities =>
                prevActivities.filter(activity => activity.id !== selectedActivity)
            );
            setIsModalVisible(false);
        } catch (error) {
            console.error("Erro ao excluir a atividade: ", error);
        }
    };
    const filteredActivities = activities.filter(activity => {
        if (filter === "Todas") return true;
        return activity.status === filter;
    });

    const renderActivity = ({ item }) => (
        <View
            style={styles.activityItem}
        >
            <Text style={styles.activityTitle}>{item.titulo}</Text>
            <Text style={styles.activitySubText}>Data: {item.data}</Text>
            <Text style={styles.activitySubText}>Descrição: {item.descricao}</Text>
            <Text style={styles.activitySubText}>Status: {item.status}</Text>
            <Text style={styles.activitySubText}>Responsável: {responsaveis[item.responsavel] || "Carregando..."}</Text>
            {/* Botão para editar atividade */}
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
                <Text style={styles.title}>Atividades</Text>
                <TouchableOpacity onPress={() => navigation.navigate("CriarAtividades")}>
                    <Icon name="plus" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Filtros */}
            <View style={styles.filters}>
                {["Todas", "Agendada", "Concluída"].map(status => {
                    let iconName;
                    switch (status) {
                        case "Todas":
                            iconName = "playlist-check";
                            break;
                        case "Agendada":
                            iconName = "calendar-check";
                            break;
                        case "Concluída":
                            iconName = "check-circle-outline";
                            break;
                        default:
                            iconName = "help-circle";
                    }

                    return (
                        <TouchableOpacity
                            key={status}
                            style={[styles.filterButton, filter === status && styles.activeFilterButton]}
                            onPress={() => setFilter(status)}
                        >
                            <Icon name={iconName} size={24} color="#FFF" />
                            <Text style={styles.filterText}>{status}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#FFF" />
            ) : (
                <FlatList
                    data={filteredActivities}
                    renderItem={renderActivity}
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
                        <Text style={styles.modalTitle}>Editar Atividade</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Título"
                            placeholderTextColor="#999"
                            value={editedActivity.titulo}
                            onChangeText={(text) => setEditedActivity({ ...editedActivity, titulo: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Data"
                            placeholderTextColor="#999"
                            value={editedActivity.data}
                            onChangeText={(text) => setEditedActivity({ ...editedActivity, data: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Descrição"
                            placeholderTextColor="#999"
                            value={editedActivity.descricao}
                            onChangeText={(text) => setEditedActivity({ ...editedActivity, descricao: text })}
                        />

                        {/* Verifica se a atividade é agendada */}
                        {editedActivity.status === 'Agendada' && (
                            <TouchableOpacity style={styles.completeButton} onPress={markAsCompleted}>
                                <Text style={styles.completeButtonText}>Marcar como Concluída</Text>
                            </TouchableOpacity>
                        )}

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.saveButton} onPress={saveEditedActivity}>
                                <Text style={styles.saveButtonText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={deleteActivity}>
                                <Text style={styles.deleteButtonText}>Excluir Atividade</Text>
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

export default Atividades;
