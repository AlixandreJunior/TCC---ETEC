"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal, StatusBar } from "react-native"
import { ArrowLeft } from "lucide-react-native"
import { colors } from "@/styles/colors"
import { spacing } from "@/styles/spacing"
import { DraggableSlider } from "@/components/DraggableSlider"

interface MetaProps {
  id: string
  titulo: string
  pergunta: string
  atual: number
  meta: number
}

interface MetasScreenProps {
  visible: boolean
  onClose: () => void
}

export default function MetasScreen({ visible, onClose }: MetasScreenProps) {
  const [metas, setMetas] = useState<MetaProps[]>([
    { id: "1", titulo: "Meta de Exercícios", pergunta: "Quantos litros por dia?", atual: 1.5, meta: 2 },
    { id: "2", titulo: "Meta de Exercícios", pergunta: "Quantos litros por dia?", atual: 1.5, meta: 2 },
    { id: "3", titulo: "Meta de Exercícios", pergunta: "Quantos litros por dia?", atual: 1.5, meta: 2 },
    { id: "4", titulo: "Meta de Exercícios", pergunta: "Quantos litros por dia?", atual: 1.5, meta: 2 },
  ])

  const handleSliderChange = (id: string, value: number) => {
    setMetas(
      metas.map((meta) => {
        if (meta.id === id) {
          return { ...meta, atual: value }
        }
        return meta
      }),
    )
  }

  const handleSalvarMetas = () => {
    console.log("Metas salvas:", metas)
    onClose() 
  }

  if (!visible) return null

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Metas</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {metas.map((meta) => (
              <View key={meta.id} style={styles.metaCard}>
                <Text style={styles.metaTitle}>{meta.titulo}</Text>
                <Text style={styles.metaPergunta}>{meta.pergunta}</Text>

                <DraggableSlider
                  value={meta.atual}
                  maxValue={meta.meta}
                  onValueChange={(value) => handleSliderChange(meta.id, value)}
                />

                <Text style={styles.progressoText}>
                  Progresso atual: {meta.atual}L / {meta.meta}L
                </Text>
              </View>
            ))}

            <View style={styles.spacer} />
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.salvarButton} onPress={handleSalvarMetas}>
              <Text style={styles.salvarButtonText}>Salvar Metas</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    backgroundColor: "#E6EEF8",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: colors.text.primary,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  metaCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metaTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  metaPergunta: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  progressoText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: spacing.md,
  },
  footer: {
    padding: spacing.md,
  },
  salvarButton: {
    backgroundColor: "#9747FF",
    borderRadius: 100,
    padding: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  salvarButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    color: colors.white,
  },
  spacer: {
    height: 20,
  },
})
