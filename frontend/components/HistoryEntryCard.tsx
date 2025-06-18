// src/components/HistoryEntryCard.tsx
import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/styles/colors'; 

interface HistoryEntryCardProps {
  mood: 'excellent' | 'bad'; // 'excellent' para sorrindo, 'bad' para triste
  time: string; // Ex: "09:05"
  activity: string; // Ex: "Ler"
  group: string; // Ex: "Jambra's Group"
  description: string; // O texto longo
  isFirst?: boolean; // Para controlar a linha de conexão
  isLast?: boolean; // Para controlar a linha de conexão
}

const HistoryEntryCard: React.FC<HistoryEntryCardProps> = ({
  mood,
  time,
  activity,
  group,
  description,
  isFirst = false,
  isLast = false,
}) => {
  const moodIconName = mood === 'excellent' ? 'happy-outline' : 'sad-outline';
  const moodIconColor = mood === 'excellent' ? colors.moodExcellent : colors.moodBad;
  const moodText = mood === 'excellent' ? 'Excelente' : 'Ruim';

  return (
    <View style={styles.timelineContainer}>
      <View style={styles.timelineLineWrapper}>
        {/* Linha superior (não aparece para o primeiro item) */}
        {!isFirst && <View style={styles.timelineLine} />}
        {/* Ícone de humor */}
        <View style={[styles.moodIconCircle, { backgroundColor: moodIconColor }]}>
          <Ionicons name={moodIconName} size={20} color={colors.white} />
        </View>
        {/* Linha inferior (não aparece para o último item) */}
        {!isLast && <View style={styles.timelineLine} />}
      </View>

      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={[styles.moodText, { color: moodIconColor }]}>{moodText}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
        <View style={styles.activityRow}>
          <Ionicons name="book-outline" size={16} color={colors.darkGrey} style={styles.activityIcon} />
          <Text style={styles.activityText}>{activity}</Text>
        </View>
        <Text style={styles.groupText}>{group}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timelineContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  timelineLineWrapper: {
    alignItems: 'center',
    marginRight: 10,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.lightGrey, // Cor da linha de conexão
  },
  moodIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5, // Espaçamento entre a linha e o círculo
  },
  card: {
    flex: 1, // Para o card ocupar o restante do espaço
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  moodText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins_600SemiBold',
  },
  timeText: {
    fontSize: 12,
    color: colors.mediumGrey,
    fontFamily: 'Poppins_400Regular',
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  activityIcon: {
    marginRight: 5,
  },
  activityText: {
    fontSize: 14,
    color: colors.darkGrey,
    fontFamily: 'Poppins_500Medium',
  },
  groupText: {
    fontSize: 12,
    color: colors.mediumGrey,
    marginBottom: 5,
    fontFamily: 'Poppins_400Regular',
  },
  descriptionText: {
    fontSize: 13,
    color: colors.darkGrey,
    lineHeight: 18,
    fontFamily: 'Poppins_400Regular',
  },
});

export default HistoryEntryCard;