"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native"
import { Heart, Bell, MoreHorizontal, CheckCircle, Droplet, Activity } from "lucide-react-native"
import { useState } from "react"
import ExerciseFilterModal from "@/components/exercise-filter-modal"
import FisicoCheckinScreen from "@/components/fisico-checkin-screen"
import { spacing } from "@/styles/spacing"
import { colors } from "@/styles/colors"
import { Feather } from "@expo/vector-icons"

export default function FisicoScreen() {
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [checkinModalVisible, setCheckinModalVisible] = useState(false)

  const handleApplyFilters = (difficulties: string[], activityTypes: string[]) => {
    console.log("Selected difficulties:", difficulties)
    console.log("Selected activity types:", activityTypes)
  }

  const exercises = [
    {
      id: "1",
      name: "Caminhada",
      duration: "20 minutos",
      intensity: "Intensidade moderada",
      icon: "🚶‍♂️",
      equipmentIcon: "💪",
    },
    {
      id: "2",
      name: "Alongamento",
      duration: "15 minutos",
      intensity: "Intensidade leve",
      icon: "🧘‍♂️",
      equipmentIcon: "🧘‍♀️",
    },
    {
      id: "3",
      name: "Corrida",
      duration: "30 minutos",
      intensity: "Intensidade alta",
      icon: "🏃‍♂️",
      equipmentIcon: "⏱️",
    },
  ]

  const renderExerciseItem = ({ item }: { item: (typeof exercises)[number] }) => (
    <View style={styles.exerciseCard}>
      <View style={styles.exerciseContent}>
        <View style={styles.exerciseIconContainer}>
          <Text style={styles.exerciseIconText}>{item.icon}</Text>
        </View>
        <View style={styles.exerciseDetails}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          <Text style={styles.exerciseTime}>
            {item.duration} • {item.intensity}
          </Text>
        </View>
        <View style={styles.exerciseIconContainer}>
          <Text style={styles.exerciseIconText}>{item.equipmentIcon}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.startExerciseButton}>
        <Text style={styles.startExerciseText}>Iniciar exercício</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Heart size={24} color="#4F96FF" />
          </View>
          <Text style={styles.headerTitle}>Físico</Text>
          <View style={styles.notificationContainer}>
            <Bell size={24} color="#000" />
            <View style={styles.notificationBadge} />
          </View>
       </View>

        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>É importante agradecer pelo hoje sem nunca desistir do amanhã</Text>
        </View>

        <View style={styles.checkInCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Check In Físicos</Text>
            <TouchableOpacity>
              <MoreHorizontal size={24} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.lastCheckIn}>Último Check-In:</Text>

          <View style={styles.levelContainer}>
            <Text style={styles.levelLabel}>Nível de Energia</Text>
            <View style={styles.levelRow}>
              <Text style={styles.levelNumber}>1</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progress, { width: "70%", backgroundColor: "#10B981" }]} />
              </View>
              <Text style={styles.levelNumber}>10</Text>
            </View>
          </View>

          <View style={styles.levelContainer}>
            <Text style={styles.levelLabel}>Nível de Atividade</Text>
            <View style={styles.levelRow}>
              <Text style={styles.levelNumber}>1</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progress, { width: "60%", backgroundColor: "#3B82F6" }]} />
              </View>
              <Text style={styles.levelNumber}>10</Text>
            </View>
          </View>

          <View style={styles.statusContainer}>
            <View style={styles.statusItem}>
              <View style={styles.statusIcon}>
                <Text style={styles.statusIconText}>🍽️</Text>
              </View>
              <Text style={styles.statusText}>Alimentação Boa</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={styles.statusIcon}>
                <Text style={styles.statusIconText}>😴</Text>
              </View>
              <Text style={styles.statusText}>Sono Excelente</Text>
            </View>
          </View>

          <View style={styles.statusContainer}>
            <View style={styles.statusItem}>
              <View style={styles.medicationIcon}>
                <Text style={styles.medicationIconText}>💊</Text>
              </View>
              <Text style={[styles.statusText, styles.blueText]}>Sem Medicação</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={styles.painIcon}>
                <CheckCircle size={16} color="#fff" />
              </View>
              <Text style={styles.statusText}>Sem Dor</Text>
            </View>
          </View>

          <View style={styles.statusContainer}>
            <View style={styles.statusItem}>
              <View style={styles.normalUseIcon}>
                <Text style={styles.normalUseIconText}>📱</Text>
              </View>
              <Text style={styles.statusText}>Uso Normal</Text>
            </View>
          </View>

          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>"Tive um dia difícil no trabalho, mas estou tentando manter a calma."</Text>
          </View>

          <Text style={styles.dateText}>29 Abril, 2025 • 14:30</Text>

          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Ver detalhes</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.checkInButton} onPress={() => setCheckinModalVisible(true)}>
          <CheckCircle size={20} color="#fff" style={styles.checkIcon} />
          <Text style={styles.checkInButtonText}>Fazer Check-in de Humor</Text>
        </TouchableOpacity>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hidratação</Text>
            <Droplet size={20} color="#3B82F6" />
          </View>

          <View style={styles.hydrationInfo}>
            <Text style={styles.currentValue}>1,5L</Text>
            <Text style={styles.goalValue}>Meta: 2L</Text>
          </View>

          <View style={styles.progressBarWide}>
            <View style={[styles.progressFill, { width: "75%", backgroundColor: "#3B82F6" }]} />
          </View>

          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>+ Registrar água</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Passos</Text>
            <Activity size={20} color="#84CC16" />
          </View>

          <View style={styles.stepsInfo}>
            <Text style={styles.currentValue}>5.340</Text>
            <Text style={styles.goalValue}>Meta: 8.000</Text>
          </View>

          <View style={styles.progressBarWide}>
            <View style={[styles.progressFill, { width: "66%", backgroundColor: "#84CC16" }]} />
          </View>

          <Text style={styles.motivationalText}>Você está no caminho certo! Continue assim!</Text>
        </View>

        <View style={styles.exercisesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Exercícios Recomendados</Text>
            <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
              <Feather name="sliders" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={exercises}
            renderItem={renderExerciseItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onMomentumScrollEnd={(event) => {
              const contentOffset = event.nativeEvent.contentOffset.x
              const viewSize = event.nativeEvent.layoutMeasurement.width
              const newIndex = Math.floor(contentOffset / viewSize)
              setCurrentExerciseIndex(newIndex)
            }}
            style={styles.exerciseCarousel}
          />

          <View style={styles.paginationContainer}>
            {exercises.map((_, index) => (
              <View
                key={index}
                style={[styles.paginationDot, index === currentExerciseIndex ? styles.paginationDotActive : {}]}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      
      <ExerciseFilterModal
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          onApplyFilters={handleApplyFilters}
        />

      <FisicoCheckinScreen visible={checkinModalVisible} onClose={() => setCheckinModalVisible(false)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    backgroundColor: colors.background.main,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  notificationContainer: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF3B30",
  },
  quoteCard: {
    backgroundColor: "#B8CEFF",
    margin: 16,
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  quoteText: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    fontWeight: "600",
  },
  checkInCard: {
    backgroundColor: "white",
    margin: 16,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionCard: {
    backgroundColor: "white",
    margin: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6366F1",
  },
  lastCheckIn: {
    color: "#9CA3AF",
    fontSize: 14,
    marginBottom: 16,
  },
  levelContainer: {
    marginBottom: 16,
  },
  levelLabel: {
    color: "#4B5563",
    fontSize: 14,
    marginBottom: 8,
  },
  levelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginHorizontal: 8,
  },
  progress: {
    height: "100%",
    borderRadius: 4,
  },
  levelNumber: {
    color: "#9CA3AF",
    fontSize: 12,
    width: 16,
    textAlign: "center",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 8,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  statusIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  statusIconText: {
    fontSize: 16,
  },
  medicationIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  medicationIconText: {
    fontSize: 16,
  },
  painIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  normalUseIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  normalUseIconText: {
    fontSize: 16,
  },
  statusText: {
    color: "#4B5563",
    fontSize: 14,
  },
  blueText: {
    color: "#3B82F6",
  },
  noteContainer: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  noteText: {
    color: "#4B5563",
    fontSize: 14,
    fontStyle: "italic",
  },
  dateText: {
    color: "#9CA3AF",
    fontSize: 14,
    marginBottom: 16,
  },
  detailsButton: {
    backgroundColor: "#E0E7FF",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
  },
  detailsButtonText: {
    color: "#6366F1",
    fontWeight: "500",
    fontSize: 16,
  },
  checkInButton: {
    backgroundColor: "#818CF8",
    margin: 16,
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  checkIcon: {
    marginRight: 8,
  },
  checkInButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  hydrationInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  currentValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  goalValue: {
    fontSize: 16,
    color: "#6B7280",
  },
  progressBarWide: {
    height: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
    marginBottom: 16,
  },
  progressFill: {
    height: "100%",
    borderRadius: 6,
  },
  registerButton: {
    backgroundColor: "#93C5FD",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 16,
  },
  stepsInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  motivationalText: {
    color: "#84CC16",
    fontSize: 14,
    marginTop: 8,
  },
  exercisesSection: {
    margin: 16,
    marginTop: 8,
    marginBottom: 32,
  },
  filterIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  filterIconText: {
    fontSize: 18,
  },
  exerciseCarousel: {
    marginBottom: 12,
  },
  exerciseCard: {
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    padding: 16,
    marginRight: 16,
    width: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  exerciseContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  exerciseIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseIconText: {
    fontSize: 20,
  },
  exerciseDetails: {
    flex: 1,
    marginHorizontal: 12,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: 4,
  },
  exerciseTime: {
    color: "#6B7280",
    fontSize: 14,
  },
  startExerciseButton: {
    backgroundColor: "#60A5FA",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
  },
  startExerciseText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 16,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#60A5FA",
    width: 12,
    height: 12,
    borderRadius: 6,
  },
})
