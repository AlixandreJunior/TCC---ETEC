import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProgressCircle from "@/components/ProgressCircle";
import WaterDropIcon from "@/components/Icons/WaterDropIcon";

interface HydrationSummaryProps {
  total: number;
  remaining: number;
  goal: number;
  progress: number;
}

export const HydrationSummary: React.FC<HydrationSummaryProps> = ({
  total,
  remaining,
  goal,
  progress,
}) => {
  return (
    <View style={styles.mainContent}>
      <View style={styles.leftContent}>
        <Text style={styles.currentAmount}>{total} ml</Text>
        <Text style={styles.remainingText}>
          Faltam {Math.max(0, remaining)} ml para você atingir{"\n"}seu objetivo diário de {goal} ml
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <ProgressCircle progress={progress} size={100} color="#9CC9FF" strokeWidth={8} />
        <View style={styles.progressIcon}>
          <WaterDropIcon size={24} color="#0022FF" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  leftContent: { flex: 1, marginRight: 20 },
  currentAmount: {
    fontSize: 30,
    fontFamily: "Poppins_500Medium",
    color: "#000",
    marginBottom: 8,
  },
  remainingText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    lineHeight: 20,
  },
  progressContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  progressIcon: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
