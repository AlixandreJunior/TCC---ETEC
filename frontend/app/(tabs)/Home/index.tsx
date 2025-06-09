"use client"

import { useState } from "react"
import { View, Text,ScrollView, TouchableOpacity } from "react-native"
import { colors } from "@/styles/colors"
import { styles} from './styles'
import { Bell, Brain, Heart, Plus } from "lucide-react-native"
import { CircularProgress } from "@/components/CircularProgress"
import { useRouter } from "expo-router"
import NewObjectiveModal from "@/components/NewObjective"
import MetasScreen from "../../metas/metas" 
import { HomeCard } from "@/components/HomeCard"
import { HealthMetrics } from "@/components/HealthMetrics"
import { Navbar } from "@/components/Navbar"

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
        <Navbar title = {'Início'}/>

        <HealthMetrics/>

        <HomeCard title={'Saúde Mental'} screen="../(tabs)/Mental" icon={<Brain size={20} color={colors.primary} />}/>
        <HomeCard title={'Saúde Fisica'} screen="../(tabs)/Activity" icon={<Heart size={20} color="#4CAF50" />}/>

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

      <NewObjectiveModal
        visible={newObjectiveModalVisible}
        onClose={() => setNewObjectiveModalVisible(false)}
        onSave={handleSaveObjective}
      />
    </>
  )
}
