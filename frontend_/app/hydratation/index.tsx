import { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import Header from "@/components/Layout/Header";
import HeaderWithOptions from "@/components/Layout/HeaderWithOptions";
import DateNavigator from "@/components/DateNavigator";

import { getHydratationList } from "@/services/hydratation/listHydratation";
import { Hydratation } from "@/types/health/hydratation";
import { HydrationHistory } from "@/components/HydrationHistory";
import { HydrationSummary } from "@/components/HydrationSummary";

function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function HydrationScreen() {
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const [hydrationLogs, setHydrationLogs] = useState<Hydratation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalHydrationToday = hydrationLogs.reduce((sum, log) => sum + (log.quantity || 0), 0);
  const dailyGoal = 3750;
  const remaining = dailyGoal - totalHydrationToday;
  const progress = (totalHydrationToday / dailyGoal) * 100;

  const handleAddWater = () => {
    router.push("/hydratation/register");
  };

  useEffect(() => {
    const fetchHydrationData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getHydratationList(selectedDate);
        setHydrationLogs(data);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar hidratação.");
        console.error("Erro ao buscar hidratação:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHydrationData();
  }, [selectedDate]);

  return (
    <SafeAreaView style={styles.container}>
      <Header avatarChar="A" />
      <HeaderWithOptions title="Hidratação" onBackPress={() => router.back()} onOptionPress={() => {}} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <DateNavigator
          currentDate={selectedDate}
          mode="day"
          onDateChange={setSelectedDate}
        />

        <HydrationSummary
          total={totalHydrationToday}
          remaining={remaining}
          goal={dailyGoal}
          progress={progress}
        />

        <HydrationHistory
          logs={hydrationLogs}
          dateLabel={formatDateToYYYYMMDD(selectedDate)}
          loading={loading}
          error={error}
        />
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={handleAddWater}>
        <MaterialCommunityIcons name="plus" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollView: { flex: 1, backgroundColor: "#fff" },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
