"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native"
import { ArrowLeft } from "lucide-react-native"
import { LinearGradient } from "expo-linear-gradient"

const { width, height } = Dimensions.get("window")

export default function DiaryModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [currentDate] = useState("6 de Maio, 2025")

  const handleSave = () => {
    console.log("Saving diary entry:", { title, content })
    onClose()
  }

  if (!visible) return null

  return (
    <View style={styles.modalContainer}>
      <View style={styles.blurBackground} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalContent}>
        <LinearGradient
          colors={["#D6E8FF", "#F0E6FF"]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meu Diario</Text>
          <View style={styles.placeholder} />
        </LinearGradient>

        <View style={styles.contentContainer}>
          <ScrollView style={styles.scrollContent} keyboardShouldPersistTaps="handled">
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{currentDate}</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.label}>Título</Text>
              <TextInput
                style={styles.titleInput}
                placeholder="Ex: Ler 10 livros este ano"
                placeholderTextColor="#9CA3AF"
                value={title}
                onChangeText={setTitle}
              />

              <Text style={styles.label}>Conteúdo</Text>
              <TextInput
                style={styles.contentInput}
                placeholder="Conte mais sobre esse objetivo..."
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
                value={content}
                onChangeText={setContent}
              />

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar Diario</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  blurBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(100, 100, 100, 0.7)",
  },
  modalContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 10,
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
  scrollContent: {
    flex: 1,
  },
  dateContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 80,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    fontFamily: "Poppins-Medium",
  },
  formContainer: {
    padding: 20,
    marginTop: 40,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 10,
    fontFamily: "Poppins-SemiBold",
  },
  titleInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 30,
    fontSize: 16,
    color: "#1F2937",
    fontFamily: "Poppins-Regular",
  },
  contentInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 30,
    fontSize: 16,
    color: "#1F2937",
    height: 200,
    textAlignVertical: "top",
    fontFamily: "Poppins-Regular",
  },
  saveButton: {
    backgroundColor: "#9C5DE4",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "rgba(100, 100, 100, 0.7)",
  },
})
