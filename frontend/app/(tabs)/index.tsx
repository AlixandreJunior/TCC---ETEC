"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { colors } from "@/styles/colors"
import { spacing } from "@/styles/spacing"
import { Bell, Brain, Heart, Plus } from "lucide-react-native"
import { CircularProgress } from "@/components/CircularProgress"
import { useRouter } from "expo-router"
import DiaryModal from "@/components/new-objective-modal"
import NewObjectiveModal from "@/components/new-objective-modal"
import MetasScreen from "../../app/metas/metas" 

export default function HomeScreen() {
  const navigation = useRouter()
  const [diaryModalVisible, setDiaryModalVisible] = useState(false)
  const [newObjectiveModalVisible, setNewObjectiveModalVisible] = useState(false)
  const [metasModalVisible, setMetasModalVisible] = useState(false) 
  const [objectives, setObjectives] = useState([
    { id: "1", text: "Tire um momento para respirar profundamente", completed: false },
    { id: "2", text: "Complete sua prática de gratidão hoje", completed: true },
    { id: "3", text: "Pratique 5 minutos de mindfulness", completed: false },
  ])

  const handleDiaryPress = () => {
    setDiaryModalVisible(true)
  }

  const handleAddObjective = () => {
    setNewObjectiveModalVisible(true)
  }

  const handleSaveObjective = (objective: {
    name: string
    description: string
    deadline: string
    priority: string
  }) => {
  
    setObjectives([
      ...objectives,
      {
        id: Date.now().toString(),
        text: objective.name,
        completed: false,
      },
    ])
  }

  const handleGerenciarMetas = () => {
    setMetasModalVisible(true)
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Heart size={24} color={colors.blue.main} />
          </View>
          <Text style={styles.headerTitle}>Início</Text>
          <TouchableOpacity>
            <Bell size={24} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.healthSection}>
          <CircularProgress percentage={70} size={120} />
          <View style={styles.healthMetrics}>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Saúde Mental</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: "70%", backgroundColor: colors.blue.main }]} />
              </View>
              <Text style={styles.metricValue}>70%</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Saúde Física</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: "70%", backgroundColor: "#4CAF50" }]} />
              </View>
              <Text style={styles.metricValue}>70%</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Brain size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Saúde Mental</Text>
          </View>
          <Text style={styles.sectionSubtitle}>Últimos 7 dias</Text>
          <View style={styles.weekProgress}>
            {[0.4, 0.6, 0.8, 1].map((opacity, index) => (
              <View key={index} style={[styles.dayIndicator, { backgroundColor: `rgba(138, 43, 226, ${opacity})` }]} />
            ))}
          </View>
          <TouchableOpacity style={styles.actionButton} onPress={() => {navigation.push('/(tabs)/Mental')}}>
            <Text style={styles.actionButtonText}>Acessar Seção</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Heart size={20} color="#4CAF50" />
            <Text style={styles.sectionTitle}>Saúde Física</Text>
          </View>
          <Text style={styles.sectionSubtitle}>Últimos 7 dias</Text>
          <View style={styles.weekProgress}>
            {[0.4, 0.6, 0.8, 1].map((opacity, index) => (
              <View key={index} style={[styles.dayIndicator, { backgroundColor: `rgba(76, 175, 80, ${opacity})` }]} />
            ))}
          </View>
          <TouchableOpacity style={[styles.actionButton, styles.greenButton]} onPress={() => {navigation.push('/(tabs)/activity')}}>
            <Text style={styles.actionButtonText}>Acessar seção</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Metas</Text>
          <View style={styles.goalItem}>
            <Text style={styles.goalLabel}>Passos</Text>
            <View style={styles.goalProgress}>
              <View style={[styles.goalProgressFill, { width: "66%", backgroundColor: "#4CAF50" }]} />
            </View>
            <Text style={styles.goalValue}>5.340/8.000</Text>
          </View>
          <View style={styles.goalItem}>
            <Text style={styles.goalLabel}>Hidratação</Text>
            <View style={styles.goalProgress}>
              <View style={[styles.goalProgressFill, { width: "75%", backgroundColor: colors.blue.main }]} />
            </View>
            <Text style={styles.goalValue}>1,5L/2L</Text>
          </View>
          <View style={styles.goalItem}>
            <Text style={styles.goalLabel}>Mindfulness</Text>
            <View style={styles.goalProgress}>
              <View style={[styles.goalProgressFill, { width: "83%", backgroundColor: colors.primary }]} />
            </View>
            <Text style={styles.goalValue}>25/30</Text>
          </View>
          <View style={styles.goalItem}>
            <Text style={styles.goalLabel}>Exercícios</Text>
            <View style={styles.goalProgress}>
              <View style={[styles.goalProgressFill, { width: "83%", backgroundColor: "#4CAF50" }]} />
            </View>
            <Text style={styles.goalValue}>25/30</Text>
          </View>
          <TouchableOpacity style={[styles.actionButton, styles.blueButton]} onPress={handleGerenciarMetas}>
            <Text style={styles.actionButtonText}>Gerenciar Metas</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionCard}>
          <View style={styles.objectivesHeader}>
            <Text style={styles.sectionTitle}>Objetivos</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddObjective}>
              <Plus size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.objectivesList}>
            {objectives.map((objective) => (
              <View key={objective.id} style={[styles.objectiveItem, objective.completed && styles.completedObjective]}>
                <View style={[styles.checkbox, objective.completed && styles.checkedBox]} />
                <Text style={[styles.objectiveText, objective.completed && styles.completedText]}>
                  {objective.text}
                </Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={[styles.actionButton, styles.blueButton]}>
            <Text style={styles.actionButtonText}>Ver Objetivos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de Metas */}
      <MetasScreen visible={metasModalVisible} onClose={() => setMetasModalVisible(false)} />

      <DiaryModal
        visible={diaryModalVisible}
        onClose={() => setDiaryModalVisible(false)}
        onSave={(objective: { name: string; description: string; deadline: string; priority: string }): void => {
          throw new Error("Function not implemented.")
        }}
      />

      <NewObjectiveModal
        visible={newObjectiveModalVisible}
        onClose={() => setNewObjectiveModalVisible(false)}
        onSave={handleSaveObjective}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingBottom: spacing.xl,
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
  healthSection: {
    alignItems: "center",
    padding: spacing.lg,
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  healthMetrics: {
    width: "100%",
    marginTop: spacing.lg,
  },
  metric: {
    marginBottom: spacing.md,
  },
  metricLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  metricValue: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  sectionCard: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: colors.text.primary,
  },
  sectionSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  weekProgress: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.md,
    marginVertical: spacing.lg,
  },
  dayIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  actionButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 100, // Botões mais arredondados
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  greenButton: {
    backgroundColor: "#4CAF50",
  },
  blueButton: {
    backgroundColor: colors.blue.main,
  },
  actionButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: colors.white,
  },
  goalItem: {
    marginVertical: spacing.sm,
  },
  goalLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  goalProgress: {
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    marginVertical: spacing.xs,
  },
  goalProgressFill: {
    height: "100%",
    borderRadius: 4,
  },
  goalValue: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: colors.text.secondary,
  },
  objectivesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  addButton: {
    backgroundColor: colors.blue.main,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  objectivesList: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  objectiveItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.sm,
    backgroundColor: "#F9FAFC",
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gray,
  },
  checkedBox: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  objectiveText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: colors.text.primary,
    flex: 1,
  },
  completedObjective: {
    opacity: 0.5,
  },
  completedText: {
    textDecorationLine: "line-through",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    backgroundColor: colors.white,
  },
  tabItem: {
    alignItems: "center",
  },
  tabLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  activeTab: {
    color: colors.primary,
  },
})
