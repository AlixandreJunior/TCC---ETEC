import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Animated, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FloatingActionButtonProps {
  onPressCreateDiary: () => void;
  onPressCreateObjective: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPressCreateDiary,
  onPressCreateObjective,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useState(new Animated.Value(0))[0];

  const toggleOpen = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  const objectiveTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });

  const diaryTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -120],
  });

  const rotateIcon = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <View style={styles.fabContainer}>
      <Animated.View style={[styles.subFab, { transform: [{ translateY: objectiveTranslateY }] }]}>
        <TouchableOpacity style={styles.subFabButton} onPress={onPressCreateObjective}>
          <MaterialCommunityIcons name="target" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.subFab, { transform: [{ translateY: diaryTranslateY }] }]}>
        <TouchableOpacity style={styles.subFabButton} onPress={onPressCreateDiary}>
          <MaterialCommunityIcons name="book-open-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity style={styles.mainFab} onPress={toggleOpen}>
        <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
          <MaterialCommunityIcons name="plus" size={30} color="#FFFFFF" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    alignItems: 'center',
  },
  mainFab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8BC34A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    zIndex: 10,
  },
  subFab: {
    position: 'absolute',
    bottom: 0,
  },
  subFabButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#66BB6A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default FloatingActionButton;