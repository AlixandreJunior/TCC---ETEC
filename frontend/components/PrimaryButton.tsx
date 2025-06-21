import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
}

export default function PrimaryButton({ title, onPress }: PrimaryButtonProps): React.JSX.Element {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8BC34A',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});