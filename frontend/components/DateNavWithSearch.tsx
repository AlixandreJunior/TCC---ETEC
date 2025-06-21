// components/DateNavWithSearch.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface DateNavWithSearchProps {
  currentPeriod: string; // Ex: "Junho 2025"
  onPrevPress: () => void;
  onNextPress: () => void;
  onSearchPress: () => void;
}

export default function DateNavWithSearch({
  currentPeriod,
  onPrevPress,
  onNextPress,
  onSearchPress,
}: DateNavWithSearchProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrevPress} style={styles.arrowButton}>
        <MaterialCommunityIcons name="chevron-left" size={28} color="#2C3E50" />
      </TouchableOpacity>
      <Text style={styles.periodText}>{currentPeriod}</Text>
      <TouchableOpacity onPress={onNextPress} style={styles.arrowButton}>
        <MaterialCommunityIcons name="chevron-right" size={28} color="#2C3E50" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSearchPress} style={styles.searchButton}>
        <MaterialCommunityIcons name="magnify" size={24} color="#2C3E50" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  periodText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1, // Permite que o texto ocupe espaço
    textAlign: 'center',
    marginHorizontal: 10,
  },
  arrowButton: {
    padding: 5,
  },
  searchButton: {
    padding: 5,
    marginLeft: 'auto', // Empurra para a direita
  },
});