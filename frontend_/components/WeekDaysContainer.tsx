import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { isSameDay } from "date-fns"

interface WeekDayDisplay {
  id: string
  letter: string
  date: Date
  exercised: boolean
}

interface Props {
  weekDaysDisplay: WeekDayDisplay[]
}

export const WeekDaysContainer: React.FC<Props> = ({ weekDaysDisplay }) => {
  return (
    <View style={styles.weekDaysContainer}>
      {weekDaysDisplay.map((day) => (
        <View key={day.id} style={styles.dayContainer}>
          <View
            style={[
              styles.dayIndicator,
              day.exercised && styles.dayIndicatorActive,
              isSameDay(day.date, new Date()) && styles.dayIndicatorToday,
            ]}
          >
            {day.exercised && <MaterialCommunityIcons name="check" size={18} color="white" />}
          </View>
          <Text style={styles.dayLabel}>{day.letter}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  weekDaysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  dayContainer: {
    alignItems: "center",
    gap: 8,
  },
  dayIndicator: {
    width: 34,
    height: 57,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  dayIndicatorActive: {
    backgroundColor: "#00FF2F",
  },
  dayIndicatorToday: {
    borderColor: "#333",
    borderWidth: 2,
  },
  dayLabel: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#666",
  },
})
