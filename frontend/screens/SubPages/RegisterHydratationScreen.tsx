import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Appbar, TextInput, IconButton, Card } from 'react-native-paper';

// --- Interfaces para Props ---

interface QuantityCounterProps {
  label: string;
  volume: number;
  onQuantityChange: (volumeMl: number, newQuantity: number) => void;
  initialQuantity?: number;
}

// Componente reutilizável para o contador de quantidade (Copo, Garrafa, etc.)
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
    onQuantityChange(volume, newQuantity); // Envia o volume e a nova quantidade para o pai
  };

  const decrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(volume, newQuantity); // Envia o volume e a nova quantidade para o pai
    }
  };

  return (
    <View style={styles.quantityItem}>
      <View>
        <Text style={styles.itemLabel}>{label}</Text>
        <Text style={styles.itemVolume}>{volume} ml</Text>
      </View>
      <View style={styles.counterContainer}>
        <TouchableOpacity onPress={decrement} style={styles.counterButton}>
          <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{quantity}</Text>
        <TouchableOpacity onPress={increment} style={styles.counterButton}>
          <Text style={styles.counterButtonText}>+</Text></TouchableOpacity>
      </View>
    </View>
  );
};

// Interface para o estado 'quantities'
interface QuantitiesState {
  '250': number; // Copo
  '500': number; // Garrafa Pequena
  '750': number; // Garrafa Média
  '1000': number; // Garrafa Grande
}

const RegisterHydrationScreen: React.FC = () => {
  const [customAmount, setCustomAmount] = useState<string>('');
  const [quantities, setQuantities] = useState<QuantitiesState>({
    '250': 0,
    '500': 0,
    '750': 0,
    '1000': 0,
  });

  const handleQuantityChange = (volumeMl: number, newQuantity: number) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [volumeMl.toString()]: newQuantity, // Converte a chave numérica para string
    }));
  };

  const handleSave = () => {
    let totalHydration: number = 0;
    // Soma as quantidades das opções predefinidas
    for (const volumeKey in quantities) {
      if (Object.prototype.hasOwnProperty.call(quantities, volumeKey)) {
        const volume = parseInt(volumeKey, 10);
        totalHydration += volume * quantities[volumeKey as keyof QuantitiesState];
      }
    }
    // Adiciona a quantidade personalizada, se houver
    if (customAmount && !isNaN(parseFloat(customAmount))) {
      totalHydration += parseFloat(customAmount);
    }

    console.log('Total de Hidratação Registrado:', totalHydration, 'ml');
    console.log('Quantidades por tipo:', quantities);
    console.log('Quantidade Personalizada:', customAmount);
  };

  return (
    <View style={styles.container}>
      {/* Barra Superior (Appbar) */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => router.push('/hydratation')} />
        <Appbar.Content title="Registrar Hidratação" titleStyle={styles.appbarTitle} />
        {/* CORREÇÃO: Envolvendo o texto Mintr💧 em Appbar.Action */}
        
        <Appbar.Action icon="check" color="green" onPress={handleSave} />
      </Appbar.Header>

      {/* Seção de Data */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data</Text>
        <Card style={styles.dateCard} elevation={1}>
          <Text style={styles.dateText}>Hoje</Text>
        </Card>
      </View>

      {/* Seção de Escolha de Opções */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Escolha uma opção ou adicione uma personalizada</Text>
        <Card style={styles.optionsCard} elevation={1}>
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

      {/* Seção de Quantidade Personalizada */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quantidade Personalizada</Text>
        <TextInput
          mode="outlined" // Estilo com borda
          placeholder="Coloque uma quantidade personalizada"
          keyboardType="numeric" // Teclado numérico
          value={customAmount}
          onChangeText={setCustomAmount}
          style={styles.customInput}
          outlineStyle={styles.customInputOutline} // Estilo da borda externa
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Fundo cinza claro
  },
  appbar: {
    backgroundColor: '#c8e6c9', // Verde claro
    justifyContent: 'space-between',
  },
  appbarTitle: {
    marginLeft: -10, // Ajuste para o título ficar mais perto do botão de voltar
  },
  mintrLogo: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#388e3c', // Cor do texto Mintr
    marginRight: 10, // Ajuste de margem se necessário
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  dateCard: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  optionsCard: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 15,
  },
  quantityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemVolume: {
    fontSize: 14,
    color: 'gray',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0', // Cinza claro
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  counterButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  counterValue: {
    fontSize: 18,
    fontWeight: 'bold',
    minWidth: 30, // Garante espaço para números maiores
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0', // Linha separadora entre itens
    marginVertical: 5,
  },
  customInput: {
    backgroundColor: 'white', // Fundo branco para o TextInput
  },
  customInputOutline: {
    borderRadius: 10, // Assegura que o outline também seja arredondado
    borderColor: '#e0e0e0', // Cor da borda
  } as ViewStyle, // Casting explícito para ViewStyle para outlineStyle
});

export default RegisterHydrationScreen;