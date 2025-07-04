import React from "react"
import { View, Text, StyleSheet } from "react-native"

interface Props {
  completedDays: number
  totalExercises: number
  activityType: 'exercise' | 'mindfulness'
}

export const SummarySection: React.FC<Props> = ({ 
    completedDays, 
    totalExercises, 
    activityType 
}) => {
  return (
    <View style={styles.summarySection}>
      <View style={styles.summaryContent}>
        <Text style={styles.summaryMain}>{completedDays} de 7</Text>
        <Text style={styles.summarySubtitle}>dias com {activityType === 'exercise' ? 'exercicios': 'mindfulness'}</Text>
      </View>
      <Text style={styles.summaryDescription}>
        Você {activityType === 'exercise' ? 'se exercitou': 'fez mindfulness'} um total de {totalExercises} vez{totalExercises !== 1 ? "es" : ""}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
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
    fontFamily: "Poppins_500Medium",
    color: "#000",
    marginRight: 8,
  },
  summarySubtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
  summaryDescription: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    lineHeight: 20,
  },
})
