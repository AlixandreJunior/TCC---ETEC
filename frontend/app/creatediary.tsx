import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Appbar, TextInput, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const GRID_ITEM_MARGIN = 8;
const GRID_ITEM_WIDTH_BASE = 80;

// Tipagem para os sentimentos
type SentimentType = 'Excelente' | 'Bem' | 'Neutro' | 'Mal' | 'Horrível';

interface SentimentOptionProps {
  label: SentimentType;
  isSelected: boolean;
  onPress: () => void;
}

const getSentimentIconName = (sentiment: SentimentType) => {
  switch (sentiment) {
    case 'Excelente':
      return 'emoticon-excited-outline';
    case 'Bem':
      return 'emoticon-happy-outline';
    case 'Neutro':
      return 'emoticon-neutral-outline';
    case 'Mal':
      return 'emoticon-sad-outline';
    case 'Horrível':
      return 'emoticon-angry-outline';
    default:
      return 'emoticon-neutral-outline';
  }
};

const SentimentOption: React.FC<SentimentOptionProps> = ({ label, isSelected, onPress }) => {
  const iconName = getSentimentIconName(label);
  const iconColor = isSelected ? 'white' : '#666';

  return (
    <TouchableOpacity
      style={[
        styles.sentimentOption,
        isSelected ? styles.sentimentOptionSelected : null,
      ]}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={iconName} size={40} color={iconColor} />
      <Text style={[styles.sentimentLabel, isSelected ? styles.sentimentLabelSelected : null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

interface ActivityGridItemProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const ActivityGridItem: React.FC<ActivityGridItemProps> = ({ label, isSelected, onPress }) => {
  const iconColor = isSelected ? 'white' : '#333';
  return (
    <TouchableOpacity
      style={[
        styles.activityGridItem,
        isSelected ? styles.activityGridItemSelected : null,
      ]}
      onPress={onPress}
    >
      <MaterialCommunityIcons name="book-open-outline" size={32} color={iconColor} />
      <Text style={[styles.activityLabel, isSelected ? styles.activityLabelSelected : null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

interface CreateDiaryScreenProps {}

const CreateDiaryScreen: React.FC<CreateDiaryScreenProps> = () => {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('Ontem, 18 de junho');
  const [time, setTime] = useState<string>('8:16');
  const [selectedSentiment, setSelectedSentiment] = useState<SentimentType | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('');

  const sentiments: SentimentType[] = ['Excelente', 'Bem', 'Neutro', 'Mal', 'Horrível'];
  const activities = [
    { id: 'ler', label: 'Ler' },
    { id: 'escrever', label: 'Escrever' },
    { id: 'meditar', label: 'Meditar' },
    { id: 'correr', label: 'Correr' },
    { id: 'caminhar', label: 'Caminhar' },
    { id: 'nadar', label: 'Nadar' },
    { id: 'estudar', label: 'Estudar' },
    { id: 'cozinhar', label: 'Cozinhar' },
    { id: 'dormir', label: 'Dormir' },
    { id: 'hidratar', label: 'Hidratar' },
    { id: 'exercitar', label: 'Exercitar' },
    { id: 'yoga', label: 'Yoga' },
    { id: 'alongar', label: 'Alongar' },
  ];

  const toggleActivity = (activityId: string) => {
    setSelectedActivities(prev =>
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const handleSave = () => {
    console.log('Novo Diário:', {
      title,
      date,
      time,
      selectedSentiment,
      selectedActivities,
      notes,
    });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => router.push('/(tabs)/mental')} />
        <Appbar.Content title="Novo Diário" titleStyle={styles.appbarTitle} />
        <Appbar.Action
          icon={() => <Text style={styles.mintrLogo}>Mintr💧</Text>}
          onPress={() => console.log('Mintr Logo Clicado')}
        />
        <Appbar.Action icon="check" color="green" onPress={handleSave} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputSection}>
          <TextInput
            mode="outlined"
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
            style={styles.textInput}
          />
        </View>

        <View>
          <TouchableOpacity style={styles.dateTimeButton} onPress={() => console.log('Abrir Date Picker')}>
            <MaterialCommunityIcons name="calendar-month-outline" size={24} color="#666" />
            <Text style={styles.dateTimeText}>{date}</Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateTimeButton} onPress={() => console.log('Abrir Time Picker')}>
            <MaterialCommunityIcons name="clock-outline" size={24} color="#666" />
            <Text style={styles.dateTimeText}>{time}</Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como você está se sentindo?</Text>
          <View style={styles.sentimentRow}>
            {sentiments.map((s) => (
              <SentimentOption
                key={s}
                label={s}
                isSelected={selectedSentiment === s}
                onPress={() => setSelectedSentiment(s)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>O que você tem feito?</Text>
          <View style={styles.activityGrid}>
            {activities.map((activity) => (
              <ActivityGridItem
                key={activity.id}
                label={activity.label}
                isSelected={selectedActivities.includes(activity.id)}
                onPress={() => toggleActivity(activity.id)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Objetivos</Text>
          <Card style={styles.objectiveCard} elevation={1}>
            <View style={styles.objectiveCardContent}>
              <MaterialCommunityIcons name="check-circle-outline" size={24} color="#8BC34A" />
              <Text style={styles.objectiveCardText}>Ler</Text>
              <Text style={styles.objectiveCardSubText}>Sequência de 2 dias</Text>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Anotação</Text>
          <TextInput
            mode="outlined"
            placeholder="Escreva suas anotações aqui..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            style={[styles.textInput, styles.notesInput]}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Foto</Text>
          <TouchableOpacity style={styles.photoContainer} onPress={() => console.log('Escolher Foto')}>
            <MaterialCommunityIcons name="image-outline" size={60} color="#BDC3C7" />
            <Text style={styles.photoChooseText}>Escolher Foto</Text>
            <Text style={styles.photoHintText}>Clique para adicionar uma foto</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  appbar: {
    backgroundColor: '#c8e6c9',
    justifyContent: 'space-between',
  },
  appbarTitle: {
    marginLeft: -10,
  },
  mintrLogo: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#388e3c',
    marginRight: -10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  inputSection: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  textInputOutline: {
    borderRadius: 8,
    borderColor: '#e0e0e0',
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dateTimeText: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 8,
  },
  sentimentRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  sentimentOption: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
  },
  sentimentOptionSelected: {
    backgroundColor: '#8BC34A',
  },
  sentimentLabel: {
    fontSize: 12,
    marginTop: 5,
    color: '#333',
  },
  sentimentLabelSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  activityGridItem: {
    width: GRID_ITEM_WIDTH_BASE,
    height: GRID_ITEM_WIDTH_BASE,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: GRID_ITEM_MARGIN,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activityGridItemSelected: {
    borderColor: '#8BC34A',
    backgroundColor: '#8BC34A',
  },
  activityLabel: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
  activityLabelSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  objectiveCard: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 15,
  },
  objectiveCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  objectiveCardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  objectiveCardSubText: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 5,
  },
  notesInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  photoContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  photoChooseText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8BC34A',
    marginTop: 10,
  },
  photoHintText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
});

export default CreateDiaryScreen;