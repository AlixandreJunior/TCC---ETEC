import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, Platform, Alert } from 'react-native';
import { Appbar, TextInput, Card } from 'react-native-paper'; // Card ainda é usado para ActivityGridItem
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { getActivities } from '@/services/diary/listActivities';
import { getActivityIconName } from '@/utils/activityIconMapper';
import { Activity, MoodType } from '@/types/mental/diary';

import DateTimePicker from '@react-native-community/datetimepicker';
import { ViewStyle } from 'react-native/types';

import NotesInput from '@/components/NotesInput'; // Caminho corrigido
import PhotoPicker from '@/components/PhotoPicker'; // Caminho corrigido

import { Objective } from '@/types/mental/objectives';
import { getObjectiveList } from '@/services/objectives/listObjectives'; // Caminho corrigido: 'objects' para 'objectives'
import FormHeader from '@/components/FormHeader'; // Importe o FormHeader
import ObjectiveDisplayCard from '@/components/ObjectiveCard';
import Header from '@/components/Header';
import { createDiary } from '@/services/diary/createDiary';

const { width } = Dimensions.get('window');
const GRID_ITEM_MARGIN = 8;
const GRID_ITEM_WIDTH_BASE = 80;

interface SentimentOptionProps {
  label: MoodType;
  isSelected: boolean;
  onPress: () => void;
}

