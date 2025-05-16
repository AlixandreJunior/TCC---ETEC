import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../styles/colors';

interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  style,
  colors: customColors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
}) => {
  return (
    <LinearGradient
      colors={customColors || colors.background.gradient}
      start={start}
      end={end}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});