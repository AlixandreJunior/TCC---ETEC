// components/ObjectiveCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FormCard from './FormCard'; // Reutilizando FormCard

interface ObjectiveCardProps {
  objectiveName: string;
  sequence: number;
  isCompleted?: boolean;
}

export default function ObjectiveCard({
  objectiveName,
  sequence,
  isCompleted = false,
}: ObjectiveCardProps): React.JSX.Element {
  return (
    <FormCard style={styles.objectiveCard}>
      <View style={styles.content}>
        <MaterialCommunityIcons
          name={isCompleted ? 'check-circle' : 'checkbox-blank-circle-outline'}
          size={24}
          color={isCompleted ? '#8BC34A' : '#7F8C8D'}
          style={styles.icon}
        />
        <MaterialCommunityIcons name="book-open-outline" size={24} color="#2C3E50" style={styles.icon} />
        <View>
          <Text style={styles.objectiveName}>{objectiveName}</Text>
          <Text style={styles.sequenceText}>Sequência de {sequence} dias</Text>
        </View>
      </View>
    </FormCard>
  );
}

const styles = StyleSheet.create({
  objectiveCard: {
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  objectiveName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  sequenceText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
});