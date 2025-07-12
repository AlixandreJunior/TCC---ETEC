import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Obtenha as dimensões da janela para cálculos responsivos
const { width, height } = Dimensions.get('window');

// --- Dados de Exemplo ---
const objectiveProgress = {
  current: 1,
  total: 3,
  description: 'para alcançar a meta',
  periodStart: '6 de jul.',
  periodEnd: '12 de jul.',
  daysRemaining: 4,
};

const streakData = {
  current: 1,
  longest: 2,
};

const successRate = {
  currentWeek: '33%',
  previousWeeks: '0%',
};

const conclusionData = {
  total: 1,
  thisMonth: 1,
};

// Funções auxiliares para o calendário (simplificadas para demonstração)
const getMonthDays = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days = [];
  // Dias da semana do mês anterior para preencher a primeira semana
  const firstDayOfWeek = date.getDay(); // 0 = Domingo, 1 = Segunda...
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = firstDayOfWeek; i > 0; i--) {
    days.unshift({ day: prevMonthLastDay - i + 1, type: 'prev' });
  }

  // Dias do mês atual
  const currentMonthLastDay = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= currentMonthLastDay; i++) {
    const isChecked = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(i); // Exemplo de dias checados
    const isCurrentDay = i === new Date().getDate() && month === new Date().getMonth();
    days.push({ day: i, type: 'current', isChecked, isCurrentDay });
  }

  // Dias da semana do próximo mês para preencher a última semana
  const remainingCells = 42 - days.length; // Um calendário típico tem 6x7 = 42 células
  for (let i = 1; i <= remainingCells; i++) {
    days.push({ day: i, type: 'next' });
  }
  return days;
};

