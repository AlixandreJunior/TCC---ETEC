"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { colors } from "@/styles/colors"
import { styles } from "./styles"
import { Bell, Heart } from "lucide-react-native"

export default function MentalScreen() {
  const insets = useSafeAreaInsets()
  const [filterModalVisible, setFilterModalVisible] = useState(false)

  const handleApplyFilters = (difficulties: string[], activityTypes: string[]) => {
    console.log("Selected difficulties:", difficulties)
    console.log("Selected activity types:", activityTypes)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Heart size={24} color={colors.blue.main} />
          </View>
          <Text style={styles.headerTitle}>Mental</Text>
          <TouchableOpacity>
            <Bell size={24} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>É importante agradecer pelo hoje sem nunca desistir do amanhã</Text>
        </View>

        <View style={styles.moodSection}>
          <View style={styles.moodHeader}>
            <Text style={styles.sectionTitle}>Seu Humor</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>Ver mais</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.moodGraph}>
            <View style={styles.moodBars}>
              <View style={[styles.moodBar, { height: 70, backgroundColor: "#60A5FA" }]} />
              <View style={[styles.moodBar, { height: 90, backgroundColor: "#60A5FA" }]} />
              <View style={[styles.moodBar, { height: 60, backgroundColor: "#9C5DE4" }]} />
              <View style={[styles.moodBar, { height: 80, backgroundColor: "#60A5FA" }]} />
              <View style={[styles.moodBar, { height: 120, backgroundColor: "#4CD964" }]} />
              <View style={[styles.moodBar, { height: 110, backgroundColor: "#4CD964" }]} />
              <View style={[styles.moodBar, { height: 85, backgroundColor: "#60A5FA" }]} />
            </View>
            <View style={styles.weekDays}>
              <Text style={styles.dayText}>Seg</Text>
              <Text style={styles.dayText}>Ter</Text>
              <Text style={styles.dayText}>Qua</Text>
              <Text style={styles.dayText}>Qui</Text>
              <Text style={styles.dayText}>Sex</Text>
              <Text style={styles.dayText}>Sab</Text>
              <Text style={styles.dayText}>Dom</Text>
            </View>
          </View>
        </View>

        <View style={styles.checkInCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>Check In Mental</Text>
            </View>
            <TouchableOpacity>
              <Feather name="more-horizontal" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <Text style={styles.lastCheckIn}>Último Check-In:</Text>

          <View style={styles.levelContainer}>
            <Text style={styles.levelLabel}>Nível de Energia</Text>
            <View style={styles.levelRow}>
              <Text style={styles.levelNumber}>1</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progress, { width: "70%", backgroundColor: "#10B981" }]} />
              </View>
              <Text style={styles.levelNumber}>10</Text>
            </View>
          </View>

          <View style={styles.levelContainer}>
            <Text style={styles.levelLabel}>Nível de Atividade</Text>
            <View style={styles.levelRow}>
              <Text style={styles.levelNumber}>1</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progress, { width: "50%", backgroundColor: "#60A5FA" }]} />
              </View>
              <Text style={styles.levelNumber}>10</Text>
            </View>
          </View>

          <View style={styles.statusContainer}>
            <View style={styles.statusItem}>
              <View style={styles.statusIconGreen}>
                <Feather name="frown" size={16} color="#fff" />
              </View>
              <Text style={styles.statusText}>Triste</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={styles.statusIconBrown}>
                <MaterialCommunityIcons name="account" size={16} color="#fff" />
              </View>
              <Text style={styles.statusText}>Se sente sozinho</Text>
            </View>
          </View>

          <View style={styles.statusContainer}>
            <View style={styles.statusItem}>
              <View style={styles.statusIconPurple}>
                <Feather name="heart" size={16} color="#fff" />
              </View>
              <Text style={styles.statusText}>Sem Medicação</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={styles.statusIconGray}>
                <Feather name="alert-triangle" size={16} color="#fff" />
              </View>
              <Text style={styles.statusText}>Uso Normal</Text>
            </View>
          </View>

          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>"Tive um dia difícil no trabalho, mas estou tentando manter a calma."</Text>
          </View>

          <Text style={styles.dateText}>29 Abril, 2025 • 14:30</Text>

          <TouchableOpacity style={styles.detailsButton} onPress={() => console.log('A')}>
            <Text style={styles.detailsButtonText}>Ver detalhes</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.checkInButton} onPress={() => console.log('A')}>
          <Feather name="check" size={20} color="#fff" style={styles.checkIcon} />
          <Text style={styles.checkInButtonText}>Fazer Check-in Mental</Text>
        </TouchableOpacity>

        <View style={styles.diaryCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardTitleContainer}>
              <Feather name="edit-2" size={20} color="#9C5DE4" />
              <Text style={[styles.cardTitle, { color: "#9C5DE4" }]}>Meu Diário</Text>
            </View>
            <TouchableOpacity>
              <Feather name="more-horizontal" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <Text style={styles.diaryPrompt}>Pronto para registrar seu dia?</Text>

          <TouchableOpacity style={styles.newEntryButton}>
            <Feather name="edit-3" size={20} color="#fff" style={styles.editIcon} />
            <Text style={styles.newEntryButtonText}>Escrever Novo Registro</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.exercisesSection}>
          <View style={styles.exercisesHeader}>
            <Text style={styles.sectionTitle}>Exercícios Recomendados</Text>
            <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
              <Feather name="sliders" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.exerciseCard}>
            <View style={styles.exerciseContent}>
              <View style={styles.exerciseIconContainer}>
                <Feather name="moon" size={24} color="#9C5DE4" />
              </View>
              <View style={styles.exerciseDetails}>
                <Text style={styles.exerciseName}>Respiração</Text>
                <Text style={styles.exerciseTime}>5 minutos • Intensidade moderada</Text>
              </View>
              <TouchableOpacity>
                <Feather name="heart" size={24} color="#9C5DE4" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.startExerciseButton}>
              <Text style={styles.startExerciseText}>Iniciar exercício</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
