import React from 'react';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
// Certifique-se de que o caminho para 'colors' está correto no seu projeto
import { colors } from '../../styles/colors';
import { Brain, Heart, User } from 'lucide-react-native';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Oculta o cabeçalho padrão da tela
        tabBarActiveTintColor: colors.lightGreen, // Cor do ícone e label ativos
        tabBarInactiveTintColor: colors.lightGrey, // Cor do ícone e label inativos
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium', 
          fontSize: 12,
        },
        tabBarStyle: {
          height: 60 + (Platform.OS === 'ios' ? insets.bottom : 0), // Ajusta a altura para iOS safe areas
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 8, // Ajusta o padding para iOS safe areas
          backgroundColor: colors.white, // Fundo branco da barra
          borderTopColor: colors.mediumGrey, // Borda superior
          borderTopWidth: 1,
          elevation: 8, // Sombra para Android
          shadowColor: '0000', // Sombra para iOS (note que '0000' pode ser 'transparent' ou 'rgba(0,0,0,0)')
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
      }}
    >
      <Tabs.Screen
        name="mental" // Caminho do arquivo da tela Mental dentro da pasta "Mental"
        options={{
          title: 'Mental', // Título que aparece abaixo do ícone
          tabBarIcon: ({ color, size }) => <Brain size={size} color={color} />, // Ícone da aba Mental
        }}
      />
      <Tabs.Screen
        name="activity" // Caminho do arquivo da tela de Atividades (corresponde a Saúde na imagem)
        options={{
          title: 'Atividades', // Título para a aba "Atividades"
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />, // Ícone da aba Atividades
        }}
      />
      <Tabs.Screen
        name="profile" // Caminho do arquivo da tela de Perfil
        options={{
          title: 'Perfil', // Título para a aba "Perfil"
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />, // Ícone da aba Perfil
        }}
      />
    </Tabs>
  );
}