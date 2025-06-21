// screens/HealthDashboardScreen.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text
} from 'react-native';

import ScreenHeader from '@/components/ScreenHeader';
import DateNavigator from '@/components/DateNavigator';
import CircularProgressDisplay from '@/components/CircularProgressDisplay';
import WeeklyProgressCard from '@/components/WeeklyProgressCard';
import FormCard from '@/components/FormCard'; // Reutilizando o FormCard para as seçõe
import { router } from 'expo-router';

export default function ActivityScreen(): React.JSX.Element {
  const [currentDate, setCurrentDate] = useState<string>('Hoje');
  const [activeTab, setActiveTab] = useState<'Mental' | 'Saúde' | 'Você'>('Saúde'); // Tab ativa

  const handlePrevDay = () => {
    console.log('Dia anterior');
  };

  const handleNextDay = () => {
    // Lógica para ir para o próximo dia
    console.log('Próximo dia');
    // Em um app real, você ajustaria a data e buscaria os dados
  };

  const handleTabChange = (tab: 'Mental' | 'Saúde' | 'Você') => {
    setActiveTab(tab);
    // Lógica de navegação entre as telas (ex: navigation.navigate(tab))
    console.log(`Navegar para ${tab}`);
  };

  // Dados mockados para exibir na tela, baseados na imagem
  const stepsData = {
    value: '6.565',
    unit: 'passos',
    percentage: 65, // Exemplo de progresso
    color: '#6A5ACD', // Roxo/Azul do círculo
    iconName: 'shoe-print' as const, // As const para tipar o literal
  };

  const distanceData = {
    value: '5,31',
    unit: 'km',
    percentage: 50,
    color: '#3498DB', // Azul do ícone de localização
    iconName: 'map-marker' as const,
  };

  const caloriesData = {
    value: '2.203',
    unit: 'kcal',
    percentage: 70,
    color: '#E67E22', // Laranja do ícone de fogo
    iconName: 'fire' as const,
  };

  const hydrationData = {
    value: '750',
    unit: 'ml',
    percentage: 75, // Exemplo
    color: '#3498DB', // Azul da gota
    iconName: 'water' as const,
  };

  const exerciseProgress = {
    title: 'Dias com Exercício',
    completedDays: 1,
    totalDays: 5,
    weeklyProgress: [false, false, true, false, false, false, false], // Ex: Quarta-feira feita
  };

  const mindfulnessProgress = {
    title: 'Dias com Mindfulness',
    completedDays: 1,
    totalDays: 5,
    weeklyProgress: [true, false, false, false, false, false, false], // Ex: Domingo feita
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader
        onProfilePress={() => console.log('Perfil pressionado')}
        onChatPress={() => console.log('Chat pressionado')}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <DateNavigator
          currentDateText={currentDate}
          onPrevPress={handlePrevDay}
          onNextPress={handleNextDay}
        />

        <FormCard style={styles.mainCard}>
          <View style={styles.mainProgressContainer}>
            <CircularProgressDisplay
              value={stepsData.value}
              unit={stepsData.unit}
              iconName={stepsData.iconName}
              percentage={stepsData.percentage}
              size="large"
              color={stepsData.color}
            />
          </View>
          <View style={styles.subProgressContainer}>
            <CircularProgressDisplay
              value={distanceData.value}
              unit={distanceData.unit}
              iconName={distanceData.iconName}
              percentage={distanceData.percentage}
              size="small"
              color={distanceData.color}
            />
            <CircularProgressDisplay
              value={caloriesData.value}
              unit={caloriesData.unit}
              iconName={caloriesData.iconName}
              percentage={caloriesData.percentage}
              size="small"
              color={caloriesData.color}
            />
          </View>
        </FormCard>

        <FormCard onPress={() => (router.push('/hydratation'))} style={styles.hydrationCard}>
          <View style={styles.hydrationTextContent}>
            <Text style={styles.hydrationTitle}>Hidratação</Text>
            <Text style={styles.hydrationValue}>{hydrationData.value} ml</Text>
            <Text style={styles.hydrationSubtitle}>Hoje</Text>
          </View>
          <CircularProgressDisplay
            value="" // Valor numérico pode ser omitido aqui se só o ícone for o foco
            iconName={hydrationData.iconName}
            percentage={hydrationData.percentage}
            size="small"
            color={hydrationData.color}
          />
        </FormCard>

        <WeeklyProgressCard
          onPress={() => router.push('/activity')}
          title={exerciseProgress.title}
          completedDays={exerciseProgress.completedDays}
          totalDays={exerciseProgress.totalDays}
          weeklyProgress={exerciseProgress.weeklyProgress}
        />
        <WeeklyProgressCard
          title={mindfulnessProgress.title}
          completedDays={mindfulnessProgress.completedDays}
          totalDays={mindfulnessProgress.totalDays}
          weeklyProgress={mindfulnessProgress.weeklyProgress}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    paddingBottom: 20, // Espaçamento para o BottomNavBar
  },
  mainCard: {
    marginHorizontal: 20,
    marginBottom: 15,
    paddingVertical: 25,
  },
  mainProgressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  subProgressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  hydrationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  hydrationTextContent: {
    flex: 1,
  },
  hydrationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E',
  },
  hydrationValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 5,
  },
  hydrationSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 5,
  },
});