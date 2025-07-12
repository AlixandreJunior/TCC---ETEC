import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import StatCard from "./StatCard";
import ExerciseIcon from "./Icons/ExerciseIcon";
import MeditationIcon from "./Icons/MeditationIcon";
import WaterDropIcon from "./Icons/WaterDropIcon";
import NotebookIcon from "./Icons/NotebookIcon";
import { Goal } from "@/types/user/goal";
import { User } from "@/types/user/user";

interface StatsSectionProps {
  fetchedUser: User | null;
  userGoals: Goal | null;
  loadingUser: boolean;
  loadingGoals: boolean;
  errorUser: string | null;
  errorGoals: string | null;
}

const { width } = Dimensions.get('window');
const cardGap = 10;
const screenContentPaddingHorizontal = 20;
const threeColumnCardWidth = (width - (screenContentPaddingHorizontal * 2) - (cardGap * (3 - 1))) / 3;

export const StatsSection: React.FC<StatsSectionProps> = ({
  fetchedUser,
  userGoals,
  loadingGoals,
  loadingUser,
  errorUser,
  errorGoals
}) => {
  const statistics = fetchedUser ? [
    { icon: <NotebookIcon size={14} />, value: fetchedUser.diarys_registers, label: 'Diários registrados' },
    { icon: <MeditationIcon size={18} />, value: fetchedUser.mindfulness_registers, label: 'Sessões de Mindfulness' },
    { icon: <ExerciseIcon size={25} />, value: fetchedUser.exercises_registers, label: 'Exercícios físicos' },
  ] : [];

  const transformedGoals = userGoals ? [
    { icon: <WaterDropIcon size={13} color='#525252' />, value: userGoals.hydration_goal, label: 'ml por dia' },
    { icon: <MeditationIcon size={18} />, value: userGoals.exercise_goal, label: 'Minutos por dia' },
    { icon: <ExerciseIcon size={25} />, value: userGoals.mindfulness_goal, label: 'Minutos por dia' },
  ] : [];

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Estatísticas</Text>
      </View>
      {loadingUser ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : errorUser ? (
        <Text style={styles.errorText}>Erro ao carregar estatísticas: {errorUser}</Text>
      ) : statistics.length === 0 ? (
        <Text style={styles.noDataText}>Nenhuma estatística disponível.</Text>
      ) : (
        <View style={styles.metricCardGrid}>
          {statistics.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              cardWidth={threeColumnCardWidth}
            />
          ))}
        </View>
      )}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Minhas Metas</Text>
      </View>
      {loadingGoals ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : errorGoals ? (
        <Text style={styles.errorText}>Erro ao carregar metas: {errorGoals}</Text>
      ) : transformedGoals.length === 0 ? (
        <Text style={styles.noDataText}>Nenhuma meta definida.</Text>
      ) : (
        <View style={styles.metricCardGrid}>
          {transformedGoals.map((goal, index) => (
            <StatCard
              key={index}
              icon={goal.icon}
              value={goal.value}
              label={goal.label}
              cardWidth={threeColumnCardWidth}
            />
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#2C3E50',
    marginBottom: 5,
  },
  metricCardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: cardGap,
  },
  loadingIndicator: {
    marginTop: 20,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    fontFamily: 'Poppins_400Regular',
  },
  noDataText: {
    color: 'gray',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    fontFamily: 'Poppins_400Regular',
  },
});
