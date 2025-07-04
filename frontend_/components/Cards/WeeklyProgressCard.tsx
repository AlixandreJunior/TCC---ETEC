import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; // Importe TouchableOpacity para o Card inteiro
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from 'react-native-paper'; // Importe Card do react-native-paper

interface WeeklyProgressCardProps {
  title: string;
  completedDays: number;
  totalDays: number;
  weeklyProgress: boolean[]; // Array de booleanos [D, S, T, Q, Q, S, S]
  onPress?: () => void; // Adicionando a prop onPress
}

export default function WeeklyProgressCard({
  title,
  completedDays,
  totalDays,
  weeklyProgress,
  onPress, // Desestruture a prop onPress
}: WeeklyProgressCardProps): React.JSX.Element {
  const daysLabels = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']; // Domingo a Sábado

  return (
    // Usando Card do react-native-paper para ter o onPress e elevação/sombra
    <Card style={styles.card} onPress={onPress} disabled={!onPress}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.progressText}>{completedDays} de {totalDays}</Text>
      <Text style={styles.subtitle}>Esta semana</Text>
      <View style={styles.weeklyProgressContainer}>
        {weeklyProgress.map((isCompleted, index) => (
          <View key={index} style={styles.dayIndicator}>
            {isCompleted ? (
              <MaterialCommunityIcons name="check-circle" size={24} color="#8BC34A" /> // Check verde
            ) : (
              <View style={styles.emptyCircle} /> // Círculo cinza vazio
            )}
            <Text style={styles.dayLabel}>{daysLabels[index]}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 5,
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 15,
  },
  weeklyProgressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  dayIndicator: {
    alignItems: 'center',
    marginHorizontal: 2,
  },
  emptyCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#BDC3C7', // Cinza claro
    backgroundColor: 'transparent',
  },
  dayLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 5,
  },
});