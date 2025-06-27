import { ActivityIndicator } from "react-native-paper";
import ObjectiveGridItem from "./ObjectivesGridCard";
import { StyleSheet, Text, View } from "react-native";
import { getActivityIconName } from "@/utils/activityIconMapper";
import { useEffect, useState } from "react";
import { getActivities } from "@/services/diary/listActivities";
import { Activity } from "@/types/mental/diary";

interface ActivityGridProps {
  setSelected: (ids: number[]) => void;
  selected: number[]; // Agora é sempre um array de IDs
}

export const ActivityGridMultiples = ({ selected, setSelected }: ActivityGridProps) => {
  const [loading, setLoading] = useState(true);
  const [objectives, setObjectives] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getActivities();
        setObjectives(data);
      } catch (error) {
        console.error("Erro ao buscar atividades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const toggleSelection = (id: number ) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const renderObjectiveRow = (start: number, end: number) =>
    objectives.slice(start, end).map((obj) => (
      <ObjectiveGridItem
        key={obj.id}
        label={obj.name}
        renderIcon={getActivityIconName(obj.name)}
        isSelected={selected.includes(Number(obj.id))}
        onPress={() => toggleSelection(Number(obj.id))}
      />
    ));

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="small" color="#4CAF50" style={{ marginTop: 20 }} />
      ) : (
        <>
          <View style={styles.objectiveRowWith5}>
            {renderObjectiveRow(0, 5)}
          </View>
          <View style={styles.objectiveRowWith5}>
            {renderObjectiveRow(5, 10)}
          </View>
          <View style={styles.objectiveRowWith4}>
            {renderObjectiveRow(10, 14)}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 8,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#111827",
    marginBottom: 16,
  },
  objectiveRowWith5: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  objectiveRowWith4: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
