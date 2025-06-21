import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar, IconButton,TextInput,  Surface } from 'react-native-paper';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

const HydrationScreen = () => {
  const [currentWaterAmount, setCurrentWaterAmount] = useState(750); // ml
  const dailyGoal = 3750; // ml
  const glassesPer300ml = 1; // 1 copo a cada 300ml, ajuste conforme sua medida de copo

  const remainingWater = Math.max(0, dailyGoal - currentWaterAmount);
  const percentageFilled = (currentWaterAmount / dailyGoal) * 100;
  // Calculamos a circunferência para o strokeDasharray
  const circleCircumference = 2 * Math.PI * 70;
  // Calculamos o quanto do círculo deve ser preenchido
  const strokeDashoffset = circleCircumference * (1 - percentageFilled / 100);

  const numberOfGlasses = Math.round(currentWaterAmount / (300 / glassesPer300ml)); // Calcula número de copos

  return (
    <View style={styles.container}>
      {/* Barra Superior (Appbar) */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => router.push('/(tabs)/activity')} />
        <Appbar.Content title="Hidratação" titleStyle={styles.appbarTitle} />
        <Text style={styles.mintrLogo}>Mintr💧</Text>
        <Appbar.Action icon="bell-outline" onPress={() => console.log('Notificações')} />
        <Appbar.Action icon="dots-vertical" onPress={() => console.log('Mais opções')} />
      </Appbar.Header>

      {/* Navegação de Data */}
      <View style={styles.dateNavigation}>
        <IconButton icon="chevron-left" onPress={() => console.log('Dia Anterior')} />
        <Text style={styles.dateText}>Ontem</Text>
        <IconButton icon="chevron-right" onPress={() => console.log('Próximo Dia')} />
      </View>

      {/* Conteúdo Principal (Quantidade de Água e Progresso) */}
      <View style={styles.mainContent}>
        <View>
          <Text style={styles.waterAmount}>{currentWaterAmount} ml</Text>
          <Text style={styles.goalText}>
            Faltam {remainingWater} ml para você atingir{'\n'}seu objetivo diário de {dailyGoal}ml
          </Text>
        </View>

        {/* Círculo de Progresso com SVG */}
        <View style={styles.progressCircleContainer}>
          <Svg height="150" width="150" viewBox="0 0 150 150">
            {/* Círculo de fundo */}
            <Circle
              cx="75"
              cy="75"
              r="70"
              stroke="#e0e0e0" // Cor do círculo vazio
              strokeWidth="10"
              fill="transparent"
            />
            {/* Círculo de progresso */}
            <Circle
              cx="75"
              cy="75"
              r="70"
              stroke="#62b6e1" // Azul da água
              strokeWidth="10"
              strokeLinecap="round"
              fill="transparent"
              // A magia do progresso: ajusta o preenchimento do círculo
              strokeDasharray={`${circleCircumference} ${circleCircumference}`}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 75 75)" // Inicia o progresso do topo
            />
            {/* Gota d'água central usando Text do SVG (renomeado para SvgText para evitar conflito) */}
            <SvgText // <-- Usamos SvgText que foi importado de 'react-native-svg'
              x="75"
              y="85" // Ajuste para centralizar visualmente
              textAnchor="middle"
              fontSize="40"
            >💧</SvgText>
          </Svg>
        </View>
      </View>

      {/* Seção de Histórico */}
      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>Histórico</Text>
        <Text style={styles.historyDate}>Hoje, 11 de Junho</Text>
        <Surface style={styles.historyCard} elevation={2}>
          <Text style={styles.cardAmount}>{currentWaterAmount} ml</Text>
          <Text style={styles.cardCups}>{numberOfGlasses} copos</Text>
        </Surface>
      </View>

      {/* Botão Flutuante de Adicionar */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/registerhydratation')} // Exemplo: adiciona 300ml ao clicar
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}; // <-- ESTE É O FECHAMENTO DO COMPONENTE HydrationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Fundo branco como na imagem
  },
  appbar: {
    backgroundColor: '#c8e6c9', // Verde claro
    // No iOS, por padrão, o Appbar já centraliza o título.
    // Para Android, pode ser necessário ajustar o justify-content ou usar um View.
  },
  appbarTitle: {
    marginLeft: -10, // Ajuste para o título ficar mais perto do botão de voltar
  },
  mintrLogo: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#388e3c', // Cor do texto Mintr
    marginRight: 10,
  },
  dateNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f9f9f9', // Um cinza bem claro para a barra de navegação
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  waterAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2e7d32', // Verde mais escuro para o valor da água
    marginBottom: 8,
  },
  goalText: {
    fontSize: 13,
    color: 'gray',
    textAlign: 'left', // Alinhado à esquerda para a descrição
    marginRight: 20, // Espaço entre o texto e o círculo
  },
  progressCircleContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historySection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  historyCard: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'white', // Fundo branco para o cartão
  },
  cardAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  cardCups: {
    fontSize: 16,
    color: 'gray',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#81c784', // Verde do botão '+'
    borderRadius: 30, // Para ser um círculo perfeito (metade da largura/altura)
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    lineHeight: 30, // Ajuste para centralizar o '+' verticalmente
  },
});

export default HydrationScreen;