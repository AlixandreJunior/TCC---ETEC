import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Appbar } from 'react-native-paper'; // Certifique-se de ter react-native-paper instalado
import { router } from 'expo-router'; // Para a ação de voltar, se usar Expo Router
import VerticalDotsIcon from './Icons/VerticalDotsIcon';

interface HeaderWithOptionsProps {
  title: string;
  onBackPress?: () => void;
  onOptionPress?: () => void;
}

const HeaderWithOptions: React.FC<HeaderWithOptionsProps> = ({ title, onBackPress, onOptionPress }) => {
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back(); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appbar}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title={title} titleStyle={styles.appbarTitle} />
        <TouchableOpacity onPress={onOptionPress}>
          <VerticalDotsIcon/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
        backgroundColor: '#FFFF',
  },
  appbar: {
    backgroundColor: '#FFFF',
    marginHorizontal: 6,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 0, 
    shadowOpacity: 0, 
  },
  appbarTitle: {
    fontSize: 18,
    fontWeight: 'regular',
    color: '#00000', // Cor do título
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00FF00', // Cor verde vibrante para "Salvar"
    marginRight: 10, // Espaçamento à direita
  },
});

export default HeaderWithOptions;