"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import Header from "./Header"

const { width } = Dimensions.get("window")

interface QuantityCounterProps {
  label: string
  volume: number
  onQuantityChange: (volumeMl: number, newQuantity: number) => void
  initialQuantity?: number
}

const QuantityCounter: React.FC<QuantityCounterProps> = ({ label, volume, onQuantityChange, initialQuantity = 0 }) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity)

  const increment = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    onQuantityChange(volume, newQuantity)
  }

  const decrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onQuantityChange(volume, newQuantity)
    }
  }

  return (
    <View style={styles.quantityItem}>
      <View>
        <Text style={styles.itemLabel}>{label}</Text>
        <Text style={styles.itemVolume}>{volume} ml</Text>
      </View>
      <View style={styles.counterContainer}>
        <TouchableOpacity onPress={decrement} style={styles.counterButton}>
          <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{quantity}</Text>
        <TouchableOpacity onPress={increment} style={styles.counterButton}>
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

interface QuantitiesState {
  "250": number
  "500": number
  "750": number
  "1000": number
}

const RegisterHydrationScreen: React.FC = () => {
  const [customAmount, setCustomAmount] = useState<string>("")
  const [quantities, setQuantities] = useState<QuantitiesState>({
    "250": 0,
    "500": 0,
    "750": 0,
    "1000": 0,
  })

  const handleQuantityChange = (volumeMl: number, newQuantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [volumeMl.toString()]: newQuantity,
    }))
  }

  const handleSave = () => {
    let totalHydration = 0
    // Sum quantities from predefined options
    for (const volumeKey in quantities) {
      if (Object.prototype.hasOwnProperty.call(quantities, volumeKey)) {
        const volume = Number.parseInt(volumeKey, 10)
        totalHydration += volume * quantities[volumeKey as keyof QuantitiesState]
      }
    }
    // Add custom amount if provided
    if (customAmount && !isNaN(Number.parseFloat(customAmount))) {
      totalHydration += Number.parseFloat(customAmount)
    }

    console.log("Total Hydration Registered:", totalHydration, "ml")
    console.log("Quantities by type:", quantities)
    console.log("Custom Amount:", customAmount)

    // Navigate back to hydration screen
    router.back()
  }

  const handleBack = () => {
    router.back()
  }

  return (
<View style={styles.container}>
  {/* Green Header */}
  <Header avatarChar="A" />        

  {/* White Header Section */}
  <View style={styles.whiteHeader}>
    <View style={styles.headerContent}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registrar Hidratação</Text>
      </View>
      <TouchableOpacity onPress={handleSave}>
        <Text style={styles.saveButton}>Salvar</Text>
      </TouchableOpacity>
    </View>
  </View>

  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
    {/* Date Section */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Data</Text>
      <View style={styles.dateCard}>
        <Text style={styles.dateText}>Hoje</Text>
      </View>
    </View>

        {/* Options Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Escolha uma opção ou adicione uma personalizada</Text>
          <View style={styles.optionsCard}>
            <QuantityCounter
              label="Copo"
              volume={250}
              onQuantityChange={handleQuantityChange}
              initialQuantity={quantities["250"]}
            />
            <View style={styles.separator} />
            <QuantityCounter
              label="Garrafa Pequena"
              volume={500}
              onQuantityChange={handleQuantityChange}
              initialQuantity={quantities["500"]}
            />
            <View style={styles.separator} />
            <QuantityCounter
              label="Garrafa Média"
              volume={750}
              onQuantityChange={handleQuantityChange}
              initialQuantity={quantities["750"]}
            />
            <View style={styles.separator} />
            <QuantityCounter
              label="Garrafa Grande"
              volume={1000}
              onQuantityChange={handleQuantityChange}
              initialQuantity={quantities["1000"]}
            />
          </View>
        </View>

        {/* Custom Amount Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quantidade Personalizada</Text>
          <TextInput
            style={styles.customInput}
            placeholder="Coloque uma quantidade personalizada"
            keyboardType="numeric"
            value={customAmount}
            onChangeText={setCustomAmount}
            placeholderTextColor="#999"
          />
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  greenHeader: {
    backgroundColor: "#8BC34A",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  mintrLogo: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  whiteHeader: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 16,
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
  saveButton: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  dateCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  optionsCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quantityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  itemVolume: {
    fontSize: 14,
    color: "#666",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  counterButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  counterValue: {
    fontSize: 18,
    fontWeight: "bold",
    minWidth: 30,
    textAlign: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 5,
  },
  customInput: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bottomSpacing: {
    height: 100,
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
})

export default RegisterHydrationScreen
