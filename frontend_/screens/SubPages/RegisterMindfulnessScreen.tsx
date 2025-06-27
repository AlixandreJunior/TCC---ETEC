import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Platform,
  ViewStyle,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { TextInput, Menu, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '@/components/Header';
import FormHeader from '@/components/FormHeader';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

// NOVO: Serviços e interfaces de Mindfulness
import { getMindfulnessList } from '@/services/mindfulness/listMindfulness'; // Para listar tipos de mindfulness
import { registerMindfulnessLog } from '@/services/mindfulness/registerMindfulnessLog'; // Para registrar o log
import { Mindfulness } from '@/types/health/mindfulness'; // Interface para o tipo de Mindfulness

// Importar as fontes Poppins
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_500Medium // Adicione se usar este peso
} from '@expo-google-fonts/poppins';


const RegisterMindfulnessScreen: React.FC = () => {
  const [mindfulnessTypeList, setMindfulnessTypeList] = useState<Mindfulness[]>([]);
  const [mindfulnessTypeId, setMindfulnessTypeId] = useState<number | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const [duration, setDuration] = useState<string>('15'); // Duração padrão para mindfulness
  const [datetime, setDatetime] = useState<Date>(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loadingMindfulnessTypes, setLoadingMindfulnessTypes] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    const fetchMindfulnessTypes = async () => {
      setLoadingMindfulnessTypes(true);
      try {
        const data = await getMindfulnessList(); // Busca os tipos de mindfulness
        setMindfulnessTypeList(data);
        if (data.length > 0) setMindfulnessTypeId(data[0].id); // Seleciona o primeiro por padrão
      } catch (error: any) {
        Alert.alert('Erro', error.message || 'Não foi possível carregar tipos de mindfulness.');
      } finally {
        setLoadingMindfulnessTypes(false);
      }
    };
    fetchMindfulnessTypes();
  }, []);

  function formatDatetimeToISO(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}`;
  }

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (Platform.OS === 'android') {
      if (event.type === 'set' && selectedDate) {
        const newDate = new Date(datetime);
        newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        setDatetime(newDate);
      }
    } else {
      if (selectedDate) {
        const newDate = new Date(datetime);
        newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        setDatetime(newDate);
      }
    }
  };

  const onChangeTime = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (Platform.OS === 'android') {
      if (event.type === 'set' && selectedTime) {
        const newDate = new Date(datetime);
        newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
        setDatetime(newDate);
      }
    } else {
      if (selectedTime) {
        const newDate = new Date(datetime);
        newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
        setDatetime(newDate);
      }
    }
  };

  const handleSave = async () => {
    if (!mindfulnessTypeId) {
      Alert.alert('Erro', 'Selecione um tipo de mindfulness.');
      return;
    }
    if (!duration || parseInt(duration, 10) <= 0) {
      Alert.alert('Erro', 'A duração deve ser um número positivo.');
      return;
    }

    setLoadingSave(true);
    const dataToSend = {
      mindfulness: mindfulnessTypeId, // ID do tipo de mindfulness
      duration: parseInt(duration, 10),
      datetime: formatDatetimeToISO(datetime),
    };

    try {
      await registerMindfulnessLog(dataToSend);
      Alert.alert('Sucesso', 'Sessão de mindfulness registrada com sucesso!');
      router.back();
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível registrar a sessão de mindfulness.');
    } finally {
      setLoadingSave(false);
    }
  };

  const selectedMindfulnessTypeName = mindfulnessTypeList.find((type) => type.id === mindfulnessTypeId)?.name || 'Selecione';

  return (
    <View style={styles.container}>
      <Header avatarChar='A'/>
      <FormHeader title="Registrar Mindfulness" onSavePress={handleSave} />
      
      <ScrollView contentContainerStyle={styles.formContent} showsVerticalScrollIndicator={false}>
        {/* Mindfulness Type select */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Tipo de Mindfulness</Text>
          {loadingMindfulnessTypes ? (
            <ActivityIndicator animating size="small" color="#0000ff" />
          ) : (
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <TouchableOpacity
                  onPress={() => setMenuVisible(true)}
                  style={[styles.textInputStyle, styles.pickerButton]}
                >
                  <Text style={styles.pickerButtonText}>
                    {selectedMindfulnessTypeName}
                  </Text>
                  <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
                </TouchableOpacity>
              }
            >
              {mindfulnessTypeList.map((mindfulnessType) => (
                <Menu.Item
                  key={mindfulnessType.id}
                  onPress={() => {
                    setMindfulnessTypeId(mindfulnessType.id);
                    setMenuVisible(false);
                  }}
                  title={mindfulnessType.name}
                  titleStyle={styles.menuItemText}
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
            theme={{ fonts: { regular: { fontFamily: 'Poppins_400Regular' } } }}
          />
        </View>

        {loadingSave && (
          <View style={styles.savingOverlay}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.savingText}>Registrando sessão...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  formContent: { padding: 16 },
  inputSection: { marginBottom: 20 },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#4B5563',
    marginBottom: 2
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  textInputOutline: {
    borderRadius: 8,
    borderColor: '#E5E7EB',
  } as ViewStyle,
  
  textInputStyle: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 56,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#333',
    flex: 1,
  },
  menuButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    minHeight: 56,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  menuItemText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#333',
  },
  multilineTextInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  savingOverlay: {
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

export default RegisterMindfulnessScreen