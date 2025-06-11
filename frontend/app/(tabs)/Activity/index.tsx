"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native"
import { Heart, Bell, MoreHorizontal, CheckCircle, Droplet, Activity } from "lucide-react-native"
import { useState } from "react"
import { styles } from "./styles"
import { Feather } from "@expo/vector-icons"

export default function FisicoScreen() {
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [checkinModalVisible, setCheckinModalVisible] = useState(false)

  const handleApplyFilters = (difficulties: string[], activityTypes: string[]) => {
    console.log("Selected difficulties:", difficulties)
    console.log("Selected activity types:", activityTypes)
  }

  const exercises = [
    {
      id: "1",
      name: "Caminhada",
      duration: "20 minutos",
      intensity: "Intensidade moderada",
      icon: "🚶‍♂️",
      equipmentIcon: "💪",
    },
    {
      id: "2",
      name: "Alongamento",
      duration: "15 minutos",
      intensity: "Intensidade leve",
      icon: "🧘‍♂️",
      equipmentIcon: "🧘‍♀️",
    },
    {
      id: "3",
      name: "Corrida",
      duration: "30 minutos",
      intensity: "Intensidade alta",
      icon: "🏃‍♂️",
      equipmentIcon: "⏱️",
    },
  ]

  const renderExerciseItem = ({ item }: { item: (typeof exercises)[number] }) => (
    <View style={styles.exerciseCard}>
      <View style={styles.exerciseContent}>
        <View style={styles.exerciseIconContainer}>
          <Text style={styles.exerciseIconText}>{item.icon}</Text>
        </View>
        <View style={styles.exerciseDetails}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          <Text style={styles.exerciseTime}>
            {item.duration} • {item.intensity}
          </Text>
        </View>
        <View style={styles.exerciseIconContainer}>
          <Text style={styles.exerciseIconText}>{item.equipmentIcon}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.startExerciseButton}>
        <Text style={styles.startExerciseText}>Iniciar exercício</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Heart size={24} color="#4F96FF" />
          </View>
          <Text style={styles.headerTitle}>Físico</Text>
          <View style={styles.notificationContainer}>
            <Bell size={24} color="#000" />
            <View style={styles.notificationBadge} />
          </View>
        </View>

        {/* Frase motivacional */}
        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>É importante agradecer pelo hoje sem nunca desistir do amanhã</Text>
        </View>

        {/* Hidratação */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hidratação</Text>
            <Droplet size={20} color="#3B82F6" />
          </View>
          <View style={styles.hydrationInfo}>
            <Text style={styles.currentValue}>1,5L</Text>
            <Text style={styles.goalValue}>Meta: 2L</Text>
          </View>
          <View style={styles.progressBarWide}>
            <View style={[styles.progressFill, { width: "75%", backgroundColor: "#3B82F6" }]} />
          </View>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>+ Registrar água</Text>
          </TouchableOpacity>
        </View>

        {/* Passos */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Passos</Text>
            <Activity size={20} color="#84CC16" />
          </View>
          <View style={styles.stepsInfo}>
            <Text style={styles.currentValue}>5.340</Text>
            <Text style={styles.goalValue}>Meta: 8.000</Text>
          </View>
          <View style={styles.progressBarWide}>
            <View style={[styles.progressFill, { width: "66%", backgroundColor: "#84CC16" }]} />
          </View>
          <Text style={styles.motivationalText}>Você está no caminho certo! Continue assim!</Text>
        </View>

        <View style={styles.exercisesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Exercícios Recomendados</Text>
            <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
              <Feather name="sliders" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={exercises}
            renderItem={renderExerciseItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onMomentumScrollEnd={(event) => {
              const contentOffset = event.nativeEvent.contentOffset.x
              const viewSize = event.nativeEvent.layoutMeasurement.width
              const newIndex = Math.floor(contentOffset / viewSize)
              setCurrentExerciseIndex(newIndex)
            }}
            style={styles.exerciseCarousel}
          />

          <View style={styles.paginationContainer}>
            {exercises.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentExerciseIndex ? styles.paginationDotActive : {},
                ]}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
