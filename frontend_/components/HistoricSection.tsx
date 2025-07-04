import React from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import DiaryDayHistory from "./DiaryDayHistory";
import { Diary, MoodType } from "@/types/mental/diary";

interface TransformedActivity {
  name: string;
}

interface TransformedDiaryEntryData {
  time: string;
  mood: MoodType;
  iconSource: any;
  moodColor: string;
  activities: TransformedActivity[];
  title: string;
  content: string;
  photoUrl?: string;
}

interface AdaptedDiaryHistory {
  date: string;
  entries: TransformedDiaryEntryData[];
}

interface HistoricSectionProps{
    loadingDiaries: boolean
    errorDiaries: string | null
    adaptedDiaryEntries: AdaptedDiaryHistory[]
}

export const HistoricSection: React.FC<HistoricSectionProps> =({
    errorDiaries,
    loadingDiaries,
    adaptedDiaryEntries
}) => {
    return(
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Histórico</Text>
          {loadingDiaries ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : errorDiaries ? (
            <Text style={styles.errorText}>Erro ao carregar diários: {errorDiaries}</Text>
          ) : adaptedDiaryEntries.length === 0 ? (
            <Text style={styles.noDataText}>Nenhum diário encontrado para este mês.</Text>
          ) : (
            adaptedDiaryEntries.map((dayData, dayIndex) => (
              <DiaryDayHistory key={dayIndex} date={dayData.date} entries={dayData.entries} />
            ))
          )}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 8,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#111827',
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});