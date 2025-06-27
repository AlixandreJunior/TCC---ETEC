"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, SafeAreaView } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import ProgressCircle from "../components/ProgressCircle"
import WaterDropIcon from "../components/WaterDropIcon"

const { width, height } = Dimensions.get("window")

const HydrationScreen: React.FC = () => {
  const [currentAmount, setCurrentAmount] = useState(750)
  const dailyGoal = 3750
  const remaining = dailyGoal - currentAmount
  const progress = (currentAmount / dailyGoal) * 100

  const handleBack = () => {
    router.back()
  }

  const handleAddWater = () => {
    setCurrentAmount((prev) => prev + 250) // Add 250ml per tap
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Header Section */}
      <View style={styles.mainHeader}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Hidratação</Text>
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Date Navigation */}
        <View style={styles.dateNavigation}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.dateText}>Ontem</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Main Hydration Display */}
        <View style={styles.mainContent}>
          <View style={styles.leftContent}>
            <Text style={styles.currentAmount}>{currentAmount} ml</Text>
            <Text style={styles.remainingText}>
              Faltam {remaining} ml para você atingir{"\n"}seu objetivo diário de {dailyGoal}ml
            </Text>
          </View>
          <View style={styles.progressContainer}>
            <ProgressCircle progress={progress} size={120} color="#9CC9FF" strokeWidth={8} />
            <View style={styles.progressIcon}>
              <WaterDropIcon size={32} color="#0022FF" />
            </View>
          </View>
        </View>

        {/* History Section */}
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Histórico</Text>
          <Text style={styles.historyDate}>Hoje, 11 de Junho</Text>

          <TouchableOpacity style={styles.card} onPress={() => router.push("/hydratation")} activeOpacity={0.7}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardTitle}>Hidratação</Text>
                <Text style={styles.cardValue}>750 ml</Text>
                <Text style={styles.cardSubtitle}>Hoje</Text>
              </View>
              <View style={styles.hydrationProgress}>
                <ProgressCircle progress={20} size={60} color="#9CC9FF" strokeWidth={6} />
                <View style={styles.progressIcon}>
                  <WaterDropIcon size={20} color="#0022FF" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddWater}>
        <MaterialCommunityIcons name="plus" size={28} color="white" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <MaterialCommunityIcons name="brain" size={24} color="#999" />
          <Text style={styles.navLabel}>Mental</Text>
        </View>
        <View style={styles.navItem}>
          <MaterialCommunityIcons name="heart" size={24} color="#4CAF50" />
          <Text style={styles.navLabelSelected}>Saúde</Text>
        </View>
        <View style={styles.navItem}>
          <MaterialCommunityIcons name="account" size={24} color="#999" />
          <Text style={styles.navLabel}>Você</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  mainHeader: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
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
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  scrollView: {
    flex: 1,
  },
  dateNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  mainContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  leftContent: {
    flex: 1,
  },
  currentAmount: {
    fontSize: 48,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  remainingText: {
    fontSize: 14,
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
  historySection: {
    paddingHorizontal: 16,
    marginBottom: 100,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  historyCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  historyGlasses: {
    fontSize: 16,
    color: "#666",
  },
  fab: {
    position: "absolute",
    bottom: 100,
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
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingBottom: 20,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  navLabelSelected: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "600",
    marginTop: 4,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginVertical: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  hydrationProgress: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default HydrationScreen
