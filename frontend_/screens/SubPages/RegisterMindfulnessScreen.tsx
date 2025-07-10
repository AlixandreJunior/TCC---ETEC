import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Header from '@/components/Layout/Header';
import FormHeader from '@/components/Layout/FormHeader';
import { router } from 'expo-router';

import { getMindfulnessList } from '@/services/mindfulness/listMindfulness';
import { registerMindfulnessLog } from '@/services/mindfulness/registerMindfulnessLog';
import { Mindfulness } from '@/types/health/mindfulness';

import { SelectInput } from '@/components/Inputs/SelectInput';
import { DateTimeInput } from '@/components/Inputs/DateTimeInput';
import { MainInput } from '@/components/Inputs/MainInput';

const RegisterMindfulnessScreen: React.FC = () => {
  const [mindfulnessTypeList, setMindfulnessTypeList] = useState<Mindfulness[]>([]);
  const [mindfulnessTypeId, setMindfulnessTypeId] = useState<number | null>(null);
  const [duration, setDuration] = useState<string>('15');
  const [datetime, setDatetime] = useState<Date>(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    const fetchMindfulnessTypes = async () => {
      try {
        const data = await getMindfulnessList();
        setMindfulnessTypeList(data);
        if (data.length > 0) setMindfulnessTypeId(data[0].id);
      } catch (error: any) {
        Alert.alert('Erro', error.message || 'Não foi possível carregar tipos de mindfulness.');
      }
    };
    fetchMindfulnessTypes();
  }, []);

  const selectedMindfulnessTypeName = useMemo(() => {
    return mindfulnessTypeList.find((type) => type.id === mindfulnessTypeId)?.name || 'Selecione';
  }, [mindfulnessTypeList, mindfulnessTypeId]);

  const formatDatetimeToISO = (date: Date): string => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}`;
  };

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
      mindfulness: mindfulnessTypeId,
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

  return (
    <View style={styles.container}>
      <Header avatarChar="A" />
      <FormHeader title="Registrar Mindfulness" onSavePress={handleSave} />

      <ScrollView contentContainerStyle={styles.formContent} showsVerticalScrollIndicator={false}>
        <SelectInput
          labelText="Mindfulness"
          itemList={mindfulnessTypeList}
          setItemId={setMindfulnessTypeId}
          itemId={mindfulnessTypeId}
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

export default RegisterMindfulnessScreen;
