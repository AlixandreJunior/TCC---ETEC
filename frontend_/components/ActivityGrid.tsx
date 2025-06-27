import { ActivityIndicator } from "react-native-paper"
import ObjectiveGridItem from "./ObjectivesGridCard"
import { StyleSheet, Text, View } from "react-native"
import { getActivityIconName } from "@/utils/activityIconMapper"
import { useEffect, useState } from "react"
import { getActivities } from "@/services/diary/listActivities"
import { Activity } from "@/types/mental/diary"

interface ActivityGridProps {
    setSelected: Function
    selected: string | null | number[]
}

export const ActivityGrid = ({selected, setSelected}: ActivityGridProps) => {
    const [loading, setLoading] = useState(true)
    const [objectives, setObjectives] = useState<Activity[]>([]) // Renomeei para fetchedActivities se for uma lista de Activity
    
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

    return(
        <View>
          {loading ? (
            <ActivityIndicator size="small" color="#4CAF50" style={{ marginTop: 20 }} />
          ) : (
            <>
              <View style={styles.objectiveRowWith5}>
                {objectives.slice(0, 5).map((obj) => (
                  <ObjectiveGridItem
                    key={obj.id}
                    label={obj.name}
                    renderIcon={getActivityIconName(obj.name)}
                    isSelected={selected === obj.id.toString()}
                    onPress={() => setSelected(obj.id.toString())}
                  />
                ))}
              </View>

              <View style={styles.objectiveRowWith5}>
                {objectives.slice(5, 10).map((obj) => (
                  <ObjectiveGridItem
                    key={obj.id}
                    label={obj.name}
                    renderIcon={getActivityIconName(obj.name)}
                    isSelected={selected === obj.id.toString()}
                    onPress={() => setSelected(obj.id.toString())}
                  />
                ))}
              </View>

              <View style={styles.objectiveRowWith4}>
                {objectives.slice(10, 14).map((obj) => (
                  <ObjectiveGridItem
                    key={obj.id}
                    label={obj.name}
                    renderIcon={getActivityIconName(obj.name)}
                    isSelected={selected === obj.id.toString()}
                    onPress={() => setSelected(obj.id.toString())}
                  />
                ))}
              </View>
            </>
          )}
        </View>
    )
}


const styles = StyleSheet.create(
    {   
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
    }
)