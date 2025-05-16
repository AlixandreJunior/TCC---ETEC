"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import ExerciseFilterModal from "@/components/exercise-filter-modal"
import MentalCheckinScreen from "@/components/mental-checkin-screen"
import CheckInsHistoryScreen from "@/components/check-ins-history-screen"
import { colors } from "@/styles/colors"
import { spacing } from "@/styles/spacing"
import { Bell, Heart } from "lucide-react-native"

export default function MentalScreen() {
  const insets = useSafeAreaInsets()
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [checkinModalVisible, setCheckinModalVisible] = useState(false)
  const [checkInsHistoryVisible, setCheckInsHistoryVisible] = useState(false)

  const handleApplyFilters = (difficulties: string[], activityTypes: string[]) => {
    console.log("Selected difficulties:", difficulties)
    console.log("Selected activity types:", activityTypes)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Heart size={24} color={colors.blue.main} />
          </View>
          <Text style={styles.headerTitle}>Mental</Text>
          <TouchableOpacity>
            <Bell size={24} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>É importante agradecer pelo hoje sem nunca desistir do amanhã</Text>
        </View>

        <View style={styles.moodSection}>
          <View style={styles.moodHeader}>
            <Text style={styles.sectionTitle}>Seu Humor</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>Ver mais</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.moodGraph}>
            <View style={styles.moodBars}>
              <View style={[styles.moodBar, { height: 70, backgroundColor: "#60A5FA" }]} />
              <View style={[styles.moodBar, { height: 90, backgroundColor: "#60A5FA" }]} />
              <View style={[styles.moodBar, { height: 60, backgroundColor: "#9C5DE4" }]} />
              <View style={[styles.moodBar, { height: 80, backgroundColor: "#60A5FA" }]} />
              <View style={[styles.moodBar, { height: 120, backgroundColor: "#4CD964" }]} />
              <View style={[styles.moodBar, { height: 110, backgroundColor: "#4CD964" }]} />
              <View style={[styles.moodBar, { height: 85, backgroundColor: "#60A5FA" }]} />
            </View>
            <View style={styles.weekDays}>
              <Text style={styles.dayText}>Seg</Text>
              <Text style={styles.dayText}>Ter</Text>
              <Text style={styles.dayText}>Qua</Text>
              <Text style={styles.dayText}>Qui</Text>
              <Text style={styles.dayText}>Sex</Text>
              <Text style={styles.dayText}>Sab</Text>
              <Text style={styles.dayText}>Dom</Text>
            </View>
          </View>
        </View>

        <View style={styles.checkInCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>Check In Mental</Text>
            </View>
            <TouchableOpacity>
              <Feather name="more-horizontal" size={24} color="#6B7280" />
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
                <View style={[styles.progress, { width: "50%", backgroundColor: "#60A5FA" }]} />
              </View>
              <Text style={styles.levelNumber}>10</Text>
            </View>
          </View>

          <View style={styles.statusContainer}>
            <View style={styles.statusItem}>
              <View style={styles.statusIconGreen}>
                <Feather name="frown" size={16} color="#fff" />
              </View>
              <Text style={styles.statusText}>Triste</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={styles.statusIconBrown}>
                <MaterialCommunityIcons name="account" size={16} color="#fff" />
              </View>
              <Text style={styles.statusText}>Se sente sozinho</Text>
            </View>
          </View>

          <View style={styles.statusContainer}>
            <View style={styles.statusItem}>
              <View style={styles.statusIconPurple}>
                <Feather name="heart" size={16} color="#fff" />
              </View>
              <Text style={styles.statusText}>Sem Medicação</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={styles.statusIconGray}>
                <Feather name="alert-triangle" size={16} color="#fff" />
              </View>
              <Text style={styles.statusText}>Uso Normal</Text>
            </View>
          </View>

          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>"Tive um dia difícil no trabalho, mas estou tentando manter a calma."</Text>
          </View>

          <Text style={styles.dateText}>29 Abril, 2025 • 14:30</Text>

          <TouchableOpacity style={styles.detailsButton} onPress={() => setCheckInsHistoryVisible(true)}>
            <Text style={styles.detailsButtonText}>Ver detalhes</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.checkInButton} onPress={() => setCheckinModalVisible(true)}>
          <Feather name="check" size={20} color="#fff" style={styles.checkIcon} />
          <Text style={styles.checkInButtonText}>Fazer Check-in Mental</Text>
        </TouchableOpacity>

        <View style={styles.diaryCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardTitleContainer}>
              <Feather name="edit-2" size={20} color="#9C5DE4" />
              <Text style={[styles.cardTitle, { color: "#9C5DE4" }]}>Meu Diário</Text>
            </View>
            <TouchableOpacity>
              <Feather name="more-horizontal" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <Text style={styles.diaryPrompt}>Pronto para registrar seu dia?</Text>

          <TouchableOpacity style={styles.newEntryButton}>
            <Feather name="edit-3" size={20} color="#fff" style={styles.editIcon} />
            <Text style={styles.newEntryButtonText}>Escrever Novo Registro</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.exercisesSection}>
          <View style={styles.exercisesHeader}>
            <Text style={styles.sectionTitle}>Exercícios Recomendados</Text>
            <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
              <Feather name="sliders" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.exerciseCard}>
            <View style={styles.exerciseContent}>
              <View style={styles.exerciseIconContainer}>
                <Feather name="moon" size={24} color="#9C5DE4" />
              </View>
              <View style={styles.exerciseDetails}>
                <Text style={styles.exerciseName}>Respiração</Text>
                <Text style={styles.exerciseTime}>5 minutos • Intensidade moderada</Text>
              </View>
              <TouchableOpacity>
                <Feather name="heart" size={24} color="#9C5DE4" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.startExerciseButton}>
              <Text style={styles.startExerciseText}>Iniciar exercício</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <ExerciseFilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApplyFilters={handleApplyFilters}
      />

      <MentalCheckinScreen visible={checkinModalVisible} onClose={() => setCheckinModalVisible(false)} />

      <CheckInsHistoryScreen visible={checkInsHistoryVisible} onClose={() => setCheckInsHistoryVisible(false)} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingBottom: spacing.xl,
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
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  headerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: colors.text.primary,
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
    backgroundColor: "#E4CCFF",
    margin: 16,
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  quoteText: {
    fontSize: 20,
    color: "#1F2937",
    textAlign: "center",
    fontWeight: "600",
  },
  moodSection: {
    margin: 16,
  },
  moodHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  seeMoreText: {
    fontSize: 14,
    color: "#60A5FA",
    fontWeight: "500",
  },
  moodGraph: {
    backgroundColor: "#E5F0FF",
    borderRadius: 20,
    padding: 16,
    paddingBottom: 8,
  },
  moodBars: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 120,
    marginBottom: 10,
  },
  moodBar: {
    width: 8,
    borderRadius: 4,
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  dayText: {
    fontSize: 12,
    color: "#6B7280",
    width: 30,
    textAlign: "center",
  },
  checkInCard: {
    backgroundColor: "white",
    margin: 16,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginLeft: 4,
  },
  lastCheckIn: {
    color: "#6B7280",
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
    color: "#6B7280",
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
  statusIconGreen: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  statusIconBrown: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#8B5A2B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  statusIconPurple: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#8B5CF6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  statusIconGray: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#6B7280",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  statusText: {
    color: "#4B5563",
    fontSize: 14,
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
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 16,
  },
  detailsButton: {
    backgroundColor: "#E4CCFF",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
  },
  detailsButtonText: {
    color: "#9C5DE4",
    fontWeight: "500",
    fontSize: 16,
  },
  checkInButton: {
    backgroundColor: "#9C5DE4",
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
  diaryCard: {
    backgroundColor: "white",
    margin: 16,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  diaryPrompt: {
    color: "#6B7280",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 16,
  },
  newEntryButton: {
    backgroundColor: "#E4CCFF",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  editIcon: {
    marginRight: 8,
  },
  newEntryButtonText: {
    color: "#9C5DE4",
    fontWeight: "500",
    fontSize: 16,
  },
  exercisesSection: {
    margin: 16,
    marginBottom: 80,
  },
  exercisesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  exerciseCard: {
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    padding: 16,
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
    backgroundColor: "#F5EEFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  exerciseDetails: {
    flex: 1,
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
    backgroundColor: "#E4CCFF",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
  },
  startExerciseText: {
    color: "#9C5DE4",
    fontWeight: "500",
    fontSize: 16,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  activeTabLabel: {
    color: "#9C5DE4",
  },
})
