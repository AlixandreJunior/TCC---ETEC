// components/PasswordInput.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface PasswordInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function PasswordInput({
  label,
  placeholder,
  value,
  onChangeText,
}: PasswordInputProps): React.JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock-outline" size={20} color="#7F8C8D" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          placeholderTextColor="#95A5A6" // Adicionado para melhor contraste
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.passwordVisibilityToggle}
        >
          <MaterialCommunityIcons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#7F8C8D"
          />
        </TouchableOpacity>
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
  passwordVisibilityToggle: {
    padding: 5,
  },
});