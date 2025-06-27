// components/ScreenHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MintroLogo from './MintroLogo'; // Reutilizando o logo

interface ScreenHeaderProps {
  onProfilePress?: () => void;
  onChatPress?: () => void;
}

export default function ScreenHeader({ onProfilePress, onChatPress }: ScreenHeaderProps): React.JSX.Element {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onProfilePress} style={styles.iconButton}>
        <View style={styles.profilePlaceholder}>
          <Text style={styles.profileText}>A</Text>
        </View>
      </TouchableOpacity>
      <MintroLogo/>
      <TouchableOpacity onPress={onChatPress} style={styles.iconButton}>
        <MaterialCommunityIcons name="chat-outline" size={24} color="#34495E" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ADDEA1', // Verde do cabeçalho
    width: '100%',
  },
  iconButton: {
    padding: 5,
  },
  profilePlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8BC34A', // Verde do perfil
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoOverride: {
    // Este estilo pode ser usado para ajustar o logo se necessário,
    // mas o MintrosLogo já tem margens próprias, então pode ser vazio aqui
  },
});