import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ActivityCardProps{
    title: string
    onPressCard: ((event: any) => void)
    completedActivityDays: number
    activityDaysProgress: boolean[]
}

const { width, height } = Dimensions.get("window");


export const ActivityCard: React.FC<ActivityCardProps> = ({
    title,
    onPressCard,
    completedActivityDays,
    activityDaysProgress
}) => {
    const weekDaysLabels = ["D", "S", "T", "Q", "Q", "S", "S"];

    return(
        <TouchableOpacity style={styles.cardTouchable} onPress={onPressCard}>
            <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardValue}>{completedActivityDays} de 7</Text>
                <Text style={styles.cardSubtitle}>Esta semana</Text>
                </View>
                <View style={styles.weekProgress}>
                <View style={styles.weekDays}>
                    {weekDaysLabels.map((day, index) => (
                    <View key={index} style={styles.dayContainer}>
                        <View style={[styles.dayIndicator, activityDaysProgress[index] && styles.dayIndicatorActive]}>
                        {activityDaysProgress[index] && <Text style={styles.checkmark}>✓</Text>}
                        </View>
                        <Text style={styles.dayLabel}>{day}</Text>
                    </View>
                    ))}
                </View>
                </View>
            </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    
  cardTouchable: {
    marginBottom: height * 0.02,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.04,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,

  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    fontWeight: "500",
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: "#000",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "400",
  },
  hydrationProgress: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  hydrationIcon: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  weekProgress: {
    alignItems: "flex-end",
  },
  weekDays: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dayContainer: {
    alignItems: "center",
    gap: 1,
  },
  dayLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  dayIndicator: {
    width: 14,
    height: 33, 
    borderRadius: 20, // Metade da largura/altura para ser círculo
    backgroundColor: "#E0E0E0", // Cor cinza para dias não exercitados
    alignItems: "center",
    justifyContent: "center",
  },
  dayIndicatorActive: {
    backgroundColor: "#00FF2F", // Cor verde brilhante para dia exercitado
  },
  dayIndicatorEmptyCircle: { // Para o círculo cinza vazio no dia não exercitado
    width: 20, // Menor que o contêiner para parecer um círculo interno
    height: 20,
    borderRadius: 10,
    borderColor: '#999', // Borda cinza escura
    borderWidth: 1.5,
    backgroundColor: 'transparent',
  },
  dayIndicatorToday: { // Estilo opcional para destacar o dia atual (ex: uma borda)
    borderColor: '#333',
    borderWidth: 2,
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
})