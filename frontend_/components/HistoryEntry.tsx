// components/HistoryEntry.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface HistoryEntryProps {
  sentiment: 'Excelente' | 'Neutro' | 'Ruim';
  activity: string;
  group: string;
  time: string;
  notes: string;
  isLast?: boolean; // Para controlar a linha pontilhada
}

const getSentimentIcon = (sentiment: HistoryEntryProps['sentiment']) => {
  switch (sentiment) {
    case 'Excelente':
      return { name: 'emoticon-happy-outline', color: '#8BC34A' }; // Verde
    case 'Neutro':
      return { name: 'emoticon-neutral-outline', color: '#F1C40F' }; // Amarelo/Laranja
    case 'Ruim':
      return { name: 'emoticon-sad-outline', color: '#E74C3C' }; // Vermelho
    default:
      return { name: 'emoticon-outline', color: '#7F8C8D' };
  }
};

export default function HistoryEntry({
  sentiment,
  activity,
  group,
  time,
  notes,
  isLast = false,
}: HistoryEntryProps): React.JSX.Element {
  const { name, color } = getSentimentIcon(sentiment);

  return (
    <View style={styles.entryContainer}>
      <View style={styles.timelineColumn}>
        <MaterialCommunityIcons name={'abacus'} size={30} color={color} style={styles.sentimentIcon} />
        {!isLast && <View style={styles.dottedLine} />}
      </View>
      <View style={styles.contentColumn}>
        <View style={styles.headerRow}>
          <Text style={[styles.sentimentText, { color }]}>{sentiment}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
        <View style={styles.activityRow}>
          <MaterialCommunityIcons name="book-open-outline" size={16} color="#7F8C8D" />
          <Text style={styles.activityText}>{activity}</Text>
          <Text style={styles.groupText}>{group}</Text>
        </View>
        <Text style={styles.notesText}>{notes}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  entryContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineColumn: {
    alignItems: 'center',
    marginRight: 10,
  },
  sentimentIcon: {
    marginBottom: 5,
  },
  dottedLine: {
    width: 2,
    flex: 1,
    borderStyle: 'dotted',
    borderColor: '#BDC3C7', // Cinza claro para a linha
    borderWidth: 1,
    borderRadius: 1, // Para fazer pontos pequenos
  },
  contentColumn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sentimentText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  activityText: {
    fontSize: 14,
    color: '#2C3E50',
    marginLeft: 5,
    marginRight: 8,
    fontWeight: '500',
  },
  groupText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  notesText: {
    fontSize: 14,
    color: '#5D6D7E',
    lineHeight: 20,
  },
});