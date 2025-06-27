import type React from "react"
import { useEffect, useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import { format, startOfWeek, isSameDay, isSameWeek } from "date-fns"
import { ptBR } from 'date-fns/locale';

// Importe as fontes Poppins que você carrega em _layout.tsx
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import type { MindfulnessLog } from "@/types/health/mindfulness" // Certifique-se do caminho e da interface
import { getMindfulnessList } from "@/services/mindfulness/listMindfulnessLog" // Certifique-se do caminho
// NÃO UTILIZADOS NESTA TELA:
// import { ExerciseLog } from '@/types/health/exercise';
// import { Hydratation } from '@/types/health/hydratation';
// import { getExerciseLogs } from "@/services/exercise/listExerciseLog";
// import { getHydratationList } from "@/services/hydratation/listHydratation";

import Header from "@/components/Header" // Certifique-se do caminho
import HeaderWithOptions from "@/components/HeaderWithOptions" // Certifique-se do caminho
import ProgressCircle from "../../components/ProgressCircle" // Certifique-se do caminho (para km, passos, kcal)
// ProgressBar não é usado aqui
// import ProgressBar from "../../components/ProgressBar" 

// Ícone de Check customizado
import CheckmarkIcon from "@/components/Icons/CheckMarkIcon"  // Certifique-se do caminho

const { width, height } = Dimensions.get("window")

interface WeekDayDisplay { // Interface para o estado dos dias da semana para display
  id: string
  letter: string
  date: Date
  exercised: boolean // Renomeado para 'completed' para ser mais genérico para mindfulness
}

// Para esta tela, assumimos que estamos buscando logs de Mindfulness
// E que o log.mindfulness pode ser um objeto com 'name'


const MindfulnessActivityScreen: React.FC = () => { // RENOMEADO O COMPONENTE
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date()) // Data para navegação da semana
  const [mindfulnessLogs, setMindfulnessLogs] = useState<MindfulnessLog[]>([]) // Logs do período
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [weekDaysDisplay, setWeekDaysDisplay] = useState<WeekDayDisplay[]>([])
  
  
  const [fetchedWeekStartDate, setFetchedWeekStartDate] = useState<Date | null>(null);


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
    const newDate = new Date(currentDisplayDate);
    newDate.setDate(currentDisplayDate.getDate() + (direction === "next" ? 1 : -1));
    setCurrentDisplayDate(newDate); 
  };

  const weekDaysLabels = ["D", "S", "T", "Q", "Q", "S", "S"]; // Nomes dos dias da semana para display

  useEffect(() => {
    const loadMindfulnessLogs = async () => { // RENOMEADO A FUNÇÃO DE FETCH
      const startOfCurrentWeek = startOfWeek(currentDisplayDate, { weekStartsOn: 0, locale: ptBR });

      if (fetchedWeekStartDate && isSameWeek(startOfCurrentWeek, fetchedWeekStartDate, { weekStartsOn: 0, locale: ptBR })) {
          return;
      }

      setLoading(true);
      setError(null); // Limpa erros anteriores
      try {
        // A função getMindfulnessList deve aceitar a data para buscar logs da semana correspondente
        const logs = await getMindfulnessList(currentDisplayDate) as MindfulnessLog[]; // CHAMANDO GETMINDFULNESSLIST
        
        // Processa os logs para determinar quais dias tiveram mindfulness
        const weekDaysData: WeekDayDisplay[] = [];
        const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"]; // 0=Dom, 1=Seg...
        const currentWeekDays: Date[] = [...Array(7)].map((_, i) => {
            const day = new Date(startOfCurrentWeek);
            day.setDate(startOfCurrentWeek.getDate() + i);
            return day;
        });

        currentWeekDays.forEach((day, index) => {
            const completed = logs.some(log => isSameDay(new Date(log.datetime), day)); // 'exercised' se torna 'completed'
            weekDaysData.push({
                id: daysOfWeek[index],
                letter: daysOfWeek[index],
                date: day,
                exercised: completed, // Usando 'exercised' no WeekDayDisplay para compatibilidade
            });
        });

        setMindfulnessLogs(logs); // SETANDO MINDFULNESSLOGS
        setWeekDaysDisplay(weekDaysData);
        setFetchedWeekStartDate(startOfCurrentWeek);

      } catch (err: any) {
        setError(err.message || "Erro ao carregar registros de mindfulness."); // MENSAGEM DE ERRO
        console.error("Error loading mindfulness logs:", err);
        setMindfulnessLogs([]); // Zera dados em caso de erro
      } finally {
        setLoading(false);
      }
    };

    loadMindfulnessLogs(); // CHAMANDO A FUNÇÃO RENOMEADA
  }, [currentDisplayDate, fetchedWeekStartDate]);

  const completedDays = weekDaysDisplay.filter((d) => d.exercised).length // Contagem de dias completos
  const totalLogs = mindfulnessLogs.length // MUDADO PARA TOTAL DE LOGS DE MINDFULNESS

  const handleBack = () => {
    router.back()
  }

  const handleAddMindfulness = () => { // RENOMEADO A FUNÇÃO DE ADICIONAR
    router.push("/registermindfulness") // ROTA PARA REGISTRAR MINDFULNESS
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
      {/* Header Section with Back Button (local style) - NOVO ESTILO FIDELIZADO */}
      <Header avatarChar="A"/>
      <HeaderWithOptions title="Mindfulness" onBackPress={handleBack} onOptionPress={() => console.log('Options pressed')} />

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

        {/* Resumo de Mindfulness */}
        <View style={styles.summarySection}>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryMain}>{completedDays} de 7</Text>
              <Text style={styles.summarySubtitle}>dias com exercícios</Text>
            </View>
            <Text style={styles.summaryDescription}>
              Você fez mindfulness um total de {totalLogs} vez{totalLogs !== 1 ? "es" : ""}
            </Text>
          </View>

        {/* Indicadores de Dias da Semana (D,S,T,Q,Q,S,S) */}
        <View style={styles.weekDaysContainer}>
          {weekDaysDisplay.map((day, index) => (
            <TouchableOpacity key={day.id} style={styles.dayContainer} onPress={() => console.log(`Dia ${day.letter} clicado`)}>
              <View style={[
                styles.dayIndicator,
                day.exercised ? styles.dayIndicatorActive : null, // 'exercised' para manter o estilo
                isSameDay(day.date, currentDisplayDate) && styles.dayIndicatorToday
              ]}>
                {day.exercised ? (
                  <CheckmarkIcon size={18} color="#FFFBFB" />
                ) : (
                  <View /> // Placeholder vazio, dayIndicator já tem o fundo
                )}
              </View>
              <Text style={styles.dayLabel}>{day.letter}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Seção de Histórico de Mindfulness */}
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Histórico</Text>
          <Text style={styles.historyDate}>Hoje, {format(new Date(), "dd 'de' MMMM", { locale: ptBR })}</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#4CAF50" style={styles.loadingIndicator} />
          ) : error ? (
            <Text style={styles.errorText}>Falha ao carregar histórico: {error}</Text>
          ) : mindfulnessLogs.length > 0 ? ( // AGORA USA mindfulnessLogs
            mindfulnessLogs.map((log, index) => (
              <View key={index} style={styles.historyCard}>
                <View style={styles.historyCardContent}>
                  <View>
                    {/* Exibe o nome da atividade de mindfulness ou "Mindfulness" */}
                    <Text style={styles.exerciseType}>
                        {(log.mindfulness as { name: string })?.name || log.description || "Mindfulness"}
                    </Text>
                  </View>
                  <Text style={styles.exerciseCount}>{log.duration || 0} min</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.historyCard}>
              <View style={styles.historyCardContent}>
                <View>
                  <Text style={styles.exerciseType}>Nenhum registro de mindfulness</Text>
                  <Text style={styles.exerciseDetails}>Adicione sua primeira sessão</Text>
                </View>
                <Text style={styles.exerciseCount}>0 min</Text>
              </View>
            </View>
          )}
        </View>

        {/* Bottom spacing for FAB */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddMindfulness}> {/* AJUSTADO HANDLER */}
        <MaterialCommunityIcons name="plus" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Fundo da tela
  },
  scrollView: {
    flex: 1,
  },
  // ESTILOS DO CABEÇALHO LOCAL (AJUSTADOS PARA FIDELIDADE)
  header: {
    backgroundColor: '#ADDEA1', // Cor de fundo do cabeçalho
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minHeight: 56, // Altura mínima para o Appbar
  },
  headerContent: { // Para o alinhamento central
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Para ocupar espaço central
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Para o conteúdo esquerdo (seta e título)
  },
  backButton: {
    marginRight: 10,
    padding: 5, // Aumenta a área de toque
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold", // Poppins SemiBold
    color: "#333",
  },
  // FIM DOS ESTILOS DO CABEÇALHO LOCAL

  weekNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    gap: 8,
  },
  dayIndicator: {
    width: 34,
    height: 57,
    borderRadius: 17, // Metade da largura para cápsula
    backgroundColor: "#D9D9D9", // Cor padrão para dias não exercitados
    alignItems: "center",
    justifyContent: "center",
  },
  dayIndicatorActive: {
    backgroundColor: "#00FF2F", // Cor verde brilhante para dia exercitado
  },
  dayIndicatorEmptyPlaceholder: { // Placeholder vazio, para que o dayIndicator já seja a forma base
    width: 0,
    height: 0,
  },
  dayIndicatorToday: { // Estilo para o dia atual
    borderColor: '#333',
    borderWidth: 2,
  },
  dayLabel: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#666",
  },
  historySection: {
    paddingHorizontal: 16,
    marginBottom: 50,
  },
  historyTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginBottom: 16,
  },
  historyCard: {
    backgroundColor: "white",
    borderRadius: 12, // Arredondamento dos cantos
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2, // Opacidade da sombra
    shadowRadius: 4, // Raio do desfoque
    elevation: 3, // Elevação para Android
    marginBottom: 16,
  },
  historyCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  exerciseType: {
    fontSize: 16, // Tamanho maior
    fontFamily: "Poppins_500Medium", // Mais negrito
    color: "#000", // Cor mais escura
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
  exerciseCount: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
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
  bottomSpacing: {
    height: 80,
  },
  loadingIndicator: {
    marginTop: 50,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  noDataText: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
});

export default MindfulnessActivityScreen