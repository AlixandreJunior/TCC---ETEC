import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/styles/colors'; 

interface DateNavigatorProps {
  currentDate: string; // Ex: "Junho de 2025"
  onPrevious: () => void;
  onNext: () => void;
}

const DateNavigator: React.FC<DateNavigatorProps> = ({ currentDate, onPrevious, onNext }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrevious} style={styles.arrowButton}>
        <Ionicons name="chevron-back-outline" size={24} color={colors.white} />
      </TouchableOpacity>
      <Text style={styles.dateText}>{currentDate}</Text>
      <TouchableOpacity onPress={onNext} style={styles.arrowButton}>
        <Ionicons name="chevron-forward-outline" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primaryGreen,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  arrowButton: {
    padding: 5,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default DateNavigator;