const getSentimentIconName = (sentiment: MoodType) => {
  switch (sentiment) {
    case 'Excelente': return 'emoticon-excited-outline';
    case 'Bom': return 'emoticon-happy-outline';
    case 'Neutro': return 'emoticon-neutral-outline';
    case 'Ruim': return 'emoticon-sad-outline';
    case 'Péssimo': return 'emoticon-angry-outline';
    default: return 'emoticon-neutral-outline';
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
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  isSelected: boolean;
  onPress: () => void;
}

const ActivityGridItem: React.FC<ActivityGridItemProps> = ({ label, iconName, isSelected, onPress }) => {
  const iconColor = isSelected ? 'white' : '#333';
  return (
    <TouchableOpacity
      style={[
        styles.activityGridItem,
        isSelected ? styles.activityGridItemSelected : null,
      ]}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={iconName} size={32} color={iconColor} />
      <Text style={[styles.activityLabel, isSelected ? styles.activityLabelSelected : null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

interface CreateDiaryScreenProps { }

const CreateDiaryScreen: React.FC<CreateDiaryScreenProps> = () => {
  const [title, setTitle] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [selectedSentiment, setSelectedSentiment] = useState<MoodType>('Neutro');
  const [selectedActivitiesIds, setSelectedActivitiesIds] = useState<number[]>([]); // Correção para number[]
  const [notes, setNotes] = useState<string>('');
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);

  const [objectives, setObjectives] = useState<Objective[]>([]);

  const [fetchedActivities, setFetchedActivities] = useState<Activity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState<boolean>(true);
  const [errorActivities, setErrorActivities] = useState<string | null>(null);

  const [fetchedObjectives, setFetchedObjectives] = useState<Objective[]>([]);
  const [loadingObjectives, setLoadingObjectives] = useState<boolean>(true);
  const [errorObjectives, setErrorObjectives] = useState<string | null>(null);
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<number | null>(null);

  const sentiments: MoodType[] = ['Excelente', 'Bom', 'Neutro', 'Ruim', 'Péssimo'];

  const [isSaving, setIsSaving] = useState<boolean>(false); 
  const displayObjective = objectives.length > 0 ? objectives[0] : null;


  useEffect(() => {
    const fetchActivitiesData = async () => {
      setLoadingActivities(true);
      setErrorActivities(null);
      try {
        const data = await getActivities();
        setFetchedActivities(data);
      } catch (err: any) {
        setErrorActivities(err.message || 'Falha ao carregar atividades.');
        console.error('Erro ao buscar atividades:', err);
      } finally {
        setLoadingActivities(false);
      }
    };

    const fetchObjectives = async () => {
      setLoadingObjectives(true);
      setErrorObjectives(null);
      try {
        const data = await getObjectiveList();
        setObjectives(data);
      } catch (err: any) {
        setErrorObjectives(err.message || 'Falha ao carregar objetivos.');
        console.error('Erro ao buscar objetivos:', err);
      } finally {
        setLoadingObjectives(false);
      }
    };

    fetchObjectives();
    fetchActivitiesData();
  }, []);

  const toggleActivity = (activityId: number) => { // Correção para number
    setSelectedActivitiesIds(prev =>
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const onChangeDate = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (Platform.OS === 'android') {
      if (event.type === 'set' && date) {
        setSelectedDate(date);
      }
    } else {
      if (date) {
        setSelectedDate(date);
      }
    }
  };

  const onChangeTime = (event: any, time?: Date) => {
    setShowTimePicker(false);
    if (Platform.OS === 'android') {
      if (event.type === 'set' && time) {
        setSelectedTime(time);
      }
    } else {
      if (time) {
        setSelectedTime(time);
      }
    }
  };

  const formatDeadline = (deadlineString: string) => {
    const date = new Date(deadlineString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('pt-BR', options);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const handleSave = async () => {
  // ... (suas validações de campos obrigatórios) ...

  setIsSaving(true);

  try {
    // 1. Combina a data e a hora
    const combinedDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes(),
      selectedTime.getSeconds()
    );

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', notes);
    formData.append('datetime', combinedDateTime.toISOString()); 
    formData.append('mood', selectedSentiment as string); 

    selectedActivitiesIds.forEach(id => {
    formData.append('activity[]', id.toString());
  });

    if (selectedImageUri) {
      const filename = selectedImageUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename || '');
      const type = match ? `image/${match[1]}` : 'image/jpeg'; // Tipo MIME básico

      formData.append('photo', {
        uri: selectedImageUri,
        name: filename || 'photo.jpg',
        type: type,
      } as any); 
    }

    // 6. Chama a API com o FormData
    await createDiary(formData);

    Alert.alert("Sucesso", "Diário criado com sucesso!");
    router.back();

  } catch (error: any) {
    const errorMessage = error.message || "Erro ao criar diário. Tente novamente.";
    Alert.alert("Erro", errorMessage);
    console.error("Erro ao criar diário:", error);
  } finally {
    setIsSaving(false);
  }
};

  return (
    <View style={styles.container}>
      <Header avatarChar='A'/>
      <FormHeader title="Novo Diário" onBackPress={() => router.back()} onSavePress={handleSave} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputSection}>
          <TextInput
            mode="outlined"
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
            style={styles.textInput}
            outlineStyle={styles.textInputOutline as ViewStyle}
          />
        </View>

        <View style={styles.dateTimeContainer}>
          <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowDatePicker(true)}>
            <MaterialCommunityIcons name="calendar-month-outline" size={24} color="#666" />
            <Text style={styles.dateTimeText}>{formatDate(selectedDate)}</Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              testID="datePicker"
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeDate}
            />
          )}

          <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowTimePicker(true)}>
            <MaterialCommunityIcons name="clock-outline" size={24} color="#666" />
            <Text style={styles.dateTimeText}>{formatTime(selectedTime)}</Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              testID="timePicker"
              value={selectedTime}
              mode="time"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeTime}
            />
          )}
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
          {loadingActivities ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : errorActivities ? (
            <Text>Erro ao carregar atividades: {errorActivities}</Text>
          ) : fetchedActivities.length === 0 ? (
            <Text>Nenhuma atividade encontrada.</Text>
          ) : (
            <View style={styles.activityGrid}>
              {fetchedActivities.map((activity) => (
                <ActivityGridItem
                  key={activity.id}
                  label={activity.name}
                  iconName={getActivityIconName(activity.name)}
                  isSelected={selectedActivitiesIds.includes(activity.id)}
                  onPress={() => toggleActivity(activity.id)}
                />
              ))}
            </View>
          )}
        </View>

        {loadingObjectives ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Objetivos</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : errorObjectives ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Objetivos</Text>
            <Text style={styles.errorText}>Erro ao carregar objetivos: {errorObjectives}</Text>
          </View>
        ) : (
          // Só renderiza a seção se houver objetivos para mostrar
          objectives.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Objetivos</Text>
              <ObjectiveDisplayCard
                objectiveTitle={displayObjective?.activity.name || 'Objetivo'}
                objectiveSubtitle={`Meta até ${displayObjective ? formatDeadline(displayObjective.deadline) : ''}`}
              />
            </View>
          )
        )}

        <View style={styles.section}>
          <NotesInput notes={notes} onChangeNotes={setNotes} />
        </View>

        <View style={styles.section}>
          <PhotoPicker selectedImageUri={selectedImageUri} onImageSelected={setSelectedImageUri} />
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
  } as ViewStyle,
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginTop: 20,
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
  objectiveCard: { // ESTES ESTILOS SÃO DO ObjectiveDisplayCard ANTIGO, NÃO SERÃO USADOS PELO DiaryObjectiveSelectionCard DIRETAMENTE
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 15,
  },
  objectiveCardContent: { // IDEM
    flexDirection: 'row',
    alignItems: 'center',
  },
  objectiveCardText: { // IDEM
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  objectiveCardSubText: { // IDEM
    fontSize: 14,
    color: 'gray',
    marginLeft: 5,
  },
  notesInput: { // ESTE ESTILO FOI MOVIDO PARA DiaryNotesInput.tsx
    minHeight: 100,
    textAlignVertical: 'top',
  },
  photoContainer: { // ESTE ESTILO FOI MOVIDO PARA DiaryPhotoPicker.tsx
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    overflow: 'hidden',
  },
  selectedPhoto: { // IDEM
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  photoChooseText: { // IDEM
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8BC34A',
    marginTop: 10,
  },
  photoHintText: { // IDEM
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CreateDiaryScreen;