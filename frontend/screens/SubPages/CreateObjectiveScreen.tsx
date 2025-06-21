import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Appbar, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const ITEM_MARGIN = 8;
const ITEM_WIDTH_BASE = 80; // Largura aproximada de um item na imagem
const NUM_COLUMNS = Math.floor(width / (ITEM_WIDTH_BASE + ITEM_MARGIN * 2)); // Calcula colunas dinamicamente

interface ObjectiveGridItemProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const ObjectiveGridItem: React.FC<ObjectiveGridItemProps> = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.objectiveGridItem,
        isSelected ? styles.objectiveGridItemSelected : null,
      ]}
      onPress={onPress}
    >
      <View style={styles.objectiveIconContainer}>
        <MaterialCommunityIcons name="square-outline" size={32} color={isSelected ? 'white' : '#333'} />
        <View style={styles.objectiveIconLines}>
          <View style={styles.objectiveIconLine}></View>
          <View style={styles.objectiveIconLine}></View>
          <View style={styles.objectiveIconLine}></View>
        </View>
      </View>
      <Text style={[styles.objectiveLabel, isSelected ? styles.objectiveLabelSelected : null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

interface PeriodOptionProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const PeriodOption: React.FC<PeriodOptionProps> = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity style={styles.periodOption} onPress={onPress}>
      <View style={styles.radioButton}>
        {isSelected && <View style={styles.radioButtonSelected} />}
      </View>
      <Text style={styles.periodLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

interface CreateObjectiveScreenProps {}

const CreateObjectiveScreen: React.FC<CreateObjectiveScreenProps> = () => {
  const [selectedObjective, setSelectedObjective] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const objectives = [
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

  const handleSave = () => {
    console.log('Objetivo Selecionado:', selectedObjective);
    console.log('Período Selecionado:', selectedPeriod);
    // Lógica para salvar o objetivo
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => router.push('/(tabs)/mental')} />
        <Appbar.Content title="Criar Objetivo" titleStyle={styles.appbarTitle} />
        <Appbar.Action
          icon={() => <Text style={styles.mintrLogo}>Mintr💧</Text>}
          onPress={() => console.log('Mintr Logo Clicado')}
        />
        <Appbar.Action icon="check" color="green" onPress={handleSave} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Escolha um objetivo</Text>
          <View style={styles.objectiveGrid}>
            {objectives.map((obj) => (
              <ObjectiveGridItem
                key={obj.id}
                label={obj.label}
                isSelected={selectedObjective === obj.id}
                onPress={() => setSelectedObjective(obj.id)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Período</Text>
          <Card style={styles.periodCard} elevation={1}>
            <PeriodOption
              label="1 Semana"
              isSelected={selectedPeriod === '1 Semana'}
              onPress={() => setSelectedPeriod('1 Semana')}
            />
            <View style={styles.periodSeparator} />
            <PeriodOption
              label="2 Semanas"
              isSelected={selectedPeriod === '2 Semanas'}
              onPress={() => setSelectedPeriod('2 Semanas')}
            />
            <View style={styles.periodSeparator} />
            <PeriodOption
              label="3 Semanas"
              isSelected={selectedPeriod === '3 Semanas'}
              onPress={() => setSelectedPeriod('3 Semanas')}
            />
          </Card>
        </View>

        {/* Placeholder para a barra de navegação inferior */}
        <View style={styles.bottomNavPlaceholder}>
          <View style={styles.navItem}>
            <MaterialCommunityIcons name="brain" size={24} color="#BDC3C7" />
            <Text style={styles.navLabel}>Mental</Text>
          </View>
          <View style={styles.navItem}>
            <MaterialCommunityIcons name="heart-pulse" size={24} color="#8BC34A" />
            <Text style={styles.navLabelSelected}>Saúde</Text>
          </View>
          <View style={styles.navItem}>
            <MaterialCommunityIcons name="account" size={24} color="#BDC3C7" />
            <Text style={styles.navLabel}>Você</Text>
          </View>
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
    paddingBottom: 100,
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
  objectiveGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  objectiveGridItem: {
    width: ITEM_WIDTH_BASE,
    height: ITEM_WIDTH_BASE,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: ITEM_MARGIN,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  objectiveGridItemSelected: {
    borderColor: '#8BC34A',
    backgroundColor: '#8BC34A',
  },
  objectiveIconContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  objectiveIconLines: {
    position: 'absolute',
    width: 20,
    height: 15,
    justifyContent: 'space-between',
    top: 5,
    left: '50%',
    transform: [{ translateX: -10 }],
  },
  objectiveIconLine: {
    height: 2,
    backgroundColor: '#333',
    width: '100%',
  },
  objectiveLabel: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
  objectiveLabelSelected: {
    color: 'white',
  },
  periodCard: {
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  periodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#BDC3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#8BC34A',
  },
  periodLabel: {
    fontSize: 16,
    color: '#333',
  },
  periodSeparator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 0,
    marginHorizontal: -15, // Para estender por toda a largura do Card
  },
  bottomNavPlaceholder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 12,
    color: '#BDC3C7',
    marginTop: 4,
  },
  navLabelSelected: {
    fontSize: 12,
    color: '#8BC34A',
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default CreateObjectiveScreen;