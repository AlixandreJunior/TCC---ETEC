import React from 'react';
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

// --- Tipagens ---
type Mood = 'Excelente' | 'Bem' | 'Neutro' | 'Mal' | 'Horrível';

interface RecordItem {
  id: string;
  date: string;
  mood: Mood;
  moodIcon: string;
  moodColor: string;
  activityIcon: string;
  activityLabel: string;
  group: string;
  notes: string;
  time: string;
  isFavorite?: boolean; // Para o círculo verde no dash
}

interface MonthlyRecords {
  month: string;
  records: RecordItem[];
}

// --- Dados de Exemplo ---
const RECORDS_DATA: MonthlyRecords[] = [
  {
    month: 'Junho',
    records: [
      {
        id: 'jun-11',
        date: 'Hoje, 11 de Junho',
        mood: 'Excelente',
        moodIcon: 'robot-happy-outline',
        moodColor: '#4CAF50', // Verde
        activityIcon: 'book-open-page-variant',
        activityLabel: 'Ler',
        group: 'Jambra\'s Group',
        notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        time: '8:15',
        isFavorite: true,
      },
      {
        id: 'jun-10',
        date: 'Ontem, 10 de Junho',
        mood: 'Neutro',
        moodIcon: 'robot-off-outline',
        moodColor: '#FFEB3B', // Amarelo
        activityIcon: 'book-open-page-variant',
        activityLabel: 'Ler',
        group: 'Jambra\'s Group',
        notes: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        time: '9:15',
        isFavorite: false,
      },
    ],
  },
  {
    month: 'Maio',
    records: [
      {
        id: 'mai-10',
        date: 'Ontem, 10 de Maio',
        mood: 'Excelente',
        moodIcon: 'robot-happy-outline',
        moodColor: '#4CAF50', // Verde
        activityIcon: 'dumbbell',
        activityLabel: 'Exercício',
        group: 'Jambra\'s Group',
        notes: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        time: '7:15',
        isFavorite: true,
      },
      {
        id: 'mai-09',
        date: '09 de Maio', // Exemplo de data sem "Ontem"
        mood: 'Mal',
        moodIcon: 'robot-dead',
        moodColor: '#F44336', // Vermelho
        activityIcon: 'food-apple',
        activityLabel: 'Alimentação',
        group: 'Jambra\'s Group',
        notes: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        time: '12:00',
        isFavorite: false,
      },
    ],
  },
];

