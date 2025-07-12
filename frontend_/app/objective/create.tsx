import type React from "react"
import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native"
import { router } from "expo-router"
import { getActivities } from '@/services/diary/listActivities'
import { registerObjectiveLog } from '@/services/objectives/createObjective'
import { Activity } from '@/types/mental/diary'
import { ObjectiveWrite } from '@/types/mental/objectives'
import Header from "@/components/Layout/Header"
import FormHeader from '@/components/Layout/FormHeader'
import { ActivityGrid } from "@/components/ActivityGrid"
import { PeriodsSection } from "@/components/PeriodsSection"

const CreateObjectiveScreen: React.FC = () => {
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null)

  const handleSave = async () => {
    if (!selectedObjectiveId || !selectedPeriod) {
      Alert.alert("Erro", "Selecione um objetivo e um período antes de salvar.")
      return
    }

    const data: ObjectiveWrite = {
      activity: parseInt(selectedObjectiveId, 10),
      period: selectedPeriod as '1w' | '2w' | '3w',
    }

    try {
      await registerObjectiveLog(data)
      Alert.alert("Sucesso", "Objetivo registrado com sucesso!")
      router.back()
    } catch (error: any) {
      console.error("Erro ao registrar objetivo:", error)
      Alert.alert("Erro", error.message || "Erro ao registrar objetivo.")
    }
  }

  return (
    <>
      <Header avatarChar="A" />
      <FormHeader title="Criar Objetivo" onSavePress={handleSave} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Escolha um objetivo</Text>
          <ActivityGrid selected={selectedObjectiveId} setSelected={setSelectedObjectiveId} />
        </View>

        <PeriodsSection
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff'
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#111827",
    marginBottom: 16,
  },
})

export default CreateObjectiveScreen