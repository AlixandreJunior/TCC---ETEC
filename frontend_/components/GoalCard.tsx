// src/components/GoalCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TextStyle, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/styles/colors'; 

// Tipos para as props do componente
interface GoalCardProps {
  iconName: keyof typeof Ionicons.glyphMap;
  number: string | number;
  description: string;
  type: 'water' | 'day'; // Tipos específicos para o estilo
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 3; // Mesma largura dos cards de estatísticas para consistência

const GoalCard: React.FC<GoalCardProps> = ({ iconName, number, description, type }) => {
  let cardSpecificStyle: ViewStyle = styles.lightGreenDayCard; // Padrão

  if (type === 'water') {
    cardSpecificStyle = styles.blueWaterCard;
  } else if (type === 'day') {
    cardSpecificStyle = styles.darkGreenDayCard;
  }

  return (
    <View style={[styles.card, cardSpecificStyle]}>
      <Ionicons name={iconName} size={30} color={colors.white} style={styles.cardIcon} />
      <Text style={styles.cardNumber}>{number}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    width: cardWidth,
    height: cardWidth, // Deixa ele quadrado
  },
  cardIcon: {
    marginBottom: 5,
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  cardDescription: {
    fontSize: 12,
    color: colors.white,
    textAlign: 'center',
  },
  blueWaterCard: {
    backgroundColor: colors.blueWater,
  },
  darkGreenDayCard: {
    backgroundColor: colors.darkGreenDay,
  },
  lightGreenDayCard: {
    backgroundColor: colors.primaryGreen,
  },
});

export default GoalCard;