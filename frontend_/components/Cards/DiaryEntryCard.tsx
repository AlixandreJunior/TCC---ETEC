import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MoodType } from '@/types/mental/diary';
import { getActivityIconName } from '@/utils/activityIconMapper';


// NOVO: Interface para uma atividade transformada (nome e ícone)
interface TransformedActivity {
  name: string;
}

interface DiaryEntryCardProps {
  time: string;
  mood: MoodType;
  iconSource: any; // Mood icon source
  moodColor: string;
  activities: TransformedActivity[]; // NOVO: Agora é um array de atividades transformadas
  title: string;
  content: string;
  photoUrl?: string;
}

const DiaryEntryCard: React.FC<DiaryEntryCardProps> = ({
  time,
  mood,
  iconSource,
  moodColor,
  activities, 
  title,
  content,
  photoUrl,
}) => {
  return (
    <View style={styles.timelineRow}>
      <View style={styles.timelineIconContainer}>
        <Image source={iconSource} style={styles.timelineIcon} />
      </View>

      <View style={styles.entryCard}>
        <View style={styles.entryHeader}>
          <View style={styles.entryInfo}>
            <Text style={[styles.moodText, { color: moodColor }]}>{mood}</Text>
            <View style={styles.activitiesContainer}>
              {activities.map((activity, index) => (
                <View key={index} style={styles.activityChip}>
                  {getActivityIconName(activity.name, 12)}
                  <Text style={styles.activityChipText}>{activity.name}</Text>
                </View>
              ))}
            </View>
          </View>
          <Text style={styles.timeText}>{time}</Text>
        </View>

        <Text style={styles.entryTitle}>{title}</Text>
        <Text style={styles.entryContent}>{content}</Text>

        {photoUrl && (
          <Image source={{ uri: photoUrl }} style={styles.diaryPhoto} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    position: 'relative',
  },
  timelineIconContainer: {
    position: 'absolute',
    left: -15,
    top: 0,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  timelineIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  entryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginLeft: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  entryInfo: {
    flex: 1,
  },
  moodText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  // NOVO: Container para as atividades em linha
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que os chips quebrem a linha
    marginTop: 5,
  },
  // NOVO: Estilo para cada "chip" de atividade
  activityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 4,
    marginBottom: 6,
  },
  activityChipText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#6B7280',
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  entryContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  diaryPhoto: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    marginTop: 15,
    resizeMode: 'contain',
  },
});

export default DiaryEntryCard;