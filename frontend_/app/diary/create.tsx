import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, Platform, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import { getActivities } from '@/services/diary/listActivities';
import { getActivityIconName } from '@/utils/activityIconMapper';
import { Activity, MoodType } from '@/types/mental/diary';
import NotesInput from '@/components/Inputs/NotesInput';
import PhotoPicker from '@/components/Inputs/PhotoPicker';
import { Objective } from '@/types/mental/objectives';
import { getObjectiveList } from '@/services/objectives/listObjectives';
import FormHeader from '@/components/Layout/FormHeader';
import ObjectiveDisplayCard from '@/components/Cards/ObjectiveCard';
import Header from '@/components/Layout/Header';
import { createDiary } from '@/services/diary/createDiary';
import { ActivityGridMultiples } from '@/components/ActivityGridMultiples';
import { MainInput } from '@/components/Inputs/MainInput';
import { DateTimeInput } from '@/components/Inputs/DateTimeInput';

const CreateDiaryScreen = () => {
  const [title, setTitle] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [selectedSentiment, setSelectedSentiment] = useState<MoodType>('Neutro');
  const [selectedActivitiesIds, setSelectedActivitiesIds] = useState<number[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [fetchedActivities, setFetchedActivities] = useState<Activity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState<boolean>(true);
  const [errorActivities, setErrorActivities] = useState<string | null>(null);
  const [loadingObjectives, setLoadingObjectives] = useState<boolean>(true);
  const [errorObjectives, setErrorObjectives] = useState<string | null>(null);

  interface MoodOption {
    id: string
    label: string
    imageSource: any
    isSelected: boolean
  }

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const displayObjective = objectives.length > 0 ? objectives[0] : null;

  const [moods, setMoods] = useState<MoodOption[]>([
    { id: "Excelente", label: "Excelente", imageSource: require("@/assets/images/mood-excellent.png"), isSelected: false },
    { id: "Bom", label: "Bom", imageSource: require("@/assets/images/mood-smile.png"), isSelected: false },
    { id: "Neutro", label: "Neutro", imageSource: require("@/assets/images/mood-neutral.png"), isSelected: false },
    { id: "Ruim", label: "Mal", imageSource: require("@/assets/images/mood-sad.png"), isSelected: false },
    { id: "Péssimo", label: "Horrível", imageSource: require("@/assets/images/mood-cry.png"), isSelected: false },
  ]);

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

  const onChangeDate = (event: any, date?: Date) => {
    console.log("onChangeDate event:", event); // Log the event object
    console.log("onChangeDate date:", date);   // Log the date object
    setShowDatePicker(false);
    if (Platform.OS === 'android') {
      if (event.type === 'set' && date) {
        setSelectedDate(date);
      }
    } else { // iOS
      if (date) {
        setSelectedDate(date);
      }
    }
  };

  const onChangeTime = (event: any, time?: Date) => {
    console.log("onChangeTime event:", event); // Log the event object
    console.log("onChangeTime time:", time);   // Log the time object
    setShowTimePicker(false);
    if (Platform.OS === 'android') {
      if (event.type === 'set' && time) {
        setSelectedTime(time);
      }
    } else { // iOS
      if (time) {
        setSelectedTime(time);
      }
    }
  };

  const formatDeadline = (deadlineString: string) => {
    const date = new Date(deadlineString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const appendImageToFormData = async (formData: FormData, image: any) => {
    if (!image) return;

    if (typeof window !== 'undefined' && window.document) {
      // Estamos no navegador (web)
      if (image instanceof File) {
        formData.append('photo', image, image.name);
      } else if (typeof image === 'string' && image.startsWith('data:')) {
        const res = await fetch(image);
        const blob = await res.blob();
        const file = new File([blob], 'photo.jpg', { type: blob.type });
        formData.append('photo', file, file.name);
      } else {
        const res = await fetch(image);
        const blob = await res.blob();
        const file = new File([blob], 'photo.jpg', { type: blob.type });
        formData.append('photo', file, file.name);
      }
    } else {
      // Estamos no React Native
      let uri = image as string;

      const originalFilename = uri.split('/').pop() || 'photo.jpg';
      const filename = originalFilename.length > 100 ? originalFilename.substring(0, 100) : originalFilename;

      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1].toLowerCase()}` : 'image/jpeg';

      if (Platform.OS === 'ios' && uri.startsWith('file://')) {
        uri = uri.substring(7);
      }

      formData.append('photo', {
        uri,
        name: filename,
        type,
      } as any);
    }
  }

  const handleSave = async () => {
    setIsSaving(true);

    try {
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

      const selectedMood = moods.find(mood => mood.isSelected);
      if (selectedMood) {
        formData.append('mood', selectedMood.label);
      } else {
        formData.append('mood', 'Neutro');
      }

      selectedActivitiesIds.forEach(id => {
        formData.append('activity[]', id.toString());
      });

      await appendImageToFormData(formData, selectedImageUri);
      console.log(formData)
      await createDiary(formData);

      Alert.alert("Sucesso", "Diário criado com sucesso!");
      router.replace('/(tabs)/mental');

    } catch (error: any) {
      const errorMessage = error.message || "Erro ao criar diário. Tente novamente.";
      Alert.alert("Erro", errorMessage);
      console.error("Erro ao criar diário:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleMoodSelect = (moodId: string) => {
    setSelectedSentiment(moodId as MoodType);
    setMoods(moods.map((mood) => ({
      ...mood,
      isSelected: mood.id === moodId
    })));
  };

  const MoodIcon: React.FC<{ mood: MoodOption }> = ({ mood }) => {
    return (
      <TouchableOpacity
        style={[styles.moodOption, mood.isSelected && styles.moodOptionSelected]}
        onPress={() => handleMoodSelect(mood.id)}
      >
        <View style={styles.moodIconContainer}>
          <Image source={mood.imageSource} style={styles.moodImage} resizeMode="contain" />
        </View>
        <Text style={[styles.moodLabel, mood.isSelected && styles.moodLabelSelected]}>{mood.label}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Header avatarChar="A" />
      <FormHeader title="Novo Diário" onBackPress={() => router.replace('/(tabs)/mental')} onSavePress={handleSave} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <MainInput
          labelText='Titulo'
          keyboardType='default'
          value={title}
          onChangeText={setTitle}
          placeholder='Título'
        />

        <View style={styles.section}>
          <View style={styles.dateTimeContainer}>
            <DateTimeInput
              labelText='Data'
              datetime={selectedDate}
              onChange={onChangeDate}
              showPicker={showDatePicker}
              onPress={() => setShowDatePicker(true)}
              mode='date'
            />

            <DateTimeInput
              labelText='Hora'
              datetime={selectedTime}
              onChange={onChangeTime}
              showPicker={showTimePicker}
              onPress={() => setShowTimePicker(true)}
              mode='time'
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como você está se sentindo?</Text>
          <View style={styles.moodGrid}>
            {moods.map((mood) => (
              <MoodIcon key={mood.id} mood={mood} />
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
              <ActivityGridMultiples selected={selectedActivitiesIds} setSelected={setSelectedActivitiesIds} />
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
          objectives.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Objetivos</Text>
              <ObjectiveDisplayCard
                //@ts-ignore
                renderIcon={getActivityIconName(displayObjective?.activity.name)}
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
  container: { flex: 1, backgroundColor: '#fff' },
  scrollViewContent: { paddingBottom: 20 },
  section: {
    paddingHorizontal: 12,
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#4B5563',
    marginBottom: 15,
    textAlign: 'left',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  moodGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  moodOption: {
    flex: 1,
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
  },
  moodOptionSelected: {
    backgroundColor: '#E0F2F1',
    borderColor: '#4CAF50',
  },
  moodIconContainer: {
    marginBottom: 8,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  moodImage: {
    width: 50,
    height: 50,
  },
  moodLabel: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
  },
  moodLabelSelected: {
    color: "#4CAF50",
    fontWeight: "600",
  },
});

export default CreateDiaryScreen;