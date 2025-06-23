import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions, Alert, Text, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import Header from '@/components/Header';
import DateNavigation from '@/components/DateNavigation';
import ObjectiveDisplayCard from '@/components/ObjectiveCard';
import DiaryDayHistory from '@/components/Diary/DiaryDayHistory';
import FloatingActionButton from '@/components/Diary/DiaryFloatingButton';

import { Diary, MoodType } from '@/types/mental/diary';
import { getDiaryList } from '@/services/diary/listDiary';
import { getMoodVisuals } from '@/utils/moodHelper';
import { getActivityIconName } from '@/utils/activityIconMapper';

import { Objective } from '@/types/mental/objectives';
import { getObjectiveList } from '@/services/objectives/listObjectives';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface TransformedActivity {
  name: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
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

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'next') {
      newDate.setMonth(currentDate.getMonth() + 1);
    } else {
      newDate.setMonth(currentDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const formatMonth = (date: Date) => {
    return date
      .toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric',
      })
      .replace(/^\w/, (c) => c.toUpperCase());
  };

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

  const displayObjective = objectives.length > 0 ? objectives[0] : null;

  const formatDeadline = (deadlineString: string) => {
    const date = new Date(deadlineString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };


  const handleCreateDiary = () => {
    router.push('/creatediary');
  };

  const handleCreateObjective = () => {
    router.push('/createobjective');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        avatarChar="A"
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <DateNavigation
          currentPeriodText={formatMonth(currentDate)}
          onPrevPress={() => navigateDate('prev')}
          onNextPress={() => navigateDate('next')}
        />

        {loadingObjectives ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Objetivos</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : errorObjectives ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Objetivos</Text>
            <Text style={styles.errorText}>Erro ao carregar objetivos: {errorObjectives}</Text>
          </View>
        ) : (
          // Só renderiza a seção se houver objetivos para mostrar
          objectives.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Objetivos</Text>
              <ObjectiveDisplayCard
                objectiveTitle={displayObjective?.activity.name || 'Objetivo'}
                objectiveSubtitle={`Meta até ${displayObjective ? formatDeadline(displayObjective.deadline) : ''}`}
              />
            </View>
          )
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Histórico</Text>
          {loadingDiaries ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : errorDiaries ? (
            <Text style={styles.errorText}>Erro ao carregar diários: {errorDiaries}</Text>
          ) : adaptedDiaryEntries.length === 0 ? (
            <Text style={styles.noDataText}>Nenhum diário encontrado para este mês.</Text>
          ) : (
            adaptedDiaryEntries.map((dayData, dayIndex) => (
              <DiaryDayHistory key={dayIndex} date={dayData.date} entries={dayData.entries} />
            ))
          )}
        </View>
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
    backgroundColor: '#F3F4F6',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
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