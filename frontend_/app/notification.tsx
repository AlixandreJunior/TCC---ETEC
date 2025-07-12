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
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Para ícones

// Obtenha as dimensões da janela para cálculos responsivos
const { width, height } = Dimensions.get('window');

// --- Tipagem para uma Notificação ---
interface NotificationItem {
  id: string;
  type: 'passos' | 'hidratacao' | 'consulta'; // Tipo para definir o ícone e cor
  title: string;
  description: string;
  time: string; // Ex: "há 4h", "22:30"
  read: boolean; // Indica se a notificação foi lida (para o ponto vermelho)
}

// --- Dados de Exemplo para as Notificações ---
const MOCK_NOTIFICATIONS: { [key: string]: NotificationItem[] } = {
  Hoje: [
    {
      id: '1',
      type: 'passos',
      title: 'Meta de Passos',
      description: 'Parabéns! Você completou sua meta diária de 8.000 passos',
      time: 'há 4h',
      read: false,
    },
    {
      id: '2',
      type: 'hidratacao',
      title: 'Hidratação',
      description: 'Lembre-se de beber água! Você bebeu 1.2L hoje',
      time: 'há 6h',
      read: false,
    },
  ],
  Ontem: [
    {
      id: '3',
      type: 'passos',
      title: 'Meta de Passos',
      description: 'Parabéns! Você completou sua meta diária de 8.000 passos',
      time: '22:30',
      read: true,
    },
    {
      id: '4',
      type: 'consulta',
      title: 'Consulta Agendada',
      description: 'Consulta com Dr. Silva agendada para amanhã às 15:00',
      time: '14:00',
      read: true,
    },
  ],
};

// --- Componente Principal (Tudo em um só) ---
export default function App(): React.JSX.Element {
  const handleBackPress = () => {
    Alert.alert('Navegação', 'Botão de voltar pressionado!');
    // Em um aplicativo real, você usaria algo como navigation.goBack();
  };

  const handleNotificationPress = (notificationId: string) => {
    Alert.alert('Notificação Clicada', `Você clicou na notificação ID: ${notificationId}`);
    // Aqui você pode adicionar lógica para marcar como lida, navegar para detalhes, etc.
  };

  // Função auxiliar para renderizar um item de notificação
  const renderNotificationItem = (notification: NotificationItem): React.JSX.Element => {
    let iconName: string;
    let iconColor: string;
    switch (notification.type) {
      case 'passos':
        iconName = 'run';
        iconColor = '#4CAF50'; // Verde
        break;
      case 'hidratacao':
        iconName = 'cup';
        iconColor = '#2196F3'; // Azul
        break;
      case 'consulta':
        iconName = 'calendar';
        iconColor = '#FF9800'; // Laranja
        break;
      default:
        iconName = 'information-outline';
        iconColor = '#757575'; // Cinza padrão
    }

    return (
      <TouchableOpacity
        key={notification.id}
        style={styles.notificationCard}
        onPress={() => handleNotificationPress(notification.id)}
      >
        <View style={[styles.iconCircle, { backgroundColor: iconColor + '1A' }]}> {/* Cor com 10% de opacidade */}
          <MaterialCommunityIcons name={iconName as any} size={width * 0.06} color={iconColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationDescription}>{notification.description}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.notificationTime}>{notification.time}</Text>
          {!notification.read && <View style={styles.unreadIndicator} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* --- Cabeçalho --- */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBackPress} style={styles.headerBackButton}>
          <MaterialCommunityIcons name="arrow-left" size={width * 0.07} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
        {/* Placeholder para o ícone de três pontos, se houver */}
        <View style={{ width: width * 0.07, height: width * 0.07 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* --- Seções de Notificações (Hoje, Ontem) --- */}
        {Object.keys(MOCK_NOTIFICATIONS).map((sectionTitle) => (
          <View key={sectionTitle} style={styles.notificationSection}>
            <Text style={styles.sectionTitle}>{sectionTitle}</Text>
            {MOCK_NOTIFICATIONS[sectionTitle].map(renderNotificationItem)}
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

  // --- Estilos da Seção de Notificações (Hoje/Ontem) ---
  notificationSection: {
    marginBottom: height * 0.02,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.015,
  },

  // --- Estilos do Cartão de Notificação ---
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: width * 0.05,
    marginBottom: height * 0.01,
    padding: width * 0.04,
    elevation: 1, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconCircle: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: (width * 0.12) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.04,
  },
  textContainer: {
    flex: 1, // Ocupa o máximo de espaço possível
    marginRight: width * 0.02,
  },
  notificationTitle: {
    fontSize: width * 0.042,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  notificationDescription: {
    fontSize: width * 0.035,
    color: '#666',
    lineHeight: width * 0.045,
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  notificationTime: {
    fontSize: width * 0.03,
    color: '#999',
    marginBottom: 4,
  },
  unreadIndicator: {
    width: width * 0.02,
    height: width * 0.02,
    borderRadius: (width * 0.02) / 2,
    backgroundColor: '#FF0000', // Ponto vermelho
  },
});