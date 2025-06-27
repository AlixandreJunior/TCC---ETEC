import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MintroLogo(): React.JSX.Element {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>Mintros</Text>
      <View style={styles.plantIconPlaceholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: -80, 
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#34495E',
    marginRight: 8,
  },
  plantIconPlaceholder: {
    width: 28,
    height: 28,
    backgroundColor: '#8BC34A',
    borderRadius: 14,
  },
});