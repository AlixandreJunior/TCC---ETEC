import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Objective } from '@/types/mental/objectives'; // Ajuste o caminho

interface DiaryObjectiveSelectionCardProps {
  selectedObjective: Objective | null; // O objetivo atualmente selecionado
  onPress: () => void; // Função para abrir o seletor de objetivos
  loading: boolean;
  error: string | null;
}

const DiaryObjectiveSelectionCard: React.FC<DiaryObjectiveSelectionCardProps> = ({
  selectedObjective,
  onPress,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <View style={[styles.card, styles.loadingCard]}>
        <Text style={styles.loadingText}>Carregando objetivos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.card, styles.errorCard]}>
        <Text style={styles.errorText}>Erro: {error}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        {selectedObjective ? (
          <>
            <MaterialCommunityIcons name="check-circle-outline" size={24} color="#8BC34A" />
            <Text style={styles.objectiveText}>{selectedObjective.activity.name}</Text>
            <Text style={styles.objectiveSubText}>
              Meta até {new Date(selectedObjective.deadline).toLocaleDateString('pt-BR')}
            </Text>
          </>
        ) : (
          <>
            <MaterialCommunityIcons name="target" size={24} color="#BDC3C7" />
            <Text style={styles.objectiveText}>Clique para selecionar um objetivo</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#BDC3C7" />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginTop: 5, // Pequeno ajuste de margem para o título da seção
  },
  loadingCard: {
    alignItems: 'center',
  },
  errorCard: {
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
  },
  loadingText: {
    color: 'gray',
  },
  errorText: {
    color: 'red',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Para alinhar ícone/texto e seta
    flexWrap: 'wrap', // Caso o texto seja muito longo
  },
  objectiveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
    flex: 1, // Permite que o texto ocupe o espaço disponível
  },
  objectiveSubText: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 5,
  },
});

export default DiaryObjectiveSelectionCard;