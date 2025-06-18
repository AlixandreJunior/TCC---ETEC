// src/components/AchievementCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TextStyle, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/styles/colors'; 

// Tipos para as props do componente
interface AchievementCardProps {
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor?: string; // Cor do ícone (opcional)
  title: string;
  description: string;
  type: 'journal' | 'mindfulness'; // Tipos específicos para o estilo
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // Dois cards por linha, com padding e espaçamento

const AchievementCard: React.FC<AchievementCardProps> = ({ iconName, iconColor, title, description, type }) => {
  let iconBgStyle: ViewStyle = styles.greenIconBg; // Verde padrão

  if (type === 'mindfulness') {
    iconBgStyle = styles.purpleIconBg;
  }

  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, iconBgStyle]}>
        <Ionicons name={iconName} size={24} color={iconColor || colors.white} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: 10,
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
    flexDirection: 'row',
    width: cardWidth,
    backgroundColor: colors.white,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  greenIconBg: {
    backgroundColor: colors.primaryGreen,
  },
  purpleIconBg: {
    backgroundColor: colors.purple,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: 3,
  },
  description: {
    fontSize: 12,
    color: colors.mediumGrey,
  },
});

export default AchievementCard;