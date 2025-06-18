// src/components/StatCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TextStyle, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/styles/colors'; 

// Tipos para as props do componente
interface StatCardProps {
  iconName: keyof typeof Ionicons.glyphMap; // Usa o tipo dos nomes de ícones do Ionicons
  number: string | number;
  description: string;
  type: 'journal' | 'mindfulness' | 'exercise'; // Tipos específicos para o estilo
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 3; // 20px de padding esquerdo/direito, 10px de espaçamento entre cards

const StatCard: React.FC<StatCardProps> = ({ iconName, number, description, type }) => {
  let cardSpecificStyle: ViewStyle = styles.greenCard; // Padrão

  if (type === 'mindfulness') {
    cardSpecificStyle = styles.blueCard;
  } else if (type === 'exercise') {
    cardSpecificStyle = styles.mediumGreenCard;
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
    fontFamily: 'Poppins_700Bold',
  },
  cardDescription: {
    fontSize: 12,
    color: colors.white,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  greenCard: {
    backgroundColor: colors.primaryGreen,
  },
  blueCard: {
    backgroundColor: colors.blue,
  },
  mediumGreenCard: {
    backgroundColor: colors.mediumGreen,
  },
});

export default StatCard;