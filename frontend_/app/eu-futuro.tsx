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
  Platform, // Para verificar a plataforma (iOS/Android)
  Alert,
  Dimensions,
  Image, // Para a foto
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Para ícones
import DateTimePicker from '@react-native-community/datetimepicker'; // Para o seletor de data/hora

// Obtenha as dimensões da janela para cálculos responsivos
const { width, height } = Dimensions.get('window');

// --- Tipagem para o estado do humor ---
type Mood = 'Excelente' | 'Bem' | 'Neutro' | 'Mal' | 'Horrível';

// --- Dados para os moods ---
const moods: { label: Mood; iconName: string }[] = [
  { label: 'Excelente', iconName: 'robot-happy-outline' },
  { label: 'Bem', iconName: 'robot-outline' },
  { label: 'Neutro', iconName: 'robot-off-outline' },
  { label: 'Mal', iconName: 'robot-dead' },
  { label: 'Horrível', iconName: 'robot-angry-outline' },
];

// --- Componente Principal (Tudo em um só) ---
export default function App(): React.JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [selectedMood, setSelectedMood] = useState<Mood>('Excelente');
  const [annotation, setAnnotation] = useState<string>('');
  const [deliveryTime, setDeliveryTime] = useState<string>('1 Mês'); // Simplesmente uma string para o exemplo
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // URL da imagem ou null

  const handleBackPress = () => {
    Alert.alert('Navegação', 'Botão de voltar pressionado!');
    // navigation.goBack();
  };

  const handleSavePress = () => {
    Alert.alert(
      'Salvar Carta',
      `Título: ${title}\nData: ${selectedDate.toLocaleDateString()}\nHora: ${selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\nHumor: ${selectedMood}\nAnotação: ${annotation}\nEntrega: ${deliveryTime}\nFoto: ${selectedImage || 'Nenhuma'}`
    );
    // Aqui você enviaria os dados para um backend ou os salvaria localmente
  };

  const onDateChange = (event: any, date?: Date) => {
    const currentDate = date || selectedDate;
    setShowDatePicker(Platform.OS === 'ios'); // No iOS, o picker pode permanecer aberto; no Android, ele fecha
    setSelectedDate(currentDate);
  };

  const onTimeChange = (event: any, time?: Date) => {
    const currentTime = time || selectedTime;
    setShowTimePicker(Platform.OS === 'ios'); // No iOS, o picker pode permanecer aberto; no Android, ele fecha
    setSelectedTime(currentTime);
  };

  const handleImagePick = () => {
    Alert.alert('Escolher Foto', 'Simula a abertura da galeria/câmera.');
    // Aqui você integraria uma biblioteca como `expo-image-picker`
    // Para o exemplo, vamos apenas simular uma URL de imagem
    setSelectedImage('https://via.placeholder.com/150/00FF00/FFFFFF?text=Sua+Foto');
  };

  // Função para formatar a data para exibição (ex: Ontem, 18 de junho)
  const formatDateForDisplay = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Ontem, ${date.getDate()} de ${date.toLocaleString('pt-BR', { month: 'long' })}`;
    } else {
      return `${date.getDate()} de ${date.toLocaleString('pt-BR', { month: 'long' })}`;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* --- Cabeçalho --- */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBackPress} style={styles.headerBackButton}>
          <MaterialCommunityIcons name="arrow-left" size={width * 0.07} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Carta eu futuro</Text>
        <TouchableOpacity onPress={handleSavePress} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* --- Campo Título --- */}
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Título"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
        />

        {/* --- Seletores de Data e Hora --- */}
        <View style={styles.dateTimeContainer}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateTimeButton}>
            <MaterialCommunityIcons name="calendar-range-outline" size={width * 0.05} color="#666" />
            <Text style={styles.dateTimeText}>{formatDateForDisplay(selectedDate)}</Text>
            <MaterialCommunityIcons name="chevron-down" size={width * 0.05} color="#999" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              testID="datePicker"
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
              locale="pt-BR"
            />
          )}

          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateTimeButton}>
            <MaterialCommunityIcons name="clock-outline" size={width * 0.05} color="#666" />
            <Text style={styles.dateTimeText}>{selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            <MaterialCommunityIcons name="chevron-down" size={width * 0.05} color="#999" />
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              testID="timePicker"
              value={selectedTime}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onTimeChange}
              locale="pt-BR"
            />
          )}
        </View>

        {/* --- Como você está se sentindo? (Mood Selector) --- */}
        <Text style={styles.label}>Como você está se sentindo?</Text>
        <View style={styles.moodsContainer}>
          {moods.map((moodItem) => (
            <TouchableOpacity
              key={moodItem.label}
              style={styles.moodItem}
              onPress={() => setSelectedMood(moodItem.label)}
            >
              <MaterialCommunityIcons
                name={moodItem.iconName as any}
                size={width * 0.12}
                color={selectedMood === moodItem.label ? '#4CAF50' : '#A0A0A0'} // Verde para selecionado
              />
              <Text
                style={[
                  styles.moodLabel,
                  selectedMood === moodItem.label && styles.selectedMoodLabel,
                ]}
              >
                {moodItem.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- Campo Anotação --- */}
        <Text style={styles.label}>Anotação</Text>
        <TextInput
          style={[styles.textInput, styles.annotationInput]}
          placeholder="Coloque uma quantidade personalizada"
          placeholderTextColor="#999"
          value={annotation}
          onChangeText={setAnnotation}
          multiline
          textAlignVertical="top" // Para Android, alinha o texto no topo
        />

        {/* --- Tempo para Entrega --- */}
        <Text style={styles.label}>Tempo para Entrega</Text>
        <TouchableOpacity style={styles.textInput}>
          <Text style={styles.deliveryTimeText}>{deliveryTime}</Text>
          {/* Pode adicionar um ícone de seta para baixo aqui se quiser indicar dropdown */}
        </TouchableOpacity>

        {/* --- Foto --- */}
        <Text style={styles.label}>Foto</Text>
        <TouchableOpacity style={styles.imagePickerContainer} onPress={handleImagePick}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} resizeMode="cover" />
          ) : (
            <View style={styles.imagePlaceholder}>
              <MaterialCommunityIcons name="image-outline" size={width * 0.12} color="#ccc" />
              <Text style={styles.choosePhotoText}>Escolher Foto</Text>
              <Text style={styles.addPhotoHint}>Clique para adicionar uma foto</Text>
            </View>
          )}
        </TouchableOpacity>
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
  },
  annotationInput: {
    minHeight: height * 0.15, // Altura mínima responsiva para a anotação
    paddingTop: height * 0.018, // Garante que o texto comece no topo
  },

  // --- Seletores de Data e Hora ---
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.018,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: '48%', // Quase metade da largura para 2 botões por linha
  },
  dateTimeText: {
    fontSize: width * 0.04,
    color: '#333',
    marginLeft: width * 0.02,
    flex: 1, // Ocupa o espaço entre o ícone e a seta
  },

  // --- Seleção de Humor (Mood Selector) ---
  moodsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
  },
  moodItem: {
    alignItems: 'center',
    width: width * 0.18, // Largura responsiva para cada item de humor
  },
  moodLabel: {
    fontSize: width * 0.03,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  selectedMoodLabel: {
    fontWeight: 'bold',
    color: '#4CAF50', // Cor para o humor selecionado
  },

  // --- Tempo para Entrega (simples, TextInput estilizado) ---
  deliveryTimeText: {
    fontSize: width * 0.04,
    color: '#333',
  },

  // --- Foto ---
  imagePickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    height: height * 0.25, // Altura responsiva para a área da foto
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Para cortar a imagem se ela for maior
    marginBottom: height * 0.03,
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  choosePhotoText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
  },
  addPhotoHint: {
    fontSize: width * 0.035,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
});