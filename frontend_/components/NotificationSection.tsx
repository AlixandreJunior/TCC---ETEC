import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Alert, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface NotificationSectionProps{

}

const { width, height } = Dimensions.get('window');

interface NotificationItem {
  id: string;
  type: 'passos' | 'hidratacao' | 'consulta';
  title: string;
  description: string;
  time: string;
  read: boolean;
}
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
const NotificationSection: React.FC<NotificationSectionProps> = ({

}) => {
      const handleNotificationPress = (notificationId: string) => {
        Alert.alert('Notificação Clicada', `Você clicou na notificação ID: ${notificationId}`);
      };

      const renderNotificationItem = (notification: NotificationItem): React.JSX.Element => {
        let iconName: string;
        let iconColor: string;
        switch (notification.type) {
        case 'passos':
            iconName = 'run';
            iconColor = '#4CAF50';
            break;
        case 'hidratacao':
            iconName = 'cup';
            iconColor = '#2196F3';
            break;
        case 'consulta':
            iconName = 'calendar';
            iconColor = '#FF9800';
            break;
        default:
            iconName = 'information-outline';
            iconColor = '#757575';
        }

        return (
        <TouchableOpacity
            key={notification.id}
            style={styles.notificationCard}
            onPress={() => handleNotificationPress(notification.id)}
        >
            <View style={[styles.iconCircle, { backgroundColor: iconColor + '1A' }]}>
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

    return(
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {Object.keys(MOCK_NOTIFICATIONS).map((sectionTitle) => (
                <View key={sectionTitle} style={styles.notificationSection}>
                    <Text style={styles.sectionTitle}>{sectionTitle}</Text>
                    {MOCK_NOTIFICATIONS[sectionTitle].map(renderNotificationItem)}
                </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: height * 0.02,
  },
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
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: width * 0.05,
    marginBottom: height * 0.01,
    padding: width * 0.04,
    elevation: 1,
    shadowColor: '#000',
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
    flex: 1,
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
    backgroundColor: '#FF0000',
  },
})

export default NotificationSection