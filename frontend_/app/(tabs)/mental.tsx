import { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions, Alert, Text, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import Header from '@/components/Layout/Header';
import DateNavigation from '@/components/DateNavigator';
import ObjectiveDisplayCard from '@/components/Cards/ObjectiveCard';
import DiaryDayHistory from '@/components/DiaryDayHistory';
import FloatingActionButton from '@/components/DiaryFloatingButton';

import { Diary, MoodType } from '@/types/mental/diary';
import { getDiaryList } from '@/services/diary/listDiary';
import { getMoodVisuals } from '@/utils/moodHelper';
import { getActivityIconName } from '@/utils/activityIconMapper';

import { Objective } from '@/types/mental/objectives';
import { getObjectiveList } from '@/services/objectives/listObjectives';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateNavigator from '@/components/DateNavigator';
import { ObjectiveSection } from '@/components/ObjectiveSection';
import { HistoricSection } from '@/components/HistoricSection';

const { width } = Dimensions.get('window');

interface TransformedActivity {
  name: string;
}

interface TransformedDiaryEntryData {
  time: string;
  mood: MoodType;
  iconSource: any;
  moodColor: string;
  activities: TransformedActivity[];
  title: string;
  content: string;
  photoUrl?: string;
}

interface AdaptedDiaryHistory {
  date: string;
  entries: TransformedDiaryEntryData[];
}

export default function MentalScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [loadingDiaries, setLoadingDiaries] = useState<boolean>(true);
  const [loadingObjectives, setLoadingObjectives] = useState<boolean>(true);
  const [errorDiaries, setErrorDiaries] = useState<string | null>(null);
  const [errorObjectives, setErrorObjectives] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      setLoadingDiaries(true);
      setErrorDiaries(null);
      try {
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const data = await getDiaryList(month, year);
        setDiaries(data);
      } catch (err: any) {
        setErrorDiaries(err.message || 'Falha ao carregar diários.');
        console.error('Erro ao buscar diários:', err);
      } finally {
        setLoadingDiaries(false);
      }
    };

    fetchDiaries();
  }, [currentDate]);

  useEffect(() => {
    const fetchObjectives = async () => {
      setLoadingObjectives(true);
      setErrorObjectives(null);
      try {
        const data = await getObjectiveList();
        setObjectives(data);
      } catch (err: any) {
        setErrorObjectives(err.message || 'Falha ao carregar objetivos.');
        console.error('Erro ao buscar objetivos:', err);
      } finally {
        setLoadingObjectives(false);
      }
    };

    fetchObjectives();
  }, []);

  const adaptedDiaryEntries: AdaptedDiaryHistory[] = [];
  if (diaries.length > 0) {
    const groupedByDate: { [key: string]: TransformedDiaryEntryData[] } = {};

    diaries.forEach(diary => {
      const entryDate = new Date(diary.datetime);
      const formattedDate = entryDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
      const displayDate = entryDate.toDateString() === new Date().toDateString() ? 'Hoje, ' + formattedDate : formattedDate;

      const moodVisuals = getMoodVisuals(diary.mood);
      
      //@ts-ignore
      const transformedActivities: TransformedActivity[] = diary.activities.map(activity => ({
        name: activity.name,
        iconName: getActivityIconName(activity.name),
      }));

      const transformedEntry: TransformedDiaryEntryData = {
        time: entryDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        mood: diary.mood,
        iconSource: moodVisuals.iconSource,
        moodColor: moodVisuals.color,
        activities: transformedActivities,
        title: diary.title || 'Sem Título',
        content: diary.content,
        photoUrl: diary.photo,
      };

      if (!groupedByDate[displayDate]) {
        groupedByDate[displayDate] = [];
      }
      groupedByDate[displayDate].push(transformedEntry);
    });

    for (const date in groupedByDate) {
      if (Object.prototype.hasOwnProperty.call(groupedByDate, date)) {
        adaptedDiaryEntries.push({
          date: date,
          entries: groupedByDate[date],
        });
      }
    }
  }

  const handleCreateDiary = () => {
    router.push('/diary/create');
  };

  const handleCreateObjective = () => {
    router.push('/objective/create');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        avatarChar="A"
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <DateNavigator
          currentDate={currentDate}
          mode='month'
          onDateChange={(newDate) => setCurrentDate(newDate)}
        />

        <ObjectiveSection
          objectives={objectives}
          loadingObjectives={loadingObjectives}
          errorObjectives={errorObjectives}
        />

        <HistoricSection
          loadingDiaries={loadingDiaries}
          errorDiaries={errorDiaries}
          adaptedDiaryEntries={adaptedDiaryEntries}
        />
      </ScrollView>

      <FloatingActionButton
        onPressCreateDiary={handleCreateDiary}
        onPressCreateObjective={handleCreateObjective}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 8,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#111827',
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});