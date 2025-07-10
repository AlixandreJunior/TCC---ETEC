import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";

interface QuantityCounterProps {
  label: string;
  volume: number;
  onQuantityChange: (volumeMl: number, newQuantity: number) => void;
  initialQuantity?: number;
}

export const QuantityCounter: React.FC<QuantityCounterProps> = ({
  label,
  volume,
  onQuantityChange,
  initialQuantity = 0,
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(volume, newQuantity);
  };

  const decrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(volume, newQuantity);
    }
  };

  return (
    <View style={styles.quantityItem}>
      <View>
        <Text style={styles.itemLabel}>{label}</Text>
        <Text style={styles.itemVolume}>{volume} ml</Text>
      </View>
      <View style={styles.counterContainer}>
        <Text style={styles.counterValue}>{quantity}</Text>
        <TouchableOpacity onPress={decrement} style={styles.counterButton}>
          <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={increment} style={styles.counterButton}>
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    optionsCard: {
    borderRadius: 12,
    backgroundColor: 'white',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 8,
  },
  quantityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemLabel: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#000',
  },
  itemVolume: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#111',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    fontSize: 20,
    fontFamily: 'Poppins_500Medium',
    color: '#333',
  },
  counterValue: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    minWidth: 40,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 10,
  },
})