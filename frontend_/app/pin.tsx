import BackspaceIcon from '@/components/Icons/Backspace';
import KeypadSection from '@/components/KeypadSection';
import MintroLogo from '@/components/Layout/MintroLogo';
import PinSection from '@/components/PinSection';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function App(): React.JSX.Element {
  const [pin, setPin] = useState<string>('');

  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      setPin(pin.slice(0, -1));
    } else if (pin.length < 4) {
      setPin(pin + key);
    }

    if (pin.length === 3 && key !== 'backspace') {
      const newPin = pin + key;
      if (newPin === '1234') {
        Alert.alert('Sucesso!', 'PIN Correto!');
        setPin('');
      } else {
        Alert.alert('Erro', 'PIN Incorreto! Tente novamente.');
        setPin('');
      }
    }
  };

  return (
    <View style={styles.container}>

      <MintroLogo />

      <PinSection
        pin={pin}
      />

      <KeypadSection
        handleKeyPress={handleKeyPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: height * 0.05,
  },
});
