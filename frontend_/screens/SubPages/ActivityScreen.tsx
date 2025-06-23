import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Appbar, IconButton, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

// --- Interfaces para Props ---

interface DayIndicatorProps {
  dayLetter: string;
  exercised: boolean;
  onPress?: () => void;
}

// Componente reutilizável para o indicador de dia (D, S, T, Q, etc.)
const DayIndicator: React.FC<DayIndicatorProps> = ({ dayLetter, exercised, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.dayIndicatorContainer,
        exercised ? styles.dayIndicatorExercised : styles.dayIndicatorExercised,
      ]}
      onPress={onPress}
      disabled={!onPress} // Desabilita o toque se não houver onPress
    >
      {exercised && (
        <MaterialCommunityIcons name="check-circle" size={24} color="white" style={styles.checkIcon} />
      )}
      <Text style={[styles.dayIndicatorText, exercised && styles.dayIndicatorTextExercised]}>
        {dayLetter}
      </Text>
    </TouchableOpacity>
  );
};

// Interface para as props do Card de Atividade
interface ActivityCardProps {
  name: string;
  details: string; // Ex: "1km - 30min"
  durationText: string; // Ex: "30 min"
  onPress?: () => void;
}

// Componente para o Card de Atividade
const ActivityCard: React.FC<ActivityCardProps> = ({ name, details, durationText, onPress }) => {
  return (
    <Card style={styles.activityCard} elevation={1} onPress={onPress}>
      <View style={styles.activityCardContent}>
        <View>
          <Text style={styles.activityName}>{name}</Text>
          <Text style={styles.activityDetails}>{details}</Text>
        </View>
        <Text style={styles.activityDuration}>{durationText}</Text>
      </View>
    </Card>
  );
};


const ActivityScreen: React.FC = () => {
  // Exemplo de dados para os dias da semana (D, S, T, Q, Q, S, S)
  const weekDays = [
    { id: 'dom', letter: 'D', exercised: true },
    { id: 'seg', letter: 'S', exercised: false },
    { id: 'ter', letter: 'T', exercised: false },
    { id: 'qua', letter: 'Q', exercised: false },
    { id: 'qui', letter: 'Q', exercised: false },
    { id: 'sex', letter: 'S', exercised: false },
    { id: 'sab', letter: 'S', exercised: false },
  ];

  // Aqui você gerencia o estado da semana atual, atividades, etc.
  // Por simplicidade, usaremos dados mockados.

  return (
    <View style={styles.container}>
      {/* Barra Superior (Appbar) */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => router.push('/(tabs)/activity')} />
        <Appbar.Content title="Atividade" titleStyle={styles.appbarTitle} />
        {/* Usando a prop 'icon' do Appbar.Action como uma função de renderização para o logo Mintr */}
        <Appbar.Action
          icon={() => <Text style={styles.mintrLogo}>Mintr💧</Text>}
          onPress={() => console.log('Mintr Logo Clicado')}
        />
        <Appbar.Action icon="dots-vertical" onPress={() => console.log('Mais opções')} />
      </Appbar.Header>

      {/* Seção de Navegação Semanal e Resumo */}
      <View style={styles.weeklySummarySection}>
        <View style={styles.weekNavigation}>
          <IconButton icon="chevron-left" onPress={() => console.log('Semana Anterior')} />
          <Text style={styles.weekHeaderText}>Esta Semana</Text>
          <IconButton icon="chevron-right" onPress={() => console.log('Próxima Semana')} />
        </View>
        <View style={styles.summaryNumbers}>
          <Text style={styles.completedDays}>1 de 5</Text>
          <Text style={styles.summaryText}> dias com exercícios</Text>
        </View>
        <Text style={styles.exercisedTotal}>Você se exercitou um total de 1 vez</Text>

        {/* Indicadores de Dias da Semana */}
        <View style={styles.dayIndicatorsRow}>
          {weekDays.map(day => (
            <DayIndicator
              key={day.id}
              dayLetter={day.letter}
              exercised={day.exercised}
              onPress={() => console.log(`Dia ${day.letter} clicado`)}
            />
          ))}
        </View>
      </View>

      {/* Seção de Histórico */}
      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>Histórico</Text>
        <Text style={styles.historyDate}>Hoje, 11 de Junho</Text>
        <ActivityCard
          name="Corrida"
          details="1km - 30min"
          durationText="30 min"
          onPress={() => console.log('Corrida clicada')}
        />
        {/* Você pode adicionar mais ActivityCards aqui para mais itens do histórico */}
      </View>

      {/* Botão Flutuante de Adicionar */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/registeractivity')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Fundo cinza claro
  },
  appbar: {
    backgroundColor: '#c8e6c9', // Verde claro
    justifyContent: 'space-between',
  },
  appbarTitle: {
    marginLeft: -10, // Ajuste para o título ficar mais perto do botão de voltar
  },
  mintrLogo: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#388e3c', // Cor do texto Mintr
    marginRight: -10, // Ajuste para centralizar visualmente ou mover para a direita
  },
  weeklySummarySection: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: 'white',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  weekNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  weekHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  summaryNumbers: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  completedDays: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e7d32', // Verde escuro
  },
  summaryText: {
    fontSize: 16,
    color: 'gray',
  },
  exercisedTotal: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 15,
  },
  dayIndicatorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  dayIndicatorContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0', // Cor padrão cinza
  },
  dayIndicatorExercised: {
    backgroundColor: '#81c784', // Verde para dias com exercício
  },
  checkIcon: {
    position: 'absolute',
    top: -5, // Ajuste a posição do check
    right: -5,
    zIndex: 1, // Garante que o ícone fique acima
  },
  dayIndicatorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dayIndicatorTextExercised: {
    color: 'white', // Texto branco para dias com exercício
  },
  historySection: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  activityCard: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 15,
  },
  activityCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  activityDetails: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  activityDuration: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32', // Verde para a duração
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#81c784', // Verde do botão '+'
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    lineHeight: 30,
  },
});

export default ActivityScreen;