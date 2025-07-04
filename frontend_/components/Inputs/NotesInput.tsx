import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ViewStyle } from 'react-native/types';

interface NotesInputProps {
  notes: string;
  onChangeNotes: (text: string) => void;
}

const NotesInput: React.FC<NotesInputProps> = ({ notes, onChangeNotes }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Anotação</Text>
      <TextInput
        mode="outlined"
        placeholder="Escreva suas anotações aqui..."
        value={notes}
        onChangeText={onChangeNotes}
        multiline
        numberOfLines={4}
        style={[styles.textInput, styles.notesInput]}
        outlineStyle={styles.textInputOutline as ViewStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  textInputOutline: {
    borderRadius: 8,
    borderColor: '#e0e0e0',
  } as ViewStyle,
  notesInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default NotesInput;