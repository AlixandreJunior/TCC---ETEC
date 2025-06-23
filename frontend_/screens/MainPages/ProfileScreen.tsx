import { StyleSheet, View, Text, SafeAreaView, ScrollView, Dimensions, TouchableOpacity,} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '@/components/Header';

const { width } = Dimensions.get('window');
const cardHorizontalMargin = 1.5;

const threeColumnCardWidth = (width - 40 - (2 * (width * cardHorizontalMargin / 100))) / 3;
const twoColumnCardWidth = (width - 40 - (2 * (width * 1 / 100))) / 2;

export default function ProfileScreen() {
  const handleEditProfile = () => {
    console.log('Editar perfil');
  };

  const handleShowAllAchievements = () => {
    console.log('Mostrar todas as conquistas');
  };

  const handleProfileHeaderPress = () => console.log('Perfil pressionado (header)');
  const handleChatHeaderPress = () => console.log('Chat pressionado');

  const user = {
    name: 'Alixandre',
    joinYear: 2024,
    avatarChar: 'A',
  };

  const statistics = [
    { iconName: 'notebook-outline' as const, value: 36, label: 'Diários registrados' },
    { iconName: 'meditation' as const, value: 18, label: 'Sessões de Mindfulness' },
    { iconName: 'run' as const, value: 24, label: 'Exercícios físicos' },
  ];

  const goals = [
    { iconName: 'water' as const, value: 2, label: 'Litros', unit: 'por dia' },
    { iconName: 'calendar-sync-outline' as const, value: 3, label: 'Dias', unit: 'na semana' },
    { iconName: 'calendar-check-outline' as const, value: 5, label: 'Dias', unit: 'na semana' },
  ];

  const achievements = [
    {
      iconName: 'trophy-variant-outline' as const,
      iconBackgroundColor: '#8BC34A',
      title: 'Diário Ativo',
      description: '15 dias consecutivos escrevendo',
    },
    {
      iconName: 'zodiac-aquarius' as const,
      iconBackgroundColor: '#9B59B6',
      title: 'Mente Equilibrada',
      description: '10 sessões mindfulness',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        avatarChar='A'
      />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.formCardCommon}>
          <View style={styles.userInfo}>
            <View>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.joinDate}>Entrou em {user.joinYear}</Text>
              <TouchableOpacity onPress={handleEditProfile}>
                <Text style={styles.editProfileLink}>Editar perfil</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{user.avatarChar}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
        </View>
        <View style={styles.metricCardGrid}>
          {statistics.map((stat, index) => (
            <View style={[styles.formCardCommon, styles.statMetricCardCustom]}>
              <View style={styles.statMetricCardContent}>
                <MaterialCommunityIcons name={stat.iconName} size={28} color="#7F8C8D" style={styles.statMetricCardIcon} />
                <Text style={styles.statMetricCardValueText}>{stat.value}</Text>
                <Text style={styles.statMetricCardLabelText}>{stat.label}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Minhas Metas</Text>
        </View>
        <View style={styles.metricCardGrid}>
          {goals.map((goal, index) => (
            <View style={[styles.formCardCommon, styles.statMetricCardCustom]}>
              <View style={styles.statMetricCardContent}>
                <MaterialCommunityIcons
                  name={goal.iconName}
                  size={28}
                  color={index === 0 ? '#3498DB' : '#7F8C8D'}
                  style={styles.statMetricCardIcon}
                />
                <Text style={styles.statMetricCardValueText}>{goal.value}</Text>
                <Text style={styles.statMetricCardLabelText}>{goal.label}</Text>
                {goal.unit && <Text style={styles.statMetricCardUnitText}>{goal.unit}</Text>}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Conquistas</Text>
          <TouchableOpacity onPress={handleShowAllAchievements}>
            <Text style={styles.showAllLink}>Mostrar todas</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.achievementGrid}>
          {achievements.map((achievement, index) => (
            <View style={[styles.formCardCommon, styles.achievementItemCustom]}>
              <View style={styles.achievementItemContent}>
                <View style={[styles.achievementIconBackground, { backgroundColor: achievement.iconBackgroundColor }]}>
                  <MaterialCommunityIcons name={achievement.iconName} size={28} color="white" />
                </View>
                <View style={styles.achievementTextContainer}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
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
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ADDEA1',
    width: '100%',
  },
  iconButton: {
    padding: 5,
  },
  profilePlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8BC34A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#34495E',
    marginRight: 4,
  },
  plantIconPlaceholder: {
    width: 20,
    height: 20,
    backgroundColor: '#8BC34A',
    borderRadius: 10,
  },

  formCardCommon: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 20,
    marginBottom: 20,
  },

  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  editProfileLink: {
    fontSize: 14,
    color: '#3498DB',
    fontWeight: '600',
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ADDEA1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  showAllLink: {
    fontSize: 14,
    color: '#3498DB',
    fontWeight: '600',
  },

  metricCardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 20 - (width * (cardHorizontalMargin / 100)),
  },
  statMetricCardCustom: {
    width: threeColumnCardWidth,
    marginHorizontal: width * (cardHorizontalMargin / 100),
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statMetricCardContent: {
    alignItems: 'center',
  },
  statMetricCardIcon: {
    marginBottom: 8,
  },
  statMetricCardValueText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  statMetricCardLabelText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#7F8C8D',
  },
  statMetricCardUnitText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#7F8C8D',
    marginTop: 2,
  },

  achievementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 20 - (width * (1 / 100)),
  },
  achievementItemCustom: {
    width: twoColumnCardWidth,
    marginHorizontal: width * (1 / 100),
    padding: 15,
    marginBottom: 15,
  },
  achievementItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIconBackground: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementTextContainer: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 12,
    color: '#7F8C8D',
  },
});