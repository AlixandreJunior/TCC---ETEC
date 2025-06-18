// src/components/Header.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/styles/colors'; 

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.avatar}>
        <Text style={styles.avatarText}>A</Text>
      </TouchableOpacity>
      <Text style={styles.logo}>Mintro</Text>
      <TouchableOpacity style={styles.icon}>
        <Ionicons name="chatbubble-outline" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, // Ajuste para a barra de status
    paddingBottom: 15,
    backgroundColor: colors.primaryGreen,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
   logo: {
    fontSize: 24,
    fontWeight: 'bold', 
    color: colors.white,
    fontFamily: 'Poppins_700Bold', 
  },
  avatarText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins_600SemiBold', 
  },
  icon: {
    padding: 5,
  },
});

export default Header;