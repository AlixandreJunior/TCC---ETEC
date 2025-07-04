import { Dimensions, StyleSheet, Text, View } from "react-native"
import ObjectiveDisplayCard from "./Cards/ObjectiveCard"
import { getActivityIconName } from "@/utils/activityIconMapper"
import { ActivityIndicator } from "react-native-paper"
import { Objective } from "@/types/mental/objectives"

interface ObjectiveSectionProps{
    loadingObjectives: boolean
    objectives: Objective[]
    errorObjectives: string | null
} 

export const ObjectiveSection: React.FC<ObjectiveSectionProps> = ({
    loadingObjectives,
    objectives,
    errorObjectives
}) => {
    const formatDeadline = (deadlineString: string) => {
        const date = new Date(deadlineString);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        };

    return(<>
        {loadingObjectives ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Objetivos</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : errorObjectives ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Objetivos</Text>
            <Text style={styles.errorText}>Erro ao carregar objetivos: {errorObjectives}</Text>
          </View>
        ) : (
          objectives.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Objetivos</Text>
              {objectives.map((objective) => (
                <ObjectiveDisplayCard
                  key={objective.id}
                  renderIcon={getActivityIconName(objective.activity.name)}
                  objectiveTitle={objective.activity.name}
                  objectiveSubtitle={`Meta até ${formatDeadline(objective.deadline)}`}
                />
              ))}
            </View>
          )
        )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
      },
      content: {
        flex: 1,
      },
      section: {
        marginBottom: 8,
        paddingHorizontal: Dimensions.get('window').width * 0.05,
      },
      sectionTitle: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#111827',
        marginBottom: 8,
      },
      errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
      },
      noDataText: {
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
      },
})