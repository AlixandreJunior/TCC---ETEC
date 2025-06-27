// components/CircularProgressDisplay.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Um placeholder simples para o círculo de progresso.
// Em um projeto real, você usaria uma biblioteca como react-native-circular-progress ou SVG.
const CircularProgressPlaceholder = ({ percentage, size, color, children }: { percentage: number; size: number; color: string; children: React.ReactNode }) => {
  return (
    <View style={[styles.circularProgressBase, { width: size, height: size, borderRadius: size / 2, borderColor: color + '30' }]}> {/* Círculo base claro */}
      <View style={[styles.circularProgressFill, { borderColor: color, transform: [{ rotateZ: `${360 * (percentage / 100)}deg` }] }]}>
        {/* Este é um placeholder. A lógica real de progresso circular é mais complexa. */}
      </View>
      <View style={styles.circularProgressContent}>
        {children}
      </View>
    </View>
  );
};

interface CircularProgressDisplayProps {
  value: string | number;
  unit?: string;
  label?: string;
  iconName?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  percentage: number; // 0-100
  size?: 'large' | 'small';
  color: string;
}

export default function CircularProgressDisplay({
  value,
  unit,
  label,
  iconName,
  percentage,
  size = 'small',
  color,
}: CircularProgressDisplayProps): React.JSX.Element {
  const displaySize = size === 'large' ? 120 : 80;
  const iconSize = size === 'large' ? 40 : 28;
  const valueFontSize = size === 'large' ? 32 : 18;
  const unitFontSize = size === 'large' ? 16 : 12;
  const labelFontSize = size === 'large' ? 14 : 10;

  return (
    <View style={styles.displayContainer}>
      <CircularProgressPlaceholder percentage={percentage} size={displaySize} color={color}>
        {iconName && (
          <MaterialCommunityIcons name={iconName} size={iconSize} color={color} style={styles.iconStyle} />
        )}
        <Text style={[styles.valueText, { fontSize: valueFontSize, color: '#2C3E50' }]}>{value}</Text>
        {unit && <Text style={[styles.unitText, { fontSize: unitFontSize, color: '#5D6D7E' }]}>{unit}</Text>}
      </CircularProgressPlaceholder>
      {label && <Text style={[styles.labelText, { fontSize: labelFontSize, color: '#5D6D7E' }]}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  displayContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  circularProgressBase: {
    borderWidth: 8, // Largura da borda base
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circularProgressFill: {
    // Este é um placeholder, a implementação real envolve máscaras ou SVGs
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 999, // Um círculo completo
    borderWidth: 8, // Largura da borda de preenchimento
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent', // A cor real virá via prop
    borderLeftColor: 'transparent',
  },
  circularProgressContent: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  iconStyle: {
    marginBottom: 5,
  },
  valueText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  unitText: {
    textAlign: 'center',
  },
  labelText: {
    marginTop: 8,
    textAlign: 'center',
  },
});