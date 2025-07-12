import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { Card } from 'react-native-paper';
import { router } from 'expo-router';

import Header from '@/components/Layout/Header';
import FormHeader from '@/components/Layout/FormHeader';
import { registerHydratationLog } from '@/services/hydratation/registerHydratation';
import { DateTimeInput } from '@/components/Inputs/DateTimeInput';
import { MainInput } from '@/components/Inputs/MainInput';
import { QuantityCounter } from '@/components/Cards/QuantityCounter';

interface QuantitiesState {
  '250': number;
  '500': number;
  '750': number;
  '1000': number;
}

const RegisterHydrationScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [quantities, setQuantities] = useState<QuantitiesState>({
    '250': 0,
    '500': 0,
    '750': 0,
    '1000': 0,
  });
  const [isSaving, setIsSaving] = useState(false);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleQuantityChange = (volumeMl: number, newQuantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [volumeMl.toString()]: newQuantity,
    }));
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (Platform.OS === 'android') {
      if (event.type === 'set' && date) {
        setSelectedDate(date);
      }
    } else {
      if (date) {
        setSelectedDate(date);
      }
    }
  };

  const handleSave = async () => {
    let totalHydration = 0;

    for (const volumeKey in quantities) {
      if (Object.prototype.hasOwnProperty.call(quantities, volumeKey)) {
        const volume = parseInt(volumeKey, 10);
        totalHydration += volume * quantities[volumeKey as keyof QuantitiesState];
      }
    }

    if (customAmount && !isNaN(parseFloat(customAmount))) {
      totalHydration += parseFloat(customAmount);
    }

    if (totalHydration <= 0) {
      Alert.alert("Erro", "A quantidade total de hidratação deve ser maior que zero.");
      return;
    }

    setIsSaving(true);

    const dataToSend = {
      quantity: totalHydration,
      date: formatDate(selectedDate),
    };

    try {
      await registerHydratationLog(dataToSend);
      Alert.alert('Sucesso', 'Hidratação registrada com sucesso!');
      router.back();
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao registrar hidratação.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header avatarChar="A" />
      <FormHeader title="Registrar Hidratação" onSavePress={handleSave} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <DateTimeInput
          labelText='Data'
          datetime={selectedDate}
          mode='date'
          onChange={handleDateChange}
          onPress={() => setShowDatePicker(true)}
          showPicker={showDatePicker}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Escolha uma opção ou adicione uma personalizada</Text>
          <Card style={styles.optionsCard} elevation={1}>
            <QuantityCounter label="Copo" volume={250} onQuantityChange={handleQuantityChange} initialQuantity={quantities['250']} />
            <View style={styles.separator} />
            <QuantityCounter label="Garrafa Pequena" volume={500} onQuantityChange={handleQuantityChange} initialQuantity={quantities['500']} />
            <View style={styles.separator} />
            <QuantityCounter label="Garrafa Média" volume={750} onQuantityChange={handleQuantityChange} initialQuantity={quantities['750']} />
            <View style={styles.separator} />
            <QuantityCounter label="Garrafa Grande" volume={1000} onQuantityChange={handleQuantityChange} initialQuantity={quantities['1000']} />
          </Card>
        </View>

        <MainInput
          labelText='Quantidade Personalizada'
          keyboardType='numeric'
          onChangeText={text => setCustomAmount(text.replace(/[^0-9]/g, ''))}
          value={customAmount}
          placeholder='Coloque uma quantidade personalizada'
        />
      </ScrollView>

      {isSaving && (
        <View style={styles.savingOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.savingText}>Registrando hidratação...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollViewContent: { paddingBottom: 20 },
  section: { paddingHorizontal: 16, marginTop: 20 },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#4B5563',
    marginBottom: 2,
  },
  optionsCard: {
    borderRadius: 12,
    backgroundColor: 'white',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 10,
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

export default RegisterHydrationScreen;