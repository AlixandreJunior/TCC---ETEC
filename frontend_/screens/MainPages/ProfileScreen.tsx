import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '@/components/Header'; // Certifique-se do caminho e da implementação deste Header

import { Goal } from '@/types/user/goal';
import { getGoals } from '@/services/goals/getGoals';

import { User } from '@/types/user/user';
import { getUser } from '@/services/user/getUser';

import StatCard from '@/components/StatCard';

// NOVO: Importar os nomes das fontes Poppins do pacote google-fonts
import { 
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import NotebookIcon from '@/components/Icons/NotebookIcon';
import MeditationIcon from '@/components/Icons/MeditationIcon';
import ExerciseIcon from '@/components/Icons/ExerciseIcon';
import WaterDropIcon from '@/components/WaterDropIcon';


const { width } = Dimensions.get('window');
const cardGap = 10;
const screenContentPaddingHorizontal = 20;

const threeColumnCardWidth = (width - (screenContentPaddingHorizontal * 2) - (cardGap * (3 - 1))) / 3;
const twoColumnCardWidth = (width - (screenContentPaddingHorizontal * 2) - (cardGap * (2 - 1))) / 2;


export default function ProfileScreen() {
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState<string | null>(null);

  const [userGoals, setUserGoals] = useState<Goal | null>(null);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const [errorGoals, setErrorGoals] = useState<string | null>(null);

  const handleEditProfile = () => {
    console.log('Editar perfil');
  };

  const handleShowAllAchievements = () => {
    console.log('Mostrar todas as conquistas');
  };

  // Os handlers de Header (onProfileHeaderPress, onChatHeaderPress)
  // devem ser passados como props para o componente Header, se ele os aceitar.
  // Vou removê-los daqui e assumir que o Header tem seus próprios comportamentos internos,
  // ou que eles serão passados para o Header se ele for mais customizável.
  // const handleProfileHeaderPress = () => console.log('Perfil pressionado (header)');
  // const handleChatHeaderPress = () => console.log('Chat pressionado');

  useEffect(() => {
    const fetchUserData = async () => {
      setLoadingUser(true);
      setErrorUser(null);
      try {
        const data = await getUser();
        setFetchedUser(data);
      } catch (err: any) {
        setErrorUser(err.message || 'Falha ao carregar dados do usuário.');
        console.error('Erro ao buscar usuário:', err);
      } finally {
        setLoadingUser(false);
      }
    };

    const fetchUserGoals = async () => {
      setLoadingGoals(true);
      setErrorGoals(null);
      try {
        const data = await getGoals();
        setUserGoals(data);
      } catch (err: any) {
        setErrorGoals(err.message || 'Falha ao carregar metas.');
        console.error('Erro ao buscar metas:', err);
      } finally {
        setLoadingGoals(false);
      }
    };

    fetchUserData();
    fetchUserGoals();
  }, []);

  const displayName = fetchedUser?.username || 'Carregando...';
  const joinYear = fetchedUser?.created_at ? new Date(fetchedUser.created_at).getFullYear() : 'N/A';
  const avatarChar = fetchedUser?.username ? fetchedUser.username.charAt(0).toUpperCase() : 'A';

  const statistics = fetchedUser ? [
    { icon: <NotebookIcon size={14}/>, value: fetchedUser.diarys_registers, label: 'Diários registrados' },
    { icon: <MeditationIcon size={18}/>, value: fetchedUser.mindfulness_registers, label: 'Sessões de Mindfulness' },
    { icon: <ExerciseIcon size={25} />, value: fetchedUser.exercises_registers, label: 'Exercícios físicos' },
  ] : [];

  const transformedGoals = userGoals ? [
    { icon: <WaterDropIcon size={13} color='#525252'/>, value: userGoals.hydration_goal, label: 'ml', unit: 'por dia' },
    { icon: <MeditationIcon size={18}/>, value: userGoals.exercise_goal, label: 'Minutos', unit: 'por dia' },
    { icon: <ExerciseIcon size={25}/>, value: userGoals.mindfulness_goal, label: 'Minutos', unit: 'por dia' },
  ] : [];

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
    {
      iconName: 'food-apple-outline' as const,
      iconBackgroundColor: '#34D399',
      title: 'Hábitos Saudáveis',
      description: '5 dias de alimentação saudável',
    },
    {
      iconName: 'medal-outline' as const,
      iconBackgroundColor: '#FBBF24',
      title: 'Atleta do Mês',
      description: '300 minutos de exercício',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* NOVO: Usando o componente Header importado para o cabeçalho */}
      {/* Assumimos que o componente Header.tsx já renderiza o 'A', 'Mintros' e o ícone de chat */}
      <Header avatarChar={avatarChar} /> 
      
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.formCardCommon}>
          <View style={styles.userInfo}>
            <View>
              <Text style={styles.userName}>{displayName}</Text>
              <Text style={styles.joinDate}>Entrou em {joinYear}</Text>
              <TouchableOpacity onPress={handleEditProfile}>
                <Text style={styles.editProfileLink}>Editar perfil</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{avatarChar}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
        </View>
        {loadingUser ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        ) : errorUser ? (
          <Text style={styles.errorText}>Erro ao carregar estatísticas: {errorUser}</Text>
        ) : statistics.length === 0 ? (
          <Text style={styles.noDataText}>Nenhuma estatística disponível.</Text>
        ) : (
          <View style={styles.metricCardGrid}>
            {statistics.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                cardWidth={threeColumnCardWidth}
              />
            ))}
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Minhas Metas</Text>
        </View>
        {loadingGoals ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        ) : errorGoals ? (
          <Text style={styles.errorText}>Erro ao carregar metas: {errorGoals}</Text>
        ) : transformedGoals.length === 0 ? (
          <Text style={styles.noDataText}>Nenhuma meta definida.</Text>
        ) : (
          <View style={styles.metricCardGrid}>
            {transformedGoals.map((goal, index) => (
              <StatCard
                key={index}
                icon={goal.icon}
                value={goal.value}
                label={goal.label}
                cardWidth={threeColumnCardWidth}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    marginTop: 10,
    paddingBottom: 20,
    paddingHorizontal: screenContentPaddingHorizontal,
    backgroundColor: '#fff'
  },

  formCardCommon: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth:1, 
    borderColor: '#F3F4F6',
    paddingVertical: 15,
    paddingHorizontal:20 ,
    width: '100%',
    maxWidth: 400,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 5,
  },

  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
    color: '#111827',
    marginBottom: 1,
  },
  joinDate: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#7F8C8D',
    marginBottom: 8,
  },
  editProfileLink: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#1FB6FF',
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 35,
    backgroundColor: '#79D457',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
    color: 'white',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#2C3E50',
    marginBottom: 5
  },
  showAllLink: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#1FB6FF',
  },

  metricCardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: cardGap,
  },
  statMetricCardCustom: {
    width: threeColumnCardWidth,
  },
  
  achievementCarouselContent: {
    gap: cardGap,
    alignItems: 'flex-start',
  },
  achievementItemCustom: {
    height: 80,
    maxWidth: 240,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  achievementItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIconBackground: {
    width: 36,
    height: 36,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#111827',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#4B5563',
  },
  loadingIndicator: {
    marginTop: 20,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    fontFamily: 'Poppins_400Regular',
  },
  noDataText: {
    color: 'gray',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    fontFamily: 'Poppins_400Regular',
  },
});