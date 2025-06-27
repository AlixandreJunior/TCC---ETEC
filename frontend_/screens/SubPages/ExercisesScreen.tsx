import type React from "react"
import { useEffect, useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import { format, startOfWeek, isSameDay, isSameWeek } from "date-fns" // Importe date-fns para manipulação de datas
import { ptBR } from 'date-fns/locale'; // Para localização das semanas e dias

// Importe as fontes Poppins que você carrega em _layout.tsx
import {
  useFonts, // Mantenha o useFonts se este componente for o RootLayoutContent ou se você quer carregar fontes específicas aqui
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import type { ExerciseLog } from "@/types/health/exercise" // Certifique-se do caminho
import { getExerciseLogs } from "@/services/exercise/listExerciseLog" // Certifique-se do caminho
import Header from "@/components/Header" // Certifique-se do caminho
import HeaderWithOptions from "@/components/HeaderWithOptions" // Certifique-se do caminho

const { width, height } = Dimensions.get("window")

interface WeekDayDisplay { // Interface para o estado dos dias da semana para display
  id: string
  letter: string
  date: Date
  exercised: boolean
}

// Assumindo que ExerciseLog pode ter um campo 'exercise' que é um objeto com 'name'
// ou um campo 'description' que pode ser usado como nome.
// Se seu ExerciseLog for apenas um number para 'exercise', você precisará buscar o nome do exercício separadamente.
// Por fidelidade à imagem, vou usar log.exercise (se for objeto) ou log.description.



const ExerciseActivityScreen: React.FC = () => {
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date()) // Data usada para determinar a semana atual
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>([]) // Logs do período
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Estado que armazena a representação visual da semana (para os indicadores D, S, T...)
  const [weekDaysDisplay, setWeekDaysDisplay] = useState<WeekDayDisplay[]>([])
  
  // Para evitar refetching desnecessário quando o dia dentro da mesma semana muda
  const [fetchedWeekStartDate, setFetchedWeekStartDate] = useState<Date | null>(null);


  // Efeito para carregar os logs de exercício da semana atual
  useEffect(() => {
    const loadExerciseLogs = async () => {
      const startOfCurrentWeek = startOfWeek(currentDisplayDate, { weekStartsOn: 0, locale: ptBR });

      // Evita refetch se já buscamos os dados para esta semana
      if (fetchedWeekStartDate && isSameWeek(startOfCurrentWeek, fetchedWeekStartDate, { weekStartsOn: 0, locale: ptBR })) {
          return;
      }

      setLoading(true);
      setError(null);
      try {
        // A função getExerciseLogs deve aceitar a data para buscar logs da semana correspondente
        const logs = await getExerciseLogs(currentDisplayDate) as ExerciseLog[]; 

        // Processa os logs para determinar quais dias tiveram exercício
        const weekDaysData: WeekDayDisplay[] = [];
        const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"]; // 0=Dom, 1=Seg...
        const currentWeekDays: Date[] = [...Array(7)].map((_, i) => {
            const day = new Date(startOfCurrentWeek);
            day.setDate(startOfCurrentWeek.getDate() + i);
            return day;
        });

        currentWeekDays.forEach((day, index) => {
            const exercised = logs.some(log => isSameDay(new Date(log.datetime), day));
            weekDaysData.push({
                id: daysOfWeek[index], // id como string de dia (D, S, T...)
                letter: daysOfWeek[index],
                date: day,
                exercised: exercised,
            });
        });

        setExerciseLogs(logs);
        setWeekDaysDisplay(weekDaysData);
        setFetchedWeekStartDate(startOfCurrentWeek); // Armazena a data de início da semana que foi carregada

      } catch (err: any) {
        setError(err.message || "Erro ao carregar registros de exercício.");
        console.error("Error loading exercise logs:", err);
        setExerciseLogs([]); // Garante que o estado fique vazio em caso de erro
      } finally {
        setLoading(false);
      }
    };

    loadExerciseLogs();
  }, [currentDisplayDate, fetchedWeekStartDate]); // Dispara quando a data exibida muda ou a semana muda

  // Nomes dos dias da semana para contagem de resumos
  const completedDays = weekDaysDisplay.filter((d) => d.exercised).length
  const totalExercises = exerciseLogs.length

  const handleBack = () => {
    router.back()
  }

  const handleAddExercise = () => {
    router.push("/registerexercise") 
  }

  const navigateWeek = (direction: "prev" | "next") => {
    setCurrentDisplayDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + (direction === "next" ? 7 : -7)); // Navega uma semana
      return newDate;
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header avatarChar="A"/>
      <HeaderWithOptions title="Atividade" onBackPress={handleBack} onOptionPress={() => console.log('Options pressed')} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.weekNavigation}>
          <TouchableOpacity onPress={() => navigateWeek("prev")}>
            <MaterialCommunityIcons name="chevron-left" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.weekText}>Esta Semana</Text> 
          <TouchableOpacity onPress={() => navigateWeek("next")}>
            <MaterialCommunityIcons name="chevron-right" size={28} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.summarySection}>
          <View style={styles.summaryContent}>
            <Text style={styles.summaryMain}>{completedDays} de 7</Text>
            <Text style={styles.summarySubtitle}>dias com exercícios</Text>
          </View>
          <Text style={styles.summaryDescription}>
            Você se exercitou um total de {totalExercises} vez{totalExercises !== 1 ? "es" : ""}
          </Text>
        </View>

        <View style={styles.weekDaysContainer}>
          {weekDaysDisplay.map((day, index) => (
            <View key={day.id} style={styles.dayContainer}>
              <View style={[
                styles.dayIndicator,
                day.exercised ? styles.dayIndicatorActive : null,
                isSameDay(day.date, new Date()) && styles.dayIndicatorToday
              ]}>
                {day.exercised && <MaterialCommunityIcons name="check" size={18} color="white" />}
              </View>
              <Text style={styles.dayLabel}>{day.letter}</Text>
            </View>
          ))}
        </View>

        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Histórico</Text>
          <Text style={styles.historyDate}>Hoje, {format(new Date(), "dd 'de' MMMM", { locale: ptBR })}</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#4CAF50" style={styles.loadingIndicator} />
          ) : error ? (
            <Text style={styles.errorText}>Falha ao carregar histórico: {error}</Text>
          ) : exerciseLogs.length > 0 ? (
            exerciseLogs.map((log, index) => (
              <View key={index} style={styles.historyCard}>
                <View style={styles.historyCardContent}>
                  <View>
                    <Text style={styles.exerciseType}>
                        { (log.exercise.name || log.description || "Exercício") }
                    </Text>
                  </View>
                  <Text style={styles.exerciseDetails}>
                      {log.distance ? `${log.distance}km` : ""}
                      {log.distance && log.duration ? " - " : ""}
                      {log.duration ? `${log.duration}min` : ""}
                    </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.historyCard}>
              <View style={styles.historyCardContent}>
                <View>
                  <Text style={styles.exerciseType}>Nenhum exercício registrado</Text>
                  <Text style={styles.exerciseDetails}>Adicione seu primeiro exercício</Text>
                </View>
                <Text style={styles.exerciseCount}>0 min</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={handleAddExercise}>
        <MaterialCommunityIcons name="plus" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  weekNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  weekText: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold", 
    color: "#333",
  },
  summarySection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  summaryContent: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
  },
  summaryMain: {
    fontSize: 32,
    fontFamily: "Poppins_500Medium", // Aplicando Poppins
    color: "#000",
    marginRight: 8,
  },
  summarySubtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular", // Pode ser 500Medium se tiver, ou 400Regular
    color: "#666",
  },
  summaryDescription: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular", // Aplicando Poppins
    color: "#666",
    lineHeight: 20,
  },
  weekDaysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  dayContainer: {
    alignItems: "center",
    gap: 8, // Espaçamento entre o indicador e o label
  },
  dayIndicator: {
    width: 34,
    height: 57, // Ajustado para ser quadrado, ícone de check ficaria melhor
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
  dayLabel: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium", // Pode ser 500Medium ou 400Regular
    color: "#666",
  },
  historySection: {
    paddingHorizontal: 16,
    marginBottom: 50,
  },
  historyTitle: {
    fontSize: 18,
    fontFamily: "Poppins_500Medium", // Aplicando Poppins
    color: "#333",
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular", // Aplicando Poppins
    color: "#666",
    marginBottom: 16,
  },
  historyCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  historyCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: '#E5E7EB',
  },
  exerciseType: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular", // Aplicando Poppins
    color: "#00000",
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular", // Aplicando Poppins
    color: "#666",
  },
  exerciseCount: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium", // Pode ser 500Medium
    color: "#666",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomSpacing: { // Espaço para o FAB no final da ScrollView
    height: 80,
  },
  loadingIndicator: { // Estilo para o ActivityIndicator
    marginTop: 50,
  },
  errorText: { // Estilo para mensagem de erro
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  noDataText: { // Estilo para mensagem de sem dados
    color: 'gray',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
});

export default ExerciseActivityScreen