import { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Header from "../../components/Header";
import ProgressCircle from "../../components/ProgressCircle";
import { format, isSameWeek, startOfWeek, isSameDay } from "date-fns";
import { ptBR } from 'date-fns/locale';

// Importe as interfaces e serviços da API
import { MindfulnessLog } from '@/types/health/mindfulness';
import { ExerciseLog } from '@/types/health/exercise';
import { Hydratation } from '@/types/health/hydratation';
import { getMindfulnessList } from "@/services/mindfulness/listMindfulnessLog";
import { getExerciseLogs } from "@/services/exercise/listExerciseLog";
import { getHydratationList } from "@/services/hydratation/listHydratation";
import ShoeIcon from "@/components/ShoeIcon";
import WaterDropIcon from "@/components/WaterDropIcon";

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


  const formatDateDisplay = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const isToday = isSameDay(date, today);
    const isYesterday = isSameDay(date, yesterday);
    const isTomorrow = isSameDay(date, tomorrow);

    if (isToday) return "Hoje";
    if (isYesterday) return "Ontem";
    if (isTomorrow) return "Amanhã";
    
    return format(date, "EEEE, d 'de' MMMM", { locale: ptBR }).replace(/^\w/, (c) => c.toUpperCase());
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  const weekDaysLabels = ["D", "S", "T", "Q", "Q", "S", "S"];

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
      const formattedDate = format(currentDate, "yyyy-MM-dd");

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

  const totalHydrationToday = hydrationLogs.reduce((sum, log) => {
    return sum + (log.quantity || 0);
  }, 0);

  const hydrationGoal = 2000;
  const hydrationProgressPercentage = (totalHydrationToday / hydrationGoal) * 100;


  const handleDateTextPress = () => {
    Alert.alert("Seletor de Data", "Aqui você abriria um componente de seleção de data.");
  };

  const handleHydrationPress = () => {
    router.push("/hydratation");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header avatarChar="A" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.dateNavigation}>
          <TouchableOpacity onPress={() => navigateDate("prev")}>
            <MaterialCommunityIcons name="chevron-left" size={24} color="#374151" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDateTextPress}>
            <Text style={styles.dateText}>{formatDateDisplay(currentDate)}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigateDate("next")}>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {loadingHealthData || loadingHydration ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        ) : (
          <>
          <View style={styles.mainStats}>
              <View style={styles.sideStatItem}>
                <View style={[styles.progressContainer, styles.sideStatProgressContainer]}> {/* NOVO: Estilo específico */}
                  <ProgressCircle progress={Math.min(parseFloat(currentDayStats.distance) / 10 * 100, 100)} size={width * 0.18} color="#9CC9FF" strokeWidth={5} backgroundColor="#E5E7EB" />
                  <View style={styles.progressContent}>
                    <MaterialCommunityIcons name="map-marker" size={16} color="#3B82F6" />
                  </View>
                </View>
                <Text style={styles.sideStatValue}>{currentDayStats.distance}</Text>
                <Text style={styles.sideStatLabel}>km</Text>
              </View>

              <View style={styles.mainStatItem}>
                <View style={[styles.progressContainer, styles.mainStatProgressContainer]}> {/* NOVO: Estilo específico */}
                  <ProgressCircle progress={Math.min(currentDayStats.steps / 100, 100)} size={width * 0.25} color="#9CC9FF" strokeWidth={6} backgroundColor="#E5E7EB" />
                  <View style={styles.progressContent}>
                    <ShoeIcon size={24}/>
                  </View>
                </View>
                <Text style={styles.mainStatValue}>{currentDayStats.steps}</Text>
                <Text style={styles.mainStatLabel}>passos</Text>
              </View>

              <View style={styles.sideStatItem}>
                <View style={[styles.progressContainer, styles.sideStatProgressContainer]}> {/* NOVO: Estilo específico */}
                  <ProgressCircle progress={Math.min(currentDayStats.kcal / 20, 100)} size={width * 0.18} color="#9CC9FF" strokeWidth={5} backgroundColor="#E5E7EB" />
                  <View style={styles.progressContent}>
                    <MaterialCommunityIcons name="fire" size={16} color="#F97316" />
                  </View>
                </View>
                <Text style={styles.sideStatValue}>{currentDayStats.kcal}</Text>
                <Text style={styles.sideStatLabel}>kcal</Text>
              </View>
            </View>


            <TouchableOpacity style={styles.cardTouchable} onPress={handleHydrationPress} activeOpacity={0.7}>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.cardTitle}>Hidratação</Text>
                    <Text style={styles.cardValue}>{totalHydrationToday} ml</Text>
                    <Text style={styles.cardSubtitle}>Hoje</Text>
                  </View>
                  <View style={styles.hydrationProgress}>
                    <ProgressCircle progress={hydrationProgressPercentage} size={80} color="#9CC9FF" strokeWidth={6} />
                    <View style={styles.hydrationIcon}>
                      <WaterDropIcon size={18}/>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* Exercise Days Card */}
            <TouchableOpacity style={styles.cardTouchable} onPress={() => router.push('/exercises')}>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.cardTitle}>Dias com Exercício</Text>
                    <Text style={styles.cardValue}>{completedExerciseDays} de 7</Text>
                    <Text style={styles.cardSubtitle}>Esta semana</Text>
                  </View>
                  <View style={styles.weekProgress}>
                    <View style={styles.weekDays}>
                      {weekDaysLabels.map((day, index) => (
                        <View key={index} style={styles.dayContainer}>
                          <View style={[styles.dayIndicator, exerciseDaysProgress[index] && styles.dayIndicatorActive]}>
                            {exerciseDaysProgress[index] && <Text style={styles.checkmark}>✓</Text>}
                          </View>
                          <Text style={styles.dayLabel}>{day}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cardTouchable} onPress={() => router.push('/mindfulness')}>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.cardTitle}>Dias com Mindfulness</Text>
                    <Text style={styles.cardValue}>{completedMindfulnessDays} de 7</Text>
                    <Text style={styles.cardSubtitle}>Esta semana</Text>
                  </View>
                  
                  <View style={styles.weekProgress}>
                    <View style={styles.weekDays}>
                      {weekDaysLabels.map((day, index) => (
                        <View key={index} style={styles.dayContainer}>
                          <View style={[styles.dayIndicator, mindfulnessDaysProgress[index] && styles.dayIndicatorActive]}>
                            {mindfulnessDaysProgress[index] && <Text style={styles.checkmark}>✓</Text>}
                          </View>
                          <Text style={styles.dayLabel}>{day}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
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
  dateNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: height * 0.03,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
  },
  loadingIndicator: {
    marginTop: height * 0.05,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: height * 0.05,
    fontSize: 16,
  },
  noDataSectionText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 20,
    width: '100%',
  },
  mainStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: height * 0.03,
    minHeight: height * 0.25,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: width * 0.05,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mainStatItem: {
    alignItems: "center",
    flex: 1,
  },
  sideStatItem: {
    alignItems: "center",
    flex: 0.8,
  },
  progressContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  progressContent: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  mainStatValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 4,
  },
  mainStatLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  sideStatValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 4,
  },
  sideStatLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  cardTouchable: {
    marginBottom: height * 0.02,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.04,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,

  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    fontWeight: "500",
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: "#000",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "400",
  },
  hydrationProgress: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  hydrationIcon: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  weekProgress: {
    alignItems: "flex-end",
  },
  weekDays: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dayContainer: {
    alignItems: "center",
    gap: 1,
  },
  dayLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  dayIndicator: {
    width: 14,
    height: 33, 
    borderRadius: 20, // Metade da largura/altura para ser círculo
    backgroundColor: "#E0E0E0", // Cor cinza para dias não exercitados
    alignItems: "center",
    justifyContent: "center",
  },
  dayIndicatorActive: {
    backgroundColor: "#00FF2F", // Cor verde brilhante para dia exercitado
  },
  dayIndicatorEmptyCircle: { // Para o círculo cinza vazio no dia não exercitado
    width: 20, // Menor que o contêiner para parecer um círculo interno
    height: 20,
    borderRadius: 10,
    borderColor: '#999', // Borda cinza escura
    borderWidth: 1.5,
    backgroundColor: 'transparent',
  },
  dayIndicatorToday: { // Estilo opcional para destacar o dia atual (ex: uma borda)
    borderColor: '#333',
    borderWidth: 2,
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  mainStatProgressContainer: { 
    marginBottom: 0, 
  },
  sideStatProgressContainer: { // NOVO ESTILO: para km/kcal (side items)
    marginBottom: -0, // Move para baixo, dando mais espaço
  },

});