import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, firestore } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Cria o contexto
const UserContext = createContext();

// Provedor do contexto
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Adiciona estado de erro

    // Função para buscar informações adicionais do usuário no Firestore
    const fetchUserData = async (userId) => {
        try {
            const userDoc = await getDoc(doc(firestore, 'users', userId));
            if (userDoc.exists()) {
                const userData = { uid: userId, ...userDoc.data() };
                // Busca o nome da empresa se o empresaId estiver presente
                if (userData.empresaId) {
                    const empresaNome = await fetchEmpresaNome(userData.empresaId);
                    userData.empresa = empresaNome; // Adiciona o nome da empresa ao usuário
                }
                setUser(userData);
            } else {
                throw new Error("Usuário não encontrado");
            }
        } catch (err) {
            console.error("Erro ao buscar dados do usuário: ", err);
            setError(err.message); // Define o erro no estado
            return null; // Retorna null se houver erro
        }
    };

    // Função para buscar o nome da empresa pelo ID
    const fetchEmpresaNome = async (empresaId) => {
        try {
            const empresaDoc = await getDoc(doc(firestore, 'empresas', empresaId));
            if (empresaDoc.exists()) {
                return empresaDoc.data().nome; // Retorna o nome da empresa
            } else {
                console.error("Empresa não encontrada");
                return "Empresa não disponível"; // Caso a empresa não seja encontrada
            }
        } catch (err) {
            console.error("Erro ao buscar dados da empresa: ", err);
            return "Erro ao buscar empresa"; // Retorna mensagem de erro
        }
    };

    // Monitorar o estado de autenticação
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            setLoading(true); // Define loading como true ao iniciar
            if (authUser) {
                await fetchUserData(authUser.uid); // Busca dados do usuário
            } else {
                setUser(null); // Usuário não logado
            }
            setLoading(false); // Finaliza o carregamento
        });

        return () => {
            unsubscribe(); // Limpa o listener 
        };
    }, []);

    // Função para deslogar o usuário
    const logout = async () => {
        try {
            await auth.signOut();
            setUser(null); // Limpa o estado do usuário
        } catch (err) {
            console.error("Erro ao deslogar: ", err);
        }
    };

    return (
        <UserContext.Provider value={{ user, loading, error, logout, fetchUserData, setUser }}>
            {!loading ? children : null}
        </UserContext.Provider>
    );
};

// Hook para usar o context
export const useUser = () => {
    return useContext(UserContext);
};
