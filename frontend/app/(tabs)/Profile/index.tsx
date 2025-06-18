// app/index.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, TextStyle, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/styles/colors'; 
import Header from '@/components/Header';
import StatCard from '@/components/StatsCard';
import GoalCard from '@/components/GoalCard';
import AchievementCard from '@/components/AchievementCard';

const ProfilePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Seção de Informações do Usuário */}
        <View style={styles.userInfoSection}>
          <View style={styles.userInfoTextContainer}>
            <Text style={styles.userName}>Alixandre</Text>
            <Text style={styles.joinDate}>Entrou em 2024</Text>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Editar perfil</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.userAvatarLarge}>
            <Text style={styles.userAvatarLargeText}>A</Text>
          </View>
        </View>

        {/* Seção de Estatísticas */}
        <Text style={styles.sectionTitle}>Estatísticas</Text>
        <View style={styles.statisticsGrid}>
          <StatCard
            iconName="book-outline"
            number="36"
            description="Diários registrados"
            type="journal"
          />
          <StatCard
            iconName="headset-outline"
            number="18"
            description="Sessões de Mindfulness"
            type="mindfulness"
          />
          <StatCard
            iconName="barbell-outline"
            number="24"
            description="Exercícios físicos"
            type="exercise"
          />
        </View>

        {/* Seção Minhas Metas */}
        <Text style={styles.sectionTitle}>Minhas Metas</Text>
        <View style={styles.goalsGrid}>
          <GoalCard
            iconName="water-outline"
            number="2"
            description="Litros por dia"
            type="water"
          />
          <GoalCard
            iconName="calendar-outline"
            number="3"
            description="Dias na semana"
            type="day"
          />
          <GoalCard
            iconName="calendar-outline"
            number="5"
            description="Dias na semana"
            type="day"
          />
        </View>

        {/* Seção de Conquistas */}
        <View style={styles.achievementsHeader}>
          <Text style={styles.sectionTitle}>Conquistas</Text>
          <TouchableOpacity>
            <Text style={styles.textLink}>Mostrar todas</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.achievementGrid}>
          <AchievementCard
            iconName="trophy-outline"
            title="Diário Ativo"
            description="15 dias consecutivos escrevendo"
            type="journal"
          />
          <AchievementCard
            iconName="barbell-outline"
            title="Mente Equi"
            description="10 sessões mindfuine"
            type="mindfulness"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  userInfoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  userInfoTextContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkGrey,
  },
  joinDate: {
    fontSize: 14,
    color: colors.mediumGrey,
    marginTop: 5,
  },
  editProfileButton: {
    marginTop: 10,
  },
  editProfileText: {
    color: colors.textLink,
    fontSize: 16,
  },
  userAvatarLarge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  userAvatarLargeText: {
    color: colors.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: 15,
    marginTop: 20,
  },
  statisticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  achievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  achievementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  textLink: {
    color: colors.textLink,
    fontSize: 14,
  },
});

export default ProfilePage;