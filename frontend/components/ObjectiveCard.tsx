// src/components/ObjectiveCard.tsx
import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/styles/colors'; 

interface ObjectiveCardProps {
  objectiveText: string;
  sequence: number;
}

const ObjectiveCard: React.FC<ObjectiveCardProps> = ({ objectiveText, sequence }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <Ionicons name="checkmark-circle" size={30} color={colors.moodExcellent} />
      </View>
      <Ionicons name="book-outline" size={24} color={colors.darkGrey} style={styles.bookIcon} />
      <View style={styles.textContainer}>
        <Text style={styles.objectiveText}>{objectiveText}</Text>
        <Text style={styles.sequenceText}>Sequencia de {sequence} dias</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1, // Borda leve para destacar
    borderColor: colors.borderColor,
  },
  iconWrapper: {
    marginRight: 10,
  },
  bookIcon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  objectiveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
    fontFamily: 'Poppins_600SemiBold',
  },
  sequenceText: {
    fontSize: 12,
    color: colors.mediumGrey,
    marginTop: 2,
    fontFamily: 'Poppins_400Regular',
  },
});

export default ObjectiveCard;