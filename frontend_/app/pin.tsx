import MintroLogo from '@/components/Layout/MintroLogo'; // Importe seu componente MintroLogo
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';

// Obtenha as dimensões da janela uma vez, para usar em cálculos responsivos
const { width, height } = Dimensions.get('window');

export default function App(): React.JSX.Element {
  const [pin, setPin] = useState<string>('');

  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      setPin(pin.slice(0, -1));
    } else if (pin.length < 4) { // Assumindo um PIN de 4 dígitos
      setPin(pin + key);
    }

    // Exemplo de lógica de validação de PIN (pode ser mais complexa)
    if (pin.length === 3 && key !== 'backspace') { // Verifica quando o 4º dígito está prestes a ser inserido
      const newPin = pin + key;
      // Simulando uma validação de PIN
      if (newPin === '1234') { // PIN de exemplo para validação
        Alert.alert('Sucesso!', 'PIN Correto!');
        setPin(''); // Limpa o PIN após sucesso
      } else {
        Alert.alert('Erro', 'PIN Incorreto! Tente novamente.');
        setPin(''); // Limpa o PIN após erro
      }
    }
  };

  return (
    <View style={styles.container}>
      <MintroLogo /> {/* Seu componente de logo já é responsivo */}

      {/* Área de Entrada do PIN */}
      {/* Adicionado um View extra para agrupar o prompt e os círculos, para melhor espaçamento */}
      <View style={styles.pinSection}>
        <Text style={styles.pinPrompt}>Inserir PIN</Text>
        <View style={styles.pinCirclesContainer}>
          {[...Array(4)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.pinCircle,
                pin.length > index && styles.pinCircleFilled,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Teclado Numérico */}
      {/* Adicionado um View extra para o teclado para melhor controle de layout */}
      <View style={styles.keypadContainer}>
        <View style={styles.keypad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <TouchableOpacity
              key={number}
              style={styles.keypadButton}
              onPress={() => handleKeyPress(String(number))}
            >
              <Text style={styles.keypadButtonText}>{number}</Text>
            </TouchableOpacity>
          ))}
          {/* Espaço vazio para alinhamento da última linha do teclado */}
          <View style={styles.keypadButtonPlaceholder} />
          <TouchableOpacity
            style={styles.keypadButton}
            onPress={() => handleKeyPress('0')}
          >
            <Text style={styles.keypadButtonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keypadButton}
            onPress={() => handleKeyPress('backspace')}
          >
            {/* Ícone de backspace */}
            <Text style={styles.keypadButtonText}>⌫</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo o espaço disponível
    backgroundColor: '#f5f5f5', // Fundo cinza claro
    alignItems: 'center', // Centraliza itens horizontalmente
    justifyContent: 'space-between', // Distribui o espaço entre os elementos verticalmente
    paddingVertical: height * 0.05, // Espaçamento vertical responsivo
  },
  // Removido styles.logoContainer, styles.logoText, styles.plantIcon pois estão no MintroLogo

  pinSection: {
    alignItems: 'center',
    marginBottom: height * 0.05, // Espaçamento abaixo da seção PIN
  },
  pinPrompt: {
    fontSize: width * 0.05, // Tamanho da fonte responsivo baseado na largura
    color: '#6a6a6a',
    marginBottom: height * 0.02, // Espaçamento abaixo do prompt
  },
  pinCirclesContainer: {
    flexDirection: 'row',
  },
  pinCircle: {
    width: width * 0.055, // Tamanho do círculo responsivo, um pouco maior
    height: width * 0.055, // Mantém a proporção para ser um círculo
    borderRadius: (width * 0.055) / 2, // Garante que seja um círculo perfeito
    borderWidth: 2,
    borderColor: '#ccc',
    marginHorizontal: width * 0.025, // Espaçamento horizontal responsivo entre os círculos
  },
  pinCircleFilled: {
    backgroundColor: '#4CAF50', // Cor de preenchimento de exemplo (verde)
    borderColor: '#4CAF50',
  },
  keypadContainer: {
    width: '100%',
    alignItems: 'center', // Centraliza o teclado horizontalmente
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '90%', // Largura do teclado (90% da largura do keypadContainer)
    maxWidth: 400, // Limite máximo para o teclado em telas muito grandes (ex: tablets)
  },
  keypadButton: {
    width: '33.33%', // Três botões por linha
    height: height * 0.09, // Altura do botão responsiva (9% da altura da tela)
    justifyContent: 'center',
    alignItems: 'center',
    // Opcional: borda sutil para os botões do teclado
    // borderWidth: 0.5,
    // borderColor: '#eee',
  },
  keypadButtonPlaceholder: {
    width: '33.33%', // Para manter o layout da última linha
    height: height * 0.09,
  },
  keypadButtonText: {
    fontSize: width * 0.07, // Tamanho da fonte do botão responsivo (7% da largura da tela)
    color: '#4a4a4a',
  },
});