import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, GestureResponderEvent } from 'react-native';

interface DraggableSliderProps {
  value: number;
  maxValue: number;
  onValueChange: (value: number) => void;
}

export function DraggableSlider({ value, maxValue, onValueChange }: DraggableSliderProps) {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [currentValue, setCurrentValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);

  // Função para atualizar o valor baseado na posição do toque
  const updateValueFromTouch = (event: GestureResponderEvent) => {
    if (sliderWidth <= 0) return;
    
    // Obter a posição X do toque relativa ao componente
    const touchX = event.nativeEvent.locationX;
    
    // Limitar a posição dentro dos limites do slider
    const position = Math.max(0, Math.min(sliderWidth, touchX));
    
    // Calcular o novo valor baseado na posição
    const newValue = (position / sliderWidth) * maxValue;
    const roundedValue = Math.round(newValue * 10) / 10;
    
    // Atualizar o valor
    setCurrentValue(roundedValue);
    onValueChange(roundedValue);
  };

  // Calcular a posição do thumb baseada no valor atual
  const thumbPosition = (currentValue / maxValue) * sliderWidth;
  
  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setSliderWidth(width);
      }}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderGrant={(event) => {
        setIsDragging(true);
        updateValueFromTouch(event);
      }}
      onResponderMove={(event) => {
        if (isDragging) {
          updateValueFromTouch(event);
        }
      }}
      onResponderRelease={() => {
        setIsDragging(false);
      }}
      onResponderTerminate={() => {
        setIsDragging(false);
      }}
    >
      {/* Barra de fundo */}
      <View style={styles.track} />
      
      {/* Barra de progresso */}
      <View 
        style={[
          styles.progress, 
          { width: thumbPosition }
        ]} 
      />
      
      {/* Thumb (bolinha arrastável) */}
      <View 
        style={[
          styles.thumb,
          {
            left: thumbPosition - 12 // Centralizar o thumb (metade da largura)
          }
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    height: 8,
    backgroundColor: '#E0E6FF',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  progress: {
    height: 8,
    backgroundColor: '#007AFF',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    position: 'absolute',
    top: -8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});