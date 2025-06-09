"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, ScrollView, Dimensions } from "react-native"
import { ArrowLeft, Calendar, ChevronDown } from "lucide-react-native"

const { width, height } = Dimensions.get("window")

// SVG Calendar Icon Component
const CalendarIcon = () => (
  <Calendar size={20} color="#000" />
)

interface NewObjectiveModalProps {
  visible: boolean
  onClose: () => void
  onSave: (objective: {
    name: string
    description: string
    deadline: string
    priority: string
  }) => void
}

export default function NewObjectiveModal({ visible, onClose, onSave }: NewObjectiveModalProps) {
  const [objectiveName, setObjectiveName] = useState("")
  const [objectiveDescription, setObjectiveDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [priority, setPriority] = useState("Baixa")

  const handleSave = () => {
    onSave({
      name: objectiveName,
      description: objectiveDescription,
      deadline,
      priority,
    })

    // Reset form
    setObjectiveName("")
    setObjectiveDescription("")
    setDeadline("")
    setPriority("Baixa")

    onClose()
  }

  if (!visible) return null

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Novo Objetivo</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Nome do Objetivo</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ex: Ler 10 livros este ano"
              placeholderTextColor="#9CA3AF"
              value={objectiveName}
              onChangeText={setObjectiveName}
            />

            <Text style={styles.formLabel}>Descrição</Text>
            <TextInput
              style={[styles.textInput, styles.textAreaInput]}
              placeholder="Conte mais sobre esse objetivo..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              value={objectiveDescription}
              onChangeText={setObjectiveDescription}
            />

            <View style={styles.rowContainer}>
              <View style={styles.halfColumn}>
                <Text style={styles.formLabel}>Prazo</Text>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={styles.dateInput}
                    placeholder="dd/mm/yyyy"
                    placeholderTextColor="#9CA3AF"
                    value={deadline}
                    onChangeText={setDeadline}
                  />
                  <CalendarIcon />
                </View>
              </View>

              <View style={styles.halfColumn}>
                <Text style={styles.formLabel}>Prioridade</Text>
                <TouchableOpacity style={styles.selectInput}>
                  <Text style={styles.selectText}>{priority}</Text>
                  <ChevronDown size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Salvar Metas</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semi-transparente
    justifyContent: "center",
    position: "absolute",
    width: width,
    height: height,
    top: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#E4F0F6",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    fontFamily: "Poppins-SemiBold",
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  formContainer: {
    padding: 20,
    marginTop: 80, // Espaço para o gráfico circular que está no fundo
  },
  formLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 10,
    fontFamily: "Poppins-SemiBold",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: "#1F2937",
    fontFamily: "Poppins-Regular",
  },
  textAreaInput: {
    height: 150,
    textAlignVertical: "top",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  halfColumn: {
    width: "48%",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  dateInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: "#1F2937",
    fontFamily: "Poppins-Regular",
  },
  selectInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
  },
  selectText: {
    fontSize: 16,
    color: "#1F2937",
    fontFamily: "Poppins-Regular",
  },
  saveButton: {
    backgroundColor: "#9C5DE4",
    borderRadius: 100,
    padding: 18,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
})
