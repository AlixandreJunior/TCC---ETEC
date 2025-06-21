import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity, GestureResponderEvent } from 'react-native'; // Importe TouchableOpacity e GestureResponderEvent

interface FormCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void; // Adicionamos a prop onPress
}

export default function FormCard({ children, style, onPress }: FormCardProps): React.JSX.Element {
  // Se onPress for fornecido, envolvemos o conteúdo em um TouchableOpacity
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.formCard, style]}>
        {children}
      </TouchableOpacity>
    );
  }

  // Caso contrário, apenas renderizamos a View
  return (
    <View style={[styles.formCard, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});