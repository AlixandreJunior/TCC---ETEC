import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

import ScreenHeader from '@/components/ScreenHeader';
import DateNavWithSearch from '@/components/DateNavWithSearch';
import ObjectiveCard from '@/components/ObjectiveCard';
import HistoryEntry from '@/components/HistoryEntry';
import FloatingActionButton from '@/components/FloatingActionButton';
import { router } from 'expo-router';

export default function MentalScreen(): React.JSX.Element {
  const [currentMonth, setCurrentMonth] = useState<string>('Junho 2025');

  const handlePrevMonth = () => {
    Alert.alert('Navegação', 'Mês anterior');
  };

  const handleNextMonth = () => {
    Alert.alert('Navegação', 'Próximo mês');
  };

  const handleSearch = () => {
    Alert.alert('Pesquisa', 'Pesquisa acionada');
  };

  const handleCreateDiary = () => {
    router.push('/creatediary')
  };

  const handleCreateObjective = () => { // Handler para "Criar Objetivo"
    router.push('/createobjective')
  };

  const historyData = [
    {
      date: 'Hoje, 11 de Junho',
      entries: [
        {
          sentiment: 'Excelente' as const,
          activity: 'Ler',
          group: 'Jambra\'s Group',
          time: '11:15',
          notes: 'RANNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN',
        },
        {
          sentiment: 'Neutro' as const,
          activity: 'Ler',
          group: 'Jambra\'s Group',
          time: '9:15',
          notes: 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN',
        },
      ],
    },
    {
      date: 'Ontem, 10 de Junho',
      entries: [
        {
          sentiment: 'Excelente' as const,
          activity: 'Ler',
          group: 'Jambra\'s Group',
          time: '11:15',
          notes: 'RANNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN',
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader
        onProfilePress={() => Alert.alert('Perfil', 'Perfil pressionado')}
        onChatPress={() => Alert.alert('Chat', 'Chat pressionado')}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <DateNavWithSearch
          currentPeriod={currentMonth}
          onPrevPress={handlePrevMonth}
          onNextPress={handleNextMonth}
          onSearchPress={handleSearch}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Objetivos</Text>
        </View>
        <ObjectiveCard objectiveName="Ler" sequence={2} isCompleted={false} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Histórico</Text>
        </View>
        <View style={styles.historySection}>
          {historyData.map((dayData, dayIndex) => (
            <View key={dayIndex}>
              <Text style={styles.historyDate}>{dayData.date}</Text>
              {dayData.entries.map((entry, entryIndex) => (
                <HistoryEntry
                  key={entryIndex}
                  sentiment={entry.sentiment}
                  activity={entry.activity}
                  group={entry.group}
                  time={entry.time}
                  notes={entry.notes}
                  isLast={entryIndex === dayData.entries.length - 1}
                />
              ))}
            </View>
          ))}
        </View>

      </ScrollView>
      <FloatingActionButton
        onPressCreateDiary={handleCreateDiary}
        onPressCreateObjective={handleCreateObjective} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  historySection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 15,
    marginTop: 10,
  },
});