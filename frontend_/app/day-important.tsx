import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  Switch,
  Platform, // Para verificar a plataforma (iOS/Android)
  Alert,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Para ícones
import DateTimePicker from '@react-native-community/datetimepicker'; // Para o seletor de data
import { Picker } from '@react-native-picker/picker'; // Para o dropdown de emoções

// Obtenha as dimensões da janela para cálculos responsivos
const { width, height } = Dimensions.get('window');

// --- Tipagem para o estado dos lembretes ---
interface RemindersState {
  onDay: boolean;
  oneDayBefore: boolean;
  oneWeekBefore: boolean;
  oneMonthBefore: boolean;
}

// --- Componente Principal (Tudo em um só) ---
export default function App(): React.JSX.Element {
  const [eventName, setEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string>('Saudade');
  const [reminders, setReminders] = useState<RemindersState>({
    onDay: true,
    oneDayBefore: true,
    oneWeekBefore: true,
    oneMonthBefore: true,
  });

  const handleBackPress = () => {
    Alert.alert('Navegação', 'Botão de voltar pressionado!');
    // navigation.goBack();
  };

  const handleSavePress = () => {
    Alert.alert(
      'Salvar',
      `Nome: ${eventName}\nData: ${eventDate.toLocaleDateString()}\nEmoção: ${selectedEmotion}\nLembretes: ${JSON.stringify(reminders, null, 2)}`
    );
    // Aqui você enviaria os dados para um backend ou os salvaria localmente
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || eventDate;
    setShowDatePicker(Platform.OS === 'ios'); // No iOS, o picker pode permanecer aberto; no Android, ele fecha
    setEventDate(currentDate);
  };

  const toggleReminder = (reminderType: keyof RemindersState) => {
    setReminders((prevReminders) => ({
      ...prevReminders,
      [reminderType]: !prevReminders[reminderType],
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* --- Cabeçalho --- */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBackPress} style={styles.headerBackButton}>
          <MaterialCommunityIcons name="arrow-left" size={width * 0.07} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dia Importante</Text>
        <TouchableOpacity onPress={handleSavePress} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* --- Campo Nome --- */}
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nome"
          placeholderTextColor="#999"
          value={eventName}
          onChangeText={setEventName}
        />

        {/* --- Campo Data --- */}
        <Text style={styles.label}>Data</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.textInput}>
          <Text style={eventName ? styles.dateTextFilled : styles.dateTextPlaceholder}>
            {eventDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={eventDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'} // 'spinner' para iOS, 'default' para Android
            onChange={onDateChange}
            locale="pt-BR" // Define o idioma para português
          />
        )}

        {/* --- Emoção Associada --- */}
        <Text style={styles.label}>Emoção Associada</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedEmotion}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedEmotion(String(itemValue))
            }
            style={styles.picker}
            itemStyle={styles.pickerItem} // Estilo para itens do iOS
          >
            <Picker.Item label="Saudade" value="Saudade" />
            <Picker.Item label="Alegria" value="Alegria" />
            <Picker.Item label="Tristeza" value="Tristeza" />
            <Picker.Item label="Amor" value="Amor" />
            <Picker.Item label="Gratidão" value="Gratidão" />
          </Picker>
          {/* Ícone de seta para baixo do dropdown */}
          <MaterialCommunityIcons
            name="chevron-down"
            size={width * 0.06}
            color="#999"
            style={styles.pickerIcon}
          />
        </View>

        {/* --- Lembretes --- */}
        <Text style={styles.label}>Lembretes</Text>
        <View style={styles.remindersContainer}>
          <View style={styles.reminderItem}>
            <Text style={styles.reminderText}>No Dia</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={reminders.onDay ? '#4CAF50' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleReminder('onDay')}
              value={reminders.onDay}
            />
          </View>
          <View style={styles.reminderItem}>
            <Text style={styles.reminderText}>Um antes</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={reminders.oneDayBefore ? '#4CAF50' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleReminder('oneDayBefore')}
              value={reminders.oneDayBefore}
            />
          </View>
          <View style={styles.reminderItem}>
            <Text style={styles.reminderText}>1 Semana Antes</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={reminders.oneWeekBefore ? '#4CAF50' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleReminder('oneWeekBefore')}
              value={reminders.oneWeekBefore}
            />
          </View>
          <View style={styles.reminderItem}>
            <Text style={styles.reminderText}>1 Mês Antes</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={reminders.oneMonthBefore ? '#4CAF50' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleReminder('oneMonthBefore')}
              value={reminders.oneMonthBefore}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Fundo cinza claro
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: width * 0.05, // Padding horizontal responsivo
    paddingVertical: height * 0.02,
  },

  // --- Estilos do Cabeçalho ---
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.04,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerBackButton: {
    // Espaçamento para o ícone de volta
  },
  headerTitle: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginLeft: -width * 0.07, // Ajusta para compensar o botão de volta
  },
  saveButton: {
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
  },
  saveButtonText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#4CAF50', // Verde vibrante
  },

  // --- Estilos dos Campos de Formulário ---
  label: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#333',
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.018,
    fontSize: width * 0.04,
    color: '#333',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    justifyContent: 'center', // Para alinhar o texto verticalmente no TouchableOpacity
  },
  dateTextFilled: {
    fontSize: width * 0.04,
    color: '#333',
  },
  dateTextPlaceholder: {
    fontSize: width * 0.04,
    color: '#999',
  },

  // --- Picker (Dropdown) ---
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1, // Para tornar o contêiner do Picker visível
    borderColor: '#eee',
    flexDirection: 'row', // Para posicionar o ícone
    alignItems: 'center',
    paddingRight: width * 0.03, // Espaço para o ícone
  },
  picker: {
    flex: 1, // Ocupa a maior parte do espaço
    height: height * 0.065, // Altura responsiva do picker
    color: '#333',
  },
  pickerItem: {
    fontSize: width * 0.04, // Tamanho da fonte para iOS
  },
  pickerIcon: {
    // Posicionado pelo flexDirection: 'row' e alignItems: 'center' do pickerContainer
  },

  // --- Lembretes (Switches) ---
  remindersContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginTop: height * 0.01, // Pequeno espaço acima
    paddingHorizontal: width * 0.04,
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  reminderText: {
    fontSize: width * 0.04,
    color: '#333',
  },
});