// --- Componente Principal (Tudo em um só) ---
export default function App(): React.JSX.Element {
  const handleBackPress = () => {
    Alert.alert('Navegação', 'Botão de voltar pressionado!');
    // navigation.goBack();
  };

  const handleMenuPress = () => {
    Alert.alert('Menu', 'Menu de opções pressionado!');
    // Lógica para abrir menu/opções
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* --- Cabeçalho --- */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBackPress} style={styles.headerButton}>
          <MaterialCommunityIcons name="arrow-left" size={width * 0.07} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registros Favoritos</Text>
        <TouchableOpacity onPress={handleMenuPress} style={styles.headerButton}>
          <MaterialCommunityIcons name="menu" size={width * 0.07} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {RECORDS_DATA.map((monthlyData, monthIndex) => (
          <View key={monthlyData.month} style={styles.monthSection}>
            {/* Linha vertical e círculo cinza para o mês */}
            <View style={styles.monthTimeline}>
              <View style={styles.monthCircle} />
              <View style={styles.monthLine} />
            </View>
            <View style={styles.monthContent}>
              <Text style={styles.monthTitle}>{monthlyData.month}</Text>
              {monthlyData.records.map((record, recordIndex) => (
                <View key={record.id} style={styles.recordEntry}>
                  {/* Indicador na linha do tempo */}
                  <View style={styles.recordTimelineIndicator}>
                    <View style={[
                      styles.recordDot,
                      record.isFavorite ? styles.recordDotFavorite : styles.recordDotNormal,
                    ]} />
                    {/* Linha tracejada entre os registros do mesmo mês */}
                    {recordIndex < monthlyData.records.length - 1 && (
                      <View style={styles.recordLine} />
                    )}
                  </View>

                  {/* Card do Registro */}
                  <View style={styles.recordCard}>
                    <Text style={styles.recordTime}>{record.time}</Text>
                    <View style={styles.recordCardHeader}>
                      <MaterialCommunityIcons
                        name={record.moodIcon as any}
                        size={width * 0.12}
                        color="#E0E0E0" // Cor do ícone robô
                        style={styles.moodRobotIcon}
                      />
                      <View style={styles.moodTextContainer}>
                        <Text style={[styles.moodText, { color: record.moodColor }]}>
                          {record.mood}
                        </Text>
                        <View style={styles.activityInfo}>
                          <MaterialCommunityIcons
                            name={record.activityIcon as any}
                            size={width * 0.04}
                            color="#999" // Cor do ícone de atividade
                          />
                          <Text style={styles.activityLabel}>{record.activityLabel}</Text>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.groupText}>{record.group}</Text>
                    <Text style={styles.notesText}>{record.notes}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
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
  headerButton: {
    padding: width * 0.01,
  },
  headerTitle: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },

  // --- Seção do Mês (Junho, Maio, etc.) ---
  monthSection: {
    flexDirection: 'row',
    marginBottom: height * 0.03,
    paddingLeft: width * 0.05, // Espaçamento para a linha do tempo
  },
  monthTimeline: {
    alignItems: 'center',
    marginRight: width * 0.04,
  },
  monthCircle: {
    width: width * 0.04,
    height: width * 0.04,
    borderRadius: (width * 0.04) / 2,
    backgroundColor: '#D3D3D3', // Cinza claro
    marginBottom: 5,
  },
  monthLine: {
    flex: 1,
    width: 2, // Espessura da linha
    backgroundColor: '#D3D3D3', // Cinza claro
    borderStyle: 'dashed',
    borderRadius: 1, // Para a linha tracejada
    borderColor: '#D3D3D3',
    borderWidth: 1,
  },
  monthContent: {
    flex: 1,
  },
  monthTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.015,
  },

  // --- Entrada de Registro (Card) ---
  recordEntry: {
    flexDirection: 'row',
    marginBottom: height * 0.025,
  },
  recordTimelineIndicator: {
    alignItems: 'center',
    marginRight: width * 0.04,
    width: width * 0.04, // Garante que a linha do tempo se alinhe com o círculo do mês
  },
  recordDot: {
    width: width * 0.03,
    height: width * 0.03,
    borderRadius: (width * 0.03) / 2,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    backgroundColor: '#fff',
    zIndex: 1, // Garante que o ponto fique acima da linha
  },
  recordDotFavorite: {
    backgroundColor: '#4CAF50', // Verde para favorito
    borderColor: '#4CAF50',
  },
  recordDotNormal: {
    backgroundColor: '#D3D3D3', // Cinza para normal
    borderColor: '#D3D3D3',
  },
  recordLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#D3D3D3',
    borderStyle: 'dashed',
    borderRadius: 1,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    position: 'absolute', // Posiciona a linha atrás do ponto
    top: width * 0.03 / 2, // Começa no centro do ponto
    bottom: -height * 0.025 / 2, // Extende até o próximo item
  },

  recordCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: width * 0.04,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    position: 'relative', // Para o timestamp
  },
  recordTime: {
    position: 'absolute',
    top: height * 0.015,
    right: width * 0.04,
    fontSize: width * 0.035,
    color: '#999',
  },
  recordCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  moodRobotIcon: {
    marginRight: width * 0.03,
  },
  moodTextContainer: {
    flex: 1,
  },
  moodText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  activityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityLabel: {
    fontSize: width * 0.035,
    color: '#666',
    marginLeft: 5,
  },
  groupText: {
    fontSize: width * 0.035,
    color: '#333',
    marginBottom: height * 0.01,
  },
  notesText: {
    fontSize: width * 0.035,
    color: '#666',
    lineHeight: width * 0.05, // Espaçamento entre linhas
  },
});