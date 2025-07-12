import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PeriodOption } from './PeriodOption';

interface PeriodsSectionProps {
  selectedPeriod: string | null;
  setSelectedPeriod: (period: string) => void;
}

export const PeriodsSection: React.FC<PeriodsSectionProps> = ({
  selectedPeriod,
  setSelectedPeriod,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Período</Text>
      <View style={styles.periodCard}>
        <PeriodOption
          label="1 Semana"
          isSelected={selectedPeriod === '1w'}
          onPress={() => setSelectedPeriod('1w')}
        />
        <View style={styles.periodSeparator} />
        <PeriodOption
          label="2 Semanas"
          isSelected={selectedPeriod === '2w'}
          onPress={() => setSelectedPeriod('2w')}
        />
        <View style={styles.periodSeparator} />
        <PeriodOption
          label="3 Semanas"
          isSelected={selectedPeriod === '3w'}
          onPress={() => setSelectedPeriod('3w')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#111827",
    marginBottom: 16,
  },
  periodCard: {
    backgroundColor: "white",
    borderRadius: 12,
    gap: 2,
    elevation: 2,
  },
  periodOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
  },
  periodLabel: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#000",
  },
  periodSeparator: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginHorizontal: -16,
  },
});