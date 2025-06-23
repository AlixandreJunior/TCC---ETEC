import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Image } from "react-native"
import { ChevronLeft, ChevronRight, MapPin, Droplets } from "lucide-react-native"
import { FireIcon } from "@/components/Icons/FireIcon"
import { ShoeIcon } from "@/components/Icons/ShoeIcon"
import { ProgressCircle } from "@/components/Icons/ProgressCircle"
import { ProgressBar } from "@/components/Icons/ProgressBar"
import Header from "@/components/Header"

const { width, height } = Dimensions.get("window")

export default function HealthScreen() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const formatDate = (date: Date) => {
    return date
      .toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
      .replace(/^\w/, (c) => c.toUpperCase())
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1))
    setCurrentDate(newDate)
  }

  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]
  const exerciseDays = [false, false, false, false, true, false, false] // Apenas quinta-feira marcada
  const mindfulnessDays = [false, true, true, true, true, true, true] // Todos os dias exceto domingo

  return (
    <SafeAreaView style={styles.container}>
      <Header
        avatarChar="A"
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.dateNavigation}>
          <TouchableOpacity onPress={() => navigateDate("prev")}>
            <ChevronLeft size={24} color="#374151" />
          </TouchableOpacity>

          <Text style={styles.dateText}>Hoje</Text>

          <TouchableOpacity onPress={() => navigateDate("next")}>
            <ChevronRight size={24} color="#374151" />
          </TouchableOpacity>
        </View>
        <View style={styles.mainStats}>
          <View style={styles.sideStatItem}>
            <View style={styles.progressContainer}>
              <ProgressCircle progress={53} size={width * 0.18} color="#9CC9FF" />
              <View style={styles.progressContent}>
                <MapPin size={16} color="#3B82F6" />
              </View>
            </View>
            <Text style={styles.sideStatValue}>5,31</Text>
            <Text style={styles.sideStatLabel}>km</Text>
          </View>

          <View style={styles.mainStatItem}>
            <View style={styles.progressContainer}>
              <ProgressCircle progress={65} size={width * 0.25} color="#9CC9FF" />
              <View style={styles.progressContent}>
                <ShoeIcon size={24} color="#000" />
              </View>
            </View>
            <Text style={styles.mainStatValue}>6.565</Text>
            <Text style={styles.mainStatLabel}>passos</Text>
          </View>

          <View style={styles.sideStatItem}>
            <View style={styles.progressContainer}>
              <ProgressCircle progress={44} size={width * 0.18} color="#9CC9FF" />
              <View style={styles.progressContent}>
                <FireIcon size={16} color="#F97316" />
              </View>
            </View>
            <Text style={styles.sideStatValue}>2.203</Text>
            <Text style={styles.sideStatLabel}>kcal</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Hidratação</Text>
              <Text style={styles.cardValue}>750 ml</Text>
              <Text style={styles.cardSubtitle}>Hoje</Text>
            </View>
            <View style={styles.hydrationProgress}>
              <ProgressBar progress={75} color="#9CC9FF" />
              <View style={styles.hydrationIcon}>
                <Droplets size={20} color="#3B82F6" />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardTitle}>Dias com Exercício</Text>
              <Text style={styles.cardValue}>1 de 5</Text>
              <Text style={styles.cardSubtitle}>Esta semana</Text>
            </View>
            <View style={styles.weekProgress}>
              <View style={styles.weekDays}>
                {weekDays.map((day, index) => (
                  <View style={styles.dayContainer}>
                    <Text style={styles.dayLabel}>{day}</Text>
                    <View style={[styles.dayIndicator, exerciseDays[index] && styles.dayIndicatorActive]}>
                      {exerciseDays[index] && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardTitle}>Dias com Mindfulness</Text>
              <Text style={styles.cardValue}>1 de 5</Text>
              <Text style={styles.cardSubtitle}>Esta semana</Text>
            </View>
            <View style={styles.weekProgress}>
              <View style={styles.weekDays}>
                {weekDays.map((day, index) => (
                  <View style={styles.dayContainer}>
                    <Text style={styles.dayLabel}>{day}</Text>
                    <View style={[styles.dayIndicator, mindfulnessDays[index] && styles.dayIndicatorActive]}>
                      {mindfulnessDays[index] && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.01,
    backgroundColor: "#86D293",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 10,
    minHeight: height * 0.04,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
     width: Math.min(width * 0.5, 90),
  height: Math.min(width * 0.15, 40),
    resizeMode: "contain",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#79D457",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  refreshIcon: {
    fontSize: 20,
    color: "#374151",
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
  mainStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: height * 0.03,
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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: width * 0.05,
    marginBottom: height * 0.02,
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
  cardLeft: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#374151",
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
    gap: 8,
  },
  dayContainer: {
    alignItems: "center",
    gap: 4,
  },
  dayLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  dayIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  dayIndicatorActive: {
    backgroundColor: "#79D457",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
})
