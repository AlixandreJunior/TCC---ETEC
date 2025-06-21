import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Appbar, TextInput, Card } from 'react-native-paper';

interface RegisterActivityScreenProps {}

const RegisterActivityScreen: React.FC<RegisterActivityScreenProps> = () => {
  const [exercise, setExercise] = useState<string>('Corrida');
  const [date, setDate] = useState<string>('Hoje'); // Para ser substituído por um DatePicker real
  const [time, setTime] = useState<string>('9:15'); // Para ser substituído por um TimePicker real
  const [duration, setDuration] = useState<string>('30');

  const handleSave = () => {
    console.log('Atividade Registrada:', {
      exercise,
      date,
      time,
      duration: parseInt(duration, 10),
    });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => router.push('/activity')} />
        <Appbar.Content title="Registrar Atividade" titleStyle={styles.appbarTitle} />
        <Appbar.Action
          icon={() => <Text style={styles.mintrLogo}>Mintr💧</Text>}
          onPress={() => console.log('Mintr Logo Clicado')}
        />
        <Appbar.Action icon="content-save-check" color="green" onPress={handleSave} />
      </Appbar.Header>

      <View style={styles.formContent}>
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Exercício</Text>
          <TextInput
            mode="outlined"
            value={exercise}
            onChangeText={setExercise}
            style={styles.textInput}
            outlineStyle={styles.textInputOutline as ViewStyle}
          />
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Data</Text>
          <TextInput
            mode="outlined"
            value={date}
            onChangeText={setDate}
            editable={false} // Desabilita edição direta para simular um DatePicker
            onPress={() => console.log('Abrir DatePicker')} // Ação para abrir um DatePicker
            style={styles.textInput}
            outlineStyle={styles.textInputOutline as ViewStyle}
          />
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Horario</Text>
          <TextInput
            mode="outlined"
            value={time}
            onChangeText={setTime}
            editable={false} // Desabilita edição direta para simular um TimePicker
            onPress={() => console.log('Abrir TimePicker')} // Ação para abrir um TimePicker
            style={styles.textInput}
            outlineStyle={styles.textInputOutline as ViewStyle}
          />
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Duração (minutos)</Text>
          <TextInput
            mode="outlined"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
            style={styles.textInput}
            outlineStyle={styles.textInputOutline as ViewStyle}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  appbar: {
    backgroundColor: '#c8e6c9',
    justifyContent: 'space-between',
  },
  appbarTitle: {
    marginLeft: -10,
  },
  mintrLogo: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#388e3c',
    marginRight: -10,
  },
  formContent: {
    padding: 16,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  textInputOutline: {
    borderRadius: 8,
    borderColor: '#e0e0e0',
  } as ViewStyle,
});

export default RegisterActivityScreen;