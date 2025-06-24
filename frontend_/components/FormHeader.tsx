import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Appbar } from 'react-native-paper'; // Certifique-se de ter react-native-paper instalado
import { router } from 'expo-router'; // Para a ação de voltar, se usar Expo Router

interface FormHeaderProps {
  title: string;
  onBackPress?: () => void; // Opcional, se não quiser usar router.back()
  onSavePress: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, onBackPress, onSavePress }) => {
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back(); // Usa o router.back() padrão se nenhum handler for fornecido
    }
  };

  return (
    <SafeAreaView style={styles.appbar}>
      <Appbar.BackAction onPress={handleBack} />
      <Appbar.Content title={title} titleStyle={styles.appbarTitle} />
      <TouchableOpacity onPress={onSavePress}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 0, 
    shadowOpacity: 0, 
  },
  appbarTitle: {
    fontSize: 18,
    fontWeight: 'regular',
    color: '#333', // Cor do título
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00FF00', // Cor verde vibrante para "Salvar"
    marginRight: 10, // Espaçamento à direita
  },
});

export default FormHeader;