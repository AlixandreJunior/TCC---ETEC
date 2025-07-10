import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Hydratation } from "@/types/health/hydratation";

interface Props {
  logs: Hydratation[];
  dateLabel: string;
  loading: boolean;
  error: string | null;
}

export const HydrationHistory: React.FC<Props> = ({
  logs,
  dateLabel,
  loading,
  error,
}) => {
  return (
    <View style={styles.historySection}>
      <Text style={styles.historyTitle}>Histórico</Text>
      <Text style={styles.historyDate}>Data: {dateLabel}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : logs.length === 0 ? (
        <Text style={styles.noDataText}>Nenhum registro de hidratação para essa data.</Text>
      ) : (
        logs.map((log, index) => (
          <View key={index} style={styles.historyCard}>
            <View style={styles.historyCardContent}>
              <View>
                <Text style={styles.cardValue}>{log.quantity} ml</Text>
              </View>
              <View style={styles.hydrationCardRight}>
                <Text style={styles.cardCupsText}>
                  {Math.round(log.quantity / 250)} copo(s)
                </Text>
              </View>
            </View>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  historySection: { paddingHorizontal: 16, marginBottom: 100 },
  historyTitle: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#333",
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginBottom: 16,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  historyCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  historyCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardValue: {
    fontSize: 22,
    fontFamily: "Poppins_500Medium",
    color: "#000",
    marginVertical: 2,
  },
  hydrationCardRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cardCupsText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
});
