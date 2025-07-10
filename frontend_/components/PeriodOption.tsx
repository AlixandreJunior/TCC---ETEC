import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface PeriodOptionProps {
  label: string
  isSelected: boolean
  onPress: () => void
}

export const PeriodOption: React.FC<PeriodOptionProps> = ({ label, isSelected, onPress }) => (
  <TouchableOpacity style={styles.periodOption} onPress={onPress}>
    <View style={styles.radioButton}>{isSelected && <View style={styles.radioButtonSelected} />}</View>
    <Text style={styles.periodLabel}>{label}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
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
  bottomSpacing: {
    height: 100,
  },
})