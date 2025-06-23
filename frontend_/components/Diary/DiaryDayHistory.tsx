import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DiaryEntryCard from './DiaryEntryCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MoodType } from '@/types/mental/diary'; // Ajuste o caminho

// NOVO: Interface para uma atividade transformada
interface TransformedActivity {
  name: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
}

interface TransformedDiaryEntryData {
  time: string;
  mood: MoodType;
  iconSource: any;
  moodColor: string;
  activities: TransformedActivity[]; // NOVO: Agora é um array de atividades transformadas
  title: string;
  content: string;
  photoUrl?: string;
}

interface DiaryDayHistoryProps {
  date: string;
  entries: TransformedDiaryEntryData[];
}

const DiaryDayHistory: React.FC<DiaryDayHistoryProps> = ({ date, entries }) => {
  return (
    <View style={styles.daySection}>
      <View style={styles.dateHeader}>
        <View style={styles.dateDot} />
        <Text style={styles.dateHeaderText}>{date}</Text>
      </View>

      <View style={styles.timelineContainer}>
        <View style={styles.timelineLineContainer}>
          <View style={styles.continuousTimelineLine} />
        </View>

        {entries.map((entry, entryIndex) => (
          <DiaryEntryCard
            key={entryIndex}
            time={entry.time}
            mood={entry.mood}
            iconSource={entry.iconSource}
            moodColor={entry.moodColor}
            activities={entry.activities} // NOVO: Passando o array de atividades
            title={entry.title}
            content={entry.content}
            photoUrl={entry.photoUrl}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  daySection: {
    marginBottom: 24,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#374151',
    marginRight: 12,
    position: 'relative',
    left: -4,
  },
  dateHeaderText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  timelineContainer: {
    position: 'relative',
    paddingLeft: 25,
  },
  timelineLineContainer: {
    position: 'absolute',
    left: 20,
    top: 0,
    bottom: 0,
    width: 2,
    alignItems: 'center',
    marginLeft: -19,
  },
  continuousTimelineLine: {
    width: 2,
    height: '100%',
    borderLeftWidth: 1.5,
    borderLeftColor: '#525252',
    borderStyle: 'dashed',
  },
});

export default DiaryDayHistory;