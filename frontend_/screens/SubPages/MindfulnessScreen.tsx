import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import { startOfWeek, isSameDay, isSameWeek } from "date-fns"
import { ptBR } from "date-fns/locale"

import type { MindfulnessLog } from "@/types/health/mindfulness"
import { getMindfulnessList } from "@/services/mindfulness/listMindfulnessLog"

import Header from "@/components/Layout/Header"
import HeaderWithOptions from "@/components/Layout/HeaderWithOptions"
import DateNavigator from "@/components/DateNavigator"
import { SummarySection } from "@/components/SummarySection"
import { ActivityHistorySection } from "@/components/ActivityHistorySection"
import { WeekDaysContainer } from "@/components/WeekDaysContainer"

interface WeekDayDisplay {
  id: string
  letter: string
  date: Date
  exercised: boolean
}

const MindfulnessActivityScreen: React.FC = () => {
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date())
  const [mindfulnessLogs, setMindfulnessLogs] = useState<MindfulnessLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [weekDaysDisplay, setWeekDaysDisplay] = useState<WeekDayDisplay[]>([])
  const [fetchedWeekStartDate, setFetchedWeekStartDate] = useState<Date | null>(null)

  useEffect(() => {
    const loadMindfulnessLogs = async () => {
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
        const logs = await getMindfulnessList(currentDisplayDate)

        const currentWeekDays: Date[] = [...Array(7)].map((_, i) => {
          const day = new Date(startOfCurrentWeek)
          day.setDate(startOfCurrentWeek.getDate() + i)
          return day
        })

        const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"]

        const weekDaysData: WeekDayDisplay[] = currentWeekDays.map((day, index) => ({
          id: daysOfWeek[index],
          letter: daysOfWeek[index],
          date: day,
          exercised: logs.some(log => isSameDay(new Date(log.datetime), day)),
        }))

        setMindfulnessLogs(logs)
        setWeekDaysDisplay(weekDaysData)
        setFetchedWeekStartDate(startOfCurrentWeek)
      } catch (err: any) {
        setError(err.message || "Erro ao carregar registros de mindfulness.")
        console.error("Error loading mindfulness logs:", err)
        setMindfulnessLogs([])
      } finally {
        setLoading(false)
      }
    }

    loadMindfulnessLogs()
  }, [currentDisplayDate, fetchedWeekStartDate])

  const completedDays = weekDaysDisplay.filter(d => d.exercised).length
  const totalLogs = mindfulnessLogs.length

  const handleBack = () => router.back()
  const handleAddMindfulness = () => router.push("/registermindfulness")

  return (
    <SafeAreaView style={styles.container}>
      <Header avatarChar="A" />
      <HeaderWithOptions title="Mindfulness" onBackPress={handleBack} onOptionPress={() => {}} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <DateNavigator
          mode="week"
          currentDate={currentDisplayDate}
          onDateChange={setCurrentDisplayDate}
        />

        <SummarySection
          activityType="mindfulness"
          completedDays={completedDays}
          totalExercises={totalLogs}
        />

        <WeekDaysContainer weekDaysDisplay={weekDaysDisplay} />

        <ActivityHistorySection
          type="mindfulness"
          loading={loading}
          logs={mindfulnessLogs}
          error={error}
        />
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={handleAddMindfulness}>
        <MaterialCommunityIcons name="plus" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
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

export default MindfulnessActivityScreen
