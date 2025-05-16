import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from "react-native"
import { Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'

interface ExerciseFilterModalProps {
  visible: boolean
  onClose: () => void
  onApplyFilters: (difficulty: string[], activityTypes: string[]) => void
}

export default function ExerciseFilterModal({ visible, onClose, onApplyFilters }: ExerciseFilterModalProps) {
  const [selectedDifficulties, setSelectedDifficulties] = React.useState<string[]>([])
  const [selectedActivityTypes, setSelectedActivityTypes] = React.useState<string[]>([])

  const toggleDifficulty = (difficulty: string) => {
    if (selectedDifficulties.includes(difficulty)) {
      setSelectedDifficulties(selectedDifficulties.filter((d) => d !== difficulty))
    } else {
      setSelectedDifficulties([...selectedDifficulties, difficulty])
    }
  }

  const toggleActivityType = (activityType: string) => {
    if (selectedActivityTypes.includes(activityType)) {
      setSelectedActivityTypes(selectedActivityTypes.filter((t) => t !== activityType))
    } else {
      setSelectedActivityTypes([...selectedActivityTypes, activityType])
    }
  }

  const handleApplyFilters = () => {
    onApplyFilters(selectedDifficulties, selectedActivityTypes)
    onClose()
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContainer} onStartShouldSetResponder={() => true}>
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitle}>Dificuldade</Text>

            <View style={styles.difficultyOptions}>
              <TouchableOpacity
                style={[
                  styles.difficultyOption,
                  styles.easyOption,
                  selectedDifficulties.includes("Fácil") && styles.selectedEasyOption,
                ]}
                onPress={() => toggleDifficulty("Fácil")}
              >
                <Text
                  style={[
                    styles.difficultyText,
                    styles.easyText,
                    selectedDifficulties.includes("Fácil") && styles.selectedDifficultyText,
                  ]}
                >
                  Fácil
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.difficultyOption,
                  styles.moderateOption,
                  selectedDifficulties.includes("Moderado") && styles.selectedModerateOption,
                ]}
                onPress={() => toggleDifficulty("Moderado")}
              >
                <Text
                  style={[
                    styles.difficultyText,
                    styles.moderateText,
                    selectedDifficulties.includes("Moderado") && styles.selectedDifficultyText,
                  ]}
                >
                  Moderado
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.difficultyOption,
                  styles.hardOption,
                  selectedDifficulties.includes("Difícil") && styles.selectedHardOption,
                ]}
                onPress={() => toggleDifficulty("Difícil")}
              >
                <Text
                  style={[
                    styles.difficultyText,
                    styles.hardText,
                    selectedDifficulties.includes("Difícil") && styles.selectedDifficultyText,
                  ]}
                >
                  Difícil
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Tipo de Atividade</Text>

            <View style={styles.activityTypesContainer}>
              <TouchableOpacity
                style={[
                  styles.activityTypeOption,
                  selectedActivityTypes.includes("Respiração") && styles.selectedActivityType,
                ]}
                onPress={() => toggleActivityType("Respiração")}
              >
                <Feather name="heart" size={20} color="#7C3AED" />
                <Text style={styles.activityTypeText}>Respiração</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.activityTypeOption,
                  selectedActivityTypes.includes("Meditação") && styles.selectedActivityType,
                ]}
                onPress={() => toggleActivityType("Meditação")}
              >
                <MaterialCommunityIcons name="yoga" size={20} color="#7C3AED" />
                <Text style={styles.activityTypeText}>Meditação</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.activityTypeOption,
                  selectedActivityTypes.includes("Exercícios Físicos") && styles.selectedActivityType,
                ]}
                onPress={() => toggleActivityType("Exercícios Físicos")}
              >
                <MaterialCommunityIcons name="dumbbell" size={20} color="#7C3AED" />
                <Text style={styles.activityTypeText}>Exercícios Físicos</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.activityTypeOption,
                  selectedActivityTypes.includes("Alongamento") && styles.selectedActivityType,
                ]}
                onPress={() => toggleActivityType("Alongamento")}
              >
                <FontAwesome5 name="user" size={20} color="#7C3AED" />
                <Text style={styles.activityTypeText}>Alongamento</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.activityTypeOption,
                  selectedActivityTypes.includes("Relaxamento") && styles.selectedActivityType,
                ]}
                onPress={() => toggleActivityType("Relaxamento")}
              >
                <Feather name="wind" size={20} color="#7C3AED" />
                <Text style={styles.activityTypeText}>Relaxamento</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
              <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  difficultyOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  difficultyOption: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  easyOption: {
    backgroundColor: "#EEF2FF",
  },
  selectedEasyOption: {
    backgroundColor: "#818CF8",
  },
  moderateOption: {
    backgroundColor: "#FFFBEB",
  },
  selectedModerateOption: {
    backgroundColor: "#FCD34D",
  },
  hardOption: {
    backgroundColor: "#FEF2F2",
  },
  selectedHardOption: {
    backgroundColor: "#F87171",
  },
  difficultyText: {
    fontWeight: "500",
    fontSize: 16,
  },
  easyText: {
    color: "#4F46E5",
  },
  moderateText: {
    color: "#D97706",
  },
  hardText: {
    color: "#DC2626",
  },
  selectedDifficultyText: {
    color: "white",
  },
  activityTypesContainer: {
    marginBottom: 24,
  },
  activityTypeOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F3FF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 100,
    marginBottom: 12,
  },
  selectedActivityType: {
    backgroundColor: "#EDE9FE",
    borderWidth: 1,
    borderColor: "#8B5CF6",
  },
  activityTypeText: {
    marginLeft: 12,
    color: "#7C3AED",
    fontWeight: "500",
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: "#9333EA",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  applyButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
})
