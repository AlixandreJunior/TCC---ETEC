import React from "react"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { ExerciseLog } from "@/types/health/exercise"
import type { MindfulnessLog } from "@/types/health/mindfulness"

interface Props {
  type: "exercise" | "mindfulness"
  loading: boolean
  error: string | null
  logs: ExerciseLog[] | MindfulnessLog[]
}

export const ActivityHistorySection: React.FC<Props> = ({ type, loading, error, logs }) => {
  const today = format(new Date(), "dd 'de' MMMM", { locale: ptBR })

  const isExercise = type === "exercise"

  return (
    <View style={styles.historySection}>
      <Text style={styles.historyTitle}>Histórico</Text>
      <Text style={styles.historyDate}>Hoje, {today}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.loadingIndicator} />
      ) : error ? (
        <Text style={styles.errorText}>Falha ao carregar histórico: {error}</Text>
      ) : logs.length > 0 ? (
        logs.map((log, index) => (
          <View key={index} style={styles.historyCard}>
            <View style={styles.historyCardContent}>
              <View>
                <Text style={styles.exerciseType}>
                  {isExercise
                    ? (log as ExerciseLog).exercise?.name || (log as ExerciseLog).description || "Exercício"
                    : (log as MindfulnessLog).mindfulness?.name || (log as MindfulnessLog).description || "Mindfulness"}
                </Text>
                {isExercise && (
                  <Text style={styles.exerciseDetails}>
                    {(log as ExerciseLog).distance ? `${(log as ExerciseLog).distance}km` : ""}
                    {(log as ExerciseLog).distance && (log as ExerciseLog).duration ? " - " : ""}
                    {(log as ExerciseLog).duration ? `${(log as ExerciseLog).duration}min` : ""}
                  </Text>
                )}
              </View>
              {!isExercise && (
                <Text style={styles.exerciseCount}>{(log as MindfulnessLog).duration || 0} min</Text>
              )}
            </View>
          </View>
        ))
      ) : (
        <View style={styles.historyCard}>
          <View style={styles.historyCardContent}>
            <View>
              <Text style={styles.exerciseType}>
                {isExercise ? "Nenhum exercício registrado" : "Nenhum registro de mindfulness"}
              </Text>
              <Text style={styles.exerciseDetails}>
                {isExercise ? "Adicione seu primeiro exercício" : "Adicione sua primeira sessão"}
              </Text>
            </View>
            <Text style={styles.exerciseCount}>0 min</Text>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  historySection: {
    paddingHorizontal: 16,
    marginBottom: 50,
  },
  historyTitle: {
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
    color: "#333",
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginBottom: 16,
  },
  historyCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  historyCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#E5E7EB",
  },
  exerciseType: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#000",
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
  loadingIndicator: {
    marginTop: 50,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
})
