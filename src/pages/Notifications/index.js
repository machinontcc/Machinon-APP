import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, Button, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs, query, where, orderBy, updateDoc, doc } from 'firebase/firestore';
import { useUser } from '../../contexts/UserContext';
import Icon from "react-native-vector-icons/FontAwesome";


const db = getFirestore();

const NotificationScreen = () => {
    const [notifications, setNotifications] = useState([]);
    const { user } = useUser();
    const [filter, setFilter] = useState(null); // 'todas', 'lidas', 'naoLidas'
    const navigation = useNavigation();

    useEffect(() => {
        loadNotifications(filter);
    }, [filter]);

    const loadNotifications = async (status = null) => {
        try {
            const notificationsRef = collection(db, `empresas/${user.empresaId}/notificacoes`);
            let q = query(notificationsRef);

            if (status !== null) {
                q = query(q, where('isRead', '==', status));
            }

            q = query(q, orderBy('isRead'), orderBy('createdAt', 'desc'));

            const querySnapshot = await getDocs(q);
            const fetchedNotifications = [];
            querySnapshot.forEach((doc) => {
                fetchedNotifications.push({ id: doc.id, ...doc.data() });
            });
            setNotifications(fetchedNotifications);
        } catch (error) {
            console.error("Erro ao buscar notificações:", error);
        }
    };

    const handleMarkAsRead = async (notificationId, isRead) => {
        try {
            const notificationRef = doc(db, `empresas/${user.empresaId}/notificacoes`, notificationId);
            await updateDoc(notificationRef, { isRead: !isRead });

            loadNotifications(filter); // Recarregar notificações após alteração
        } catch (error) {
            console.error("Erro ao marcar como lida:", error);
        }
    };

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const secondsPast = (now.getTime() - timestamp) / 1000;

        if (secondsPast < 60) {
            return `${Math.floor(secondsPast)} segundo(s) atrás`;
        } else if (secondsPast < 3600) {
            return `${Math.floor(secondsPast / 60)} minuto(s) atrás`;
        } else if (secondsPast < 86400) {
            return `${Math.floor(secondsPast / 3600)} hora(s) atrás`;
        } else {
            return `${Math.floor(secondsPast / 86400)} dia(s) atrás`;
        }
    };

    const renderNotificationItem = ({ item }) => {
        const isRead = item.isRead;
        const timeAgo = formatTimeAgo(new Date(item.createdAt.seconds * 1000));

        return (
            <View style={[styles.notification, { borderLeftColor: isRead ? 'green' : 'red' }]}>
                <TouchableOpacity onPress={() => handleMarkAsRead(item.id, isRead)}>
                    <View>
                        <Text style={styles.notificationTitle}>{item.titulo}</Text>
                        <Text style={styles.notificationMessage}>{item.mensagem}</Text>
                        <Text style={styles.notificationTime}>{timeAgo}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 }}>
                <Text style={styles.header}>Notificações</Text>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name="bars" size={24} color="#fff" style={styles.burgerIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.filterButtons}>
                <TouchableOpacity onPress={() => setFilter(null)}>
                    <View style={[styles.filterButton, { backgroundColor: filter === null ? '#1e3a8a' : '#333' }]}>
                        <Text style={styles.filterButtonText}>Todas</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter(false)}>
                    <View style={[styles.filterButton, { backgroundColor: filter === false ? '#1e3a8a' : '#333' }]}>
                        <Text style={styles.filterButtonText}>Não Lidas</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter(true)}>
                    <View style={[styles.filterButton, { backgroundColor: filter === true ? '#1e3a8a' : '#333' }]}>
                        <Text style={styles.filterButtonText}>Lidas</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <FlatList
                data={notifications}
                renderItem={renderNotificationItem}
                keyExtractor={(item) => item.id}
                style={styles.notificationList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#050512',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16,
    },
    filterButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    filterButton: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 8,
    },
    filterButtonText: {
        color: 'white',
        fontSize: 16,
    },
    notificationList: {
        marginTop: 16,
    },
    notification: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#333',
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        borderLeftWidth: 4,
    },
    notificationTitle: {
        fontWeight: 'bold',
        color: 'white',
    },
    notificationMessage: {
        color: '#ccc',
    },
    notificationTime: {
        color: '#888',
        fontSize: 12,
    },
    markAsReadButton: {
        color: '#4c9eeb',
    },
});

export default NotificationScreen;
