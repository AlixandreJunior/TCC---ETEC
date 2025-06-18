import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@/styles/colors'; 

import Header from '@/components/Header'; 
import DateNavigator from '@/components/DateNavigator'; 
import ObjectiveCard from '@/components/ObjectiveCard'; 
import HistoryEntryCard from '@/components/HistoryEntryCard'; 

const DiaryPage: React.FC = () => {
  const todayEntries = [
    {
      mood: 'excellent' as 'excellent' | 'bad',
      time: '09:05',
      activity: 'Ler',
      group: "Jambra's Group",
      description: "nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
    },
    {
      mood: 'bad' as 'excellent' | 'bad',
      time: '09:05',
      activity: 'Ler',
      group: "Jambra's Group",
      description: "nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
    },
  ];

  const yesterdayEntries = [
    {
      mood: 'excellent' as 'excellent' | 'bad',
      time: '09:05',
      activity: 'Ler',
      group: "Jambra's Group",
      description: "nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
    },
  ];

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Navegador de Data */}
        <DateNavigator
          currentDate="Junho de 2025"
          onPrevious={() => console.log('Mês anterior')}
          onNext={() => console.log('Próximo mês')}
        />

        <Text style={styles.sectionTitle}>Objetivos</Text>
        <ObjectiveCard objectiveText="Ler" sequence={2} />

        {/* Seção de Histórico */}
        <Text style={styles.sectionTitle}>Histórico</Text>

        <View style={styles.historySection}>
          <Text style={styles.historyDateTitle}>Hoje, 11 de Junho</Text>
          {todayEntries.map((entry, index) => (
            <HistoryEntryCard
              key={`today-${index}`}
              mood={entry.mood}
              time={entry.time}
              activity={entry.activity}
              group={entry.group}
              description={entry.description}
              isFirst={index === 0}
              isLast={index === todayEntries.length - 1}
            />
          ))}
        </View>

        <View style={styles.historySection}>
          <Text style={styles.historyDateTitle}>Ontem, 10 de Junho</Text>
          {yesterdayEntries.map((entry, index) => (
            <HistoryEntryCard
              key={`yesterday-${index}`}
              mood={entry.mood}
              time={entry.time}
              activity={entry.activity}
              group={entry.group}
              description={entry.description}
              isFirst={index === 0}
              isLast={index === yesterdayEntries.length - 1}
            />
          ))}
        </View>
        {/* ... você pode adicionar mais seções de histórico aqui */}

      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add-outline" size={30} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollViewContent: {
    paddingBottom: 100, // Espaço para o FAB
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: 15,
    marginTop: 20,
    marginHorizontal: 20,
    fontFamily: 'Poppins_700Bold', 
  },
  historySection: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  historyDateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: 10,
    fontFamily: 'Poppins_600SemiBold',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: colors.primaryGreen,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default DiaryPage;