import { styles } from "@/app/(tabs)/Home/styles"
import { colors } from "@/styles/colors"
import { Plus } from "lucide-react-native"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import NewObjectiveModal from "./NewObjective"

export const ObjectiveCard = () => {
    const [newObjectiveModalVisible, setNewObjectiveModalVisible] = useState(false)

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

    return(
        <>
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

        <NewObjectiveModal
        visible={newObjectiveModalVisible}
        onClose={() => setNewObjectiveModalVisible(false)}
        onSave={handleSaveObjective}
      />
      </>
    )
}