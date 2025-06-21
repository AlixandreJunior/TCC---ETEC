// components/AchievementItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FormCard from './FormCard'; // Reutilizando FormCard

interface AchievementItemProps {
  iconName: string;
  iconColor?: string;
  iconBackgroundColor?: string; // Para o fundo do ícone
  title: string;
  description: string;
}

export default function AchievementItem({
  iconName,
  iconColor = 'white', // Cor padrão do ícone na imagem
  iconBackgroundColor = '#8BC34A', // Cor padrão do fundo do ícone
  title,
  description,
}: AchievementItemProps): React.JSX.Element {
  return (
    <FormCard style={styles.card}>
      <View style={styles.content}>
        <View style={[styles.iconBackground, { backgroundColor: iconBackgroundColor }]}>
          <MaterialCommunityIcons name={'account-cash-outline'} size={28} color={iconColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </FormCard>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%', // Duas colunas
    marginHorizontal: '1%', // Espaçamento entre os cartões
    padding: 15,
    marginBottom: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#7F8C8D',
  },
});