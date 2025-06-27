import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Platform,
  ViewStyle,
  TouchableOpacity,
  ActivityIndicator, // Importar ActivityIndicator
  ScrollView, // Importar ScrollView
} from 'react-native'
import { TextInput, Menu, Button } from 'react-native-paper' // Importar Menu e Button
import DateTimePicker from '@react-native-community/datetimepicker'
import Header from '@/components/Header'
import FormHeader from '@/components/FormHeader'
import { registerExerciseLog } from '@/services/exercise/registerExerciseLog'
import { getExerciseList } from '@/services/exercise/listExercise'
import { Exercise } from '@/types/health/exercise' // Certifique-se de que a interface Exercise está correta

import { MaterialCommunityIcons } from '@expo/vector-icons'; // Para o ícone do Menu

// Importar as fontes Poppins que você carrega em _layout.tsx
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import { router } from 'expo-router'

const RegisterExerciseScreen: React.FC = () => {
  const [exerciseList, setExerciseList] = useState<Exercise[]>([])
  const [exerciseId, setExerciseId] = useState<number | null>(null)
  const [menuVisible, setMenuVisible] = useState(false)

  const [duration, setDuration] = useState<string>('30')
  const [distance, setDistance] = useState<string>('') // opcional
  const [datetime, setDatetime] = useState<Date>(new Date())

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [loadingExercises, setLoadingExercises] = useState(false)
  const [loadingSave, setLoadingSave] = useState(false)

  useEffect(() => {
    const fetchExercises = async () => {
      setLoadingExercises(true)
      try {
        const data = await getExerciseList()
        setExerciseList(data)
        if (data.length > 0) setExerciseId(data[0].id) // Seleciona o primeiro por padrão
      } catch (error: any) {
        Alert.alert('Erro', error.message || 'Não foi possível carregar exercícios.')
      } finally {
        setLoadingExercises(false)
      }
    }
    fetchExercises()
  }, [])

  function formatDatetimeToISO(date: Date): string {
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    const hh = String(date.getHours()).padStart(2, '0')
    const min = String(date.getMinutes()).padStart(2, '0')
    const ss = String(date.getSeconds()).padStart(2, '0') // Adicionar segundos para consistência ISO
    return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}` // Formato ISO 8601 completo
  }

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false); // Esconde o seletor em ambas as plataformas
    if (Platform.OS === 'android') {
      if (event.type === 'set' && selectedDate) {
        const newDate = new Date(datetime);
        newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        setDatetime(newDate);
      }
    } else { // iOS
      if (selectedDate) {
        const newDate = new Date(datetime);
        newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        setDatetime(newDate);
      }
    }
  };

  const onChangeTime = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false); // Esconde o seletor em ambas as plataformas
    if (Platform.OS === 'android') {
      if (event.type === 'set' && selectedTime) {
        const newDate = new Date(datetime);
        newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0); // Zera segundos e ms
        setDatetime(newDate);
      }
    } else { // iOS
      if (selectedTime) {
        const newDate = new Date(datetime);
        newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
        setDatetime(newDate);
      }
    }
  };

  const handleSave = async () => {
    if (!exerciseId) {
      Alert.alert('Erro', 'Selecione um exercício.')
      return
    }
    if (!duration || parseInt(duration, 10) <= 0) {
        Alert.alert('Erro', 'A duração deve ser um número positivo.');
        return;
    }
    if (distance && parseFloat(distance) <= 0) {
        Alert.alert('Erro', 'A distância deve ser um número positivo ou vazio.');
        return;
    }


    setLoadingSave(true)
    const data = {
      exercise: exerciseId,
      duration: parseInt(duration, 10),
      distance: distance ? parseFloat(distance) : undefined, // Envia undefined se vazio
      datetime: formatDatetimeToISO(datetime),
    }

    try {
      await registerExerciseLog(data)
      Alert.alert('Sucesso', 'Exercício registrado com sucesso!')
      router.back() // Navega de volta após o sucesso
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível registrar o exercício.')
    } finally {
      setLoadingSave(false)
    }
  }

  const selectedExerciseName = exerciseList.find((ex) => ex.id === exerciseId)?.name || 'Selecione';

  return (
    <View style={styles.container}>
      <Header avatarChar='A'/>
      <FormHeader title="Registrar Exercício" onSavePress={handleSave} />

      <ScrollView contentContainerStyle={styles.formContent} showsVerticalScrollIndicator={false}>
        {/* Exercício select */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Exercício</Text>
          {loadingExercises ? (
            <ActivityIndicator animating size="small" color="#0000ff" />
          ) : (
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <TouchableOpacity
                  onPress={() => setMenuVisible(true)}
                  style={[styles.textInputStyle, styles.pickerButton]} // Aplicando estilo de input
                >
                  <Text style={styles.pickerButtonText}>
                    {selectedExerciseName}
                  </Text>
                  <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
                </TouchableOpacity>
              }
            >
              {exerciseList.map((exercise) => (
                <Menu.Item
                  key={exercise.id}
                  onPress={() => {
                    setExerciseId(exercise.id);
                    setMenuVisible(false);
                  }}
                  title={exercise.name}
                  titleStyle={styles.menuItemText} // Estilo para o texto do item do menu
                />
              ))}
            </Menu>
          )}
        </View>

        {/* Data */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Data</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.textInputStyle, styles.pickerButton]}>
            <Text style={styles.pickerButtonText}>{datetime.toLocaleDateString('pt-BR')}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker value={datetime} mode="date" display="default" onChange={onChangeDate} />
          )}
        </View>

        {/* Hora */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Hora</Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={[styles.textInputStyle, styles.pickerButton]}>
            <Text style={styles.pickerButtonText}>{datetime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</Text>
            {/* Ícone de relógio removido, se o design não o tem */}
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker value={datetime} mode="time" display="default" onChange={onChangeTime} />
          )}
        </View>

        {/* Duração */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Duração (minutos)</Text>
          <TextInput
            mode="outlined"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
            style={styles.textInput}
            outlineStyle={styles.textInputOutline as ViewStyle}
            theme={{ fonts: { regular: { fontFamily: 'Poppins_400Regular' } } }} // Aplica fonte Poppins
          />
        </View>

        {/* Distância */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Distância (km)</Text>
          <TextInput
            mode="outlined"
            value={distance}
            onChangeText={setDistance}
            keyboardType="numeric"
            placeholder="Opcional"
            style={styles.textInput}
            outlineStyle={styles.textInputOutline as ViewStyle}
            theme={{ fonts: { regular: { fontFamily: 'Poppins_400Regular' } } }} // Aplica fonte Poppins
          />
        </View>

        {loadingSave && (
          <View style={styles.savingOverlay}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.savingText}>Registrando exercício...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  formContent: { padding: 16 }, // Padding da ScrollView
  inputSection: { marginBottom: 20 },
  inputLabel: { 
    fontSize: 14, 
    fontFamily: 'Poppins_400Regular', // Poppins SemiBold para labels
    color: '#4B5563', 
    marginBottom: 2
  },
  // Estilo base para todos os inputs (TextInput e TouchableOpacity picker)
  textInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    // Remover paddingVertical/Horizontal fixos aqui para deixar o Paper gerenciar
  },
  textInputOutline: { 
    borderRadius: 8, 
    borderColor: '#E5E7EB',
  } as ViewStyle, // Casting para ViewStyle para compatibilidade

  // NOVO: Estilo para TouchableOpacity que simulam TextInput (Data/Hora e Menu)
  textInputStyle: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1, // Para ter a borda como outlined
    borderColor: '#E5E7EB', // Cor da borda
    minHeight: 56, // Altura padrão para TextInput do Paper
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    paddingHorizontal: 12, // Padding horizontal consistente
    fontFamily: 'Poppins_400Regular', // Fonte para o texto dentro do picker
  },
  pickerButton: {
    flexDirection: 'row', // Para alinhar texto e possível ícone
    alignItems: 'center', // Alinha verticalmente
    justifyContent: 'space-between', // Espaço entre texto e ícone (se houver)
    // paddingVertical: 14, // Removido para usar minHeight e paddingVertical da textInputStyle
    // paddingHorizontal: 12,
  },
  pickerButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#333', // Cor do texto
  },
  menuButton: { // Estilo para o Button do Paper
    // O Button do Paper já tem um estilo padrão, mas podemos ajustar para combinar
    // com o textInputStyle. Ele já usa 'mode="outlined"'.
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    minHeight: 56, // Altura consistente
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  menuItemText: { // Estilo para o texto dentro dos itens do Menu
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#333',
  },
  multilineTextInput: { // Estilo para TextInput multiline
    minHeight: 100, // Altura mínima maior
    textAlignVertical: 'top', // Alinha o texto ao topo
  },
  savingOverlay: { // Estilo para o overlay de salvamento
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  savingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
});

export default RegisterExerciseScreen