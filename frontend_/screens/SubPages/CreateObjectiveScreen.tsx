import type React from "react"
import { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, Alert } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router } from "expo-router"

// Importe as fontes Poppins
import { 
  Poppins_400Regular, 
  Poppins_500Medium, // Adicione se usar este peso
  Poppins_600SemiBold, 
  Poppins_700Bold 
} from '@expo-google-fonts/poppins'

import { Activity } from '@/types/mental/diary' // Para a interface Activity
import { getActivities } from '@/services/diary/listActivities' // Para buscar atividades
import { getActivityIconName } from '@/utils/activityIconMapper' // Importe a função que retorna o ícone
import FormHeader from '@/components/FormHeader' // Certifique-se do caminho
import Header from '@/components/Header' // Certifique-se do caminho

import { registerObjectiveLog } from '@/services/objectives/createObjective' // Para registrar o objetivo
import { ObjectiveWrite } from '@/types/mental/objectives' // Para a interface ObjectiveWrite


const { width } = Dimensions.get("window")

// Importar o ObjectiveGridItem ajustado
import ObjectiveGridItem from "@/components/ObjectivesGridCard"
import { ActivityGrid } from "@/components/ActivityGrid"


interface PeriodOptionProps {
  label: string
  isSelected: boolean
  onPress: () => void
}

const PeriodOption: React.FC<PeriodOptionProps> = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity style={styles.periodOption} onPress={onPress}>
      <View style={styles.radioButton}>{isSelected && <View style={styles.radioButtonSelected} />}</View>
      <Text style={styles.periodLabel}>{label}</Text>
    </TouchableOpacity>
  )
}

const CreateObjectiveScreen: React.FC = () => {
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string | null>(null) // Mudei para string para os IDs das atividades
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null)
  const [objectives, setObjectives] = useState<Activity[]>([]) // Renomeei para fetchedActivities se for uma lista de Activity
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => { // Renomeado para 'fetchActivities'
      try {
        const data = await getActivities() // Busca a lista de atividades para usar como "objetivos selecionáveis"
        setObjectives(data) // Define as atividades como opções de objetivo
      } catch (error) {
        console.error("Erro ao buscar atividades:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

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
      <FormHeader title="Criar Objetivo" onSavePress={handleSave}/>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Escolha um objetivo</Text>
          <ActivityGrid selected={selectedObjectiveId} setSelected={setSelectedObjectiveId}/>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Período</Text>
          <View style={styles.periodCard}>
            <PeriodOption
              label="1 Semana"
              isSelected={selectedPeriod === "1w"}
              onPress={() => setSelectedPeriod("1w")}
            />
            <View style={styles.periodSeparator} />
            <PeriodOption
              label="2 Semanas"
              isSelected={selectedPeriod === "2w"}
              onPress={() => setSelectedPeriod("2w")}
            />
            <View style={styles.periodSeparator} />
            <PeriodOption
              label="3 Semanas"
              isSelected={selectedPeriod === "3w"}
              onPress={() => setSelectedPeriod("3w")}
            />
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 12,
  },
  saveButton: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "600",
  },
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
    fontFamily: "Poppins_400Regular", // Poppins SemiBold
    color: "#111827",
    marginBottom: 16,
  },
  objectiveGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginHorizontal: -4, // Compensa a margem dos ObjectiveGridItem
  },
  objectiveGridItem: { // ESTILO MOVIDO PARA components/ObjectiveGridItem.tsx
    width: (width - 48) / 5, // Exemplo de largura
    height: (width - 48) / 5,
    backgroundColor: "white",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  objectiveGridItemSelected: {
    backgroundColor: "#8BC34A",
    borderColor: "#8BC34A",
  },
  objectiveLabel: { // ESTILO MOVIDO PARA components/ObjectiveGridItem.tsx
    fontSize: 12,
    color: "#333",
    marginTop: 4,
    textAlign: "center",
  },
  objectiveLabelSelected: {
    color: "white",
  },
  periodCard: {
    backgroundColor: "white",
    borderRadius: 12,
    gap: 2,
    elevation: 2,
  },
  periodOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
  },
  periodLabel: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular", // Poppins Regular
    color: "#000",
  },
  periodSeparator: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginHorizontal: -16,
  },
  bottomSpacing: {
    height: 100,
  },
  objectiveRowWith5: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 12,
  paddingHorizontal: 8,
},
objectiveRowWith4: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginBottom: 12,
  paddingHorizontal: 8,
},
})

export default CreateObjectiveScreen