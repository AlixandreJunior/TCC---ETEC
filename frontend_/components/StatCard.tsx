import React from 'react';
import { View, Text, StyleSheet, Dimensions, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface StatCardProps {
  icon: React.ReactNode;
  value: number | string; // O valor numérico ou texto da estatística
  label: string; // O texto da label (ex: 'Diários registrados')
  cardWidth: number; // Largura pré-calculada para responsividade
  style?: ViewStyle; // Para estilos adicionais no card (como margins)
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, cardWidth, style }) => {
  return (
    <View style={[styles.card, { width: cardWidth }, style]}>
      <View style={styles.iconBackground}>
        {icon}
      </View>
      <Text style={styles.valueText}>{value}</Text>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12, 
    borderWidth: 1,
    borderColor:'#E5E7EB' ,
    padding: 15, 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 3,
    marginBottom: 10, // Espaçamento entre as linhas de cards
  },
  iconBackground: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#AEAEAE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Espaçamento entre o ícone e o valor
  },
  valueText: {
    fontSize: 22, 
    fontFamily: 'Poppins_400Regular',
    color: '#111827',
    marginBottom: 4, // Espaçamento entre o valor e o label
  },
  labelText: {
    fontSize: 12, 
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center', 
    color: '#6B7280',
    lineHeight: 18, 
  },
});

export default StatCard;