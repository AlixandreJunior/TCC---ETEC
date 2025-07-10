import { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { isSameWeek, startOfWeek, isSameDay } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { router } from "expo-router";

import Header from "@/components/Layout/Header";
import DateNavigator from "@/components/DateNavigator";
import { MainStatsPanel } from "@/components/MainStatsPanel";
import { HydratationCard } from "@/components/HydratationCard";
import { ActivityCard } from "@/components/ActivityCard";

import { MindfulnessLog } from '@/types/health/mindfulness';
import { ExerciseLog } from '@/types/health/exercise';
import { Hydratation } from '@/types/health/hydratation';

import { getMindfulnessList } from "@/services/mindfulness/listMindfulnessLog";
import { getExerciseLogs } from "@/services/exercise/listExerciseLog";
import { getHydratationList } from "@/services/hydratation/listHydratation";

const { width, height } = Dimensions.get("window");

export default function HealthScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mindfulnessLogs, setMindfulnessLogs] = useState<MindfulnessLog[]>([]);
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>([]);
  const [hydrationLogs, setHydrationLogs] = useState<Hydratation[]>([]);
  const [loadingHealthData, setLoadingHealthData] = useState(true);
  const [loadingHydration, setLoadingHydration] = useState(true);
  const [fetchedWeekStart, setFetchedWeekStart] = useState<Date | null>(null);
  const [fetchedHydrationDate, setFetchedHydrationDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchHealthData = async () => {
      const currentWeekStart = startOfWeek(currentDate, { weekStartsOn: 0, locale: ptBR });

      if (fetchedWeekStart && isSameWeek(currentWeekStart, fetchedWeekStart, { weekStartsOn: 0, locale: ptBR })) {
        return;
      }

      setLoadingHealthData(true);
      try {
        const mindfulnessData = await getMindfulnessList(currentDate);
        const exerciseData = await getExerciseLogs(currentDate);

        setMindfulnessLogs(mindfulnessData);
        setExerciseLogs(exerciseData);
        setFetchedWeekStart(currentWeekStart);
      } catch (err: any) {
        console.error('Erro (useEffect HealthData):', err); 
      } finally {
        setLoadingHealthData(false);
      }
    };

    fetchHealthData();
  }, [currentDate, fetchedWeekStart]);

  useEffect(() => {
    const fetchHydrationData = async () => {
      if (fetchedHydrationDate && isSameDay(currentDate, fetchedHydrationDate)) {
        return;
      }

      setLoadingHydration(true);
      try {
        const hydrationData = await getHydratationList(currentDate);
        setHydrationLogs(hydrationData);
        setFetchedHydrationDate(currentDate);
      } catch (err: any) {
        console.error('Erro (useEffect Hydration):', err);
      } finally {
        setLoadingHydration(false);
      }
    };

    fetchHydrationData();
  }, [currentDate, fetchedHydrationDate]);

  const getWeeklyProgress = (logs: { datetime: string }[]): boolean[] => {
    const progress = Array(7).fill(false);
    const currentWeekStart = startOfWeek(currentDate, { weekStartsOn: 0, locale: ptBR });

    logs.forEach(log => {
      const logDate = new Date(log.datetime);
      if (isSameWeek(logDate, currentWeekStart, { weekStartsOn: 0, locale: ptBR })) {
        const dayIndex = logDate.getDay();
        progress[dayIndex] = true;
      }
    });
    return progress;
  };

  const exerciseDaysProgress = getWeeklyProgress(exerciseLogs);
  const mindfulnessDaysProgress = getWeeklyProgress(mindfulnessLogs);

  const completedExerciseDays = exerciseDaysProgress.filter(Boolean).length;
  const completedMindfulnessDays = mindfulnessDaysProgress.filter(Boolean).length;

  const calculateDailyStats = (logs: ExerciseLog[], date: Date) => {
    let totalDistance = 0;
    let totalDurationMinutes = 0;

    logs.forEach(log => {
      const logDate = new Date(log.datetime);
      if (isSameDay(logDate, date)) {
        totalDistance += log.distance || 0;
        totalDurationMinutes += log.duration || 0;
      }
    });

    const totalKcal = Math.round(totalDurationMinutes * 5);
    const totalSteps = Math.round(totalDistance * 1300);

    return {
      distance: totalDistance.toFixed(2),
      steps: totalSteps,
      kcal: totalKcal,
    };
  };

  const currentDayStats = calculateDailyStats(exerciseLogs, currentDate);

  const totalHydrationToday = hydrationLogs.reduce((sum, log) => sum + (log.quantity || 0), 0);
  const hydrationGoal = 2000;
  const hydrationProgressPercentage = (totalHydrationToday / hydrationGoal) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <Header avatarChar="A" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <DateNavigator
          currentDate={currentDate}
          mode="week"
          onDateChange={setCurrentDate}
        />

        {loadingHealthData || loadingHydration ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        ) : (
          <>
            <MainStatsPanel currentDayStats={currentDayStats} />

            <HydratationCard
              handleHydrationPress={() => router.push("../hydratation/")}
              hydrationProgressPercentage={hydrationProgressPercentage}
              totalHydrationToday={totalHydrationToday}
            />

            <ActivityCard
              title="Dias com Exercício"
              onPressCard={() => router.push('../exercises/')}
              activityDaysProgress={exerciseDaysProgress}
              completedActivityDays={completedExerciseDays}
            />

            <ActivityCard
              title="Dias com Mindfulness"
              onPressCard={() => router.push('../mindfulness/')}
              activityDaysProgress={mindfulnessDaysProgress}
              completedActivityDays={completedMindfulnessDays}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: width * 0.05,
  },
  loadingIndicator: {
    marginTop: height * 0.05,
  },
});
