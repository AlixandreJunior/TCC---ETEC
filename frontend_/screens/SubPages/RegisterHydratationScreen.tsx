import FormHeader from '@/components/FormHeader';
import Header from '@/components/Header'; // Mantido, mas não usado diretamente no corpo
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { TextInput, Card } from 'react-native-paper'; // Card ainda é usado para optionsCard
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { registerHydratationLog } from '@/services/hydratation/registerHydratation';
import { Hydratation } from '@/types/health/hydratation';
import { getHydratationList } from '@/services/hydratation/listHydratation';

// Importar as fontes Poppins que você carrega em _layout.tsx
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';


const { width, height } = Dimensions.get('window');
// Definição de ViewStyle para o casting (pode ser removida se React Native 0.70+ e TS config)
type ViewStyle = { [key: string]: any; }; 

interface QuantityCounterProps {
  label: string;
  volume: number;
  onQuantityChange: (volumeMl: number, newQuantity: number) => void;
  initialQuantity?: number;
}

const QuantityCounter: React.FC<QuantityCounterProps> = ({
  label,
  volume,
  onQuantityChange,
  initialQuantity = 0,
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(volume, newQuantity); 
  };

  const decrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(volume, newQuantity);
    }
  };

  return (
    <View style={styles.quantityItem}>
      <View>
        <Text style={styles.itemLabel}>{label}</Text>
        <Text style={styles.itemVolume}>{volume} ml</Text>
      </View>
      {/* NOVO: Ajuste a ordem e os estilos do counterContainer e counterButton */}
      <View style={styles.counterContainer}>
        <Text style={styles.counterValue}>{quantity}</Text> {/* Move o valor para a esquerda */}
        <TouchableOpacity onPress={decrement} style={[styles.counterButton, styles.counterButton]}>
          <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={increment} style={[styles.counterButton, styles.counterButton]}>
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [volumeMl.toString()]: newQuantity,
    }));
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false); // Esconde o picker em ambas as plataformas
    if (Platform.OS === 'android') {
      if (event.type === 'set' && date) {
        setSelectedDate(date);
      }
    } else { // iOS
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
      console.error('Erro ao registrar hidratação:', error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header avatarChar='A'/>
      <FormHeader title='Registrar Hidratação' onSavePress={handleSave}/>
      {/* <Header avatarChar='A'/> Removido, FormHeader já é o topo */}

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          {/* Campo de Data com estilo de input outlined */}
          <TouchableOpacity 
            onPress={() => setShowDatePicker(true)}
            style={[styles.textInputStyle, styles.pickerButton]}
          >
            <Text style={styles.pickerButtonText}>
              {selectedDate.toLocaleDateString('pt-BR')}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Escolha uma opção ou adicione uma personalizada</Text>
          <Card style={styles.optionsCard} elevation={1}> {/* Card Paper para a seção de contadores */}
            <QuantityCounter
              label="Copo"
              volume={250}
              onQuantityChange={handleQuantityChange}
              initialQuantity={quantities['250']}
            />
            <View style={styles.separator} />
            <QuantityCounter
              label="Garrafa Pequena"
              volume={500}
              onQuantityChange={handleQuantityChange}
              initialQuantity={quantities['500']}
            />
            <View style={styles.separator} />
            <QuantityCounter
              label="Garrafa Média"
              volume={750}
              onQuantityChange={handleQuantityChange}
              initialQuantity={quantities['750']}
            />
            <View style={styles.separator} />
            <QuantityCounter
              label="Garrafa Grande"
              volume={1000}
              onQuantityChange={handleQuantityChange}
              initialQuantity={quantities['1000']}
            />
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quantidade Personalizada</Text>
          <TextInput
            mode="outlined"
            placeholder="Coloque uma quantidade personalizada"
            keyboardType="numeric"
            value={customAmount}
            onChangeText={text => {
              const filtered = text.replace(/[^0-9]/g, '');
              setCustomAmount(filtered);
            }}
            style={styles.textInput}
            outlineStyle={styles.textInputOutline as ViewStyle}
            theme={{ fonts: { regular: { fontFamily: 'Poppins_400Regular' } } }} // Aplicando Poppins
          />
        </View>
      </ScrollView>

      {isSaving && ( // NOVO: Indicador de salvamento flutuante
        <View style={styles.savingOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.savingText}>Registrando hidratação...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Fundo cinza claro
  },
  scrollViewContent: {
    paddingBottom: 20, // Espaçamento inferior para a ScrollView
  },
  section: {
    paddingHorizontal: 16, // Padding lateral para as seções
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14, // Menor que 16, conforme imagem
    fontFamily: 'Poppins_400Regular', // Poppins Regular
    color: '#4B5563', // Cor do texto da label
    marginBottom: 2, // Espaçamento menor
  },
  // Estilo base para TouchableOpacity que simulam TextInput (Data/Hora)
  textInputStyle: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB', // Borda cinza claro
    minHeight: 56, // Altura padrão de TextInput outlined do Paper
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    paddingHorizontal: 12, // Padding horizontal consistente
  },
  pickerButton: { // Para os botões de data/hora
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Espaço entre texto e ícone
  },
  pickerButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular', // Poppins Regular
    color: '#333',
    flex: 1, // Permite que o texto ocupe o espaço e empurre o ícone
  },
  // Estilo para TextInput de Quantidade Personalizada
  textInput: { // Usado para Quantidade Personalizada
    backgroundColor: 'white',
    borderRadius: 8,
  },
  textInputOutline: { // Estilo da borda externa do TextInput
    borderRadius: 8,
    borderColor: '#E5E7EB', // Cor da borda
  } as ViewStyle, // Casting para ViewStyle
  
  optionsCard: {
    borderRadius: 12, // Arredondamento do card, um pouco maior que 10 para combinar
    backgroundColor: 'white',
    padding: 16, // Padding interno
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 8, // Mais espaço após o título da seção
  },
  quantityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12, // Um pouco mais de padding vertical
  },
  itemLabel: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular', // Poppins Medium
    color: '#000',
  },
  itemVolume: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular', // Poppins Regular
    color: '#111',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden', // Garante que o conteúdo respeite o borderRadius
  },
  counterButton: {
    width: 32, // Um pouco maior
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    fontSize: 20,
    fontFamily: 'Poppins_500Medium', // Poppins Medium
    color: '#333',
  },
  counterValue: {
    fontSize: 16, // Um pouco menor para caber melhor
    fontFamily: 'Poppins_600SemiBold', // Poppins SemiBold
    color: '#333',
    minWidth: 40, // Mais espaço para o número
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6', // Linha separadora mais clara
    marginVertical: 10, // Mais espaço
  },
  customInput: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  customInputOutline: {
    borderRadius: 8,
    borderColor: '#E5E7EB',
  } as ViewStyle,
  
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

export default RegisterHydrationScreen