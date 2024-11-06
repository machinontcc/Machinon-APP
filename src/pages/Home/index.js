import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Modal
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useDrawerStatus } from "@react-navigation/drawer";
import { useUser } from "../../contexts/UserContext"; // Contexto do usuário
import { getFirestore, collection, onSnapshot, query, where, orderBy } from "firebase/firestore"; // Importação do Firestore do Firebase

import Card from "../../components/CardsHome";
import AtividadesRender from "../../components/AtividadesProgamadas";
import CalendarModal from "../../components/CalendarModal";

const { width } = Dimensions.get("window");

export default function Home() {
  const [cards, setCards] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const { user, empresa } = useUser(); // Pega os dados do usuário do contexto
  const navigation = useNavigation();
  const drawerStatus = useDrawerStatus(); // Para abrir/fechar o drawer

  const empresaId = user?.empresaId || ""; // Empresa vinculada ao usuário
  const userName = user?.nome || "Usuário";
  const empresaNome = empresa?.nome || "EmpresaUser";
  const [dateAtividades, setDateAtividades] = useState(""); // Formato DD-MM-YYYY

  useEffect(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    setDateAtividades(formattedDate);
  }, []);

  useEffect(() => {
    if (empresaId) {
      const unsubscribeSensores = listenToSensores();
      const unsubscribeAtividades = listenToAtividades();

      // Cleanup function para evitar memory leaks
      return () => {
        unsubscribeSensores();
        unsubscribeAtividades();
      };
    } else {
      console.error("empresaId não está definido.");
      setLoading(false); // Para evitar loading eterno
    }
  }, [empresaId, dateAtividades]); // Verifique se a empresaId é alterada

  // Função para ouvir os sensores em tempo real
  const listenToSensores = () => {
    const db = getFirestore();
    const sensoresQuery = query(collection(db, "empresas", empresaId, "sensores"));

    return onSnapshot(sensoresQuery, (snapshot) => {
      const sensoresData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Sensores data fetched:", sensoresData);
      setCards(sensoresData);
    });
  };

  // Função para ouvir as atividades em tempo real
  const listenToAtividades = () => {
    const db = getFirestore();
  
    // Certifique-se de que empresaId é válido e não está vazio
    if (!empresaId) {
      console.error("empresaId não está definido.");
      return;
    }
  
    // Definindo a data inicial e final como strings no formato DD-MM-YYYY
    const startDate = dateAtividades; // Data de início
    const endDate = dateAtividades; // Data de término
  
    // Acesso correto à coleção de atividades
    const atividadesQuery = query(
      collection(db, "empresas", empresaId, "atividades"), // Acesso à subcoleção "atividades"
      where("data", ">=", startDate), // Comparar como string
      where("data", "<=", endDate),   // Comparar como string
      orderBy("data")
    );
  
    return onSnapshot(atividadesQuery, (snapshot) => {
      const atividadesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      console.log("Data filtrada:", dateAtividades);
      console.log("Atividades data fetched:", atividadesData);
      setAtividades(atividadesData);
      setLoading(false);
    });
  };

  function filterDateAtividades(dateSelected) {
    setDateAtividades(dateSelected);
  }

  // UseEffect para ajustar a StatusBar conforme o drawer está aberto ou fechado
  useEffect(() => {
    StatusBar.setBackgroundColor(drawerStatus === "open" ? "#121212" : "#050512");
  }, [drawerStatus]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerProfile}>
          <View style={styles.profileSection}>
            <View>
              <Text style={styles.welcomeText}>Olá {userName},</Text>
              <Text style={styles.subText}>Bem-vindo de volta!</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="bars" size={24} color="#fff" style={styles.burgerIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.cards}  >
          <Text style={[styles.subText, {paddingLeft: 4}]}>Sensores da empresa: {empresaNome}</Text>
          <FlatList
            data={cards}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Card data={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>Nenhum sensor disponível</Text>
            )}
          />
        </View>

        <View style={styles.opcoesGerais}>
          <Text style={styles.title}>Opções gerais</Text>
          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconContainer}>
              <View style={[styles.iconBackground, { backgroundColor: '#FF8743' }]} >
                <Icon name="wrench" size={24} color="#fff" />
              </View>
              <Text style={styles.iconText}>Revisões Agendadas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <View style={[styles.iconBackground, { backgroundColor: '#2ECC71' }]} >
                <Icon name="gears" size={24} color="#fff" />
              </View>
              <Text style={styles.iconText}>Manutenções Realizadas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <View style={[styles.iconBackground, { backgroundColor: '#F4D03F' }]} >
                <Icon name="bell" size={24} color="#FFF" />
              </View>
              <Text style={styles.iconText}>Notificar Setor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <View style={[styles.iconBackground, { backgroundColor: '#5DADE2' }]} >
                <Icon name="ellipsis-h" size={24} color="#fff" />
              </View>
              <Text style={styles.iconText}>Mais Opções</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.atividadesContainer}>
          <View style={styles.atividadesHeader}>
            <Text style={[styles.title, { fontSize: 18 }]}>Atividades Programadas</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Icon name="calendar-o" color="#FFF" size={30} style={{paddingRight: 15}}/>
            </TouchableOpacity>
          </View>

          <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <CalendarModal 
              setVisible={() => setModalVisible(false)}
              handleFilter={filterDateAtividades}
            />
          </Modal>

          <FlatList
            data={atividades}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <AtividadesRender data={item} />}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>Nenhuma atividade encontrada para {dateAtividades}</Text>
            )}
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
  loadingContainer: {
    backgroundColor: '#050512',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  scrollContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  headerProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
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
    padding: 10,
  },
  cards: {
    marginTop: 30
  },
  opcoesGerais: {
    marginTop: 40,
  },
  emptyText: {
    color: '#828282',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
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
    backgroundColor: '#1e1e2e',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  selectText: {
    color: '#fff',
    fontSize: 14,
  },
});
