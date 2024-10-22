import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from "react-native-calendars";

export default function CalendarModal({ setVisible, handleFilter }) {
    const [dateNow, setDateNow] = useState(new Date());
    const [markedDates, setMarkedDates] = useState({});


    LocaleConfig.locales['ptBR'] = {
        monthNames: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro'
        ],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        dayNames: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        dayNamesShort: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
        today: "Hoje"
      };
      
    LocaleConfig.defaultLocale = 'ptBR';


    function handleOnDayPress(date) {
        setDateNow(new Date(date.dateString));

        let markedDay = {};
        markedDay[date.dateString] = {
            selected: true,
            selectedColor: '#3B3DBF',
            textColor: '#FFF'
        };

        setMarkedDates(markedDay);
    }

    function formatDateToDDMMYYYY(date) {
        const day = String(date.getDate()).padStart(2, '0'); // Obter o dia com 2 dígitos
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Obter o mês com 2 dígitos (janeiro é 0)
        const year = date.getFullYear(); // Obter o ano

        return `${day}-${month}-${year}`; // Formatar como DD-MM-YYYY
    }

    function handleFilterDate() {
        const formattedDate = formatDateToDDMMYYYY(dateNow); // Formatar a data
        handleFilter(formattedDate); // Enviar a data formatada
        setVisible(); // Fechar o modal
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>

            <View style={styles.modalContent}>
                <Calendar
                    onDayPress={handleOnDayPress}
                    markedDates={markedDates}
                    enableSwipeMonths={true}
                    theme={{
                        todayTextColor: '#FF0000',
                        selectedDayBackgroundColor: '#3B3DBF',
                        selectedDayTextColor: '#FFF',
                        arrowColor: '#FFF',
                        monthTextColor: '#FFF',
                        textDayFontFamily: 'sans-serif',
                        backgroundColor: '#050512',
                        calendarBackground: '#050512'
                        
                    }}
                />

                <TouchableOpacity style={styles.buttonFilter} onPress={handleFilterDate}>
                    <Text style={styles.buttonFilterText}>Selecionar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(34,34,34, 0.4)'
    },
    modalContent: {
        flex: 2,
        justifyContent: 'center',
        backgroundColor: '#050512',
        padding: 14,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    buttonFilter: {
        borderRadius: 4,
        backgroundColor: '#3B3DBF',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonFilterText: {
        color: '#FFF',
        fontSize: 19,
        fontWeight: 'bold'
    }
});
