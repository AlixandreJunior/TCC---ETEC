import { Provider as PaperProvider } from 'react-native-paper';
import React, { useEffect, useState } from "react"
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import { startOfWeek, isSameDay, isSameWeek } from "date-fns"
import { ptBR } from "date-fns/locale"

import type { ExerciseLog } from "@/types/health/exercise"
import { getExerciseLogs } from "@/services/exercise/listExerciseLog"
import Header from "@/components/Layout/Header"
import HeaderWithOptions from "@/components/Layout/HeaderWithOptions"
import DateNavigator from "@/components/DateNavigator"
import { SummarySection } from "@/components/SummarySection"
import { WeekDaysContainer } from "@/components/WeekDaysContainer"
import { ActivityHistorySection } from "@/components/ActivityHistorySection"

interface WeekDayDisplay {
  id: string
  letter: string
  date: Date
  exercised: boolean
}

const ExerciseActivityScreen: React.FC = () => {
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date())
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [weekDaysDisplay, setWeekDaysDisplay] = useState<WeekDayDisplay[]>([])
  const [fetchedWeekStartDate, setFetchedWeekStartDate] = useState<Date | null>(null)

  useEffect(() => {
    const loadExerciseLogs = async () => {
      const startOfCurrentWeek = startOfWeek(currentDisplayDate, {
        weekStartsOn: 0,
        locale: ptBR,
      })

      if (
        fetchedWeekStartDate &&
        isSameWeek(startOfCurrentWeek, fetchedWeekStartDate, {
          weekStartsOn: 0,
          locale: ptBR,
        })
      ) {
        return
      }

      setLoading(true)
      setError(null)
      try {
        const logs = await getExerciseLogs(currentDisplayDate)
        const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"]
        const currentWeekDays: Date[] = [...Array(7)].map((_, i) => {
          const day = new Date(startOfCurrentWeek)
          day.setDate(startOfCurrentWeek.getDate() + i)
          return day
        })

        const weekDaysData: WeekDayDisplay[] = currentWeekDays.map((day, index) => ({
          id: daysOfWeek[index],
          letter: daysOfWeek[index],
          date: day,
          exercised: logs.some(log => isSameDay(new Date(log.datetime), day)),
        }))

        setExerciseLogs(logs)
        setWeekDaysDisplay(weekDaysData)
        setFetchedWeekStartDate(startOfCurrentWeek)
      } catch (err: any) {
        setError(err.message || "Erro ao carregar registros de exercício.")
        console.error("Error loading exercise logs:", err)
        setExerciseLogs([])
      } finally {
        setLoading(false)
      }
    }

    loadExerciseLogs()
  }, [currentDisplayDate, fetchedWeekStartDate])

  const completedDays = weekDaysDisplay.filter(d => d.exercised).length
  const totalExercises = exerciseLogs.length

  const handleBack = () => router.back()
  const handleAddExercise = () => router.push("/exercises/register")

  return (
    <PaperProvider>
    <SafeAreaView style={styles.container}>
      <Header avatarChar="A" />
      <HeaderWithOptions title="Atividade" onBackPress={handleBack} onOptionPress={() => {}} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <DateNavigator
          currentDate={currentDisplayDate}
          mode="week"
          onDateChange={setCurrentDisplayDate}
        />

        <SummarySection
          activityType="exercise"
          completedDays={completedDays}
          totalExercises={totalExercises}
        />

        <WeekDaysContainer weekDaysDisplay={weekDaysDisplay} />

        <ActivityHistorySection
          type="exercise"
          loading={loading}
          logs={exerciseLogs}
          error={error}
        />
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={handleAddExercise}>
        <MaterialCommunityIcons name="plus" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
})

export default ExerciseActivityScreen
