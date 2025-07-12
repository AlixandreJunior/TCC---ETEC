import { Provider as PaperProvider } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Header from '@/components/Layout/Header';
import FormHeader from '@/components/Layout/FormHeader';
import { registerExerciseLog } from '@/services/exercise/registerExerciseLog';
import { getExerciseList } from '@/services/exercise/listExercise';
import { Exercise } from '@/types/health/exercise';
import { router } from 'expo-router';
import { MainInput } from '@/components/Inputs/MainInput';
import { DateTimeInput } from '@/components/Inputs/DateTimeInput';
import { SelectInput } from '@/components/Inputs/SelectInput';

const RegisterExerciseScreen: React.FC = () => {
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
  const [exerciseId, setExerciseId] = useState<number | null>(null);
  const [duration, setDuration] = useState<string>('30');
  const [distance, setDistance] = useState<string>('');
  const [datetime, setDatetime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getExerciseList();
        setExerciseList(data);
        if (data.length > 0) setExerciseId(data[0].id);
      } catch (error: any) {
        Alert.alert('Erro', error.message || 'Não foi possível carregar exercícios.');
      }
    };
    fetchExercises();
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

  const onChangeDate = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newDate = new Date(datetime);
      newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
      setDatetime(newDate);
    }
  };

  const onChangeTime = (_event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(datetime);
      newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
      setDatetime(newDate);
    }
  };

  const handleSave = async () => {
    if (!exerciseId) {
      Alert.alert('Erro', 'Selecione um exercício.');
      return;
    }
    if (!duration || parseInt(duration, 10) <= 0) {
      Alert.alert('Erro', 'A duração deve ser um número positivo.');
      return;
    }
    if (distance && parseFloat(distance) <= 0) {
      Alert.alert('Erro', 'A distância deve ser um número positivo ou deixada em branco.');
      return;
    }

    setLoadingSave(true);
    const data = {
      exercise: exerciseId,
      duration: parseInt(duration, 10),
      distance: distance ? parseFloat(distance) : undefined,
      datetime: formatDatetimeToISO(datetime),
    };

    try {
      await registerExerciseLog(data);
      Alert.alert('Sucesso', 'Exercício registrado com sucesso!');
      router.back();
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível registrar o exercício.');
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <PaperProvider>
    <View style={styles.container}>
      <Header avatarChar="A" />
      <FormHeader title="Registrar Exercício" onSavePress={handleSave} />

      <ScrollView contentContainerStyle={styles.formContent} showsVerticalScrollIndicator={false}>
        <SelectInput
          labelText="Exercício"
          itemList={exerciseList}
          setItemId={setExerciseId}
          itemId={exerciseId}
        />

        <DateTimeInput
          labelText="Data"
          datetime={datetime}
          mode="date"
          onChange={onChangeDate}
          onPress={() => setShowDatePicker(true)}
          showPicker={showDatePicker}
        />

        <DateTimeInput
          labelText="Hora"
          datetime={datetime}
          mode="time"
          onChange={onChangeTime}
          onPress={() => setShowTimePicker(true)}
          showPicker={showTimePicker}
        />

        <MainInput
          labelText="Duração (minutos)"
          onChangeText={setDuration}
          keyboardType="numeric"
          value={duration}
        />

        <MainInput
          labelText="Distância (km)"
          onChangeText={setDistance}
          keyboardType="numeric"
          value={distance}
          placeholder="Opcional"
        />

        {loadingSave && (
          <View style={styles.savingOverlay}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.savingText}>Registrando exercício...</Text>
          </View>
        )}
      </ScrollView>
    </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  formContent: { padding: 16 },
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

export default RegisterExerciseScreen;
