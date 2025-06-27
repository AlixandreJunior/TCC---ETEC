// components/AuthInput.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface AuthInputProps {
  label: string;
  placeholder: string;
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export default function AuthInput({
  label,
  placeholder,
  iconName,
  value,
  onChangeText,
  keyboardType = 'default',
  autoCapitalize = 'none',
}: AuthInputProps): React.JSX.Element {
  return (
    <>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name={iconName} size={20} color="#7F8C8D" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          placeholderTextColor="#95A5A6" // Adicionado para melhor contraste
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 14,
    color: '#34495E',
    marginBottom: 5,
    marginTop: 15,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#BDC3C7',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },
});