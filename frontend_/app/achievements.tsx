import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image, // Importe Image se for usar uma imagem real para o logo/avatar
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Para ícones
import Header from '@/components/Layout/Header';
import HeaderWithOptions from '@/components/Layout/HeaderWithOptions';

// Obtenha as dimensões da janela uma vez para usar em cálculos responsivos
const { width, height } = Dimensions.get('window');

// --- Tipagens (mantidas aqui para não precisar de arquivo separado) ---
interface Achievement {
  id: string;
  iconName: string; // Nome do ícone para MaterialCommunityIcons
  label: string;
  starsAchieved: number;
  totalStars: number;
  isUnlocked: boolean;
}

// --- Dados de Exemplo (mantidos aqui) ---
const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', iconName: 'leaf', label: 'Bem-vindo ao Mintrow', starsAchieved: 3, totalStars: 3, isUnlocked: true },
  { id: '2', iconName: 'medal', label: 'Lenda do Mintrow', starsAchieved: 1, totalStars: 3, isUnlocked: true },
  { id: '3', iconName: 'fire', label: 'Persistente', starsAchieved: 0, totalStars: 3, isUnlocked: false },
  { id: '4', iconName: 'dumbbell', label: 'Foco Total', starsAchieved: 0, totalStars: 3, isUnlocked: false },
  { id: '5', iconName: 'water', label: 'Gota a Gole', starsAchieved: 0, totalStars: 3, isUnlocked: false },
  { id: '6', iconName: 'shoe-sneaker', label: 'Passos de Consciência', starsAchieved: 0, totalStars: 3, isUnlocked: false },
  { id: '7', iconName: 'meditation', label: 'Zen Total', starsAchieved: 0, totalStars: 3, isUnlocked: false },
  { id: '8', iconName: 'book-open-page-variant', label: 'Narrador da própria história', starsAchieved: 0, totalStars: 3, isUnlocked: false },
  { id: '9', iconName: 'target', label: 'Objetivo Marcado', starsAchieved: 0, totalStars: 3, isUnlocked: false },
];

// --- Componente Principal (tudo em um só) ---
export default function App(): React.JSX.Element {
  const handleBackPress = () => {
    Alert.alert('Navegação', 'Botão de voltar pressionado!');
    // Aqui você implementaria a lógica de navegação, por exemplo:
    // navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#C8E6C9" />

      <Header avatarChar='A'/>

      <HeaderWithOptions title='Conquistas'/>

      {/* --- Grid de Conquistas --- */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.gridContainer}>
          {MOCK_ACHIEVEMENTS.map((achievement) => {
            const itemSize = width / 3.5; // Aproximadamente 3 itens por linha, com algum espaçamento
            return (
              <View key={achievement.id} style={[styles.itemContainer, { width: itemSize, height: itemSize * 1.2 }]}>
                <View style={[
                    styles.iconCircle,
                    !achievement.isUnlocked && styles.iconCircleLocked,
                    achievement.isUnlocked && styles.iconCircleUnlocked,
                ]}>
                  <MaterialCommunityIcons
                    name={achievement.iconName as any}
                    size={itemSize * 0.4}
                    color={achievement.isUnlocked ? '#4CAF50' : '#A0A0A0'}
                  />
                </View>
                <Text style={styles.labelText}>{achievement.label}</Text>
                <View style={styles.starsContainer}>
                  {[...Array(achievement.totalStars)].map((_, i) => (
                    <MaterialCommunityIcons
                      key={i}
                      name={i < achievement.starsAchieved ? 'star' : 'star-outline'}
                      size={itemSize * 0.12}
                      color={achievement.isUnlocked && i < achievement.starsAchieved ? '#FFD700' : '#A0A0A0'}
                      style={styles.starIcon}
                    />
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Estilos (tudo aqui também) ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollViewContent: {
    flexGrow: 1, // Garante que o ScrollView possa crescer e ocupar o espaço restante
    backgroundColor: '#FFF',
    paddingBottom: 20, // Espaçamento extra na parte inferior para o conteúdo
  },

  // Estilos do Cabeçalho Superior (Header)
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#C8E6C9', // Verde claro do topo
    paddingVertical: width * 0.03,
    paddingHorizontal: width * 0.05,
    height: width * 0.18, // Altura responsiva
  },
  avatarPlaceholder: {
    width: width * 0.09,
    height: width * 0.09,
    borderRadius: (width * 0.09) / 2,
    backgroundColor: '#A5D6A7', // Verde um pouco mais escuro para o avatar
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#fff',
  },
  mintrowTitle: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginLeft: -width * 0.1, // Ajusta o Mintrow para mais perto do centro
  },
  plantIcon: {
    marginLeft: 5,
  },
  chatIcon: {
    // Alinhado à direita pela `justifyContent: 'space-between'`
  },

  // Estilos do Cabeçalho da Seção (Conquistas)
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: width * 0.04,
    paddingHorizontal: width * 0.05,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: width * 0.04,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
  },

  // Estilos da Grade de Conquistas (AchievementsGrid)
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Centraliza os itens na grade
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  // Estilos de Cada Item de Conquista (AchievementItem)
  itemContainer: {
    alignItems: 'center',
    margin: width * 0.02, // Espaçamento responsivo entre os itens
  },
  iconCircle: {
    width: width * 0.22, // Tamanho do círculo do ícone responsivo
    height: width * 0.22,
    borderRadius: (width * 0.22) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 5,
  },
  iconCircleUnlocked: {
    borderColor: '#4CAF50', // Borda verde para desbloqueado
  },
  iconCircleLocked: {
    borderColor: '#A0A0A0', // Borda cinza para bloqueado
  },
  labelText: {
    fontSize: width * 0.032, // Tamanho da fonte do rótulo responsivo
    textAlign: 'center',
    color: '#333',
    minHeight: 32, // Garante que o texto tenha espaço suficiente, mesmo com 1 linha
    fontWeight: '500',
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 2,
  },
  starIcon: {
    marginHorizontal: 1, // Espaçamento pequeno entre estrelas
  },
});