// --- Componente Principal (Tudo em um só) ---
export default function App(): React.JSX.Element {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = getMonthDays(currentYear, currentMonth);
  const monthName = new Date(currentYear, currentMonth).toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

  const handleBackPress = () => {
    Alert.alert('Navegação', 'Botão de voltar pressionado!');
    // navigation.goBack();
  };

  const handleMenuPress = () => {
    Alert.alert('Menu', 'Menu de opções pressionado!');
  };

  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear(prevYear => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear(prevYear => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* --- Cabeçalho --- */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBackPress} style={styles.headerBackButton}>
          <MaterialCommunityIcons name="arrow-left" size={width * 0.07} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes de Objetivo</Text>
        <TouchableOpacity onPress={handleMenuPress} style={styles.headerMenuButton}>
          <MaterialCommunityIcons name="dots-vertical" size={width * 0.07} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* --- Card de Progresso do Objetivo --- */}
        <View style={styles.card}>
          <View style={styles.objectiveHeader}>
            <MaterialCommunityIcons name="check-circle-outline" size={width * 0.06} color="#4CAF50" />
            <View style={styles.objectiveTitleWrapper}>
              <MaterialCommunityIcons name="clipboard-text-outline" size={width * 0.05} color="#666" />
              <Text style={styles.objectiveDate}>Hoje, 3 de jul.</Text>
            </View>
          </View>
          <View style={styles.progressCirclesContainer}>
            <Text style={styles.currentProgressText}>{objectiveProgress.current}</Text>
            <Text style={styles.totalProgressText}> de {objectiveProgress.total}</Text>
            <View style={styles.progressIcons}>
              {[...Array(objectiveProgress.total)].map((_, index) => (
                <MaterialCommunityIcons
                  key={index}
                  name={index < objectiveProgress.current ? 'checkbox-marked-circle' : 'circle-outline'}
                  size={width * 0.045}
                  color={index < objectiveProgress.current ? '#4CAF50' : '#E0E0E0'}
                  style={styles.progressIcon}
                />
              ))}
            </View>
          </View>
          <Text style={styles.progressDescription}>{objectiveProgress.description}</Text>
          <View style={styles.objectiveFooter}>
            <Text style={styles.objectivePeriod}>{objectiveProgress.periodStart} - {objectiveProgress.periodEnd}</Text>
            <Text style={styles.objectiveDaysRemaining}>{objectiveProgress.daysRemaining} dias restantes</Text>
          </View>
        </View>

        {/* --- Seção de Sequência (Streaks) --- */}
        <Text style={styles.sectionTitle}>Sequência</Text>
        <View style={styles.streakContainer}>
          <View style={styles.streakCard}>
            <View style={styles.streakIconCircle}>
              <MaterialCommunityIcons name="fire" size={width * 0.08} color="#FF9800" />
            </View>
            <Text style={styles.streakNumber}>{streakData.current}</Text>
            <Text style={styles.streakLabel}>sequência atual</Text>
          </View>
          <View style={styles.streakCard}>
            <View style={styles.streakIconCircle}>
              <MaterialCommunityIcons name="water" size={width * 0.08} color="#2196F3" />
            </View>
            <Text style={styles.streakNumber}>{streakData.longest}</Text>
            <Text style={styles.streakLabel}>sequência mais longa</Text>
          </View>
        </View>

        {/* --- Calendário --- */}
        <View style={styles.card}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={goToPreviousMonth}>
              <MaterialCommunityIcons name="chevron-left" size={width * 0.07} color="#333" />
            </TouchableOpacity>
            <Text style={styles.calendarMonth}>{monthName}</Text>
            <TouchableOpacity onPress={goToNextMonth}>
              <MaterialCommunityIcons name="chevron-right" size={width * 0.07} color="#333" />
            </TouchableOpacity>
          </View>
          <View style={styles.weekDaysContainer}>
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
              <Text key={index} style={styles.weekDayText}>{day}</Text>
            ))}
          </View>
          <View style={styles.daysGrid}>
            {daysInMonth.map((dayObj, index) => (
              <View
                key={index}
                style={[
                  styles.calendarDayCell,
                  dayObj.type === 'prev' && styles.calendarDayCellInactive,
                  dayObj.type === 'next' && styles.calendarDayCellInactive,
                ]}
              >
                {dayObj.isChecked && dayObj.type === 'current' && (
                  <View style={styles.calendarCheckmarkOverlay}>
                    <MaterialCommunityIcons name="check" size={width * 0.05} color="#fff" />
                  </View>
                )}
                <Text style={[
                    styles.calendarDayText,
                    dayObj.type === 'current' && styles.calendarDayTextActive,
                    dayObj.isCurrentDay && styles.calendarCurrentDayText,
                ]}>
                  {dayObj.day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* --- Seção de Taxa de Sucesso --- */}
        <Text style={styles.sectionTitle}>Taxa de sucesso</Text>
        <View style={styles.successRateContainer}>
          <View style={styles.successRateCard}>
            <Text style={styles.successRatePercentage}>{successRate.currentWeek}</Text>
            <Text style={styles.successRateLabel}>Esta Semana</Text>
          </View>
          <View style={styles.successRateCard}>
            <Text style={styles.successRatePercentage}>{successRate.previousWeeks}</Text>
            <Text style={styles.successRateLabel}>Semanas anteriores</Text>
          </View>
        </View>

        {/* --- Seção de Conclusões --- */}
        <Text style={styles.sectionTitle}>Conclusões</Text>
        <View style={styles.conclusionsContainer}>
          <View style={styles.conclusionCard}>
            <Text style={styles.conclusionNumber}>{conclusionData.total}</Text>
            <Text style={styles.conclusionLabel}>Total de Conclusões</Text>
          </View>
          <View style={styles.conclusionCard}>
            <Text style={styles.conclusionNumber}>{conclusionData.thisMonth}</Text>
            <Text style={styles.conclusionLabel}>Mês Atual</Text>
          </View>
        </View>

        {/* --- Data de Início --- */}
        <View style={styles.startDateContainer}>
          <Text style={styles.startDateLabel}>Data de Início</Text>
          <Text style={styles.startDateValue}>08 de julho de 2025</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Fundo cinza claro
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: height * 0.02,
  },

  // --- Estilos do Cabeçalho ---
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.04,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerBackButton: {
    // Espaçamento para o ícone de volta
  },
  headerTitle: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#333',
    flex: 1, // Permite que o título ocupe o espaço central
    textAlign: 'center', // Centraliza o texto
    marginLeft: -width * 0.07, // Ajusta para compensar o botão de voltar
  },
  headerMenuButton: {
    // Alinhado à direita
  },

  // --- Estilos de Cards Gerais ---
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: width * 0.05,
    marginBottom: height * 0.02,
    padding: width * 0.04,
    elevation: 2, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  // --- Progresso do Objetivo ---
  objectiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.015,
  },
  objectiveTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: width * 0.02,
  },
  objectiveDate: {
    fontSize: width * 0.038,
    color: '#666',
    marginLeft: width * 0.01,
  },
  progressCirclesContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: height * 0.01,
  },
  currentProgressText: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#333',
  },
  totalProgressText: {
    fontSize: width * 0.05,
    color: '#666',
  },
  progressIcons: {
    flexDirection: 'row',
    marginLeft: width * 0.03,
  },
  progressIcon: {
    marginHorizontal: 2,
  },
  progressDescription: {
    fontSize: width * 0.04,
    color: '#666',
    marginBottom: height * 0.02,
  },
  objectiveFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: height * 0.01,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  objectivePeriod: {
    fontSize: width * 0.035,
    color: '#666',
  },
  objectiveDaysRemaining: {
    fontSize: width * 0.035,
    color: '#666',
  },

  // --- Título de Seção ---
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.015,
  },

  // --- Seção de Sequência (Streaks) ---
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: width * 0.05,
    marginBottom: height * 0.02,
  },
  streakCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: height * 0.02,
    width: width * 0.42, // Aproximadamente metade da largura da tela - espaçamento
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  streakIconCircle: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    backgroundColor: '#FFEBEE', // Cor de fundo suave para ícone
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  streakNumber: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#333',
  },
  streakLabel: {
    fontSize: width * 0.035,
    color: '#666',
    textAlign: 'center',
  },

  // --- Calendário ---
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  calendarMonth: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize', // Para deixar a primeira letra maiúscula do mês
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: height * 0.01,
  },
  weekDayText: {
    fontSize: width * 0.035,
    color: '#999',
    width: (width * 0.9 / 7) - 10, // Largura para cada dia da semana (aprox.)
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Centraliza as células
  },
  calendarDayCell: {
    width: (width * 0.9 / 7) - (width * 0.01), // Aproximadamente 1/7 da largura do card - margem
    height: (width * 0.9 / 7) - (width * 0.01),
    justifyContent: 'center',
    alignItems: 'center',
    margin: width * 0.005, // Pequena margem entre as células
    // borderWidth: 1, // Descomente para depurar o layout da célula
    // borderColor: 'red',
  },
  calendarDayCellInactive: {
    opacity: 0.4, // Dias do mês anterior/próximo ficam esmaecidos
  },
  calendarDayText: {
    fontSize: width * 0.04,
    color: '#666',
  },
  calendarDayTextActive: {
    fontWeight: 'bold',
    color: '#333',
  },
  calendarCheckmarkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#4CAF50', // Verde para o dia checado
    borderRadius: (width * 0.9 / 7) / 2, // Para ser um círculo
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarCurrentDayText: {
    color: '#fff', // Texto branco para o dia atual se estiver marcado
    backgroundColor: '#4CAF50', // Cor de fundo do dia atual (se não for marcado, pode ser só borda)
    borderRadius: (width * 0.9 / 7) / 2,
    width: '100%', // Preenche a célula
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  // --- Seção de Taxa de Sucesso ---
  successRateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: width * 0.05,
    marginBottom: height * 0.02,
  },
  successRateCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: height * 0.02,
    width: width * 0.42,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  successRatePercentage: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#4CAF50', // Verde para a porcentagem
  },
  successRateLabel: {
    fontSize: width * 0.035,
    color: '#666',
    textAlign: 'center',
  },

  // --- Seção de Conclusões ---
  conclusionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: width * 0.05,
    marginBottom: height * 0.03, // Mais espaço antes da data de início
  },
  conclusionCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: height * 0.02,
    width: width * 0.42,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  conclusionNumber: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#333',
  },
  conclusionLabel: {
    fontSize: width * 0.035,
    color: '#666',
    textAlign: 'center',
  },

  // --- Data de Início ---
  startDateContainer: {
    alignItems: 'center',
    paddingBottom: height * 0.05, // Espaçamento extra na parte inferior
  },
  startDateLabel: {
    fontSize: width * 0.035,
    color: '#999',
    marginBottom: 5,
  },
  startDateValue: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#333',
  },
});